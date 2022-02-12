
# Groupomania Social Network

ps: Commentaires de code et annotations toujours en cours + quelques optimisations probables

## Preface
Ceci est le repository du projet 7 de ma formation de Developpeur Web chez OpenClassrooms.

C'est un projet Etudiant, probablement voué a être optimisé a chaque fois que j'y reviendrais. Il as été mon projet le plus instructif tant sur le plan technique, que le plan personnel.



## Intro
Ce projet est un reseau social d'entrprise. C'est une application Web mono-page permettant aux utilisateur de créer un comptes, partger dees publications avec ou sans images, de les commentés. La fonction "Like" et "Dislike" est également de la partie.
Elle utilise des bases de données SQL et est composé d'une API maison. Plus de details dans la section **Informations**

## Installation
 
### Pré-requis
Ce projet necessite que vous possédiez a minima, **"Node Package Manager" (NPM)**, **"Vue 3"** et **"Express"**. Pour plus d'informations sur les dependances, rendez-vous dans la section **"Information"**

### Installation 
Telechargez ou clonez le repo. Ouvrez un terminal.

#### backend

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

- Enfin, lancez le serveur (port serveur Backend par defaut => 3000) :
```bash
nodemon server
```


- il sera possible d'ici dimanche 13/02/22 d'executer une commande pour remplir les BDD de fausses données)


#### Frontend

-Toujours dans le terminal, placez vous dans le dossier "*/frontend*" et executez :
```bash
npm install
```
- Puis lancez le serveur frontend (port serveur Backend par defaut => 8080) :
```bash
npm run serve
```

Voila !

L'adresse de l'application par default est => http://localhost:8080/home



## Utilisation

L'application **necessite** que l'utilisateur soit connécté, et donc qu'il ai préalablement créer un compte. Sans cela l'accés a l'application est impossible.

#### Creation de compte
Necessite Un email, un mot de passe (7 lettres minimum) et un nom/surnom.

### "Layouts"
Toute l'application beneficie d'une barre de naviguation (navbar) ainsi qu'un footer.

#### Navbar 
La Navbar contient un logo de l'entreprise qui est egalement un lien vers la page "/home". Ainsi que les liens vers le "/profil", l'accueil. **SI** L'utilisateur est un Administrateur, il y a aussi le liens pour acceder au dashboard Administrateur.

#### Footer 
Le Footer contient un "mail:to" permettant a l'utilisateur de contacter via email l'entreprise. Un boutton "haut de page" permettant de remonter facilement tout en haut de la page, ainsi qu'un lien vers une page "/about"
#### Home ('*/home*' ou '*/*')
La page d'accueil contient un formulaire pour créer une publication, ainsi que la liste des 20 dernieres publications.

#### Post ('*/post/:id*')
Affiche en detail le contenus d'une publications, tout ces commentaires, un formulaire de publications

#### Profil ('*/profil/:id*')

Affiche les information d'un utilisateur, ou de l'utilisateur connecté, avec toutes les publications associé a cet utilisateur. Permet egalement de modifier le nom du profil

#### About ('*/about*')
Contient un petit text (une petite blague en l'occurence. J'espere qu'on peux toujours rire malgré le climat de tension actuel, sinon je suis mal XD)

#### Dashboard Administrateur ('*/admin-dashboard*')
Contient la liste des tout les utilisateurs.

### Role Administrateur
Les utilisateur en BDD ayant la cles 'isAdmin' sur "true" possédent les droit Administrateur.
Cela leurs permets d'avoir toutes les options de modifications. Ils peuvents modifier/supprimer les utilisateurs, publications, et peuvent supprimé les commentaires.


# Il est 5h du matin... Je suis affreusement desolé si vous lisez ceci avant que j'ai pu le terminer.. Je ferait tout pour le terminer avant samedi 17h...
## API 



#### Users

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.


## Remerciement anonyme

 - [Ecrire un bon ReadMe](https://readme.so/fr/editor)

## Authors

- [Christopher Boyer](https://github.com/ChriZoizo)

