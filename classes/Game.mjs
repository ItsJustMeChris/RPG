import Map from "./Map.mjs";
import Player from './Player.mjs';

export default class Game {
  constructor(canvas_selector, seed = 1234) {
    this.init_canvas(canvas_selector);
    this.player = new Player(this);
    this.map = new Map(this, seed, this.player);
    this.draw()
  }

  init_canvas(canvas_selector) {
    this.canvas = document.querySelector(canvas_selector);
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.context = this.canvas.getContext('2d');
    this.context.translate(this.canvas.width / 2, this.canvas.height / 2);
  }

  tick() {
    this.map.tick()
    this.entity_set.tick()
  }

  draw() {
    this.map.draw()
    this.player.draw()
    //this.entity_set.draw()
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
