/**
 * Gestiona la lógica del juego, prepara el contexto gráfico y se encarga de
 * leer los eventos del teclado para controlar la nave del jugador. 
 * @param {Object} idCanvas	Lienzo donde dibujar el juego.
 */
function Game(idCanvas) {
	var canvas,
		div,
		downAliens,
		elapsedTime,
		enable,
		gameOver,
		interval,
		lastShot,
		leftKeyPressed,
		lifes,
		listOfEntities,
		listOfEntitiesDestroyed,
		remainingAliens,
		rightKeyPressed,
		score,
		spaceKeyPressed,
		speed;
		
	this.getCanvas = function() { return canvas; };
	this.getDiv = function() { return div; };
	this.isDownAliens = function() { return downAliens; };
	this.setDownAliens = function(newDownAliens) { downAliens = newDownAliens; };
	this.getElapsedTime = function() { return elapsedTime; };
	this.setElapsedTime = function(newElapsedTime) { elapsedTime = newElapsedTime; };
	this.isEnable = function() { return enable; };
	this.setEnable = function(newEnable) { enable = newEnable; };
	this.isGameOver = function() { return gameOver; };
	this.setGameOver = function(newGameOver) { gameOver = newGameOver; };
	this.getInterval = function() {return interval; };
	this.setInterval = function(newInterval) { interval = newInterval; };
	this.getLastShot = function() { return lastShot; };
	this.setLastShot = function(newLastShot) { lastShot = newLastShot; };
	this.isLeftKeyPressed = function() { return leftKeyPressed; };
	this.setLeftKeyPressed = function(newLeftKeyPressed) { leftKeyPressed = newLeftKeyPressed; };
	this.getLifes = function() { return lifes; };
	this.setLifes = function(newLifes) { lifes = newLifes; };
	this.getListOfEntities = function() { return listOfEntities; };
	this.getListOfEntitiesDestroyed = function() { return listOfEntitiesDestroyed; };
	this.getRemainingAliens = function() { return remainingAliens; };
	this.setRemainingAliens = function(newRemainingAliens) { remainingAliens = newRemainingAliens; };
	this.isRightKeyPressed = function() { return rightKeyPressed; };
	this.setRightKeyPressed = function(newRightKeyPressed) { rightKeyPressed = newRightKeyPressed; };
	this.getScore = function() { return score; };
	this.setScore = function(newScore) { score = newScore; };
	this.isSpaceKeyPressed = function() { return spaceKeyPressed; };
	this.setSpaceKeyPressed = function(newSpaceKyePressed) { spaceKeyPressed = newSpaceKyePressed; };
	this.getSpeed = function() { return speed; };
	this.setSpeed = function(newSpeed) { speed = newSpeed; };
	
	canvas = document.getElementById(idCanvas);
	canvas.width = 800;
	canvas.height = 600;
	canvas.style.backgroundColor = "black";
	div = document.createElement("div");
	div.style.display = "none";
	div.style.position = "absolute";
	div.style.top = canvas.offsetTop;
	div.style.left = canvas.offsetLeft;
	div.style.width = canvas.width;
	div.style.height = canvas.height;
	div.style.paddingTop = "250px";
	div.style.textAlign = "center";
	div.style.color = "yellow";
	div.style.fontSize = "x-large";
	document.body.appendChild(div);
	downAliens = false;
	elapsedTime = 0;
	enable = false;
	gameOver = false;
	interval = 1000;
	lastShot = 0;
	leftKeyPressed = false;
	lifes = 2;
	listOfEntities = [];
	listOfEntitiesDestroyed = [];
	rightKeyPressed = false;
	score = 0;
	spaceKeyPressed = false;
	speed = 300;
	this.initialize();
}

/**
 * Agrega una entidad existente a la lista de entidades destruidas.
 * @param {Object} entity	Entidad destruida
 */
