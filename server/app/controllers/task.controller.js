const db = require('../models')
const {where} = require("sequelize");
const Task = db.task
const OP = db.Sequelize.Op

exports.findAll = (req, res) => {
    Task.findAll().then(data => {
        res.send({tasks: data})
    })
}

exports.getTodolistData = async (req, res) => {
    const id = req.params.todolistId
    const tasks = await Task.findAll({
        where: {
            idTodolist: id
        }
    })

    res.send({tasks: tasks})
}

exports.createGPTList = async (req, res) => {
    console.log("REQUEST GPT")
    console.log(req.body)

    const {Configuration, OpenAIApi} = require("openai");

    const configuration = new Configuration({
        apiKey: "API_KEY", // Your OpenIA API Key
    });
    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: req.body.question + "\n\nYou must create a list of key point about the user prompt",
        temperature: 0.7,
        max_tokens: 2000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });
    const aiResponse = response.data.choices[0].text.trim();
    const lines = aiResponse.split("\n");
    const list = lines.map(line => {
        return line.replace(/^\d+\.\s*/, "").trim();
    });
    list.splice(0, 2);
    let addedTasks = []
    for (const taskTitle of list) {
        const newTask = {
            title: taskTitle,
            idTodolist: req.body.selectedTodolist.idTodolist,
            isFinished: false,
            priority: 0,
        }

        await Task.create(newTask).then(data => {
            console.log(data)
            newTask.idTask = data.idTask
            addedTasks.push(newTask)
        })
    }
    res.send({ tasks: addedTasks })
}

exports.create = (req, res) => {
    console.log(req.body)
    Task.create({
        title:req.body.title,
        isFinished:req.body.isFinished,
        priority: req.body.priority,
        idTodolist: req.body.idTodolist
    })
        .then(data => {
            res.send(data)
        })
        .catch(e => {
            console.log(e)
            res.status(500).send({
                message: 'Could not insert into the table'
            })
        })
}

exports.findOne = (req, res) => {
    const id = req.params.id
    Task.findByPk(id)
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
    Task.destroy({
        where: {idTask: req.params.id}
    })
        .then( num => {
            if(num == 1){
                res.send({
                    message: 'Task was deleted'
                })
            }else {
                res.send({
                    message: "Could not delete"
                })
            }
        })
        .catch(e => {
            res.status(500).send({
                message: 'Database error'
            })
        })
}

exports.update = (req, res) => {
    Task.update(req.body, {
        where: {idTask: req.params.id}
    })
        .then(num => {
            if(num == 1 ){
                res.send({
                    message: 'Task was updated'
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