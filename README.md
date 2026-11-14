```markdown
# FindDevs

FindDevs est une API REST destinée aux développeurs.Composée de plusieurs endpoints, Elle permet de créer un profil, de consulter d'autres développeurs et de gérer des demandes de connexion entre utilisateurs.

L'objectif de l'application est de créer une plateforme de mise en relation entre développeurs, similaire à un réseau social professionnel.

---

## Sommaire

- [Objectif du projet](#objectif-du-projet)
- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Architecture du projet](#architecture-du-projet)
- [Installation](#installation)
- [Configuration de MongoDB](#configuration-de-mongodb)
- [Lancement du projet](#lancement-du-projet)
- [Authentification JWT](#authentification-jwt)
- [Routes de l'API](#routes-de-lapi)
- [Modèles de données](#modèles-de-données)
- [Validation et sécurité](#validation-et-sécurité)
- [Étapes réalisées](#étapes-réalisées)
- [Améliorations possibles](#améliorations-possibles)

---

## Objectif du projet

FindDevs a pour but de permettre aux développeurs de :

- créer un compte personnel ;
- gérer leurs informations professionnelles ;
- consulter les profils disponibles ;
- envoyer des demandes de connexion ;
- accepter ou rejeter des demandes ;
- consulter leurs connexions ;
- découvrir d'autres développeurs grâce au feed.

L'application est construite sous la forme d'une API backend avec Node.js, Express et MongoDB.

---

## Fonctionnalités

### Gestion des utilisateurs

- Inscription d'un nouvel utilisateur.
- Validation des informations saisies.
- Vérification de l'adresse email.
- Validation de la force du mot de passe.
- Hachage du mot de passe avec `bcrypt`.
- Connexion et déconnexion.
- Suppression d'un utilisateur.
- Consultation du feed des utilisateurs.

### Authentification

- Authentification avec JSON Web Token.
- Stockage du JWT dans un cookie.
- Middleware d'authentification pour protéger les routes privées.
- Vérification de l'utilisateur connecté avant chaque opération protégée.
- Expiration du token après une durée définie.

### Gestion du profil

- Consultation du profil connecté.
- Modification des informations du profil.
- Gestion du nom, de l'email, de l'âge, du genre, de la photo et de la description.

### Gestion des connexions

- Envoi d'une demande de connexion.
- Ignorer un utilisateur.
- Acceptation d'une demande.
- Rejet d'une demande.
- Consultation des connexions acceptées.
- Consultation des demandes reçues.

---

## Technologies utilisées

| Technologie | Utilisation |
|---|---|
| Node.js | Environnement d'exécution JavaScript |
| Express.js | Création du serveur et des routes HTTP |
| MongoDB | Base de données NoSQL |
| Mongoose | Connexion et interaction avec MongoDB |
| bcrypt | Hachage et vérification des mots de passe |
| jsonwebtoken | Création et vérification des JWT |
| cookie-parser | Lecture et gestion des cookies |
| validator | Validation des emails et des mots de passe |
| Nodemon | Redémarrage automatique en développement |

---

## Architecture du projet

```text
devTinder/
│
├── src/
│   ├── app.js
│   │
│   ├── config/
│   │   └── database.js
│   │
│   ├── middlewares/
│   │   └── auth.js
│   │
│   ├── models/
│   │   ├── user.js
│   │   └── connectionRequest.js
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   ├── profile.js
│   │   ├── request.js
│   │   └── user.js
│   │
│   └── utils/
│       └── validation.js
│
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

### Description des dossiers

#### `src/app.js`

Fichier principal de l'application. Il permet de :

- créer le serveur Express ;
- activer les middlewares globaux ;
- activer `express.json()` ;
- activer `cookie-parser` ;
- connecter les différentes routes ;
- établir la connexion avec MongoDB ;
- démarrer le serveur sur le port `3000`.

#### `src/config/database.js`

Contient la fonction permettant de connecter l'application à MongoDB grâce à Mongoose.

#### `src/middlewares/auth.js`

Contient le middleware `userAuth`, utilisé pour vérifier le JWT présent dans les cookies et authentifier l'utilisateur.

#### `src/models/`

Contient les schémas Mongoose :

- le modèle `User` ;
- le modèle `ConnectionRequest`.

#### `src/routes/`

Contient les différentes routes de l'API :

- authentification ;
- profil ;
- utilisateurs ;
- demandes de connexion.

#### `src/utils/validation.js`

