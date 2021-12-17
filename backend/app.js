const express = require('express')
const app = express()
const cors = require('cors')
 const path = require('path') 
const dotenv = require('dotenv') /* Dotenv permet de travailler avec des variables d'environnement */
const mysql = require('mysql2')
const bodyParser = require('body-parser')

const Sequelize = require('sequelize')

const sequelize = new Sequelize('groupomaniadb_dev', 'newuser', 'newpassword', {
host: 'localhost',
dialect: 'mysql'
})

sequelize
.authenticate()
.then(()=> {
    console.log('connection etablis')
})
.catch(err => {
    console.error('Problémé de conneciton:', err)
})

console.log(Sequelize.Model)
dotenv.config() /* configuration de "dotenv" pour utiliser des variables d'environnement */

/* Configuration de "cors" pour eviter les erreurs de cross-origin */
var corsOptions = {
    origin: "*" /* A CHANGER QUAND FRONT SERVEUR OK */
}
app.use(cors(corsOptions))

/* Body-parser */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* middleware permettant de verifier l'etats de la connectio au server */
/* app.use((res, req, next) => {
    if(connection.state === 'disconnected'){
      return respond(null, { status: 'fail', message: 'server down'});
    }})  */

/*------------*/
/* Fonction TESTING */

  app.use((req,res, next) => {
     console.log(Date.now())
  next()
}) 
 


/* Fonction test db user */

/*  app.use((req, res) => {
    connection.query('SELECT * from user LIMIT 1', (err, rows) => {
      if (err) throw err
    console.log('The data from user table are: \n', rows) 
      res.status(200).json({ message: 'The data from USER table are: \n', rows}) 
    })
  }) 
 */

/*------------*/

/* POUR TESTER MULTER PLUS TARD: creer un fichier html avec un formuilaire pour up des images */
/* app.use(
    '/images',
    express.static(path.join(__dirname, 'images'))
  )  */



module.exports = app
