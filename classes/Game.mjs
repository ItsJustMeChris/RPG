import Map from "./Map.mjs";

export default class Game {
  constructor(canvas_selector, seed = 1234) {
    this.init_canvas(canvas_selector);
    this.map = new Map(this, seed);
//    this.entity_set = new EntitySet(this);
    this.draw()
  }

  init_canvas(canvas_selector) {
    this.canvas = document.querySelector(canvas_selector);
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.context = this.canvas.getContext('2d');
  }
  
  tick() {
    this.map.tick()
    this.entity_set.tick()
  }

  draw() {
    this.map.draw()
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
