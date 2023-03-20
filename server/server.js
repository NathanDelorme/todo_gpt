const port = 8080
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

const corsOptions = {
    credentials: true,
    origin: 'http://localhost:8081'

}

app.use(cookieParser());
app.use(cors(corsOptions));

const db = require('./app/models')
db.connex.sync()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }))

app.get('/', (req, res) => {
    res.json({message: 'welcome'})
})

require('./app/routes/user.route')(app)
require('./app/routes/todolist.route')(app)
require('./app/routes/task.route')(app)

app.listen(port, async () => {
    console.log(`Server is running on port ${port}`)
})
