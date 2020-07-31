import Entity from '../Entity/Entity'
import spritesSingleton from '../Sprites'
import alien1a from './alien1a.jpg'
import alien1b from './alien1b.jpg'
import alien2a from './alien2a.jpg'
import alien2b from './alien2b.jpg'
import alien3a from './alien3a.jpg'
import alien3b from './alien3b.jpg'
import explosion from './explosion.jpg'

/**
 * Un Alien representa una nave enemiga que quiere invadir la Tierra.
 */
export default class Alien extends Entity {
  /**
   * Un Alien representa una nave enemiga que quiere invadir la Tierra.
   * @param {number} x  Posición actual en el eje X.
   * @param {number} y  Posición actual en el eje Y.
   * @param {Game} game Apuntador al objeto Game que contiene al Alien.
   */
  constructor (x, y, game, row) {
    super(x, y, 40, 25, [spritesSingleton.getImage(alien3a), spritesSingleton.getImage(alien3b)], 300)
    switch (row) {
      case 0:
        this.sprites = [spritesSingleton.getImage(alien1a), spritesSingleton.getImage(alien1b)]
        break
      case 1:
      case 2:
        this.sprites = [spritesSingleton.getImage(alien2a), spritesSingleton.getImage(alien2b)]
        break
    }
    this.horizontalVelocity = -75

    /**
     * Apuntador al objeto Game que contiene al Alien.
     */
    this.game = game
    /**
     * Estado actual del Alien.
     */
    this.destroyed = 0
  }

  /**
   * Muestra una animación antes de eliminar al Alien de pantalla.
   */
  destroy () {
    this.sprites = [spritesSingleton.getImage(explosion)]
    this.currentSprite = 0
    this.destroyed = 50
  }

  /**
   * Actualiza la posición de un alienígena en el eje Y
   * y cambia la dirección horizontal de su recorrido.
   */
  down () {
    this.horizontalVelocity = -this.horizontalVelocity
    this.y += 10
    if (this.y > this.game.canvas.height - this.game.listOfEntities[0].height) {
      this.game.notify(-1)
    }
  }

  /**
   * Controla el movimiento de la nave alienígena utilizando el tiempo delta.
   * @param {number} delta Tiempo transcurrido en milisegundos desde el último movimiento.
   */
  move (delta) {
    if ((this.horizontalVelocity < 0 && this.x < 10) ||
      (this.horizontalVelocity > 0 && this.x > this.game.canvas.width - (this.width + 10))) {
      this.game.downAliens = true
    }
    super.move(delta)
    if (this.destroyed > 0) {
      this.destroyed -= delta
      if (this.destroyed <= 0) {
        this.game.deleteEntity(this)
      }
    }
  }
}
