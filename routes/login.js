var router = require('koa-router')();

router.get('/', function *(next) {
	yield this.render('login', {
	    title: '备忘录登陆窗口'
	});
});

module.exports = router;