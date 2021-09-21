# Frameworks et outils

    Front : VueJs

    Back : NodeJs, Express, Sequelize

    BDD : MAMP, MySQL
## Front-End VueJs

1. Installer les dépendances: cd frontend => npm install
2. Lancer le serveur avec "npm run serve"

## Back-End API Rest

1. Installer les dépendances: cd backend => npm install
2. Lancer le serveur avec "nodemon"

### Conexion à la BDD SQL
1. Instaler et exécuter MAMP
2. Depuis un terminal accéder au dossier MySQL (Ex: "C:\MAMP\bin\mysql\bin")
3. Utiliser la commande "mysql -u root -p" pour lancé MySQL (MDP : root)
4. Créer la base de donnée avec la commande "Create database database_development_projet7;"
5. Selectionner la BDD avec "USE database_development_projet7;"
6. Depuis le backend utiliser la commande "sequelize db:migrate" pour créer les tables

### Utilisateur admin
Apres la création du 1er utilisateur, faire la commande "UPDATE users SET admin=1 WHERE id=1;" dans la BDD SQL.