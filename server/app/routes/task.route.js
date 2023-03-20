const task = require("../controllers/task.controller");
module.exports = app => {
    const task = require('../controllers/task.controller.js')
    const router = require('express').Router()

    router.get('/', task.findAll)

    router.get('/:todolistId', task.getTodolistData)

    router.post('/', task.create)

    router.post('/gpt', task.createGPTList)

    router.get('/:id', task.findOne)

    router.delete('/:id', task.delete)

    router.put('/:id', task.update)

    app.get('/api/task/:todolistId', task.getTodolistData)

    app.use('/api/task', router)
}