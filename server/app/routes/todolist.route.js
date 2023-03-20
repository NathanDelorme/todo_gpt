const todolist = require("../controllers/todolist.controller");
module.exports = app => {
    const todolist = require('../controllers/todolist.controller.js')
    const router = require('express').Router()

    router.get('/', todolist.findAll)

    router.get('/:userId', todolist.getUserData)

    router.post('/', todolist.create)

    router.get('/:id', todolist.findOne)

    router.delete('/:id', todolist.delete)

    router.put('/:id', todolist.update)

    // app.get('/api/todolists/:userId', todolist.getUserData)

    app.use('/api/todolist', router)
}