import { MongoClient } from "mongodb";

const uri ="mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.2";;
const client = new MongoClient(uri);
async function main() {

  try {
    const database = client.db("myReplicaSet");
    const maCollection = database.collection('usersCollection'); 
    const user = { name: "Guillaume PHAM" };
    const result = await maCollection.deleteOne(user);
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
    }
    finally {
    console.log('Connexion à MongoDB fermée');
    await client.close();
    
    
  }
}

main();