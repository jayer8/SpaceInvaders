/**
 * Un Sprites representa un almacén de imágenes para los objetos Entity del juego.
 * Sólo puede existir un objeto Sprites por instancia de la clase Game.
 */
class Sprites {
  /**
   * Un Sprites representa un almacén de imágenes para los objetos Entity del juego.
   * Sólo puede existir un objeto Sprites por instancia de la clase Game.
   */
  constructor () {
    /**
     * Arreglo de todas las imagenes que utilizan los objetos Entity del juego.
     */
    this.images = []
  }

  /**
   * Devuelve la imágen correspondiente a la ruta en el parámetro path.
   * @param {string} path Ruta completa de la imágen que se debe dibujar.
   */
  getImage (path) {
    let image
    for (let i = 0; i < this.images.length; i++) {
      image = this.images[i]
      if (image.src === path) {
        return image
      }
    }
    image = new Image()
    image.src = path
    this.images.push(image)
    return image
  };
}

/**
 * Instancia de Sprites que almacena todas las imagenes
 * utilizadas en una instancia de la clase Game
 */
export default new Sprites()
