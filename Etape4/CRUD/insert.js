// Importation du module MongoClient à partir de 'mongodb'
import { MongoClient } from 'mongodb';

// Définition de l'URL de connexion à MongoDB
const url = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.2';

// Nom de la base de données et de la collection à utiliser
const dbName = 'myReplicaSet';
const maCollection = 'usersCollection';

// Définition de la fonction asynchrone principale
async function main() {
    // Création d'une nouvelle instance MongoClient avec l'URL de connexion
    const client = new MongoClient(url);

    try {
        // Connexion au serveur MongoDB
        await client.connect();
        // console.log('Connexion réussie au serveur MongoDB');

        // Récupération de la base de données spécifiée (ici vide, utilisez dbName)
        const db = client.db("");

        // Récupération de tous les documents de la collection spécifiée (usersCollection)
        const documents = await db.collection(maCollection).find({}).toArray();

        // Affichage des documents récupérés de la collection
        // console.log('Documents récupérés de la collection', maCollection + ':');
        // console.log(documents);

    } catch (error) {
        // Gestion des erreurs lors de la connexion ou de la récupération des documents
        console.error('Erreur lors de la connexion à MongoDB:', error);

    } finally {
        // Bloc de nettoyage et de fermeture de la connexion
        const client = new MongoClient(url);

        try {
            // Connexion au serveur MongoDB à nouveau pour insérer un un user
            await client.connect();
             // Affichage d'un message de connexion réussie
             console.log('Connexion réussie au serveur MongoDB');

            // Définition d'un objet utilisateur à insérer dans la collection
            const user = {
                name: "Guillaume PHAM",
                age: 20,
                email: "YAYA",
                createdAt: "2024-12-24T08:46:01.145Z"
            };


            // Récupération de la base de données spécifiée (dbName) et insertion du document dans la collection
            const db = client.db(dbName);
            const result = await db.collection(maCollection).insertOne(user);

            // Affichage du succès de l'insertion du document
            console.log('Document inséré avec succès:', result);

        } catch (error) {
            // Gestion des erreurs lors de la connexion ou de l'insertion du document
            console.error('Erreur lors de la connexion à MongoDB:', error);

        } finally {
            // Fermeture de la connexion MongoDB à la fin de l'opération
            await client.close();
        }
    }

    // Fermeture de la connexion MongoDB à la fin de l'opération principale
    await client.close();
    console.log('Connexion à MongoDB fermée');
}

// Appel de la fonction principale 'main' pour exécuter le script
main();
