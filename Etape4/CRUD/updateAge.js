// Importation de MongoClient depuis le module mongodb
import { MongoClient } from "mongodb";

// Définition de l'URI de connexion MongoDB
const uri ="mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.2";

// Création d'une nouvelle instance de MongoClient avec l'URI de connexion
const client = new MongoClient(uri);

// Fonction asynchrone principale
async function main() {
  try {
    // Connexion au client MongoDB
    await client.connect();

    // Sélection de la base de données 'myReplicaSet'
    const database = client.db("myReplicaSet");

    // Sélection de la collection 'usersCollection' dans la base de données
    const maCollection = database.collection('usersCollection');

    // Mise à jour de plusieurs user dans la collection
    const result = await maCollection.updateMany({}, { "$inc": { "age": 5 } });

    // Affichage du nombre de user modifiés
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
  } 
  // Gestion des erreurs avec 'catch'
  catch (error) {
    console.error("An error occurred:", error);
  } 
  // Enfin, dans tous les cas, on ferme la connexion au client MongoDB
  finally {
    console.log('Connexion à MongoDB fermée');
    await client.close();
  }
}

// Appel de la fonction principale 'main', en cas d'erreur, afficher l'erreur dans la console
main().catch(console.dir);