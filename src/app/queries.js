const promise = require('bluebird');

const options = {
  // Initialization Options
  promiseLib: promise
};

const pgp = require('pg-promise')(options);
const connectionString = 'postgres://username:PWORD#@localhost:5432/huddle';
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

function getAllGatherings(req, res, next) {
  db.any('select * from gatherings')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success', 
          data: data,
          message: 'Retrieved ALL gatherings'
        });
    })
    .catch(function (err) {
      return next(err);
    });
};

function createGathering(req, res, next) {
  db.result('insert into users (title, latitude, longitude)' +
      'values(${title}, ${latitude}, ${longitude})',
    req.body)
    .then(function (result) {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one gathering',
          data: result
        });
    })
    .catch(function (err) {
      return next(err);
    });
};

// CHURCHES

function getAllChurches(req, res, next) {
  db.any('select * from churches')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success', 
          data: data,
          message: 'Retrieved ALL Churches'
        });
    })
    .catch(function (err) {
      return next(err);
    });
};

function getSingleChurch(req, res, next) { 
  var churchId = parseInt(req.params.id);
  db.one('select * from churches where id = $1', churchId)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE church'
        });
    })
    .catch(function (err) {
      return next(err);
    });
};

function createChurch(req, res, next) {
  // req.body.phone = parseInt(req.body.phone);
  db.result('insert into churches (name, adminFirstName, adminLastName, adminEmail, street, city, state, zip, latitude, longitude)' +
      'values(${name}, ${adminFirstName}, ${adminLastName}, ${adminEmail}, ${street}, ${city}, ${state}, ${zip}, ${latitude}, ${longitude}) RETURNING id',
    req.body)
    .then(function (result) {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one Church',
          data: result
        });
    })
    .catch(function (err) {
      return next(err);
    });
};

function updateChurch(req, res, next) {
  db.none('update churches set name=$1, adminFirstName=$2, adminLastName=$3, adminEmail=$4, street=$5, city=$6, state=$7, zip=$8, latitude=$9, longitude=$10 where id=$11',
    [req.body.name, 
    req.body.adminFirstName, 
    req.body.adminLastName,
    req.body.adminEmail,
    req.body.street,
    req.body.city,
    req.body.state,
    req.body.zip,
    req.body.latitude,
    req.body.longitude,
     parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated church'
        });
    })
    .catch(function (err) {
      return next(err);
    });
};

function removeChurch(req, res, next) {
  var churchId = parseInt(req.params.id);
  db.result('delete from users where id = $1', churchId)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} church`
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
  removeUser: removeUser,
  getAllGatherings: getAllGatherings,
  createGathering: createGathering,
  getAllChurches: getAllChurches,
  getSingleChurch: getSingleChurch,
  createChurch: createChurch,
  updateChurch: updateChurch,
  removeChurch: removeChurch,
};