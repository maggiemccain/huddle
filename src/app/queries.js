const promise = require('bluebird');

// const memberships = require('./memberships.js');
// const users = require('./users.js');
// const churches = require('./js');
// const gatherings = require('./gatherings.js');

const options = {
  // Initialization Options
  promiseLib: promise
};

const pgp = require('pg-promise')(options);
const connectionString = 'postgres://maggiemccain:strumpeT13@localhost:5432/huddle';
// const config = process.env.DATABASE_URL ||  'postgres://someuser:somepassword@somehost:381/sometable'
const db = pgp(connectionString);
// var db = pgp({
//     host: 'localhost',
//     port: 5432,
//     database: 'huddle',
//     user: '',
//     password: ''
// });

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

function getUsersByChurch(req, res, next) { 
  var id = req.params.id;
  db.any('select * from users where church_id = $1', id)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Found church members'
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


// MEMBERSHIP

function getMembershipByGathering(req, res, next) { 
  var id = req.params.id;
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

function getMembersGatherings(req, res, next) { 
  var id = req.params.id;
  db.any('select * from memberships where member_id = $1', id)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          message: 'Member gatherings found.',
          data: data
        });
    })
    .catch(function (err) {
      return next(err);
    });
};

function joinGathering(req, res, next) {
  db.one('insert into memberships (member_id, gathering_id, church_id)' +
      'values(${member_id}, ${gathering_id}, ${church_id}) RETURNING *',
    req.body)
    .then(function (result) {
      res.status(200)
        .json({
          status: 'success',
          message: 'New membership record created.',
          data: result
        });
    })
    .catch(function (err) {
      return next(err);
    });
};

module.exports = {
  getAllUsers: getAllUsers,
  getSingleUser: getSingleUser,
  getUserByEmail: getUserByEmail,
  getUsersByChurch: getUsersByChurch,
  createUser: createUser,
  updateUser: updateUser,
  removeUser: removeUser,
  getAllGatherings: getAllGatherings,
  createGathering: createGathering,
  getAllChurches: getAllChurches,
  getSingleChurch: getSingleChurch,
  getGatheringsByChurch: getGatheringsByChurch,
  createChurch: createChurch,
  updateChurch: updateChurch,
  removeChurch: removeChurch,
  getMembershipByGathering: getMembershipByGathering,
  addMembership: addMembership,
  getMembershipByUser: getMembershipByUser,
  getMembersGatherings: getMembersGatherings,
  joinGathering: joinGathering
};