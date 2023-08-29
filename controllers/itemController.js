const { items } = require("../models");
const dataService = require("../services/services");

const getSpecificOrder = async (req, res) => {

  //console.log(req.body); // Use req.body instead of data

  let list = [];
  if (req.body.amount) {
    list.push(["amount", req.body.amount]);
  }
  if (req.body.date) {
    list.push(["date", req.body.date]);
  }
  if (req.body.items) {
    list.push(["items", req.body.items]);
  }
  const c = await dataService.getSpecificOrder(list);
  const list2 = [];
  c.forEach((element) => {
    list2.push(element);
  });

  if (c) {
    res.json(c);
  } else {
    return res.status(404).json({ errors: ["item not found"] });
  }
};

const getItems = async (req, res) => {
  const newItem = await dataService.getAllItems();
  return res.json(newItem);
};
const getItemsList = async (req, res) => {
  const newItem = await dataService.getItemsList(req.body.items);
  console.log(newItem);
  return res.json(newItem);
};

const updateData = async (req, res) => {
  const item = await dataService.updateItem(
    req.body.id,
    req.body.productName,
    req.body.price,
    req.body.stock,
    req.body.photo,
    req.body.gender,
    req.body.type
  );
  if (!item) {
    return res.status(404).json({ errors: ["something went wrong"] });
  }
  return res.json(item);
};
const updateOrder = async (req, res) => {
  console.log(req.body);
  const item = await dataService.updateOrder(
    req.body.id,
    req.body.items,
    req.body.total
  );
  if (!item) {
    return res.status(404).json({ errors: ["something went wrong"] });
  }
  return res.json(item);
};
const makeAdmin = async (req, res) => {
  const item = await dataService.makeAdmin(req.params.user);
  if (!item) {
    return res.status(404).json({ errors: ["something went wrong"] });
  }
  return res.json(item);
};

const createOrder = async (req, res) => {
  const c = await dataService.createOrder(
    req.body.totalAmount,
    req.body.user,
    req.body.items,
    req.body.date
  );
  if (c) {
    res.status(201).send("great");
  } else return res.status(404).json({ errors: ["cant create Order"] });
};

const deleteData = async (req, res) => {
  const newItem = await dataService.deleteItem(req.params._id);
  if (!newItem) {
    return res.status(404).json({ errors: ["item not found"] });
  } else {
    res.json("item deleted");
  }
};

const createItem = async (req, res) => {
  //implement premissions check
  const name = req.body.photo;
  const newItem = await dataService.crateItem(
    req.body.productName,
    req.body.price,
    req.body.stock,
    name,
    req.body.gender,
    req.body.type
  );
  if (newItem) {
    res.status(201).send("great");
  } else res.status(400).send("item already exists");
};

const getItemById = async (req, res) => {
  const c = await dataService.getItemById(req.params.id);
  if (c) {
    return res.json(c);
  } else return res.status(404).json({ errors: ["item not found"] });
};
const getItemByName = async (req, res) => {
  const c = await dataService.getItemByName(req.params.id);
  if (c) {
    return res.json(c);
  } else return res.status(404).json({ errors: ["item not found"] });
};

const searchByParams = async (req, res) => {
  let list = [];
  if (req.body.price) {
    list.push(["price", req.body.price]);
  }
  if (req.body.type) {
    list.push(["type", req.body.type]);
  }
  if (req.body.gender) {
    list.push(["gender", req.body.gender]);
  }
  const c = await dataService.searchByParams(list);
  const list2 = [];
  c.forEach((element) => {
    list2.push(element);
  });

  if (c) {
    res.json(c);
  } else return res.status(404).json({ errors: ["item not found"] });
};

const getAllOrders = async (req, res) => {
  const list = await dataService.getAllOrders();
  return res.json(list);
};
const deleteOrder = async (req, res) => {
  const list = await dataService.deleteOrder(req.params._id);
  return res.json(list);
};

module.exports = {
  getSpecificOrder,
  makeAdmin,
  deleteOrder,
  getItemsList,
  updateOrder,
  getAllOrders,
  createItem,
  getItems,
  getItemById,
  updateData,
  deleteData,
  getItemByName,
  searchByParams,
  createOrder,
};
