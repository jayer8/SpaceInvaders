import Alien from '../Alien/Alien'
import Entity from '../Entity/Entity'
import spritesSingleton from '../Sprites'
import shotA from './shota.jpg'
import shotB from './shotb.jpg'

/**
 * Un Shot representa un disparo proveniente de la nave que controla el jugador.
 */
export default class Shot extends Entity {
  /**
   * Un Shot representa un disparo proveniente de la nave que controla el jugador.
   * @param {number} x  Posición actual en el eje X.
   * @param {number} y  Posición actual en el eje Y.
   * @param {Game} game Apuntador al objeto Game que contiene al Shot.
   */
  constructor (x, y, game) {
    super(x, y, 2, 5, [spritesSingleton.getImage(shotA), spritesSingleton.getImage(shotB)], 100)
    this.verticalVelocity = -300

    /**
     * Apuntador al objeto Game que contiene al Shot.
     */
    this.game = game
    /**
     * Estado actual del Shot.
     */
    this.used = false
  }

  /**
   * Destruye el disparo y al Alien con el que ha chocado.
   * @param {Entity} other Entidad con la que ha chocado el disparo.
   */
  crashedWith (other) {
    if (!this.used && other instanceof Alien) {
      this.used = true
      this.game.deleteEntity(this)
      other.destroy()
      this.game.notifyAlienDestroyed()
    }
  }

  /**
   * Controla el movimiento del disparo utilizando el tiempo delta.
   * @param {number} delta Tiempo transcurrido en milisegundos desde el último movimiento.
   */
  move (delta) {
    super.move(delta)
    if (this.y < -100) {
      this.game.deleteEntity(this)
    }
  }
}
