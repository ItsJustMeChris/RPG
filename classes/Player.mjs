import Entity from './Entity.mjs';

export default class Player extends Entity {
  constructor(game) {
    super(game);
    window.onkeydown = ({ code }) => {
      if (['KeyW', 'ArrowUp'].some(e => e === code)) {
        this.moveUp();
      }
      if (['KeyS', 'ArrowDown'].some(e => e === code)) {
        this.moveDown();
      }
      if (['KeyA', 'ArrowLeft'].some(e => e === code)) {
        this.moveLeft();
      }
      if (['KeyD', 'ArrowRight'].some(e => e === code)) {
        this.moveRight();
      }
    }
  }
}
