/**
 * Una Spaceshit representa la nave que controla el jugador.
 * @param {Object} x	Posición actual en el eje X.
 * @param {Object} y	Posición actual en el eje Y.
 * @param {Object} game	Apuntador al objeto Game que contiene a la Spaceshift.
 */
function Spaceshift(x, y, game) {
	Entity.call(this, x, y, 40, 25, [spritesSingleton.getImage("img/nave.jpg")], 999999);
	
	this.getGame = function() { return game; };
}

// Hereda Entity
Spaceshift.prototype = new Entity();
// Corrige el apuntador del constructor porque apunta a Entity
Spaceshift.prototype.constructor = Spaceshift;

/**
 * Notifica que la nave del jugador ha colisionado con un Alien.
 * @param {Object} other	Entidad con la que ha colisionado
 */
Spaceshift.prototype.crashedWith = function(other) {
	if (other instanceof Alien) {
		this.getGame().notify(-1);
	}
};

/**
 * Controla el moviemiento de la nave del jugador utilizando el tiempo delta.
 * @param {Object} delta	Tiempo transcurrido en milisegundos desde el último movimiento.
 */
Spaceshift.prototype.move = function(delta) {
	if ((this.getHorizontalVelocity() < 0 && this.getX() < 10) ||
		(this.getHorizontalVelocity() > 0 && this.getX() > this.getGame().getCanvas().width - (this.getWidth() + 10))) {
		return;		
	}
	Entity.prototype.move.call(this, delta);
};