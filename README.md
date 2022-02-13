
# Groupomania Social Network

ps: Commentaires de code et annotations toujours en cours + quelques optimisations probables

- ## Preface
Ceci est le repository du projet 7 de ma formation de Developpeur Web chez OpenClassrooms.

C'est un projet Etudiant, probablement voué a être optimisé a chaque fois que j'y reviendrais. Il as été mon projet le plus instructif tant sur le plan technique, que le plan personnel.



- ## Intro
Ce projet est un reseau social d'entrprise. C'est une application Web mono-page permettant aux utilisateur de créer un comptes, partger dees publications avec ou sans images, de les commentés. La fonction "Like" et "Dislike" est également de la partie.
Elle utilise des bases de données SQL et est composé d'une API maison. Plus de details dans la section **Informations**

- ## Installation
 
### - Pré-requis
Ce projet necessite que vous possédiez a minima, **"Node Package Manager" (NPM)**, **"Vue 3"** et **"Express"**. Pour plus d'informations sur les dependances, rendez-vous dans la section **"Information"**

### - Installation 
Telechargez ou clonez le repo. Ouvrez un terminal.

### backend

- placez vous dans le dossier "*/backend*".
- Créez un fichier *.env* que vous remplirez avec vos informations. Aidez vous avec le fichier *.envExample*

- Puis dans le terminal, installez les modules necessaires au backend avec :

```bash
  npm install
```

- Initialisez les bases de données en executant ces commandes :

```bash
sequelize db:create
sequelize db:migrate
``` 

- Bientot ! :  il sera possible d'executer une commande pour remplir les BDD de fausses données


- Enfin, lancez le serveur :
```bash
nodemon server
```

Le serveur backend repond par defaut a l'adresse http://localhost:3000/. Plus d'information dans la section '*Informations API*'

### Frontend

- Toujours dans le terminal, placez vous dans le dossier "*/frontend*" et executez :
```bash
npm install
```
- Puis lancez le serveur frontend (port serveur Backend par defaut => 8080) :
```bash
npm run serve
```

Voila !

L'adresse par defaut de l'application est http://localhost:8080/



## Informations API 
Informations relative a l'API maison

- #### URL par defaut
```http
http://localhost:3000/
```



- #### Users
URI de base
```http
  /api/user
```

| Methode | Verbe     | URI                | Retour | Description |
| :------ | :-------- | :----------------- | :----- | :---------- |
| Get One User | **GET** | */api/user/:id* | { Objet **'User'** } | Renvoie un **'User'** de la BDD |Authorize
| Get All User | **GET** | */api/user* | { "users" : { Objet **'User'** 1},{ Objet **'User'** 2}} | Renvoie Tout les **'User'** de la BDD |Authorize
| Signup | **POST** | */api/user/signup* | { Objet **'User'** } | Ajoute un **'User'** a la BDD |
| Login | **POST**| */api/user/login* | { "token" : `String`, "userInfos" : { Objet **'User'** }} | Obtention d'un Token **'Authorize'** + de l'objet **'User'** |
| Update User| **PUT** | */api/user/:id* | { Objet **'User'** } |  Modifie un **'User'** dans la BDD ( *:id* = User.id) | Authorize
| Delete User | **DELETE** | */api/user/:id* | { "message" : { Objet **'User'** } } | Supprime un **'User'** de la BDD | Authorize

 - #### Posts
URI de base
```http
  /api/post
```

| Methode | Verbe     | URI                | Retour | Description |
| :------ | :-------- | :----------------- | :----- | :---------- |
| Get One Post | **GET** | */api/post/:id* | { "post" : { Objet **'Post'** }} | Renvoie un **'Post'** de la BDD |Authorize
| Get All Post | **GET** | */api/post* | { "posts" : { Objet **'Post'** 1},{ Objet **'Post'** 2}} | Renvoie Tout les **'Post'** de la BDD |Authorize
| Create Post | **POST** | */api/post/* | { Objet **'Post'** } | Ajoute un **'Post'** a la BDD |Authorize
| Update Post| **PUT** | */api/post/:id* | { Objet **'Post'** } |  Modifie un **'Post'** dans la BDD ( *:id* = Post.id) |Authorize
| Delete Post | **DELETE** | */api/post/:id* | { message : { Objet **'Post'** } } | Supprime un **'Post'** de la BDD | Authorize
| Find By Author Post | **GET** | */api/post/author/:Userid* | { message : { Objet **'Post'** } } | Renvoie tout les **'Post'** d'un **'User'** | Authorize
| Like or Dislike Post | **POST** | */api/post/like/:id* | { message : { Objet **'Post'** } } | Ajoute ou supprime les like et dislike d'un **'Post'** | Authorize

- #### Comments
URI de base
```http
  /api/comment
```

| Methode | Verbe     | URI                | Retour | Description |
| :------ | :-------- | :----------------- | :----- | :---------- |
| Get One Comment | **GET** | */api/comment/:id* | { Objet **'Comment'** } | Renvoie un **'Comment'** de la BDD |
| Get All Comments | **GET** | */api/comment* | { "comments" : { Objet **'Comment'** 1},{ Objet **'Comment'** 2}}  | Renvoie Tout les **'Comment'** de la BDD |
| Create Comment | **POST** | */api/comment* | { Objet **'Comment'** } | Ajoute un **'Comment'** a la BDD |
| Update Comment| **PUT** | */api/comment/:id* | { Objet **'Comment'** } |  Modifie un **'Comment'** dans la BDD ( *:id* = Comment.id) |
| Delete Comment | **DELETE** | */api/comment/:id* | { Objet **'Comment'** } } | Supprime un **'Comment'** de la BDD | 


