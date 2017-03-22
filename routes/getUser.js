var router = require('koa-router')(),
    qs = require('qs'),
    Todolist = require('../models/todolist.js');
router.get('/',function *(){
  const param = qs.parse(this.request.query);
  const _data = yield Todolist.findAll({
  	where:{
  	  'userid':param.id,
  	  'completed':1
  	},
  	attributes:['id','text']
  });
  var data = [];
  for (var i = 0; i < _data.length; i++) {
  	data[i] = _data[i].dataValues;
  }
  this.body = {
  	success:true,
  	data:data
  };
});
module.exports = router;