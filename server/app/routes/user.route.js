module.exports = app => {
    const user = require('../controllers/user.controller.js')
    const router = require('express').Router()

    router.post('/', user.create)

    router.post('/login', user.findOne)

    router.get('/logout', user.logout)

    router.get('/auth', user.auth)

    app.use('/api/user', router)
}
