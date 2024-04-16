import { MongoClient } from 'mongodb';


const url = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.2';


const dbName = 'myReplicaSet'; 

const maCollection = 'usersCollection'; 

async function main() {
    const client = new MongoClient(url);

    try {
        
        await client.connect();
        console.log('Connexion réussie au serveur MongoDB');
        
        
        
        const db = client.db("");

        
        const documents = await db.collection('maCollection').find({}).toArray();
        
        
        console.log('Documents récupérés de la collection', maCollection + ':');
        //console.log(documents);
    } catch (error) {
        console.error('Erreur lors de la connexion à MongoDB:', error);
    } finally {
          const client = new MongoClient(url);
          try {
            const user = {
                name: "Orianne Monrouzies",
                age: 20,
                email: "YAYA",
                createdAt: "2024-12-24T08:46:01.145Z"
              };
              await client.connect();
              console.log('Connexion réussie au serveur MongoDB');
              const db = client.db(dbName);
              const result = await db.collection('maCollection').insertOne(user);
              console.log('Document inséré avec succès:', result.insertedId);
          } catch (error) {
              console.error('Erreur lors de la connexion à MongoDB:', error);
          } finally {
              await client.close();
              console.log('Connexion à MongoDB fermée');
          }
      }
      
        await client.close();
        console.log('Connexion à MongoDB fermée');
    }


main();