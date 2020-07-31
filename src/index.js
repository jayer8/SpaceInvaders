import Game from './components/Game'

/**
 * Muestra un mensaje en la página web.
 * @param {string}  text    Mensaje a mostrar
 * @param {boolean} newLine Si es true inserta un nuevo salto de línea antes del mensaje.
 */
function log (text, newLine) {
  var layer = document.getElementById('log')
  if (newLine) {
    layer.innerHTML += '<br />' + text
  } else {
    layer.innerHTML = text
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // Inicia una nueva instancia de la clase Game, enlaza los eventos del teclado
  // y pinta el escenario cada 25 milisegundos.
  const game = new Game('context')
  document.addEventListener('keydown', function (event) {
    game.keyPress(event)
  })
  document.addEventListener('keyup', function (event) {
    game.keyUp(event)
  })
  const timer = setInterval(function () { game.launch() }, 25)

  const button = document.getElementById('stop')
  button.addEventListener('click', function () {
    // Detiene la ejecución del juego.
    clearInterval(timer)
  })
})
