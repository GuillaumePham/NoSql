## MongoDB Replica Set

### ETAPE 1

Création cluster

```http
  docker network create mongoCluster
```

Lancement du docker

```http
  docker compose up -d
```

Création du jeu de replica

```http
  docker exec -it mongo_instance_1 mongosh --eval "rs.initiate({
 _id: \"myReplicaSet\",
 members: [
   {_id: 0, host: \"mongo1\"},
   {_id: 1, host: \"mongo2\"},
   {_id: 2, host: \"mongo3\"}
 ]
})"
```

Verification du statut de chaque instance :

```http
docker exec -it mongo1 mongosh --eval "rs.status()"
```

Ces derniers 

```http
members: [
    {
      _id: 0,
      name: 'mongo1:27017',
      health: 1,
      state: 1,
      stateStr: 'PRIMARY',
      uptime: 3044,
      optime: { ts: Timestamp({ t: 1713286584, i: 1 }), t: Long('3') },
      optimeDate: ISODate('2024-04-16T16:56:24.000Z'),
      lastAppliedWallTime: ISODate('2024-04-16T16:56:24.457Z'),
      lastDurableWallTime: ISODate('2024-04-16T16:56:24.457Z'),
      syncSourceHost: '',
      syncSourceId: -1,
      infoMessage: '',
      electionTime: Timestamp({ t: 1713283554, i: 1 }),
      electionDate: ISODate('2024-04-16T16:05:54.000Z'),
      configVersion: 1,
      configTerm: 3,
      self: true,
      lastHeartbeatMessage: ''
    },
    {
      _id: 1,
      name: 'mongo2:27017',
      health: 1,
      state: 2,
      stateStr: 'SECONDARY',
      uptime: 3042,
      optime: { ts: Timestamp({ t: 1713286574, i: 1 }), t: Long('3') },
      optimeDurable: { ts: Timestamp({ t: 1713286574, i: 1 }), t: Long('3') },
      optimeDate: ISODate('2024-04-16T16:56:14.000Z'),
      optimeDurableDate: ISODate('2024-04-16T16:56:14.000Z'),
      lastAppliedWallTime: ISODate('2024-04-16T16:56:24.457Z'),
      lastDurableWallTime: ISODate('2024-04-16T16:56:24.457Z'),
      lastHeartbeat: ISODate('2024-04-16T16:56:24.390Z'),
      lastHeartbeatRecv: ISODate('2024-04-16T16:56:24.892Z'),
      pingMs: Long('0'),
      lastHeartbeatMessage: '',
      syncSourceHost: 'mongo1:27017',
      syncSourceId: 0,
      infoMessage: '',
      configVersion: 1,
      configTerm: 3
    },
    {
      _id: 2,
      name: 'mongo3:27017',
      health: 1,
      state: 2,
      stateStr: 'SECONDARY',
      uptime: 3042,
      optime: { ts: Timestamp({ t: 1713286574, i: 1 }), t: Long('3') },
      optimeDurable: { ts: Timestamp({ t: 1713286574, i: 1 }), t: Long('3') },
      optimeDate: ISODate('2024-04-16T16:56:14.000Z'),
      optimeDurableDate: ISODate('2024-04-16T16:56:14.000Z'),
      lastAppliedWallTime: ISODate('2024-04-16T16:56:24.457Z'),
      lastDurableWallTime: ISODate('2024-04-16T16:56:24.457Z'),
      lastHeartbeat: ISODate('2024-04-16T16:56:24.390Z'),
      lastHeartbeatRecv: ISODate('2024-04-16T16:56:24.892Z'),
      pingMs: Long('0'),
      lastHeartbeatMessage: '',
      syncSourceHost: 'mongo1:27017',
      syncSourceId: 0,
      infoMessage: '',
      configVersion: 1,
      configTerm: 3
    }
  ],
  ok: 1,
  '$clusterTime': {
    clusterTime: Timestamp({ t: 1713286584, i: 1 }),
    signature: {
      hash: Binary.createFromBase64('AAAAAAAAAAAAAAAAAAAAAAAAAAA=', 0),
      keyId: Long('0')
    }
  },
  operationTime: Timestamp({ t: 1713286584, i: 1 })
```

### ETAPE DEUX

Installation de faker:

```http
npm install @faker-js/faker --save-dev
```

Génération de fausses données avec faker avec le code ci-dessous :

```http
import faker from 'faker';
import {writeFile} from 'fs';

const users = [];
for (let i = 0; i < 99; i++) {
    
    const user = { 
        name: faker.name.findName(),
        age: Math.floor(Math.random() * (90 - 18 + 1)) + 18,
        email: faker.internet.email(),
        createdAt: faker.date.past()
        } ;
    users.push(user);
}
const jsonData = JSON.stringify(users, null, 2);    
    writeFile('users.json',jsonData, (err) => {
        if (err) {
            throw err;
        }
    }); 
```

Insertion dans l'instance mongo 1 des données générées par faker :

```http
docker exec -i mongo1 mongoimport --db myReplicaSet --collection usersCollection --drop --jsonArray < c:\Users\PHAM\Desktop\Docker\users.json
```


### ETAPE TROIS

Accées au cli :

```http
docker exec -it mongo1 mongosh
```

DataBase ciblée :

```http
use myReplicaSet
```


Insertion de données :

```http
db.userCollection.insertOne({"name": "Guillaume Pham","age": 21,"email": "guillaume.pham@ynov.com","createdAt": "2023-05-07T15:11:49.439Z" })
```

Résultat :

```http
{
	"acknowledged" : true,
	"insertedId" : ObjectId("661eb241901a3c398d7b2da9")
}
```

Affichage des trentenaires :

```http
db.usersCollection.find({ "age": { "$gt": 30 } })
```

