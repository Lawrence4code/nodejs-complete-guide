const Sequelize = require('sequelize'); // importing the construction from sequelize library

// creating new instance of Sequelize and defining configuration setting
const sequelize = new Sequelize('node-complete-guide', 'root', 'Testing123', {
  dialect: 'mysql',
  host: 'localhost',
  operatorsAliases: false
});

module.exports = sequelize;
