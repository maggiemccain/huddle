// const promise = require('bluebird');
// const variables = require('./database-variables.js');
// const options = {
//   // Initialization Options
//   promiseLib: promise
// };

// const pgp = require('pg-promise')(options);
// const connectionString = 'postgres://' + variables.username + ':' + variables.password + '@localhost:5432/huddle';
// // const config = process.env.DATABASE_URL ||  'postgres://someuser:somepassword@somehost:381/sometable'
// const db = pgp(connectionString);
// // var db = pgp({
// //     host: 'localhost',
// //     port: 5432,
// //     database: 'huddle',
// //     user: '',
// //     password: ''
// // });
const db = require('./database-variables.js');

function getAllUsers(req, res, next) {
  db.any('select * from users')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success', 
          data: data,
          message: 'Retrieved ALL Users'
        });
    })
    .catch(function (err) {
      return next(err);
    });
};

function getSingleUser(req, res, next) { 
  var userId = parseInt(req.params.id);
  db.one('select * from users where id = $1', userId)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE user'
        });
    })
    .catch(function (err) {
      return next(err);
    });
};

function getUserByEmail(req, res, next) { 
  var email = req.params.email;
  db.any('select * from users where email = $1', email)
    .then(function (data) {
      if (data.length === 0) {
        res.status(200)
          .json({
            status: 'success',
            message: 'No user found'
          });
      } else {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'One user found'
          });
      }
      // handle outlier scenarios
    })
    .catch(function (err) {
      return next(err);
    });
};

function createUser(req, res, next) {
  db.result('insert into users (firstName, lastName, email)' +
      'values(${firstname}, ${lastname}, ${email})',
    req.body)
    .then(function (result) {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one User',
          data: result
        });
    })
    .catch(function (err) {
      return next(err);
    });
};

function updateUser(req, res, next) {
  db.one('update users set firstName=$1, lastName=$2, email=$3, phone=$4 where id=$5 RETURNING *',
    [req.body.firstname, req.body.lastname, req.body.email, parseInt(req.body.phone),
     parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated User'
        });
    })
    .catch(function (err) {
      return next(err);
    });
};

function removeUser(req, res, next) {
  var userId = parseInt(req.params.id);
  db.result('delete from users where id = $1', userId)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} User`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
};

module.exports = {
  getAllUsers: getAllUsers,
  getSingleUser: getSingleUser,
  getUserByEmail: getUserByEmail,
  createUser: createUser,
  updateUser: updateUser,
  removeUser: removeUser
};