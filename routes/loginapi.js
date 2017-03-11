var router = require('koa-router')(),
    User = require('../models/user.js'),
    md5 = require('md5'),
    qs = require('qs'),
    jwt = require('koa-jwt');

router.post('/',function *(next) {
  const param = qs.parse(this.request.body);
  console.log(param);
  const username = param.user;
  const pwd = param.pwd;
  var _errInfo = '请输入正确密码';
  var _data;
  var data = yield User.findAll({
  	where: {
  	  name:username,
  	  pwd: pwd
  	}
  });
  // console.log('data',data);
  if (data) {
    const token = jwt.sign({
      user:username,
      pwd:pwd
    },config.secret, {expiresIn: '3h'});

    _data = {
      token: token,
      expires: 3,
      domain: config.host
    };

    _errInfo = false;
  }
  
  this.body = {
    data: _errInfo || _data,
  	success: _errInfo ? 'false' : 'true'
  };
});
module.exports = router;