const dbConfig = require('../config/db.config.js')
const Sequelize = require('sequelize')
const connex = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    port: dbConfig.PORT,
    operatorAliases: false
})
const db = {}

db.Sequelize = Sequelize
db.connex = connex
db.user = require('./user.model.js')(connex, Sequelize)
db.todolist = require('./todolist.model')(connex, Sequelize)
db.task = require('./task.model')(connex, Sequelize)
module.exports = db
