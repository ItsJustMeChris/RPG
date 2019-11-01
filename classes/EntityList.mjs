export default class EntityList {
  entities = [];
  constructor(game) {
  }

  register(entity) {
    this.entities.push(entity);
  }

  draw() {
    this.entities.forEach(entity => {
      entity.draw();
    });
  }

  tick() {
    this.entities.forEach(entity => {
      entity.tick();
    });
  }
}
