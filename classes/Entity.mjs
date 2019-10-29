export default class Entity {
    x = 0;
    y = 0;
    game;

    constructor({ context }, x = 0, y = 0) {
        this.x = x;
        this.y = y;
        this.context = context;
    }

    draw() {
        this.context.fillStyle = '#FFFFFF';
        this.context.fillRect(this.x, this.y, 10, 10);
    }

    moveUp() {
        this.y--;
        this.draw();
    }

    moveDown() {
        this.y++;
        this.draw();
    }

    moveLeft() {
        this.x--;
        this.draw();
    }

    moveRight() {
        this.x++;
        this.draw();
    }

}