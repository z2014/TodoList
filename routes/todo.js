var router = require('koa-router')(),
    Todolist = require('../models/todolist.js'),
    User = require('../models/user.js'),
    qs = require('qs');
router.get('/',function *() {
  const currentUser = this.state.jwtdata;
  const _data = yield Todolist.findAll({
    where: {
      'userid':currentUser.user
    },
    order: [['id','DESC']]
  });
  const _otherUser = yield User.findAll({
    where:{
      name:{
        ne:currentUser.user
      }
    },
    attributes:['id','name']
  });
  const backUser = _otherUser.map(function(item){
    const param = item.dataValues;
    param.follow = 0;
    return param;
  });
  const initialState = {
  	filter: 'show-all',
  	todo: _data,
    user:currentUser,
    otherUser:backUser
  };
  this.body = {
  	data:initialState
  };
});

router.post('/',function *() {
  const param = qs.parse(this.request.body);
  const _data = yield Todolist.create({
    text:param.text,
    completed:0
  });
  if (_data) {
    this.body = {
      data:{
        id:_data.null,
        text:param.text,
        completed:0
      },
      success:true
    };
  } else {
    this.body = {
      data:{},
      success:false
    };
  }
});

router.put('/',function *() {
  const param = qs.parse(this.request.body);
  const _data = yield Todolist.update({
    'completed':true
  },{
    'where': {
      'id': param.id
    }
  });
  if (_data) {
    this.body = {
      success:true
    };
  } else {
    this.body = {
      success:false
    };
  }
});
module.exports = router;