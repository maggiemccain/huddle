const express = require('express');
const router = express.Router();

const API = 'https://jsonplaceholder.typicode.com';

var db = require('../../src/app/queries');

// /* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works !!!');
});

// router.get('/puppies', (req, res) => {
//     res.send('yo yo yo')
// });

// USERS
router.get('/users', db.getAllUsers);
router.get('/users/:id', db.getSingleUser);
router.get('/users/email/:email', db.getUserByEmail);
router.post('/users', db.createUser);
router.put('/users/:id', db.updateUser);
router.delete('/users/:id', db.removeUser);

// CHURCHES
router.get('/churches', db.getAllChurches);
router.get('/churches/:id', db.getSingleChurch);
router.post('/churches', db.createChurch);
router.put('/churches/:id', db.updateChurch);
router.delete('churches/:id', db.removeChurch);

// GATHERINGS
router.get('/gatherings', db.getAllGatherings);
// router.get('/gatherings/:id', db.getSingleGathering);
router.post('/gatherings', db.createGathering);
// router.put('/gatherings/:id', db.updateGathering);
// router.delete('/gatherings/:id', db.removeGathering);

module.exports = router;



