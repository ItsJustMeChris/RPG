export default class Entity {
  x = 0;
  y = 0;
  game;
  isMovingUpX = false;
  isMovingDownX = false;
  isMovingUpY = false;
  isMovingDownY = false;
  velocity = 10;


  constructor({ context }, x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.context = context;
    this.sprite = new Image();
    this.sprite.src = "../assets/images/characters/mani.png";
  }

  draw() {
    this.context.fillStyle = '#FFFFFF';
    this.context.drawImage(
      this.sprite,
      0,
      0,
      20,
      30,
      this.x,
      this.y,
      20,
      30
    );
  }

  tick() {
    if (this.isMovingUpX)
      this.moveUp();
    if (this.isMovingUpY)
      this.moveRight();
    if (this.isMovingDownX)
      this.moveDown();
    if (this.isMovingDownY)
      this.moveLeft();
  }

  moveUp() {
    this.y -= this.velocity;
    this.draw();
  }

  moveDown() {
    this.y += this.velocity;
    this.draw();
  }

  moveLeft() {
    this.x -= this.velocity;
    this.draw();
  }

  moveRight() {
    this.x += this.velocity;
    this.draw();
  }

}
