var router = require('koa-router')(),
    qs = require('qs'),
    Follow = require('../models/follow.js'),
    User = require('../models/user.js'),
    io = require('../bin/www');
router.post('/',function *() {
	const param = qs.parse(this.request.body);
	const currentUser = this.state.jwtdata;
	if (param.isFollowing) {
		//取消关注
		const _removal = yield Follow.destroy({
			where:{
				followers:currentUser.id,
				following:param.id
			}
		});
		var _user = yield User.findOne({
			where: {
				id:currentUser.id
			}
		});
		_user.decrement('following');
		var data = yield User.findOne({
		  where: {
		  	id:param.id
		  },
		  attributes: ['id','followers','following']
		});
		data.decrement('followers');
		//创建和更新失败
		if (_removal) {
			this.body = {
		    success:true
			};
		} else {
			this.body = {
				success:false
			};
		}		
	} else {
        const _create = yield Follow.create({
    	  followers:currentUser.id,
    	  following:param.id
        });
        var _user = yield User.findOne({
        	where:{
        		id:currentUser.id
        	}
        });
        _user.increment('following');
	    const data = yield User.findOne({
	  	  where: {
	  	    id:param.id
	  	  },
	      attributes: ['id','followers','following']
	    });
	    data.increment('followers');
		//创建和更新成功
		if (_create) {
			this.body = {
		    success:true
			};
		} else {
			this.body = {
		    success:false
			};
		}
    
	}	
});
module.exports = router;