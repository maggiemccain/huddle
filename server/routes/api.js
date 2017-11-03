const express = require('express');
const router = express.Router();

// const API = 'https://jsonplaceholder.typicode.com';

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
router.get('/users/church/:id', db.getUsersByChurch);
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
router.get('/gatherings/church/:id', db.getGatheringsByChurch);
// router.get('/gatherings/:id', db.getSingleGathering);
router.post('/gatherings', db.createGathering);
// router.put('/gatherings/:id', db.updateGathering);
// router.delete('/gatherings/:id', db.removeGathering);

// MEMBERSHIP
router.get('/membership/gathering/:id', db.getMembershipByGathering);
router.get('/membership/member/:id', db.getMembersGatherings);
router.post('/membership', db.joinGathering);

module.exports = router;



