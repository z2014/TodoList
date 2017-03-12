const Sequelize = require('sequelize');
var db = require('../db.js');
var Todolist = db.define('todolist',{
  id: {
  	type: Sequelize.INTEGER,
  	primaryKey:true,
  	unique:true
  },
  completed:Sequelize.INTEGER,
  text:Sequelize.STRING(20),
  userid:Sequelize.INTEGER
},{
  timestamps:false,
  freezeTableName:true
});
module.exports = Todolist;