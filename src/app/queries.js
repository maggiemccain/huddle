const promise = require('bluebird');

const options = {
  // Initialization Options
  promiseLib: promise
};

const pgp = require('pg-promise')(options);
const connectionString = 'postgres://USERNAME:PWORD#@localhost:5432/huddle';
// const config = process.env.DATABASE_URL ||  'postgres://someuser:somepassword@somehost:381/sometable'
const db = pgp(connectionString);
// var db = pgp({
//     host: 'localhost',
//     port: 5432,
//     database: 'huddle',
//     user: '',
//     password: ''
// });

// add query functions

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

function createUser(req, res, next) {
  req.body.phone = parseInt(req.body.phone);
  db.result('insert into users (firstName, lastName, email, phone)' +
      'values(${firstname}, ${lastname}, ${email}, ${phone})',
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
  db.none('update users set firstName=$1, lastName=$2, email=$3, phone=$4 where id=$5',
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
  createUser: createUser,
  updateUser: updateUser,
  removeUser: removeUser
};