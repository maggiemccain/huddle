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
const db = require('./database-variables.js').db;

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
  db.any('select * from churches where id = $1', churchId)
    .then(function (data) {
      if (data.length === 1) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved ONE church'
          });
      } else if (data.length === 0) {
          res.status(200)
            .json({
              status: 'error',
              message: 'No church found.'
          });
      }
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
  db.one('update churches set name=$1, adminFirstName=$2, adminLastName=$3, adminEmail=$4, street=$5, city=$6, state=$7, zip=$8, latitude=$9, longitude=$10 where id=$11 RETURNING *',
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
    .then((result) => {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated church',
          data: result
        });
    })
    .catch((err) => {
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
  getAllChurches: getAllChurches,
  getSingleChurch: getSingleChurch,
  createChurch: createChurch,
  updateChurch: updateChurch,
  removeChurch: removeChurch
};