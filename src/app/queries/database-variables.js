const promise = require('bluebird');
const options = {
  // Initialization Options
  promiseLib: promise
};

const username = ''
const password = ''

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

module.export = {
	db: db
}