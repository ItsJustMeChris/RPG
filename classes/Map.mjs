export default class Map {
    chunks = [];
    scale = 10;

    constructor(game, seed) {
        this.context = game.context;
        noise.seed(1235);
        this.generateChunk();
        this.draw();
    }

    generateChunk() {
        this.chunks = [];
        let z = 1;
        for (let x = -(window.innerWidth / 2); x < window.innerWidth / 2; x += this.scale) {
            for (let y = -(window.innerHeight / 2); y < window.innerHeight / 2; y += this.scale) {
                // noise layers
                let nx = x;
                let ny = y;
                let nz = 1;
                let elevation1 = noise.perlin3(nx / (this.scale * 15), ny / (this.scale * 15), nz);
                let elevation2 = noise.perlin3(nx / (this.scale * 25), ny / (this.scale * 25), nz);
                let elevation3 = noise.perlin3(nx / (this.scale * 35), ny / (this.scale * 35), nz);
                // layer stacking
                let elevation = ((elevation1 * 0.1337) + (elevation2)) / 1.5
                this.chunks.push({ x, y, elevation });
            }
        }
    }

    draw() {
        this.chunks.forEach(chunk => {
            let elevation = Math.abs(chunk.elevation) * 512;
            let color = '#00ff00';
            if (elevation <= 20) {
                color = '#123540';
            } else if (elevation <= 75) {
                color = '#403412';
            } else if (elevation <= 100) {
                color = '#124025';
            } else if (elevation <= 225) {
                color = '#374012';
            } else if (elevation <= 265) {
                color = '#4e6066';
            } else {
                color = '#638691';
            }


            this.context.fillStyle = color;
            this.context.fillRect(chunk.x, chunk.y, this.scale, this.scale);
        });
    }
}
