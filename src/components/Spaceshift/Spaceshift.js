import Entity from '../Entity/Entity'
import spritesSingleton from '../Sprites'
import Alien from '../Alien/Alien'
import spaceshift from './spaceshift.jpg'

/**
 * Una Spaceshit representa la nave que controla el jugador.
 */
export default class Spaceshift extends Entity {
  /**
   * Una Spaceshit representa la nave que controla el jugador.
   * @param {number} x  Posición actual en el eje X.
   * @param {number} y  Posición actual en el eje Y.
   * @param {Game} game Apuntador al objeto Game que contiene a la Spaceshift.
 */
  constructor (x, y, game) {
    super(x, y, 40, 25, [spritesSingleton.getImage(spaceshift)], 999999)
    /**
     * Apuntador al objeto Game que contiene a la Spaceshift.
     */
    this.game = game
  }

  /**
   * Notifica que la nave del jugador ha colisionado con un Alien.
   * @param {Entity} other Entidad con la que ha colisionado
   */
  crashedWith (other) {
    if (other instanceof Alien) {
      this.game.notify(-1)
    }
  }

  /**
   * Controla el moviemiento de la nave del jugador utilizando el tiempo delta.
   * @param {number} delta Tiempo transcurrido en milisegundos desde el último movimiento.
   */
  move (delta) {
    if ((this.horizontalVelocity < 0 && this.x < 10) ||
      (this.horizontalVelocity > 0 && this.x > this.game.canvas.width - (this.width + 10))) {
      return
    }
    super.move(delta)
  }
}
