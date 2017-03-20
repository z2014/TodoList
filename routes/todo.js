var router = require('koa-router')(),
    Todolist = require('../models/todolist.js'),
    User = require('../models/user.js'),
    Follow = require('../models/follow.js'),
    qs = require('qs');
router.get('/',function *() {
  const userid = this.state.jwtdata.id;
  const currentUser = yield User.findOne({
    where:{
      'id':userid
    },
    attributes:['id','followers','following']
  });
  const _data = yield Todolist.findAll({
    where: {
      'userid':userid
    },
    order: [['id','DESC']]
  });
  const userData = yield Follow.findAll({
    where:{
      followers:userid
    },
    attributes:['following']
  });
  var shiftArr = [];
  for (var i = 0; i < userData.length; i++) {
    shiftArr.push(userData[i].dataValues.following);
  }
  shiftArr.push(userid);
  const _otherUser = yield User.findAll({
    where:{
      id:{
        not:shiftArr
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
  const currentUser = this.state.jwtdata;
  const _data = yield Todolist.create({
    text:param.text,
    completed:0,
    userid:currentUser.id
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