const mongoose= require('mongoose')
const schema=mongoose.Schema
//enter schema
const adminScheme=new schema(
{
    id:
    {
        type:String,
        required:true
    },
    password:
    {
        type:String,
        required:true
    },
    name:
    {
        type:String
    }
})

const data =new schema({
    id:{ 
    type:String,
    required:true
    },
    productName:
    {
        type:String
    },
    price:
    {
        type:Number
    },
    stock:
    {
        type:Number
    }

})
//const itemCol=mongoose.model("items",data)
const index=mongoose.model("items",data)
const admins= mongoose.model("admins",adminScheme)
module.exports={index,admins}