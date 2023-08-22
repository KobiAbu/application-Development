const mongoose= require('mongoose')
const schema=mongoose.Schema

const supplierScheme=new schema(
    
    {
        supplierName:{
        type:String,
        required:true
        },
        phoneNumber:{
            type:String,
            required:true
        },
        email:{
            type:String,
        },
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
       purchasesHistory:{
              type:Array,
             default:[]
       }
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
        type:String,
        required:true,
        default:""
    }

})



const items=mongoose.model("items",data)
const suppliers= mongoose.model("suppliers",supplierScheme)
const users=mongoose.model("users",userScheme)
module.exports={suppliers,items,users}