const db = require('../models')
const {where} = require("sequelize");
const Todolist = db.todolist
const Task = db.task
const OP = db.Sequelize.Op

exports.findAll = (req, res) => {
    Todolist.findAll().then(data => {
        res.send({todolists: data})
    })
}

exports.getUserData = async (req, res) => {
    const id = req.params.userId
    const todolists = await Todolist.findAll({
        where: {
            idUser: id
        }
    })

    res.send({todolists: todolists})
}

exports.create = (req, res) => {
    console.log(req.body)
    Todolist.create(req.body)
        .then(data => {
            res.send(data)
        })
        .catch(e => {
            res.status(500).send({
                message: 'Could not insert into the table'
            })
        })
}

exports.findOne = (req, res) => {
    const id = req.params.id
    Todolist.findByPk(id)
        .then(data => {
            res.send(data)
        })
        .catch(e => {
            res.status(500).send({
                message: 'Could not find the data'
            })
        })
}

exports.delete = (req, res) => {
    const todolistId = req.params.id
    Task.destroy({
        where: { idTodolist: todolistId }
    }).then(() => {
        Todolist.destroy({
            where: { idTodolist: todolistId }
        }).then(num => {
            if (num == 1) {
                res.send({
                    message: "Todolist was deleted"
                })
            } else {
                res.send({
                    message: "Could not delete"
                })
            }
        }).catch(e => {
            res.status(500).send({
                message: "Database error"
            })
        })
    }).catch(e => {
        res.status(500).send({
            message: "Database error when deleting tasks"
        })
    })
}

exports.update = (req, res) => {
    Todolist.update(req.body, {
        where: {idTodolist: req.params.id}
    })
        .then(num => {
            if(num == 1 ){
                res.send({
                    message: 'Todolist was updated'
                })
            }else {
                res.send({
                    message: "Could not update"
                })
            }
        })
        .catch(e => {
            console.log(e)
            res.status(500).send({
                message: 'Database error'
            })
        })
}