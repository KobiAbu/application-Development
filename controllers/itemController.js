const dataService =require('../services/services')
const getItems=async (req,res)=>
{
    debugger
    const newItem=await dataService.getAllItems()
    return res.json(newItem)
}

const updateData=async (req,res)=>
{
    if(!req.params.id)
    {
        return res.status(400).json({errors:["id is required"]})
    }
    const item=await dataService.updateItem(req.params.id,req.params.productName,req.params.price,req.params.stock,req.params.photo,req.params.gender)
    if(!item)
        {return res.status(404).json({errors:["something went wrong"]})}
     return res.json(item)
}

const deleteData=async (req,res)=>
{
    const newItem=await dataService.deleteItem(req.params.id)
    if(!newItem)
        {return res.status(404).json({errors:["item not found"]})}
        else
        {
            res.json("item deleted")
        }
    res.send()
}

const createItem= async (req,res)=>
{
    //implement premissions check
    const name=req.body.photo
    const newItem=await dataService.crateItem(req.body.id,req.body.productName,req.body.price,req.body.stock,name,req.body.gender,req.body.type)
       if(newItem){
   
        res.status(201).send("great")
}
else
        res.status(400).send("item already exists")
}

const getItemById=async(req,res)=>
{
    const c= await dataService.getItemById(req.params.id)
    if(c)
    {
      return  res.json(c)
    }
    else
        return res.status(404).json({errors:["item not found"]})
}
const getItemByName=async(req,res)=>
{
    const c= await dataService.getItemByName(req.params.id)
    if(c)
    {
      return  res.json(c)
    }
    else
        return res.status(404).json({errors:["item not found"]})
}

const searchByParams=async(req,res)=>
{
    let list=[]
    if(req.params.price)
    {
        list.push(["price",req.params.price])
    }
    // if(req.params.type)
    // {
    //     list.push(["type",req.params.type])
    // }
    if(req.params.gender)
    {
        list.push(["gender",req.params.gender])
    }
    const c= await dataService.searchByParams(list)
    const list2=[]
    c.forEach(element => {
        list2.push(element.itemId)
    });
   // console.log(c)
   
    if(c)
    {
       return list2}
    else
    return res.status(404).json({errors:["item not found"]})}


module.exports={
    createItem,
    getItems,
    getItemById,
    updateData,
    deleteData,
    getItemByName,
    searchByParams
}