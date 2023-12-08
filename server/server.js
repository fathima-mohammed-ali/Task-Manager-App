const express = require ('express')
const { default: mongoose } = require('mongoose')
const task = require('./src/router/TaskRouter')
const bodyParser= require ('body-parser');
const register = require('./src/router/Register');
const login = require('./src/router/Login');
const app = express()

app.use(bodyParser())
app.use(express.urlencoded({extended:true}))
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(express.json());
app.use('/task',task)
app.use('/register',register)
app.use('/login',login)

const MONGODB_URL='mongodb+srv://fathimama104:fathimama104@cluster0.unvxowu.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(MONGODB_URL).then(()=>{
    app.listen(4000,()=>{
        console.log("server is running on http://localhost:4000");
    })   
})
