const express = require('express');
const router = express.Router();

const API = 'https://jsonplaceholder.typicode.com';

var db = require('../../src/app/queries');

// /* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works !!!');
});

// Get all posts
router.get('/posts', (req, res) => {
  // Get posts from the mock api
  // res.send('on posts page')
});

// router.get('/puppies', (req, res) => {
//     res.send('yo yo yo')
// });
router.get('/users', db.getAllUsers);
router.get('/users/:id', db.getSingleUser);
router.post('/users', db.createUser);
router.put('/users/:id', db.updateUser);
router.delete('/users/:id', db.removeUser);

module.exports = router;



