function rotate(cx, cy, x, y, angle) {
    var radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
        ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return [nx, ny];
}

export default class Map {
    chunks = [];
    scale = 5;

    constructor(game, seed, localPlayer) {
        this.context = game.context;
        this.localPlayer = localPlayer;
        noise.seed(1235);
        this.generateChunk();
        this.draw();
    }


    /*

    draw map relative to player coordinates
    todo pan canvas to always keep player in center

    */
    generateChunk() {
        this.chunks = [];
        let z = 1;
        for (let x = -(window.innerWidth / 2); x < window.innerWidth / 2; x += this.scale) {
            for (let y = -(window.innerHeight / 2); y < window.innerHeight / 2; y += this.scale) {
                // noise layers
                let nx = x + this.localPlayer.x;
                let ny = y + this.localPlayer.y;
                let nz = 1;
                let elevation1 = noise.perlin3(nx / (this.scale * 15), ny / (this.scale * 15), nz);
                let elevation2 = noise.perlin3(nx / (this.scale * 25), ny / (this.scale * 25), nz);
                let elevation3 = noise.perlin3(nx / (this.scale * 35), ny / (this.scale * 35), nz);
                // layer stacking
                let elevation = ((elevation1 * 0.1337) + (elevation2)) / 1.5;
                this.chunks.push({ x, y, type: 'ground', elevation });

                let r = rotate(0, 0, nx, ny, 90);
                nx = r[0]
                ny = r[1]
                let elevation4 = noise.perlin3(nx / (this.scale * 60), ny / (this.scale * 60), nz);
                elevation = (elevation4 * 2);
                this.chunks.push({ x, y, type: 'road', elevation });
            }
        }
    }

    draw() {
        this.chunks.forEach(chunk => {
            let elevation = Math.abs(chunk.elevation) * 500;
            let color = false;

            if (chunk.type == 'ground') {
                if (elevation <= 20) {
                    color = '#123540';
                } else if (elevation <= 75) {
                    color = '#403412';
                } else if (elevation <= 100) {
                    color = '#124025';
                } else if (elevation <= 200) {
                    color = '#374012';
                } else if (elevation <= 240) {
                    color = '#4e6066';
                } else {
                    color = '#638691';
                }
            } else if (chunk.type == 'road') {
                if (elevation <= 7.5) {
                    color = '#333333';
                } else if (elevation <= 15) {
                    color = '#444444';
                } else if (elevation <= 25) {
                    color = '#555555';
                }
            }

            if (color) {
                this.context.fillStyle = color;
                this.context.fillRect(chunk.x, chunk.y, this.scale, this.scale);
            }
        });
    }
}
