import Map from "./Map.mjs";
import Player from './Player.mjs';
import EntityList from "./EntityList.mjs";

export default class Game {
  drawInterval;
  constructor(canvas_selector, seed = 1234) {
    this.init_canvas(canvas_selector);
    this.player = new Player(this);
    this.map = new Map(this, seed, this.player);
    this.entityList = new EntityList;
    this.entityList.register(this.player);
    requestAnimationFrame(() => this.tick());
  }

  init_canvas(canvas_selector) {
    this.canvas = document.querySelector(canvas_selector);
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.context = this.canvas.getContext('2d');
    this.context.translate(this.canvas.width / 2, this.canvas.height / 2);
  }

  tick() {
    // tick game state
    this.map.tick()
    //this.entity_set.tick()
    // draw game state
    this.draw();
    requestAnimationFrame(() => this.tick());
  }

  clear_canvas() {
    this.context.clearRect(-this.canvas.width / 2, -this.canvas.height / 2, this.canvas.width, this.canvas.height);
  }

  draw() {
    this.clear_canvas()
    this.map.draw();
    this.entityList.draw();
  }
}

// const game = new Game("#game");

// Game -> draw
//   |- StateMachine
//   |- $State
//   |
//   |- Map($State) -> tick -> draw
//   |   |- Tile($State) -> tick -> draw
//   |- EntitySet($State) -> tick -> draw
//         |- Entity($State) -> tick -> draw
