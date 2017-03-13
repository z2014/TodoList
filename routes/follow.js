var router = require('koa-router')(),
    qs = require('qs'),
    Follow = require('../models/follow.js'),
    User = require('../models/user.js');
router.post('/',function *() {
	const param = qs.parse(this.request.body);
	const currentUser = this.state.jwtdata;
	console.log(param);
	if (param.isFollowing) {
		//取消关注
		const _removal = yield Follow.destroy({
			where:{
				followers:currentUser.id,
				following:param.id
			}
		});
		const _removalUser = yield User.update({
			'following':--currentUser.following
		},{
			'where':{
				'id':currentUser.id
		  }
		});
		//创建和更新失败
		if (_removal && _removalUser.length === 1) {
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
    const _updateUser = yield User.update({
			'following':++currentUser.following
		},{
			'where':{
				'id':currentUser.id
		  }
		});
		//创建和更新成功
		if (_create && (_updateUser.length === 1)) {
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