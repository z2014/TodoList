var router = require('koa-router')();
router.get('/',function *(next) {
  const currentUser = this.state.jwtdata;
  yield this.render('index', {
  	title: '备忘录'
  });
});

module.exports = router;