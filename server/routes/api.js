const express = require('express');
const router = express.Router();

// declare axios for making http requests
const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';

var db = require('../../src/app/queries');

// /* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works !!!');
});

// Get all posts
router.get('/posts', (req, res) => {
  // Get posts from the mock api
  // This should ideally be replaced with a service that connects to MongoDB
  axios.get(`${API}/posts`)
    .then(posts => {
      res.status(200).json(posts.data);
    })
    .catch(error => {
      res.status(500).send(error)
    });
  // res.send('on posts page')
});

// router.get('/puppies', (req, res) => {
//     res.send('yo yo yo')
// });
router.get('/puppies', db.getAllPuppies);
// router.get('/api/puppies/:id', db.getSinglePuppy);
// router.post('/api/puppies', db.createPuppy);
// router.put('/api/puppies/:id', db.updatePuppy);
// router.delete('/api/puppies/:id', db.removePuppy);

module.exports = router;



