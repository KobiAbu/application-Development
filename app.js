const express= require('express')
const mongoose=require('mongoose')
const items=require('./routes/index')
const newLocal=require('custom-env')
const bodyParser = require('body-parser');
//const cors=require('cors')

newLocal.env(process.env.Node_ENV,'./config')
mongoose.connect(process.env.CONNECTION_STRING,
    {useNewUrlParser:true,
    useUnifiedTopology:true});

const app=express()
//app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())

//app.set('view enjine','ejs')
app.use('/',items)
app.listen(process.env.PORT, () => {
    console.log('Server started on port 8082');})