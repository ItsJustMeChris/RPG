export default class Map {
    chunks = [];
    scale = 5;

    constructor(game, seed) {
        this.context = game.context;
        noise.seed(1234);
        this.generateChunk();
    }

    generateChunk() {
        for (let x = 0; x < window.innerWidth; x+=this.scale) {
            for (let y = 0; y < window.innerHeight; y+=this.scale) {
                let elevation1 = noise.perlin2(x / (this.scale * 15), y / (this.scale * 15));
                let elevation2 = noise.perlin2(x / (this.scale * 25), y / (this.scale * 25));
                let elevation3 = noise.perlin2(x / (this.scale * 35), y / (this.scale * 35));
                let elevation = ((elevation1 * 0.1337) + (elevation2)) / 2
                this.chunks.push({ x, y, elevation });
            }
        }
    }

    draw() {
        this.chunks.forEach(chunk => {
            let elevation = Math.abs(chunk.elevation) * 512;
            let color = '#00ff00';
            if(elevation <= 20) {
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
