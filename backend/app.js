const express = require('express')
const app = express()
const cors = require('cors')
/* const path = require('path') */
const dotenv = require('dotenv') /* Dotenv permet de travailler avec des variables d'environnement */
const mysql = require('mysql2')

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
app.use((res, req, next) => {
    if(connection.state === 'disconnected'){
      return respond(null, { status: 'fail', message: 'server down'});
    }}) 
