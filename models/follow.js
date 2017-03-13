const Sequelize = require('sequelize');
var db = require('../db.js');
var Follow = db.define('follow',{
  id: {
  	type: Sequelize.INTEGER,
  	primaryKey:true,
  	unique:true
  },
  followers:Sequelize.INTEGER,
  following:Sequelize.INTEGER,
},{
  timestamps:false,
  freezeTableName:true
});
module.exports = Follow;