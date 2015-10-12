/**
 * Un Alien representa una nave enemiga que quiere invadir la Tierra.
 * @param {Object} x	Posición actual en el eje X.
 * @param {Object} y	Posición actual en el eje Y.
 * @param {Object} game	Apuntador al objeto Game que contiene al Alien.
 */
function Alien(x, y, game, row) {
	Entity.call(this, x, y, 40, 25, [spritesSingleton.getImage("img/alien3a.jpg"), spritesSingleton.getImage("img/alien3b.jpg")], 300);
	switch (row) {
		case 0:
			this.setSprites([spritesSingleton.getImage("img/alien1a.jpg"), spritesSingleton.getImage("img/alien1b.jpg")]);
			break;
		case 1:
		case 2:
			this.setSprites([spritesSingleton.getImage("img/alien2a.jpg"), spritesSingleton.getImage("img/alien2b.jpg")]);
			break;
	}
	this.setHorizontalVelocity(-75);
	
	var destroyed;	// Estado actual del Alien.
	this.getGame = function() { return game; };
	this.getDestroyed = function () { return destroyed; };
	this.setDestroyed = function (newDestroyed) { destroyed = newDestroyed; };
	destroyed = 0;
}

// Hereda Entity
Alien.prototype = new Entity();
// Corrige el apuntador del constructor porque apunta a Entity
Alien.prototype.constructor = Alien;

/**
 * Muestra una animación antes de eliminar al Alien de pantalla.
 */
Alien.prototype.destroy = function() {
	this.setSprites([spritesSingleton.getImage("img/explosion.jpg")]);
	this.setCurrentSprite(0);
	this.setDestroyed(50);
};

/**
 * Actualiza la posición de un alienígena en el eje Y
 * y cambia la dirección horizontal de su recorrido.
 */
Alien.prototype.down = function() {
	this.setHorizontalVelocity(-this.getHorizontalVelocity());
	this.setY(this.getY() + 10);
	if (this.getY() > this.getGame().getCanvas().height - this.getGame().getListOfEntities()[0].getHeight()) {
		this.getGame().notify(-1);
	}
};

/**
 * Controla el movimiento de la nave alienígena utilizando el tiempo delta.
 * @param {Object} delta	Tiempo transcurrido en milisegundos desde el último movimiento.
 */
Alien.prototype.move = function(delta) {
	if ((this.getHorizontalVelocity() < 0 && this.getX() < 10) ||
		(this.getHorizontalVelocity() > 0 && this.getX() > this.getGame().getCanvas().width - (this.getWidth() + 10))) {
		this.getGame().setDownAliens(true);
	}
	Entity.prototype.move.call(this, delta);
	if (this.getDestroyed() > 0) {
		this.setDestroyed(this.getDestroyed() - delta);
		if (this.getDestroyed() <= 0) {
			this.getGame().deleteEntity(this);
		}
	}
};