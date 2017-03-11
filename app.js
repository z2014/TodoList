var app = require('koa')(),
    router = require('koa-router')(),
    logger = require('koa-logger'),
    json = require('koa-json'),
    onerror = require('koa-onerror'),
    jwt = require('koa-jwt');

global.config = require('./config.js');

global.debug = true;

process.env.TZ = 'Asia/Shanghai';

var todo = require('./routes/todo'),
    index = require('./routes/index'),
    loginapi = require('./routes/loginapi'),
    login = require('./routes/login');

var xtpl = require('xtpl/lib/koa');
xtpl(app,{
	views:__dirname + '/views'
});

app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());

app.use(function *(next) {
	try {
		this.set('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');
		if (debug) {
			this.set('Access-Control-Allow-origin','*');
		}else {
			this.set('Access-Control-Allow-origin',config.host);
		}
		yield next;
	} catch (err) {
		if (401 == err.status) {
			this.status = 401;
			console.log('redirect');
			this.redirect('/login');
		} else {
			if (debug) {
				throw err;
			} else {
				this.body = {
					success: 'false',
					data: 'error'
				};
			}
		}
	}
});

app.use(require('koa-static')(__dirname + '/public'));
app.use(jwt({cookie: config.authCookie, secret: config.secret,key: 'jwtdata'}).unless({path: [/^\/login/,/^\/api\/login/] }));
console.log('start');
router.use('/index', index.routes());
router.use('/login', login.routes());
router.use('/api/login', loginapi.routes());
router.use('/api/todo', todo.routes());

app.use(router.routes()).use(router.allowedMethods());

// app.on('error', function(err,ctx) {
// 	logger.error('server error',err,ctx);
// });

module.exports = app;