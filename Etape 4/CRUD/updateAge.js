
import { MongoClient } from "mongodb";

const uri ="mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.2";;
const client = new MongoClient(uri);
async function main() {

  try {
    const database = client.db("myReplicaSet");
    const maCollection = database.collection('usersCollection'); 
    const result = await maCollection.updateMany({}, { "$inc": { "age": 5 } });
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
    }
    finally {
    console.log('Connexion à MongoDB fermée');
    await client.close();
    
    
  }
}

main().catch(console.dir);