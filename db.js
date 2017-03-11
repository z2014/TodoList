const Sequelize = require('sequelize');
const config = require('./config.js');

var sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
    host: config.db.host,
    dialect: 'mysql',
    pool: {
        maxConnections: 5,
        minConnections: 0,
        maxIdleTime: 30000
    },
    charset:'utf8'
});

module.exports = sequelize;