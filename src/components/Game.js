import Alien from './Alien/Alien'
import Shot from './Shot/Shot'
import Spaceshift from './Spaceshift/Spaceshift'

/**
 * Gestiona la lógica del juego, prepara el contexto gráfico y se encarga de
 * leer los eventos del teclado para controlar la nave del jugador.
 */
export default class Game {
  /**
   * Gestiona la lógica del juego, prepara el contexto gráfico y se encarga de
   * leer los eventos del teclado para controlar la nave del jugador.
   * @param {string} idCanvas Lienzo donde dibujar el juego.
   */
  constructor (idCanvas) {
    this.canvas = document.getElementById(idCanvas)
    this.canvas.width = 800
    this.canvas.height = 600
    this.canvas.style.backgroundColor = 'black'
    this.canvas.style.position = 'absolute'
    this.div = document.createElement('div')
    this.div.style.display = 'none'
    this.div.style.width = '800px'
    this.div.style.top = this.canvas.offsetTop
    this.div.style.left = this.canvas.offsetLeft
    this.div.style.width = this.canvas.width
    this.div.style.height = this.canvas.height
    this.div.style.position = 'absolute'
    this.div.style.textAlign = 'center'
    this.div.style.color = 'yellow'
    this.div.style.fontSize = 'x-large'
    document.body.appendChild(this.div)
    this.downAliens = false
    this.elapsedTime = 0
    this.enable = false
    this.gameOver = false
    this.interval = 1000
    this.lastShot = 0
    this.leftKeyPressed = false
    this.lifes = 2
    this.listOfEntities = []
    this.listOfEntitiesDestroyed = []
    this.rightKeyPressed = false
    this.score = 0
    this.spaceKeyPressed = false
    this.speed = 300
    this.initialize()
  }

  /**
   * Agrega una entidad existente a la lista de entidades destruidas.
   * @param {Entity} entity Entidad destruida
   */
  deleteEntity (entity) {
    this.listOfEntitiesDestroyed.push(entity)
  }

  /**
   * Establece todas las propiedades de la clase a su valor inicial.
   */
  initialize () {
    this.listOfEntities.push(new Spaceshift(370, 550, this))
    this.remainingAliens = 0
    for (let row = 0; row < 5; row++) {
      for (let column = 0; column < 12; column++) {
        this.listOfEntities.push(new Alien(100 + column * 50, 50 + row * 30, this, row))
        this.remainingAliens++
      }
    }
  }

