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
  db.one('insert into gatherings (title, location, street, city, state, zip, latitude, longitude, schedule, church_id, leader_id)' +
      'values(${title}, ${location}, ${street}, ${city}, ${state}, ${zip}, ${latitude}, ${longitude}, ${schedule}, ${church_id}, ${leader_id}) RETURNING *',
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

function getGatheringsByChurch(req, res, next) {
  db.any('select * from gatherings where church_id = $1', req.params.id)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success', 
          data: data,
          message: 'Retrieved ALL gatherings by church'
        });
    })
    .catch(function (err) {
      return next(err);
    });
};


module.exports = {
  getAllGatherings: getAllGatherings,
  createGathering: createGathering,
  getGatheringsByChurch: getGatheringsByChurch
};