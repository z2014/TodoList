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
		const _removalCurUser = yield User.update({
			'following':--currentUser.following
		},{
			'where':{
				'id':currentUser.id
		  }
		});
		const data = yield User.findOne({
	  	where: {
	  	  id:param.id
	  	},
	    attributes: ['id','followers','following']
	  });
		const _removalUser = yield User.update({
			'followers':--data.followers
		},{
			'where':{
				'id':param.id
			}
		});
		//创建和更新失败
		if (_removal && (_removalCurUser.length === 1) && (_removalUser.length === 1)) {
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
    const _updateCurUser = yield User.update({
			'following':++currentUser.following
		},{
			'where':{
				'id':currentUser.id
		  }
		});
		const data = yield User.findOne({
	  	where: {
	  	  id:param.id
	  	},
	    attributes: ['id','followers','following']
	  });
		const _updateUser = yield User.update({
			'followers':++data.followers
		},{
			'where':{
				'id':param.id
			}
		});
		//创建和更新成功
		if (_create && (_updateCurUser.length === 1) && (_updateUser.length === 1)) {
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