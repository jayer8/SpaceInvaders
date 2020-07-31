/**
 * Una entidad representa cualquier elemento que puede aparacer en el juego.
 */
export default class Entity {
  /**
   * Una entidad representa cualquier elemento que puede aparacer en el juego.
   * @param {number} x        Posición actual en el eje X.
   * @param {number} y        Posición actual en el eje Y.
   * @param {number} width    Ancho de la entidad.
   * @param {number} height   Alto de la entidad.
   * @param {Array} sprites   Lista de imágenes (sprites) que necesita la entidad para dibujarse.
   * @param {number} interval Tiempo en milisegundos que deben transcurrir para cambiar al siguiente sprite.
   */
  constructor (x, y, width, height, sprites, interval) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.sprites = sprites
    this.interval = interval
    /**
     * Indice de la lista de imágenes que indica cual debe dibujarse actualmente.
     */
    this.currentSprite = 0
    /**
     * Tiempo transcurrido desde que cambió un sprite.
     */
    this.elapsedTime = 0
    /**
     * Velocidad actual en el eje X (pixeles / segundo)
     */
    this.horizontalVelocity = 0
    /**
     * Velocidad actual en el eje Y (pixeles / segundo)
     */
    this.verticalVelocity = 0
  }

  /**
   * Dibuja la entidad en el contexto gráfico indicado.
   * @param {HTMLCanvasElement} context Contexto gráfico (lienzo) donde dibujar.
   */
  draw (context) {
    context.drawImage(this.sprites[this.currentSprite],
      this.x, this.y, this.width, this.height)
  }

  /**
   * Comprueba si dos entidades estan colisionando.
   * @param {Entity} other Entidad con la que comprobar si hay una colisión.
   */
  isCrashed (other) {
    return !(this.x + this.width < other.x || this.y + this.height < other.y ||
      this.x > other.x + other.width || this.y > other.y + other.height)
  }

  /**
   * Mueve la entidad según el tiempo transcurrido.
   * @param {number} delta Tiempo transcurrido en milisegundos.
   */
  move (delta) {
    this.elapsedTime += delta
    if (this.elapsedTime >= this.interval) {
      this.elapsedTime = 0
      this.currentSprite = (this.currentSprite + 1) % this.sprites.length
    }
    this.x += (delta * this.horizontalVelocity) / 1000
    this.y += (delta * this.verticalVelocity) / 1000
  }
}
