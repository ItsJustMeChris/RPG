function rotate(cx, cy, x, y, angle) {
  var radians = (Math.PI / 180) * angle,
    cos = Math.cos(radians),
    sin = Math.sin(radians),
    nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
    ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
  return [nx, ny];
}

const lookup = {};

export default class Map {
  chunks = [];
  scale = 15;

  constructor(game, seed, localPlayer) {
    this.context = game.context;
    this.localPlayer = localPlayer;
    noise.seed(1235);
    this.generator();
    this.draw();

    // this.draw();
  }

  tick() {
    this.generator()
  }

  generator() {
    let px = this.localPlayer.x / this.scale;
    let py = this.localPlayer.y / this.scale;
    for (let x = px - this.scale; x < px + this.scale; x += 1) {
      for (let y = py - this.scale; y < py + this.scale; y += 1) {
        let hash = `${x}${y}`;
        if (!lookup[hash]) {
          const chunk = {
            x: x, y: y, z: 1, type: 'ground',
            elevation: this.generate_chunk(x, y, 1)
          }
          lookup[hash] = this.chunks.push(chunk);
        }
      }
    }
  }

  generate_chunk(x, y, z) {
    // layer stacking
    let elevation1 = noise.perlin3(x / (this.scale * 15), y / (this.scale * 15), z);
    let elevation2 = noise.perlin3(x / (this.scale * 25), y / (this.scale * 25), z);
    // let elevation3 = noise.perlin3(x / (this.scale * 35), y / (this.scale * 35), z);
    let elevation = ((elevation1 * 0.1337) + (elevation2)) / 1.5;

    // let r = rotate(0, 0, x, y, 90);
    // x = r[0]
    // y = r[1]
    // let elevation4 = noise.perlin3(x / (this.scale * 60), y / (this.scale * 60), z);
    // elevation = (elevation4 * 2);
    // this.chunks.push({ x, y, type: 'road', elevation });
    return elevation;
  }

  draw() {
    Object.keys(lookup).forEach(key => {
      const chunkIndex = lookup[key];
      const chunk = this.chunks[chunkIndex - 1];
      this.paint(chunk);
    });
  }

  paint(chunk) {
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

      let sx = chunk.x * this.scale;
      let sy = chunk.y * this.scale;
      this.context.fillRect(sx, sy, this.scale, this.scale);
    }
  }
}
