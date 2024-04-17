// Importation du module 'faker' pour générer des données fictives
import faker from 'faker';

// Importation de la fonction 'writeFile' du module 'fs' (système de fichiers) pour écrire dans un fichier
import { writeFile } from 'fs';

// Tableau vide pour stocker les utilisateurs générés
const users = [];

// Boucle pour générer 99 utilisateurs fictifs
for (let i = 0; i < 99; i++) {
    // Génération des données pour un utilisateur
    const user = { 
        name: faker.name.findName(), // Génère un nom aléatoire
        age: Math.floor(Math.random() * (90 - 18 + 1)) + 18, // Génère un âge aléatoire entre 18 et 90
        email: faker.internet.email(), // Génère une adresse email aléatoire
        createdAt: faker.date.past() // Génère une date passée aléatoire
    };

    // Ajout de l'utilisateur généré au tableau 'users'
    users.push(user);
}

// Convertit le tableau 'users' en format JSON avec une indentation de 2 espaces
const jsonData = JSON.stringify(users, null, 2);

// Écriture des données JSON dans un fichier 'users.json'
writeFile('users.json', jsonData, (err) => {
    if (err) {
        throw err; // En cas d'erreur lors de l'écriture du fichier, une exception est envoyée
    }
});