  /**
   * Notifica a la instancia de Game cuando una tecla ha sido pulsada.
   * @param {Object} e Tecla pulsada
   */
  keyPress (e) {
    e.preventDefault()
    if (this.gameOver && e.key === 'Enter') {
      this.start()
    } else if (e.key === ' ' || e.key === 'Spacebar') {
      this.spaceKeyPressed = true
    } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
      this.leftKeyPressed = true
    } else if (e.key === 'ArrowRight' || e.key === 'Right') {
      this.rightKeyPressed = true
    }
  }

  /**
   * Notifica a la instancia de Game cuando una tecla ha sido liberada.
   * @param {Object} e Tecla liberada
   */
  keyUp (e) {
    e.preventDefault()
    if (e.key === ' ' || e.key === 'Spacebar') {
      this.spaceKeyPressed = false
    } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
      this.leftKeyPressed = false
    } else if (e.key === 'ArrowRight' || e.key === 'Right') {
      this.rightKeyPressed = false
    }
  }

  /**
   * Inicia la ejecución del juego.
   */
  launch () {
    if (this.enable) {
      this.run()
    } else {
      this.elapsedTime = new Date().getTime()
      this.enable = true
    }
  }

  /**
   * Muestra un mensaje en pantalla.
   * @param {number} status Tipo de notificación a mostrar,
   * un valor menor a cero representa un mensaje de derrota.
   * Un valor mayor a uno representa un mensaje de victoria.
   */
  notify (status) {
    switch (status) {
      case -1:
        this.lifes--
        if (this.lifes > 0) {
          this.div.innerHTML = 'No te preocupes, a&uacute;n quedan naves en el hangar para seguir luchando.<br />Presiona ENTER para atacarlos.'
        } else {
          this.div.innerHTML = 'La Tierra ha sido destruida tras una invasi&oacute;n alien&iacute;gena.<br />Presiona ENTER para intentarlo de nuevo.'
        }
        break
      case 1:
        this.div.innerHTML = '&iexcl;Felicidades! De momento seguimos vivos, pero se acercan nuevos enemigos.<br />Presiona ENTER para atacarlos.'
        break
    }
    this.gameOver = true
  }

  /**
   * Notifica que un Alien ha sido alcanzado por un disparo del jugador.
   */
  notifyAlienDestroyed () {
    this.remainingAliens--
    this.score += 10
    if (this.remainingAliens === 0) {
      this.notify(1)
    } else {
      for (let i = 1; i < this.listOfEntities.length; i++) {
        if (this.listOfEntities[i] instanceof Alien) {
          this.listOfEntities[i].verticalVelocity *= 1.05
        }
      }
    }
  }

  /**
   * Ciclo principal del juego.
   */
  run () {
    if (this.enable) {
      const delta = new Date().getTime() - this.elapsedTime
      this.elapsedTime = new Date().getTime()
      this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height)
      if (!this.gameOver) {
        for (let i = 0; i < this.listOfEntities.length; i++) {
          this.listOfEntities[i].move(delta)
        }
      }
      for (let i = 0; i < this.listOfEntities.length; i++) {
        this.listOfEntities[i].draw(this.canvas.getContext('2d'))
      }
      if (!this.gameOver) {
        for (let i = 0; i < this.listOfEntities.length - 1; i++) {
          for (let j = i + 1; j < this.listOfEntities.length; j++) {
            if (this.listOfEntities[i].isCrashed(this.listOfEntities[j])) {
              if (!(this.listOfEntities[i] instanceof Alien)) {
                this.listOfEntities[i].crashedWith(this.listOfEntities[j])
              }
              if (!(this.listOfEntities[j] instanceof Alien)) {
                this.listOfEntities[j].crashedWith(this.listOfEntities[i])
              }
            }
          }
        }
      }
      for (let i = 0; i < this.listOfEntitiesDestroyed.length; i++) {
        for (let j = 0; j < this.listOfEntities.length; j++) {
          if (this.listOfEntitiesDestroyed[i] === this.listOfEntities[j]) {
            this.listOfEntities.splice(j, 1)
            break
          }
        }
      }
      this.listOfEntitiesDestroyed.length = 0
      if (this.downAliens) {
        for (let i = 1; i < this.listOfEntities.length; i++) {
          if (this.listOfEntities[i] instanceof Alien) {
            this.listOfEntities[i].down()
          }
        }
        this.downAliens = false
      }
      if (this.gameOver) {
        this.div.style.display = 'block'
      } else {
        this.div.style.display = 'none'
      }
      this.canvas.getContext('2d').fillStyle = 'yellow'
      this.canvas.getContext('2d').font = 'bold 20px monospace'
      this.canvas.getContext('2d').fillText(this.score + ' Puntos', 20, 30)
      this.canvas.getContext('2d').fillText(this.lifes + ' Vidas', this.canvas.width - 110, 30)
      this.listOfEntities[0].horizontalVelocity = 0
      if (this.leftKeyPressed && !this.rightKeyPressed) {
        this.listOfEntities[0].horizontalVelocity = -this.speed
      } else if (!this.leftKeyPressed && this.rightKeyPressed) {
        this.listOfEntities[0].horizontalVelocity = this.speed
      }
      if (this.spaceKeyPressed) {
        this.shoot()
      }
    }
  }

  /**
   * Establece todas las propiedades de la clase a su valor inicial para iniciar una nueva partida.
   */
  start () {
    this.listOfEntities.length = 0
    this.listOfEntitiesDestroyed.length = 0
    this.initialize()
    this.leftKeyPressed = false
    this.rightKeyPressed = false
    this.spaceKeyPressed = false
    this.elapsedTime = new Date().getTime()
    this.gameOver = false
    if (this.lifes <= 0) {
      this.lifes = 2
      this.score = 0
    }
  }

  /**
   * La nave del jugador intenta disparar si ha pasado el tiempo suficiente.
   */
  shoot () {
    if (this.gameOver) {
      return
    }
    const time = new Date().getTime()
    if (time - this.lastShot < this.interval) {
      return
    }
    this.lastShot = time
    this.listOfEntities.push(new Shot(this.listOfEntities[0].x + 19, this.listOfEntities[0].y, this))
  }
}
