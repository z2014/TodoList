var app = require('koa')(),
    router = require('koa-router')(),
    logger = require('koa-logger'),
    json = require('koa-json'),
    onerror = require('koa-onerror'),
    jwt = require('koa-jwt'),
    io = require('socket.io');

global.config = require('./config.js');

global.debug = true;

process.env.TZ = 'Asia/Shanghai';

var todo = require('./routes/todo'),
    index = require('./routes/index'),
    loginapi = require('./routes/loginapi'),
    login = require('./routes/login'),
    follow = require('./routes/follow');

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

router.use('/index', index.routes());
router.use('/login', login.routes());
router.use('/api/login', loginapi.routes());
router.use('/api/todo', todo.routes());
router.use('/api/follow',follow.routes());

app.use(router.routes()).use(router.allowedMethods());

// app.on('error', function(err,ctx) {
// 	logger.error('server error',err,ctx);
// });

var server = require('http').createServer(app.callback());
var io = require('socket.io')(server);
io.on('connection',function(socket) {
	console.log('connection');
	socket.on('login',function(obj) {
		socket.name = obj.id;
		io.emit('login',{user:'zcl'});
		console.log('zcl login in');
	});
});

module.exports = app;