var router = require('koa-router')(),
    User = require('../models/user.js'),
    md5 = require('md5'),
    qs = require('qs'),
    jwt = require('koa-jwt');
router.post('/',function *() {
	const param = qs.parse(this.request.body);
	const user = yield User.create({
	  pwd:param.pwd,
	  name:param.user,
	  followers:0,
	  following:0
	});
	var _data;
  if (user) {
  	const token = jwt.sign({
      id:user.null,
      user:param.user,
      followers:0,
      following:0
    },config.secret, {expiresIn: '3h'});
    _data = {
      token: token,
      expires: 3,
      domain: config.host
    };
  	this.body = {
  		success:true,
  		data:_data
  	};
  } else {
  	this.body = {
  		success:false
  	};
  }
});
router.put('/',function *(){
	const user = qs.parse(this.request.body);
	const users = yield User.findAll({
		attributes:['name']
	});
	for (var i = 0; i < users.length; i++) {
		if (users[i].dataValues.name === user.user) {
			this.body = {
				data:'该用户名已被注册'
			};
			break;
		} else {
			this.body = {
				data:'该用户名可用'
			};
		}
	}
});
module.exports = router;