Game.prototype.deleteEntity = function(entity) {
	this.getListOfEntitiesDestroyed().push(entity);
};

/**
 * Establece todas las propiedades de la clase a su valor inicial.
 */
Game.prototype.initialize = function() {
	this.getListOfEntities().push(new Spaceshift(370, 550, this));
	this.setRemainingAliens(0);
	for (var row = 0; row < 5; row++) {
		for (var column = 0; column < 12; column++) {
			this.getListOfEntities().push(new Alien(100 + column * 50, 50 + row * 30, this, row));
			this.setRemainingAliens(this.getRemainingAliens() + 1);
		}
	}
};

/**
 * Notifica a la instancia de Game cuando una tecla ha sido pulsada.
 * @param {Object} e	Tecla pulsada 
 */
Game.prototype.keyPress = function(e) {
	e.preventDefault();
	if (this.isGameOver() && e.keyCode == 13) {
		this.start();
		return;
	}
	else if (e.keyCode == 32) {
		this.setSpaceKeyPressed(true);
	}
	else if (e.keyCode == 37) {
		this.setLeftKeyPressed(true);
	}
	else if (e.keyCode == 39) {
		this.setRightKeyPressed(true);
	}
};

/**
 * Notifica a la instancia de Game cuando una tecla ha sido liberada.
 * @param {Object} e	Tecla liberada 
 */
Game.prototype.keyUp = function(e) {
	e.preventDefault();
	if (e.keyCode == 32) {
		this.setSpaceKeyPressed(false);
	}
	else if (e.keyCode == 37) {
		this.setLeftKeyPressed(false);
	}
	else if (e.keyCode == 39) {
		this.setRightKeyPressed(false);
	}
};

/**
 * Inicia la ejecución del juego.
 */
Game.prototype.launch = function() {
	if (this.isEnable()) {
		this.run();
	}
	else {
		this.setElapsedTime(new Date().getTime());
		this.setEnable(true);
	}
};

/**
 * Muestra un mensaje en pantalla.
 * @param {Object} status	Tipo de notificación a mostrar,	
 * un valor menor a cero representa un mensaje de derrota.
 * Un valor mayor a uno representa un mensaje de victoria.
 */
Game.prototype.notify = function(status) {
	switch (status) {
		case -1:
			this.setLifes(this.getLifes() - 1);
			if (this.getLifes() > 0) {
				this.getDiv().innerHTML = "No te preocupes, a&uacute;n quedan naves en el hangar para seguir luchando.<br />Presiona ENTER para atacarlos.";
			}
			else {
				this.getDiv().innerHTML = "La Tierra ha sido destruida tras una invasi&oacute;n alien&iacute;gena.<br />Presiona ENTER para intentarlo de nuevo.";
			}
			break;
		case 1:
			this.getDiv().innerHTML = "&iexcl;Felicidades! De momento seguimos vivos, pero se acercan nuevos enemigos.<br />Presiona ENTER para atacarlos.";
			break;
	}
	this.setGameOver(true);
};

/**
 *	Notifica que un Alien ha sido alcanzado por un disparo del jugador.
 */
Game.prototype.notifyAlienDestroyed = function() {
	this.setRemainingAliens(this.getRemainingAliens() - 1);
	this.setScore(this.getScore() + 10);
	if (this.getRemainingAliens() == 0) {
		this.notify(1);
	}
	else {
		for (var i = 1; i < this.getListOfEntities().length; i++) {
			if (this.getListOfEntities()[i] instanceof Alien) {
				this.getListOfEntities()[i].setVerticalVelocity(this.getListOfEntities()[i].getVerticalVelocity() * 1.05);
			}
		}
	}
};

/**
 * Ciclo principal del juego. 
 */
