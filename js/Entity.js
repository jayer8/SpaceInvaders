/**
 * Una entidad representa cualquier elemento que puede aparacer en el juego. 
 * @param {Object} x 		Posición actual en el eje X.
 * @param {Object} y		Posición actual en el eje Y.
 * @param {Object} width	Ancho de la entidad.
 * @param {Object} height	Alto de la entidad.
 * @param {Object} color	Color de la entidad.
 * @param {Object} sprites	Lista de imágenes (sprites) que necesita la entidad para dibujarse.
 * @param {Object} interval	Tiempo en milisegundos que deben transcurrir para cambiar al siguiente sprite.
 */
function Entity(x, y, width, height, sprites, interval) {
	var currentSprite,			// Indice de la lista de imágenes que indica cual debe dibujarse actualmente.
		elapsedTime,			// Tiempo transcurrido desde que cambió un sprite.
		horizontalVelocity,		// Velocidad actual en el eje X (pixeles / segundo)
		verticalVelocity;		// Velocidad actual en el eje Y (pixeles / segundo)
		
	
	this.getX = function() { return x; };
	this.setX = function(newX) { x = newX; };
	this.getY = function() { return y; };
	this.setY = function(newY) { y = newY; };
	this.getWidth = function() { return width; };
	this.setWidth = function(newWidth) { width = newWidth; };
	this.getHeight = function() { return height; };
	this.setHeight = function(newHeight) { height = newHeight; };
	this.getSprites = function() { return sprites; };
	this.setSprites = function(newSprites) { sprites = newSprites; };
	this.getInterval = function() { return interval; };
	this.getCurrentSprite = function() { return currentSprite; };
	this.setCurrentSprite = function(newCurrentSprite) { currentSprite = newCurrentSprite; };
	this.getElapsedTime = function() {return elapsedTime; };
	this.setElapsedTime = function(newElapsedTime) { elapsedTime = newElapsedTime; };
	this.getHorizontalVelocity = function() { return horizontalVelocity; };
	this.setHorizontalVelocity = function(newHorizontalVelocity) { horizontalVelocity = newHorizontalVelocity; };
	this.getVerticalVelocity = function() { return verticalVelocity; };
	this.setVerticalVelocity = function(newVerticalVelocity) { verticalVelocity = newVerticalVelocity; };
	
	currentSprite = 0;
	elapsedTime = 0;
	horizontalVelocity = 0;
	verticalVelocity = 0;
}

/**
 * Dibuja la entidad en el contexto gráfico indicado.
 * @param {Object} context	Contexto gráfico (lienzo) donde dibujar.
 */
Entity.prototype.draw = function(context) {
	context.drawImage(this.getSprites()[this.getCurrentSprite()], 
		this.getX(), this.getY(), 
		this.getWidth(), this.getHeight());
	/*
	context.fillStyle = this.getColor();
	context.fillRect(this.getX(), this.getY(), this.getWidth(), this.getHeight());
	*/
};

/**
 * Comprueba si dos entidades estan colisionando.
 * @param {Object} other	Entidad con la que comprobar si hay una colisión. 
 */
Entity.prototype.isCrashed = function(other) {
	if (this.getX() + this.getWidth() < other.getX() || 
		this.getY() + this.getHeight() < other.getY() || 
		this.getX() > other.getX() + other.getWidth() || 
		this.getY() > other.getY() + other.getHeight()) {
			return false;
	}
	return true;		
};

/**
 * Mueve la entidad según el tiempo transcurrido.
 * @param {Object} delta	Tiempo transcurrido en milisegundos.
 */
Entity.prototype.move = function(delta) {
	this.setElapsedTime(this.getElapsedTime() + delta);
	if (this.getElapsedTime() >= this.getInterval()) {
		this.setElapsedTime(0);
		this.setCurrentSprite((this.getCurrentSprite() + 1) % this.getSprites().length);
	}
	this.setX(this.getX() + (delta * this.getHorizontalVelocity()) / 1000);
	this.setY(this.getY() + (delta * this.getVerticalVelocity()) / 1000);
};