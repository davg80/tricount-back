# Mise en place d'une API avec Express et Mongoose

Ce projet utilise Express, un framework web pour Node.js, pour simplifier la création de serveurs web robustes et performants. Avec Express, les routes, les requêtes et les réponses HTTP sont gérées facilement, ce qui permet de développer rapidement des API RESTful. Sa simplicité et sa flexibilité en font un choix populaire pour le développement côté serveur dans les applications web.

La base de données utilisée est MongoDB, une base de données NoSQL qui utilise un modèle de données orienté document. MongoDB offre une grande évolutivité, une flexibilité de schéma et une facilité d'intégration avec les applications JavaScript. Étant donné que MongoDB stocke les données au format JSON, cela facilite la manipulation des données pour les applications développées avec des technologies telles que Node.js et Vue.js. C'est donc un choix naturel lors du développement d'applications web.

## Notice d'installation
Pour fonctionner, ce projet a besoin du projet front et back suivant:

Voici [un lien vers mon GitHub](https://github.com/davg80?tab=repositories) pour plus d'informations.
- Url Back : https://github.com/davg80/tricount-back.git
- Url Front: https://github.com/davg80/tricount-front.git

### Installation d'un projet cloné avec Express, MongoDB et Vue.js

1. Assurez-vous d'avoir Node.js installé sur votre système. Vous pouvez le télécharger à partir du site officiel de Node.js.

2. Ouvrez votre terminal et naviguez jusqu'au répertoire où vous souhaitez cloner le projet.

3. Clonez le projet back en utilisant la commande suivante :

```sh
git clone https://github.com/davg80/tricount-back.git
```

4. Naviguez vers le répertoire du projet cloné :

```sh
cd tricount-api
```

5. Installez les dépendances nécessaires en exécutant la commande suivante :

```sh
npm install
```

Cette commande utilisera le gestionnaire de paquets npm pour installer les dépendances du projet, qui sont généralement répertoriées dans le fichier `package.json`.

6. Configurez MongoDB en fonction des besoins du projet. Assurez-vous d'avoir un serveur MongoDB en cours d'exécution et modifiez si nécessaire les paramètres de connexion dans le projet, tels que l'URL de la base de données, le nom de la base de données, etc. Ces informations peuvent se trouver dans le fichier de configuration ou les fichiers d'environnement du projet.

7. Vous pouvez maintenant exécuter le projet en utilisant la commande suivante :

```sh
npm run start 

```

Cette commande démarrera l'application Express.

8.Comme le projet utilise également Vue.js pour le frontend, vous devrez effectuer les étapes d'installation spécifiques à Vue.js. 

9. Clonez le projet front en utilisant la commande suivante :

```sh
git clone https://github.com/davg80/tricount-front.git
```

4. Naviguez vers le répertoire du projet cloné :

```sh
cd tricount-front
```
5. Installez les dépendances nécessaires en exécutant la commande suivante :

```sh
npm install
```

Cela installera les dépendances spécifiques à Vue.js. Ensuite, vous pouvez exécuter le serveur de développement de Vue.js avec la commande :

```sh
npm run serve
```

Vous pourrez accéder à l'interface utilisateur Vue.js dans votre navigateur à l'adresse indiquée dans la sortie du terminal.


- link-front:  http://localhost:5173/


Et voilà ! Vous avez maintenant cloné et installé avec succès le projet. Vous pouvez commencer à tester l'application.

9. Assurez-vous d'avoir un fichier .env dans la racine de votre projet Tricount-api. Si vous ne l'avez pas déjà, créez un nouveau fichier et nommez-le .env.

Dans le fichier .env, définissez une variable d'environnement pour l'URL de connexion et le port qui seront en pièces jointes.