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
const userScheme=new schema(
    {
        userName:
        {
        type:String,
        required:true
        },

        password:
        {
            type:String,
            required:true
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
const items=mongoose.model("items",data)
const admins= mongoose.model("admins",adminScheme)
const users=mongoose.model("users",userScheme)
module.exports={items,admins,users}