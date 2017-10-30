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

function getMembershipByGathering(req, res, next) { 
  var id = req.params.gathering_id;
  db.any('select * from memberships where gathering_id = $1', id)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          message: 'Membership of gathering found',
          data: data
        });
    })
    .catch(function (err) {
      return next(err);
    });
};

function addMembership(req, res, next) { 
  db.result('insert into memberships (member_id, gathering_id, church_id)' +
      'values(${member_id}, ${gathering_id}, ${church_id})',
    req.body)
    .then(function (result) {
      res.status(200)
        .json({
          status: 'success',
          message: 'Membership added.',
          data: result
        });
    })
    .catch(function (err) {
      return next(err);
    });
};

// function updateMembership(req, res, next) {  FIGURE OUT HOW SOMEONE WILL UPDATE THEIR MEMBERSHIP or just remove
//   var userId = parseInt(req.params.id);
//   db.one('select * from memberships where id = $1', userId)
//     .then(function (data) {
//       res.status(200)
//         .json({
//           status: 'success',
//           data: data,
//           message: 'Retrieved ONE user'
//         });
//     })
//     .catch(function (err) {
//       return next(err);
//     });
// };

function getMembershipByUser(req, res, next) { 
  var id = req.params.gathering_id;
  db.any('select * from memberships where gathering_id = $1', id)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          message: 'Membership of gathering found',
          data: data
        });
    })
    .catch(function (err) {
      return next(err);
    });
};

module.exports = {
  getMembershipByGathering: getMembershipByGathering,
  addMembership: addMembership,
  getMembershipByUser: getMembershipByUser
};