Contient les fonctions de validation des données utilisateurs.

---

## Installation

### Prérequis

Avant de lancer le projet, il faut installer :

- Node.js ;
- npm ;
- MongoDB ou un cluster MongoDB Atlas.

Pour vérifier l'installation :

```bash
node --version
npm --version
```

### Installation des dépendances

Depuis la racine du projet, exécuter :

```bash
npm install
```

Cette commande installe toutes les dépendances présentes dans le fichier `package.json`.

---

## Configuration de MongoDB

La connexion à MongoDB est définie dans le fichier :

```text
src/config/database.js
```

L'application utilise Mongoose pour se connecter à la base de données.

La base utilisée par le projet est :

```text
devTinder
```

### Recommandation

Pour des raisons de sécurité, l'URI MongoDB ne devrait pas être écrite directement dans le code source.

Il est recommandé d'utiliser un fichier `.env` :

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/devTinder
JWT_SECRET=une-cle-secrete-tres-longue
PORT=3000
```

Puis de récupérer ces valeurs dans le code avec `process.env`.

---

## Lancement du projet

### Mode production

```bash
npm start
```

Cette commande lance :

```text
node src/app.js
```

### Mode développement

```bash
npm run dev
```

Cette commande utilise Nodemon afin de redémarrer automatiquement le serveur à chaque modification.

Une fois le serveur lancé, l'API est disponible à l'adresse :

```text
http://localhost:3000
```

---

# Authentification JWT

L'application utilise JSON Web Token afin de sécuriser les routes privées.

## Fonctionnement général

Le processus d'authentification est le suivant :

1. L'utilisateur crée un compte avec `/signup`.
2. Le mot de passe est haché avec `bcrypt`.
3. L'utilisateur se connecte avec `/login`.
4. Le serveur recherche l'utilisateur dans MongoDB.
5. Le mot de passe fourni est comparé au mot de passe haché.
6. Si les informations sont correctes, un JWT est généré.
7. Le JWT est enregistré dans un cookie nommé `token`.
8. Lorsqu'une route protégée est appelée, le middleware lit ce cookie.
9. Le middleware vérifie le token avec `jwt.verify`.
10. L'identifiant contenu dans le token permet de retrouver l'utilisateur.
11. L'utilisateur est ajouté à l'objet `request` avec `req.user`.
12. La route peut alors utiliser les informations de l'utilisateur connecté.

## Génération du JWT

Le token est généré dans le modèle utilisateur.

Il contient l'identifiant de l'utilisateur :

```js
{
  _id: user.id
}
```

Le token possède une durée de validité d'un jour.

## Middleware `userAuth`

Le middleware d'authentification réalise les opérations suivantes :

- récupération du cookie `token` ;
- vérification de la présence du token ;
- vérification de la signature du JWT ;
- récupération de l'identifiant utilisateur ;
- recherche de l'utilisateur dans MongoDB ;
- ajout de l'utilisateur dans `req.user` ;
- autorisation de l'accès à la route avec `next()`.

Les routes protégées utilisent le middleware de cette manière :

```js
router.get("/profile/view", userAuth, async (req, res) => {
  // Route accessible uniquement aux utilisateurs authentifiés
});
```

## Déconnexion

Lors de la déconnexion, le cookie `token` est expiré. L'utilisateur n'est donc plus authentifié pour les prochaines requêtes.

> Pour un environnement de production, la clé JWT doit être stockée dans une variable d'environnement et ne doit jamais être publiée dans le dépôt.

---

# Routes de l'API

Toutes les requêtes nécessitant une authentification doivent inclure le cookie :

```text
token=<jwt>
```

---

## Routes d'authentification

### Inscription

```http
POST /signup
```

Crée un nouvel utilisateur.

#### Exemple de requête

```json
{
  "firstName": "Amine",
  "lastName": "Ben Ali",
  "emailId": "amine@example.com",
  "password": "Password123!"
}
```

#### Traitement effectué

- vérification du prénom et du nom ;
- validation de l'adresse email ;
- validation de la force du mot de passe ;
- hachage du mot de passe ;
- création de l'utilisateur ;
- sauvegarde dans MongoDB.

---

### Connexion

```http
POST /login
```

Connecte un utilisateur existant.

#### Exemple de requête

```json
{
  "emailId": "amine@example.com",
  "password": "Password123!"
}
```

#### Traitement effectué

- recherche de l'utilisateur avec son email ;
- comparaison du mot de passe avec `bcrypt` ;
- génération du JWT ;
- enregistrement du JWT dans un cookie.

---

### Déconnexion

```http
POST /logout
```

Cette route nécessite une authentification.

Elle expire le cookie contenant le JWT.

---

## Routes du profil

### Consulter son profil

```http
GET /profile/view
```

Cette route nécessite une authentification JWT.

Elle retourne les informations de l'utilisateur connecté.

---

### Modifier son profil

```http
PATCH /profile/edit
```

Cette route nécessite une authentification JWT.

#### Exemple de requête

```json
{
  "firstName": "Nouveau prénom",
  "lastName": "Nouveau nom",
  "age": 25,
  "gender": "male",
  "photoUrl": "https://example.com/photo.jpg",
  "about": "Développeur passionné",
  "skills": ["JavaScript", "Node.js", "MongoDB"]
}
```

Les informations modifiables sont notamment :

- `firstName`
- `lastName`
- `emailId`
- `photoUrl`
- `gender`
- `age`
- `about`
- `skills`

---

## Routes des utilisateurs

### Consulter les connexions

```http
GET /user/connections
```

Cette route nécessite une authentification JWT.

Elle retourne les demandes dont le statut est :

```text
accepted
```

---

### Consulter les demandes reçues

```http
GET /user/requests
```

Cette route nécessite une authentification JWT.

Elle retourne les demandes reçues dont le statut est :

```text
interested
```

---

### Consulter le feed

```http
GET /feed
```

Retourne les profils utilisateurs disponibles dans la base de données.

---

### Supprimer un utilisateur

```http
DELETE /user/:id
```

Supprime un utilisateur à partir de son identifiant MongoDB.

Exemple :

```http
DELETE /user/665c1234567890abcdef1234
```

---

## Routes des demandes de connexion

### Envoyer une demande de connexion

```http
POST /request/send/:status/:toUserid
```

Cette route nécessite une authentification JWT.

Les statuts acceptés sont :

```text
interested
ignored
```

#### Exemple

```http
POST /request/send/interested/665c1234567890abcdef1234
```

#### Vérifications effectuées

- le statut doit être valide ;
- l'utilisateur destinataire doit exister ;
- une demande identique ne doit pas déjà exister ;
- une demande inverse ne doit pas déjà exister ;
- un utilisateur ne peut pas s'envoyer une demande à lui-même.

---

### Traiter une demande reçue

```http
POST /request/review/:status/:requestId
```

Cette route nécessite une authentification JWT.

Les statuts acceptés sont :

```text
accepted
rejected
```

#### Exemple

```http
POST /request/review/accepted/665c1234567890abcdef1234
```

La demande doit :

- exister ;
- appartenir à l'utilisateur connecté ;
- avoir actuellement le statut `interested`.

---

# Modèles de données

## Modèle `User`

Le modèle utilisateur contient les champs suivants :

| Champ | Type | Description |
|---|---|---|
| `firstName` | String | Prénom de l'utilisateur |
| `lastName` | String | Nom de l'utilisateur |
| `emailId` | String | Adresse email unique |
| `password` | String | Mot de passe haché |
| `age` | Number | Âge de l'utilisateur |
| `gender` | String | Genre de l'utilisateur |
| `photoUrl` | String | URL de la photo de profil |
| `about` | String | Description de l'utilisateur |
| `Skills` | Array | Liste des compétences |
| `createdAt` | Date | Date de création |
| `updatedAt` | Date | Date de modification |

Les champs `createdAt` et `updatedAt` sont générés automatiquement grâce à l'option `timestamps`.

### Valeurs autorisées pour le genre

```text
male
female
```

### Mot de passe

Le mot de passe est haché avant d'être sauvegardé dans MongoDB.

Le mot de passe original n'est jamais stocké en clair.

---

## Modèle `ConnectionRequest`

Le modèle des demandes de connexion contient les champs suivants :

| Champ | Type | Description |
|---|---|---|
| `fromUserid` | ObjectId | Utilisateur qui envoie la demande |
| `toUserid` | ObjectId | Utilisateur qui reçoit la demande |
| `status` | String | Statut de la demande |
| `createdAt` | Date | Date de création |
| `updatedAt` | Date | Date de modification |

### Statuts disponibles

```text
ignored
interested
accepted
rejected
```

### Index MongoDB

Un index composé est défini sur les champs :

```text
fromUserid
toUserid
```

Cet index permet d'améliorer les recherches et de vérifier plus rapidement si une demande existe déjà entre deux utilisateurs.

---

# Validation et sécurité

## Validation des données

La bibliothèque `validator` est utilisée pour :

- vérifier qu'une adresse email est valide ;
- vérifier qu'un mot de passe est suffisamment fort.

Les schémas Mongoose ajoutent également des règles de validation sur certains champs.

## Hachage des mots de passe

Les mots de passe sont hachés avec `bcrypt` avant leur sauvegarde.

Lors de la connexion, le mot de passe saisi est comparé à la valeur hachée enregistrée dans la base de données.

## Protection des routes

Les routes privées utilisent le middleware `userAuth`.

Exemples de routes protégées :

- `/profile/view`
- `/profile/edit`
- `/logout`
- `/user/connections`
- `/user/requests`
- `/request/send/:status/:toUserid`
- `/request/review/:status/:requestId`

## Recommandations pour la production

Pour renforcer la sécurité de l'application, il est recommandé de :

- déplacer la clé JWT dans une variable d'environnement ;
- déplacer l'URI MongoDB dans une variable d'environnement ;
- ne jamais publier de mot de passe ou de secret dans Git ;
- utiliser HTTPS ;
- configurer les cookies avec les options `httpOnly`, `secure` et `sameSite` ;
- ajouter une gestion centralisée des erreurs ;
- ajouter des tests automatisés ;
- ajouter une limitation du nombre de requêtes ;
- ne pas afficher les informations sensibles dans les logs ;
- vérifier les permissions avant les opérations sensibles.

---

# Étapes réalisées

## 1. Initialisation du projet

Le projet FindDevs a été initialisé avec Node.js et npm.

Express a été installé afin de créer le serveur backend et les différentes routes HTTP.

## 2. Mise en place du serveur Express

Le serveur a été créé dans `src/app.js`.

Les middlewares suivants ont été ajoutés :

- `express.json()` pour lire les données JSON ;
- `cookie-parser` pour lire les cookies ;
- les routeurs de l'application.

## 3. Connexion à MongoDB

La connexion à MongoDB a été ajoutée avec Mongoose.

Le serveur démarre uniquement après la réussite de la connexion à la base de données.

## 4. Création du modèle utilisateur

Le schéma `User` a été créé avec Mongoose.

Il contient les informations principales d'un développeur :

- identité ;
- email ;
- mot de passe ;
- âge ;
- genre ;
- photo ;
- description ;
- compétences.

## 5. Création de la route d'inscription

La route `POST /signup` a été ajoutée.

Elle permet :

- de récupérer les données envoyées par le client ;
- de valider les informations ;
- de hacher le mot de passe ;
- de créer un document utilisateur ;
- de sauvegarder l'utilisateur dans MongoDB.

## 6. Ajout de la validation des données

La bibliothèque `validator` a été ajoutée.

Elle permet de vérifier :

- la validité des emails ;
- la force des mots de passe ;
- certaines règles du schéma utilisateur.

## 7. Chiffrement des mots de passe

La bibliothèque `bcrypt` a été utilisée pour protéger les mots de passe.

Le mot de passe est haché avant son enregistrement dans la base de données.

## 8. Création de la route de connexion

La route `POST /login` a été ajoutée.

Elle vérifie :

- l'existence de l'utilisateur ;
- la validité du mot de passe ;
- la correspondance entre le mot de passe saisi et le mot de passe haché.

## 9. Mise en place de JWT

La bibliothèque `jsonwebtoken` a été ajoutée.

Un token JWT est généré après une connexion réussie.

Ce token contient l'identifiant de l'utilisateur et possède une durée d'expiration.

## 10. Stockage du JWT dans un cookie

Le token JWT est placé dans un cookie nommé `token`.

Ce cookie est ensuite utilisé lors des requêtes vers les routes protégées.

## 11. Création du middleware d'authentification

Le middleware `userAuth` a été créé.

Il vérifie le token et récupère l'utilisateur connecté.

L'utilisateur authentifié est ensuite disponible dans :

```js
req.user
```

## 12. Protection des routes

Le middleware JWT a été appliqué aux routes nécessitant une authentification.

Cela empêche un utilisateur non connecté d'accéder aux fonctionnalités privées.

## 13. Création de la déconnexion

La route `POST /logout` a été ajoutée.

Elle expire le cookie contenant le token JWT.

## 14. Création de la gestion du profil

Les routes suivantes ont été ajoutées :

```text
GET /profile/view
PATCH /profile/edit
```

Elles permettent de consulter et de modifier les informations de l'utilisateur connecté.

## 15. Création du modèle de demande de connexion

Le modèle `ConnectionRequest` a été créé.

Il permet de relier deux utilisateurs et de suivre le statut de leur demande.

## 16. Envoi des demandes de connexion

La route suivante a été ajoutée :

```text
POST /request/send/:status/:toUserid
```

Des contrôles empêchent les doublons, les demandes inverses et les demandes envoyées à soi-même.

## 17. Traitement des demandes reçues

La route suivante a été ajoutée :

```text
POST /request/review/:status/:requestId
```

Elle permet d'accepter ou de rejeter une demande.

## 18. Ajout des connexions et des demandes reçues

Les routes suivantes ont été ajoutées :

```text
GET /user/connections
GET /user/requests
```

Elles permettent de consulter les connexions acceptées et les demandes en attente.

## 19. Ajout du feed

La route suivante a été ajoutée :

```text
GET /feed
```

Elle permet de récupérer les utilisateurs présents dans la base.

## 20. Ajout de la suppression d'un utilisateur

La route suivante a été ajoutée :

```text
DELETE /user/:id
```

Elle permet de supprimer un utilisateur à partir de son identifiant.

## 21. Ajout d'un index MongoDB

Un index composé a été ajouté sur :

```text
fromUserid
toUserid
```

Cet index améliore les recherches de demandes de connexion entre deux utilisateurs.

---

# Scripts disponibles

Les scripts suivants sont disponibles dans `package.json` :

```json
{
  "scripts": {
    "start": "node src/app.js",
    "dev": "nodemon src/app.js"
  }
}
```

Utilisation :

```bash
npm start
```

ou :

```bash
npm run dev
```

---

# État actuel du projet

Le backend dispose actuellement des fonctionnalités principales suivantes :

- serveur Express opérationnel ;
- connexion à MongoDB ;
- modèle utilisateur ;
- inscription ;
- validation des données ;
- hachage des mots de passe ;
- connexion ;
- authentification JWT ;
- middleware d'authentification ;
- déconnexion ;
- gestion du profil ;
- demandes de connexion ;
- acceptation et rejet des demandes ;
- consultation des connexions ;
- consultation des demandes reçues ;
- feed des utilisateurs ;
- suppression d'un utilisateur.

Le projet constitue une base fonctionnelle pour une plateforme de mise en relation entre développeurs.

---

# Améliorations possibles

Les prochaines évolutions possibles sont :

- créer un fichier `.env` pour les variables sensibles ;
- utiliser `JWT_SECRET` au lieu d'une clé écrite dans le code ;
- sécuriser les cookies avec `httpOnly` et `secure` ;
- ajouter une route de récupération de mot de passe ;
- ajouter une pagination du feed ;
- empêcher l'utilisateur connecté d'apparaître dans son propre feed ;
- améliorer les messages d'erreur ;
- ajouter une gestion globale des erreurs ;
- ajouter des tests unitaires ;
- ajouter des tests d'intégration ;
- documenter l'API avec Swagger ;
- ajouter une interface frontend ;
- ajouter un système de recherche par compétence ;
- ajouter un système de filtrage par technologie ;
- ajouter une messagerie entre développeurs ;
- déployer l'API sur une plateforme cloud.

---




#FIND DEVS APIS

##AUTH ROUTER
- POST /signup
- POST /login
- POST /logout



##profile ROUTER 
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password  //forgot password api

##Connection Router
-POST /sendConnectionRequest/interested/:userId
-POST /sendConnectionRequest/ignore/:userId
-POST /receiveConnectionRequest/accepted/:userId
-POST /receiveConnectionRequest/rejected/:userId



#Connection request Router
POST /request/send/:status/:userId




STATUS of connectionRequest: ignored, interested, accepted, rejected
![alt text](image.png)

##user connection ROUTER
GET /connections
GET /requests/received
GET /feed 
//gives you the profiles of all the users 
![alt text](image-2.png)
![alt text](image-3.png)
![alt text](image-4.png)
![alt text](image-5.png)

![alt text](image-6.png)

Plus il y a d'index, plus les lectures sont rapides, mais plus les écritures sont coûteuses.

![alt text](image-7.png)
![alt text](image-8.png)
![alt text](image-9.png)
![alt text](image-10.png)
