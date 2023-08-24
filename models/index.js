const mongoose= require('mongoose')
const schema=mongoose.Schema

const orderScheme=new schema(
    
    {
        OrderId:{
        type:String,
        required:true
        },
        totalAmount:{
        type:Number,
        required:true
        },
        date:{
            type:Date,
            required:true
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,ref:'users'
        },
        items:[{type:mongoose.Schema.Types.ObjectId,ref:'items'}]
        
    }
)
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
        },
       admin:{
              type:Boolean,
              default:false
       },
       orders:[{type:mongoose.Schema.Types.ObjectId,ref:'orders'}]
       ,adress:
       {
        type:String,
        required:true
       }

    
    })

const data =new schema({
    itemId:{ 
    type:String,
    required:true
    },
    productName:
    {
        type:String,
        required:true
    },
    price:
    {
        type:Number,
        required:true
    },
    stock:
    {
        type:Number,
        required:true
    },
    PhotoFileName:
    {
        type:String
    },
    gender:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    }

})



const items=mongoose.model("items",data)
const orders= mongoose.model("orders",orderScheme)
const users=mongoose.model("users",userScheme)
module.exports={orders,items,users}