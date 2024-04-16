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