Game.prototype.run = function() {
	if (this.isEnable()) {
		var delta = new Date().getTime() - this.getElapsedTime();
		this.setElapsedTime(new Date().getTime());
		this.getCanvas().getContext("2d").clearRect(0, 0, this.getCanvas().width, this.getCanvas().height);
		if (!this.isGameOver()) {
			for (var i = 0; i < this.getListOfEntities().length; i++) {
				this.getListOfEntities()[i].move(delta);
			}
		}
		for (var i = 0; i < this.getListOfEntities().length; i++) {
			this.getListOfEntities()[i].draw(this.getCanvas().getContext("2d"));
		}
		if (!this.isGameOver()) {
			for (var i = 0; i < this.getListOfEntities().length - 1; i++) {
				for (var j = i + 1; j < this.getListOfEntities().length; j++) {
					if (this.getListOfEntities()[i].isCrashed(this.getListOfEntities()[j])) {
						if (!(this.getListOfEntities()[i] instanceof Alien)) {
							this.getListOfEntities()[i].crashedWith(this.getListOfEntities()[j]);
						}
						if (!(this.getListOfEntities()[j] instanceof Alien)) {
							this.getListOfEntities()[j].crashedWith(this.getListOfEntities()[i]);
						}
					}
				}
			}
		}
		for (var i = 0; i < this.getListOfEntitiesDestroyed().length; i++) {
			for (var j = 0; j < this.getListOfEntities().length; j++) {
				if (this.getListOfEntitiesDestroyed()[i] == this.getListOfEntities()[j]) {
					this.getListOfEntities().splice(j, 1);
					break;
				}
			}
		}
		this.getListOfEntitiesDestroyed().length = 0;
		if (this.isDownAliens()) {
			for (var i = 1; i < this.getListOfEntities().length; i++) {
				if (this.getListOfEntities()[i] instanceof Alien) {
					this.getListOfEntities()[i].down();
				}
			}
			this.setDownAliens(false);
		}
		if (this.isGameOver()) {
			this.getDiv().style.display = "block";
		}
		else {
			this.getDiv().style.display = "none";
		}
		this.getCanvas().getContext("2d").fillStyle = "yellow";
		this.getCanvas().getContext("2d").font = "bold 20px monospace";
		this.getCanvas().getContext("2d").fillText(this.getScore() + " Puntos", 20, 30);
		this.getCanvas().getContext("2d").fillText(this.getLifes() + " Vidas", this.getCanvas().width - 110, 30);
		this.getListOfEntities()[0].setHorizontalVelocity(0);
		if (this.isLeftKeyPressed() && !this.isRightKeyPressed()) {
			this.getListOfEntities()[0].setHorizontalVelocity(-this.getSpeed());
		}
		else if (!this.isLeftKeyPressed() && this.isRightKeyPressed()) {
			this.getListOfEntities()[0].setHorizontalVelocity(this.getSpeed());
		}
		if (this.isSpaceKeyPressed()) {
			this.shoot();
		}
	}
};

/**
 * Establece todas las propiedades de la clase a su valor inicial para iniciar una nueva partida.
 */
Game.prototype.start = function() {
	this.getListOfEntities().length = 0;
	this.getListOfEntitiesDestroyed().length = 0;
	this.initialize();
	this.setLeftKeyPressed(false);
	this.setRightKeyPressed(false);
	this.setSpaceKeyPressed(false);
	this.setElapsedTime(new Date().getTime());
	this.setGameOver(false);
	if (this.getLifes() <= 0) {
		this.setLifes(2);
		this.setScore(0);
	}
};

/**
 * La nave del jugador intenta disparar si ha pasado el tiempo suficiente. 
 */
Game.prototype.shoot = function() {
	if (this.isGameOver()) {
		return;
	}
	var time = new Date().getTime();
	if (time - this.getLastShot() < this.getInterval()) {
		return;
	}
	this.setLastShot(time);
	this.getListOfEntities().push(new Shot(this.getListOfEntities()[0].getX() + 19, this.getListOfEntities()[0].getY(), this));
};