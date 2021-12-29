/* Importation des modules */
const express = require('express')
const app = express()
const cors = require('cors') /* Module pour resoudre probléme de cross origin */
const path = require('path') /* Module facilitant les operation avec fichiers et chemins */
const dotenv = require('dotenv') /* Module permet d'utiliser des variables d'environnement */
const mysql = require('mysql2') /* module du language de la base de données */
const bodyParser = require('body-parser') /* Module de parser les bodies des requêtes */

const Sequelize = require('sequelize') /* ORM de BDD */
const dbConfig = require('./config/config.json') /* Constante objet JSON contenant les informations de connections a la BDD */

const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')
const commentRoutes = require('./routes/commentRoutes')

dotenv.config() /* configuration de "dotenv" pour utiliser des variables d'environnement */

/* Connection a la base de données en créant une instance 'Sequelize' avex les infos du fichier .ENV ou du fichier config.json */
const sequelize = new Sequelize(
  process.env.DB_CONNECTION_DATABASE || dbConfig.development.database,
  process.env.DB_CONNECTION_USER || dbConfig.development.username,
  process.env.DB_CONNECTION_PASSWORD || dbConfig.development.password,
  {
    host: process.env.DB_CONNECTION_HOST || dbConfig.development.host,
    dialect: 'mysql'
  }
)

/* Connection a la BDD Sequelize */
sequelize
  .authenticate()
  .then(() => {
    console.log('connection etablis')
  })
  .catch(err => {
    console.error('Problémé de conneciton:', err)
  })

/* Configuration de "cors" pour eviter les erreurs de cross-origin */
var corsOptions = {
  origin: '*' /* A CHANGER QUAND FRONT SERVEUR OK */
}
app.use(cors(corsOptions))

/* Body-parser */
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

/*------------*/
/* Fonction TESTING */

/* app.use((req, res, next) => {
  console.log(Date.now())
  next()
}) */

/* Fonction test db user */

/*  app.use((req, res) => {
    connection.query('SELECT * from user LIMIT 1', (err, rows) => {
      if (err) throw err
    console.log('The data from user table are: \n', rows) 
      res.status(200).json({ message: 'The data from USER table are: \n', rows}) 
    })
  }) 
 */

/* POUR TESTER MULTER PLUS TARD: creer un fichier html avec un formuilaire pour up des images */
/* app.use(
    '/images',
    express.static(path.join(__dirname, 'images'))
  )  */
/*------------*/

app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)
app.use('/api/comment', commentRoutes)

module.exports = app