Résultat :

```http
{
    _id: ObjectId('660d598d018c2fc1b9eb2a6c'),
    name: 'Cameron Cummings',
    age: 84,
    email: 'Vincenzo.Smith26@hotmail.com',
    createdAt: '2023-08-27T01:37:11.119Z'
  },
  {
    _id: ObjectId('660d598d018c2fc1b9eb2a6d'),
    name: 'Julia Borer Sr.',
    age: 78,
    email: 'Ellie_Kutch88@hotmail.com',
    createdAt: '2023-10-28T07:03:17.276Z'
  },
  {
    _id: ObjectId('660d598d018c2fc1b9eb2a6e'),
    name: 'Glenda Hammes',
    age: 54,
    email: 'Vance83@yahoo.com',
    createdAt: '2023-07-12T02:04:10.171Z'
  },
  {
    _id: ObjectId('660d598d018c2fc1b9eb2a6f'),
    name: 'Melinda Jones',
    age: 64,
    email: 'Gust.Grant94@hotmail.com',
    createdAt: '2023-07-23T14:54:43.673Z'
  },
  {
    _id: ObjectId('660d598d018c2fc1b9eb2a70'),
    name: 'Brett Haley',
    age: 35,
    email: 'Sammy.Schiller96@gmail.com',
    createdAt: '2023-05-07T04:09:11.236Z'
  },
  {
    _id: ObjectId('660d598d018c2fc1b9eb2a71'),
    name: 'Kristie Frami',
    age: 73,
    email: 'Delmer62@yahoo.com',
    createdAt: '2023-04-29T22:42:53.322Z'
  },
  {
    _id: ObjectId('660d598d018c2fc1b9eb2a72'),
    name: 'Kent Romaguera',
    age: 79,
    email: 'Jaida.Greenfelder68@yahoo.com',
    createdAt: '2023-05-16T08:41:13.200Z'
  },
  {
    _id: ObjectId('660d598d018c2fc1b9eb2a73'),
    name: 'Marjorie Mante',
    age: 63,
    email: 'Luis.Jacobs@gmail.com',
    createdAt: '2023-06-08T17:49:11.551Z'
  },
  {
    _id: ObjectId('660d598d018c2fc1b9eb2a74'),
    name: 'Brendan Moen',
    age: 75,
    email: 'Bianka6@hotmail.com',
    createdAt: '2024-02-03T16:20:37.761Z'
  },
  {
    _id: ObjectId('660d598d018c2fc1b9eb2a75'),
    name: 'Brian Shields',
    age: 42,
    email: 'Bulah_Labadie@gmail.com',
    createdAt: '2023-08-12T21:53:30.110Z'
  },
  {
    _id: ObjectId('660d598d018c2fc1b9eb2a76'),
    name: 'Gregg Lind',
    age: 82,
    email: 'Garry_Carter76@hotmail.com',
    createdAt: '2023-07-03T09:59:35.816Z'
  },
  {
    _id: ObjectId('660d598d018c2fc1b9eb2a77'),
    name: 'Lauren Stiedemann',
    age: 61,
    email: 'Levi85@yahoo.com',
    createdAt: '2023-08-08T15:51:26.944Z'
  },
  {
    _id: ObjectId('660d598d018c2fc1b9eb2a78'),
    name: 'Dewey Adams',
    age: 48,
    email: 'Quentin_McKenzie@gmail.com',
    createdAt: '2023-04-15T01:11:06.717Z'
  },
  {
    _id: ObjectId('660d598d018c2fc1b9eb2a79'),
    name: 'Ivan Boyer',
    age: 71,
    email: 'Edward91@yahoo.com',
    createdAt: '2024-03-31T23:43:39.268Z'
  },
  {
    _id: ObjectId('660d598d018c2fc1b9eb2a7a'),
    name: "Diana O'Kon",
    age: 55,
    email: 'Bradford_Tillman@gmail.com',
    createdAt: '2023-12-19T00:28:28.941Z'
  },
  {
    _id: ObjectId('660d598d018c2fc1b9eb2a7b'),
    name: 'Russell Sanford',
    age: 54,
    email: 'Forest11@hotmail.com',
    createdAt: '2023-08-17T21:45:56.456Z'
  },
  {
    _id: ObjectId('660d598d018c2fc1b9eb2a7c'),
    name: 'Carmen Connelly',
    age: 47,
    email: 'Moshe.Hermiston62@yahoo.com',
    createdAt: '2023-05-18T06:47:49.221Z'
  },
  {
    _id: ObjectId('660d598d018c2fc1b9eb2a7d'),
    name: 'Christopher Ferry',
    age: 58,
    email: 'Kiley.Hammes46@gmail.com',
    createdAt: '2023-11-21T11:44:35.769Z'
  },
  {
    _id: ObjectId('660d598d018c2fc1b9eb2a7e'),
    name: 'Ana Bogisich',
    age: 41,
    email: 'Chauncey32@gmail.com',
    createdAt: '2023-11-02T14:04:29.894Z'
  },
  {
    _id: ObjectId('660d598d018c2fc1b9eb2a7f'),
    name: 'Sheri Keebler',
    age: 92,
    email: 'Mikayla.Rice@gmail.com',
    createdAt: '2023-05-16T22:15:51.133Z'
  }
]
Type "it" for more
```

Augmentation d'une données :

```http
db.usersCollection.updateMany({}, { "$inc": { "age": 5 } })
```

Résultat

```http
{ 
  "acknowledged" : true, "matchedCount" : 100, "modifiedCount" : 100 
}
```

Suppression de données :

```http
db.usersCollection.deleteOne({ "name": "Guillaume Pham" })
```

Résultat :

```http
{ "acknowledged" : true, "deletedCount" : 1 }
```




 
 
