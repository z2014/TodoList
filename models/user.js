const Sequelize = require('sequelize');
var db = require('../db.js');
var User = db.define('user',{
  id: {
  	type:Sequelize.INTEGER,
  	primaryKey:true,
  	unique:true
  },
  pwd:Sequelize.STRING(10),
  name:Sequelize.STRING(10),
  followers:Sequelize.INTEGER,
  following:Sequelize.INTEGER
},{
  timestamps:false,
  freezeTableName:true
});

module.exports = User;