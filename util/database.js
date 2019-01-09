const mongodb = require('mongodb');

// create a constuctor for creating database
const MongoClient = mongodb.MongoClient;

// _ tells this variable is local // create to store to the connection so that we dont have to connect to client for every crud operation
let _db;

// creating method so that its executed when express server runs
const mongoConnect = callback => {
  // connnecting to the mongodb client with intended user and password // which returns a promise // ** shop is the data cluster its connected to and override if needed
  MongoClient.connect(
    'mongodb+srv://Lawrence:3UlOwoxqMIoVr2Ae@node-complete-guide-ky2xn.mongodb.net/shop?retryWrites=true',
    { useNewUrlParser: true }
  )
    .then(client => {
      console.log('connected to mongoDB database');
      _db = client.db(); // storing the connect to _db variable
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err; // the error when connection fails
    });
};

const getDB = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found for the connection';
};

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;

// mongodb+srv://Lawrence:@node-complete-guide-ky2xn.mongodb.net/admin
