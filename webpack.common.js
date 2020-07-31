const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: require('html-webpack-template'),
      bodyHtmlSnippet: `<canvas id="context"></canvas>
      <ul>
        <li><code>Cursores</code> para mover la nave de izquierda a derecha.</li>
        <li><code>Espacio</code> para disparar.</li>
        <li><code>Entrar</code> para empezar de nuevo cuando finalice la partida.</li>
      </ul>
      <p>Basado en: 
        <a href="http://www.jlabstudio.com/webgl/2011/12/tutorial-canvas-2d-como-hacer-un-juego-en-javascript-1a-parte/">
          Tutorial canvas 2d: Como hacer un juego en javascript 1a parte
        </a>
      </p>
      <button id="stop">Parar</button>
      <div id="log"></div>`,
      scripts: [
        {
          src: 'bundle.js'
        }
      ],
      title: 'Space Invaders'
    }),
    new CleanWebpackPlugin()
  ]
}
