// Importation du module MongoClient à partir de "mongodb"
import { MongoClient } from "mongodb";

// Définition de l'URI de connexion à MongoDB
const uri = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.2";

// Création d'une nouvelle instance MongoClient avec l'URI de connexion
const client = new MongoClient(uri);

// Définition d'une fonction asynchrone principale
async function main() {
    try {
        // Connexion à la base de données "myReplicaSet"
        const database = client.db("myReplicaSet");

        // Accès à la collection "usersCollection" dans la base de données
        const maCollection = database.collection('usersCollection');

        // Recherche des documents ayant un champ 'age' supérieur à 30
        const result = await maCollection.find({ age: { $gt: 30 } });

        // Conversion du résultat en tableau pour manipulation
        const documents = await result.toArray();

        // Affichage des documents trouvés
        console.log(documents);
    } finally {
        // Fermeture de la connexion à MongoDB une fois l'opération terminée
        console.log('Connexion à MongoDB fermée');
        await client.close(); // Attendez que la connexion se ferme correctement
    }
}

// Appel de la fonction principale 'main' pour exécuter le script
main();