- #### Body de Requetes (bases)

#### User

```bash
{
"email": String,
"password": String,
"nickname" : String
}
```
#### Post

```bash
{
"UserId": Number,
"content": String,
 + FILE (optionnal)
}

Pour les likes/dislikes :
{
"PostId" : Number,
"UserId" : Number,
"value" : Number
}
```
#### Comment

```bash
{
"PostId" : Number,
"UserId" : Number,
"content" : String
}
```
- ## Utilisation

L'application **necessite** que l'utilisateur soit connecté, et donc qu'il ai préalablement créer un compte. Sans cela l'accés a l'application est impossible.

#### - Creation de compte
Necessite Un email, un mot de passe (7 lettres minimum) et un nom/surnom.

#### - Connexion 
Necessite un email present en base de données, ainsi que le mot de passe correspondant.

####  - Creation d'une publication (*'/home'*)
En cliquant sur le bouton 'Ecrire une publication', un formulaire apparait. Il est alors possible d'ecrire un texte (max 500 char.), et d'y joindre une image. Une previsualisation est disponible.

#### - Commenter, liker ou disliker une publication (*'/home'* ou *'/post/:id'*)
Permet de commenter une publication, la liké ou la disliké. En utilisant le formulaire en dessous des cards dans *'/home'*, ou dans la View d'une publication (*'/post/:id'*) en cliquant sur "Commenter !".

Pour liker/disliker une publication, utilisez les icones 'pouces" dans les Cards des publications 

## Infomations Avancée (FrontEnd)

Voici quelques informations sur le front end
### - "Layouts"
Toute l'application beneficie d'une barre de naviguation (navbar) ainsi qu'un footer.

- #### Navbar 
La Navbar contient un logo de l'entreprise qui est egalement un lien vers la page "/home". Ainsi que les liens vers le "/profil", l'accueil. **SI** L'utilisateur est un Administrateur, il y a aussi le liens pour acceder au dashboard Administrateur.

- #### Footer 
Le Footer contient un "mail:to" permettant a l'utilisateur de contacter via email l'entreprise. Un boutton "haut de page" permettant de remonter facilement tout en haut de la page, ainsi qu'un lien vers une page "/about"
- #### Home ('*/home*' ou '*/*')
La page d'accueil contient un formulaire pour créer une publication, ainsi que la liste des 20 dernieres publications. Affiche un Loader lors du chargement

- #### Post ('*/post/:id*')
Affiche en detail le contenus d'une publications, tout ces commentaires, un formulaire de publications

- #### Profil ('*/profil/:id*')

Affiche les information d'un utilisateur, ou de l'utilisateur connecté, avec toutes les publications associé a cet utilisateur. Permet egalement de modifier le nom du profil. Affiche un Loader lors du chargement


- #### About ('*/about*')
Contient un petit text (une petite blague en l'occurence. J'espere qu'on peux toujours rire malgré le climat de tension actuel, sinon je suis mal XD)

- #### Dashboard Administrateur ('*/admin-dashboard*')
Contient la liste des tout les utilisateurs.


- #### Erreur 404 (*Tout chemin inexistant*)
Une fameuse page, indispensable, et qu'on as pas envie de voir

### - Role Administrateur
Les utilisateur en BDD ayant la cles 'isAdmin' sur "true" possédent les droit Administrateur.
Cela leurs permets d'avoir toutes les options de modifications. Ils peuvents modifier/supprimer les utilisateurs, publications, et peuvent supprimé les commentaires.


## Infomations Avancée generale

- #### Modules utilisé (backend)
| Nom | Description | 
| :-- | :---------- | 
| Express | Framework Backend |
| Sequelize | Module ORM facilite le dialogue avec la BDD | 
| Cors| Resoud les problemes de Cross-origin | 
| Body-parser | Parsing automatique des requetes | 
| Authorize | Gestion des authentifications |
| JsonWebToken | Créer er decrypt les tokens 'User' | 
| Bcrypt | Permet le hashage du password |
| Multer | Gestion des uploads des fichiers images | 
| MySql | Module language BDD | 
| MySql2 | Module language BDD | 
| Dotenv | Permet l'utilisation des variables d'environnements


- #### Modules utilisé (frontend)
| Nom | Description | 
| :-- | :---------- | 
| Vue | Framework Frontend |
| Vue-CLI | Ligne de commande pour VUE |
| Vue-Router | Routeur |
| Axios | Module facilitant le dialogue avec l'API | 
| form-data| Permet la creation de "multipart/form-data" | 
| Vue-Basic-Alert | Permet la creation d'alerte utilisateur (UX)
| es6-Promise | Créer er decrypt les tokens 'User' | 


- ### Technologie Utilisée

Languages : Javascript, HTML, CSS, MySql, JSON

Technologies : Vue, Express, NPM, Node, esLint, SCSS, Sequelize, Axios.


## Remerciement anonyme

 - [OpenClassrooms](https://openclassrooms.com/fr/)
 - [StackOverFlow](https://stackoverflow.com/)
 - [Ecrire un bon ReadMe => readme.so](https://readme.so/fr/editor)
 - [OrelSan, pour m'avoir accompagné tout le long](https://www.youtube.com/watch?v=ZT6IYZor9e8)
 - [ ! Mon mentor Raoul !](https://www.linkedin.com/in/raoul-cipah-9b36b8124?originalSubdomain=cm)
 - VOUS !

## Authors

- [Christopher Boyer](https://github.com/ChriZoizo)

