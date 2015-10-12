/**
 * Un Sprites representa un almacén de imágenes para los objetos Entity del juego.
 * Sólo puede existir un objeto Sprites por instancia de la clase Game.
 */
function Sprites() {
	var images;		// Arreglo de todas las imagenes que utilizan los objetos Entity del juego.
	
	this.getImages = function() { return images; };
	
	images = [];
}

/**
 * Devuelve la imágen correspondiente a la ruta en el parámetro path.
 * @param {Object} path		Ruta completa de la imágen que se debe dibujar.
 */
Sprites.prototype.getImage = function(path) {
	var image;
	for (var i = 0; i < this.getImages().lenght; i++) {
		image = this.getImages()[i];
		if (image.src == path) {
			return image;
		}
	}
	image = new Image();
	image.src = path;
	this.getImages().push(image);
	return image;
};

/**
 * Instancia de Sprites que almacena todas las imagenes
 * utilizadas en una instancia de la clase Game
 */
var spritesSingleton = new Sprites();