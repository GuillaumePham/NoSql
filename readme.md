
## MongoDB Replica Set

### ETAPE 1

Création cluster

```shell
  docker network create mongoCluster
```

Lancement du docker

```shell
  docker compose up -d
```

Création du jeu de replica

```shell
  docker exec -it mongo1 mongosh --eval "rs.initiate({
    _id: 'myReplicaSet',
    members: [
        {_id: 0, host: 'mongo1'},
        {_id: 1, host: 'mongo2'},
        {_id: 2, host: 'mongo3'}
    ]
})"
```

Verification du statut de chaque instance :

```shell
docker exec -it mongo1 mongosh --eval "rs.status()"
```

Ces derniers 

```shell
{
  set: 'myReplicaSet',
  date: ISODate('2024-04-17T12:59:40.792Z'),
  myState: 1,
  term: Long('1'),
  syncSourceHost: '',
  syncSourceId: -1,
  heartbeatIntervalMillis: Long('2000'),
  majorityVoteCount: 2,
  writeMajorityCount: 2,
  votingMembersCount: 3,
  writableVotingMembersCount: 3,
  optimes: {
    lastCommittedOpTime: { ts: Timestamp({ t: 1713358780, i: 1 }), t: Long('1') },
    lastCommittedWallTime: ISODate('2024-04-17T12:59:40.062Z'),
    readConcernMajorityOpTime: { ts: Timestamp({ t: 1713358780, i: 1 }), t: Long('1') },
    appliedOpTime: { ts: Timestamp({ t: 1713358780, i: 1 }), t: Long('1') },
    durableOpTime: { ts: Timestamp({ t: 1713358780, i: 1 }), t: Long('1') },
    lastAppliedWallTime: ISODate('2024-04-17T12:59:40.062Z'),
    lastDurableWallTime: ISODate('2024-04-17T12:59:40.062Z')
  },
  lastStableRecoveryTimestamp: Timestamp({ t: 1713358780, i: 1 }),
  electionCandidateMetrics: {
    lastElectionReason: 'electionTimeout',
    lastElectionDate: ISODate('2024-04-17T12:01:49.979Z'),
    electionTerm: Long('1'),
    lastCommittedOpTimeAtElection: { ts: Timestamp({ t: 1713355299, i: 1 }), t: Long('-1') },
    lastSeenOpTimeAtElection: { ts: Timestamp({ t: 1713355299, i: 1 }), t: Long('-1') },
    numVotesNeeded: 2,
    priorityAtElection: 1,
    electionTimeoutMillis: Long('10000'),
    numCatchUpOps: Long('0'),
    newTermStartDate: ISODate('2024-04-17T12:01:50.021Z'),
    wMajorityWriteAvailabilityDate: ISODate('2024-04-17T12:01:50.535Z')
  },
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
  }
```

### ETAPE DEUX

Installation de faker:

```shell
npm install @faker-js/faker --save-dev
```

Génération de fausses données avec faker avec le code ci-dessous :

```shell
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

Insertion dans l'instance mongo 1 des données générées par faker (à faire dans le terminal en bash):

```shell
docker exec -i mongo1 mongoimport --db myReplicaSet --collection usersCollection --drop --jsonArray < "C:\Users\pham\Documents\GitHub\NoSql\Etape2\users.json"
```
la version en sh ce trouve dans le dosier "Etape 2 / Insertion.sh"


### ETAPE TROIS
Chaque commandes demandés sont trouvable dans le dossier 'Etape 3 /requetes' 
Accées au cli :

```shell
docker exec -it mongo1 mongosh
```

DataBase ciblée :

```shell
use myReplicaSet
```


Insertion de données :
```shell
db.userCollection.insertOne({"name": "Guillaume Pham","age": 21,"email": "guillaume.pham@ynov.com","createdAt": "2023-05-07T15:11:49.439Z" })
```

Résultat :

```shell
{
	"acknowledged" : true,
	"insertedId" : ObjectId("661eb241901a3c398d7b2da9")
}
```

Affichage des trentenaires :

```shell
db.usersCollection.find({ "age": { "$gt": 30 } })
```

Résultat :

```shell
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
Type "it" for more
```

Augmentation d'une donnée (age de 5 ans pour chaque personne) :

```shell
db.usersCollection.updateMany({}, { "$inc": { "age": 5 } })
```

Résultat

```shell
{ 
  "acknowledged" : true, "matchedCount" : 100, "modifiedCount" : 100 
}
```

Suppression de données :

```shell
db.usersCollection.deleteOne({ "name": "Guillaume Pham" })
```

Résultat :

```shell
{ "acknowledged" : true, "deletedCount" : 1 }
```


### ETAPE QUATRE

Le code pour automatiser les étapes précédentes se trouve dans le dossier "Etape 4 / CRUD" :
Pour les exécuter il suffit d'utiliser la commande suivante :

```shell
node insert.js
```
ici c'est un exemple avec le fichier insert.js.

Ce dernier "insert.js" permet de se connecter et d'inserer des données dans la base de données (un user) dans ce cas précis.
si c'est un succés, le message suivant s'affiche :

```shell
Connexion réussie au serveur MongoDB
Document inséré avec succès: {
  acknowledged: true,
  insertedId: new ObjectId('661fc91ac1805398b0ecca6b')
}
```

Le deuxieme fichier 'find30.js' permet de trouver des personnes ou informations spécifiques de la base de données :
à l'occurences toutes les personnes de plus de 30 ans.

```shell
{
    _id: new ObjectId('661fbc8c44ef10b01ace1250'),
    name: 'Vernon Flatley',
    age: 38,
    email: 'Pinkie.Prohaska@hotmail.com',
    createdAt: '2023-06-11T07:57:17.706Z'
  },
  {
    _id: new ObjectId('661fbc8c44ef10b01ace1251'),
    name: 'Carl Feil',
    age: 54,
    email: 'Eloisa_Morissette84@gmail.com',
    createdAt: '2023-04-04T17:42:44.804Z'
  },
  {
    _id: new ObjectId('661fbc8c44ef10b01ace1252'),
    name: 'Luisa Koepp',
    age: 31,
    email: '}
``` 
Exemple de résultat.

Le troisième fichier 'update.js' permet de mettre à jour les données de la base de données, plus précisement d'ajouter 5 ans à l'âge de chaque personne pour répondre à la consigne. 

```shell
101 document(s) was/were updated.
Connexion à MongoDB fermée
```
Sortie dans le terminal.

Le quatrième fichier 'delete.js' permet de supprimer un user de la base de données, ici le user est la personne fictive "Guillaume Pham".

```shell
1 document(s) was/were deleted.
Connexion à MongoDB fermée
```
Sortie dans le terminal.
