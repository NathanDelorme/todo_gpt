const db = require('../models')
const bcrypt = require('bcryptjs')
const User = db.user

exports.findAll = (req, res) => {
    User.findAll().then(usersData => {
        res.send(usersData)
    })
}

exports.create = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(400).send({
            message: "User must have an email and a password"
        })
        return;
    }
    const user = await User.findOne({ where: { email: req.body.email } })
    if(user != null) {
        return res.status(400).send({
            message: 'Email already used'
        })
    }

    const regex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    if (!regex.test(req.body.password)) {
        return res.status(400).send({
            message: 'Password must contain at least one special character, one number, one uppercase letter and one lowercase letter'
        })
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)
    await User.create({
        email : req.body.email,
        password : hashPassword
    }).then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({ message: 'Could not insert the data' + err })
    })
}

exports.findOne = async (req, res, next) => {
    const user = await User.findOne({ where: { email:req.body.email } })

    if(!user || !await bcrypt.compare(req.body.password, user.password)){
        return res.status(400).send({
            message: 'Credentials incorrect'
        })
    }

    const {password, ...data} = await user.toJSON()
    res.send({
        user: data
    })
}

exports.auth = async (req, res) => {
    try {
        const cookie = req.cookies['jwt']
        const claims = jwt.verify(cookie, 'secret')

        if (!claims) {
            return res.status(401).send({
                message: 'unauthenticated'
            })
        }

        const user = await User.findOne({id: claims.id})
        const {password, ...data} = await user.toJSON()
        res.send(data)
    } catch (e) {
        return res.status(401).send({
            message: 'unauthenticated'
        })
    }
}

exports.logout = async (req, res) => {
    res.cookie('jwt', '', {maxAge: 0})

    res.send({
        message: 'success'
    })
}
