const dataService = require('../services/services')
const getItems = async (req, res) => {
    debugger
    const newItem = await dataService.getAllItems()
    return res.json(newItem)
}

const updateData = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ errors: ["id is required"] })
    }
    const item = await dataService.updateItem(req.params.id, req.params.productName, req.params.price, req.params.stock, req.params.photo, req.params.gender)
    if (!item) { return res.status(404).json({ errors: ["something went wrong"] }) }
    return res.json(item)
}
const createOrder = async (req, res) => {


    const c = await dataService.createOrder(req.body.totalAmount, req.body.user, req.body.items)
    if (c) {
        res.status(201).send("great")
    }
    else
        return res.status(404).json({ errors: ["cant create Order"] })
}

const deleteData = async (req, res) => {
    const newItem = await dataService.deleteItem(req.params.id)
    if (!newItem) { return res.status(404).json({ errors: ["item not found"] }) }
    else {
        res.json("item deleted")
    }
    res.send()
}

const createItem = async (req, res) => {
    //implement premissions check
    const name = req.body.photo
    const newItem = await dataService.crateItem(req.body.id, req.body.productName, req.body.price, req.body.stock, name, req.body.gender, req.body.type)
    if (newItem) {

        res.status(201).send("great")
    }
    else
        res.status(400).send("item already exists")
}

const getItemById = async (req, res) => {
    const c = await dataService.getItemById(req.params.id)
    if (c) {
        return res.json(c)
    }
    else
        return res.status(404).json({ errors: ["item not found"] })
}
const getItemByName = async (req, res) => {
    const c = await dataService.getItemByName(req.params.id)
    if (c) {
        return res.json(c)
    }
    else
        return res.status(404).json({ errors: ["item not found"] })
}

const searchByParams = async (req, res) => {
    let list = []
    if (req.body.price) {
        list.push(["price", req.body.price])
    }
    if (req.body.type) {
        list.push(["type", req.body.type])
    }
    if (req.body.gender) {
        list.push(["gender", req.body.gender])
    }
    const c = await dataService.searchByParams(list)
    const list2 = []
    c.forEach(element => {
        list2.push(element)
    });

    if (c) {
        res.json(c)
    }
    else
        return res.status(404).json({ errors: ["item not found"] })
}

const getAllOrders = async (req,res)=>{
   const list =  await dataService.getAllOrders()
   return res.json(list)
}


module.exports = {
    getAllOrders,
    createItem,
    getItems,
    getItemById,
    updateData,
    deleteData,
    getItemByName,
    searchByParams,
    createOrder
}