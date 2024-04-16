import { MongoClient } from "mongodb";

const uri ="mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.2";;
const client = new MongoClient(uri);
async function main() {

  try {
    const database = client.db("myReplicaSet");
    const maCollection = database.collection('usersCollection'); 
    const result = await maCollection.find({ "age": { "$gt": 30 } });
    const documents = await result.toArray();
    console.log(documents);

    }
    finally {
    console.log('Connexion à MongoDB fermée');
    await client.close();
    
    
  }
}

main();