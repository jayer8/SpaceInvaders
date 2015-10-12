/**
 * Un Shot representa un disparo proveniente de la nave que controla el jugador. 
 * @param {Object} x	Posición actual en el eje X.
 * @param {Object} y	Posición actual en el eje Y.
 * @param {Object} game	Apuntador al objeto Game que contiene al Shot.
 */
function Shot(x, y, game) {
	Entity.call(this, x, y, 2, 5, 
		[spritesSingleton.getImage("img/disparoa.jpg"), 
		spritesSingleton.getImage("img/disparob.jpg")], 100);
	this.setVerticalVelocity(-300);
	
	var used;	// Estado actual del Shot
	this.getGame = function() { return game; };
	this.isUsed = function() { return used; };
	this.setUsed = function(newUsed) { used = newUsed; };
	used = false;
}

// Hereda Entity
Shot.prototype = new Entity();
// Corrige el apuntador del constructor porque apunta a Entity
Shot.prototype.constructor = Shot;

/**
 * Destruye el disparo y al Alien con el que ha chocado. 
 * @param {Object} other	Entidad con la que ha chocado el disparo. 
 */
Shot.prototype.crashedWith = function(other) {
	if (!this.isUsed() && other instanceof Alien) {
		this.setUsed(true);
		this.getGame().deleteEntity(this);
		other.destroy();
		//this.getGame().deleteEntity(other);
		this.getGame().notifyAlienDestroyed();
	}
};

/**
 * Controla el movimiento del disparo utilizando el tiempo delta. 
 * @param {Object} delta	Tiempo transcurrido en milisegundos desde el último movimiento.
 */
Shot.prototype.move = function(delta) {
	Entity.prototype.move.call(this, delta);
	if (this.getY() < -100) {
		this.getGame().deleteEntity(this);
	}
};