const { get } = require("mongoose");
const { orders, items, users } = require("../models/index");

const getItemsList = async (list) => {
  let itemsList = await Promise.all(
    list.map(async (element) => {
      const item = await items.findById(element);
      return item;
    })
  );

  console.log(itemsList);
  return itemsList;
};
const makeAdmin = async (name) => {
  try {
    await users.findOneAndUpdate({ userName: name }, { userType: "admin" });
    return "success";
  } catch (error) {
    return null;
  }
};

async function searchByParams(list) {
  groupByFields = {};
  list.forEach((query) => {
    if (query[0] === "gender") {
      groupByFields.gender = query[1];
    }

    if (query[0] === "price") {
      groupByFields.price = {
        $gte: 0,
        $lte: parseInt(query[1]),
      };
    }

    if (query[0] === "type") {
      groupByFields.type = query[1];
    }
  });
  const aggregatePipeline = [];
  if (Object.keys(groupByFields).length > 0) {
    aggregatePipeline.push({
      $match: groupByFields,
    });
    // aggregatePipeline.push({
    //   $group: {
    //     _id: {
    //       type: '$type',
    //       gender: '$gender',
    //       price: '$price',
    //     },
    //   },
    // });

    const result = await items.aggregate(aggregatePipeline);
    return result;
  }
}
async function checkIfExist(id) {
  const query = { itemId: id };
  const pr = await items.findOne(query);
  console.log(pr);
  return pr;
}
async function checkIfOrderExist(orderid) {
  const query = { OrderId: orderid };
  const pr = await orders.findOne(query);
  console.log(pr);
  return pr;
}
async function checkIfUserExist(name) {
  const query = { userName: name };
  const pr = await suppliers.findOne(query);
  console.log(pr);
  return pr;
}

const getAllusers = async () => {
  try {
    const users = await users.find({});
    return users;
  } catch (error) {
    return null;
  }
};

const getUser = async (name, password) => {
  try {
    const user = await users.findOne({ userName: name, password: password });
    return user;
  } catch (error) {
    return null;
  }
};

const crateItem = async (productName, price, stock, picture, gender, type) => {
  // if (await checkIfExist(id)) {
  //   return null;
  // }
  try {
    //console.log(picture)
    const item = new items({
      productName: productName,
      price: price,
      stock: stock,
      PhotoFileName: picture,
      gender: gender,
      type: type,
    });

    return await item.save();
  } catch (error) {
    console.log("error");
    return null;
  }
};

const getItemById = async (id) => {
  try {
    const item = await items.findById(id);
    // console.log(item)
    return item;
  } catch (error) {
    return null;
  }
};
const getItemByName = async (name) => {
  try {
    const item = await items.findOne({ productName: name });
    console.log(item);
    return item;
  } catch (error) {
    return null;
  }
};
const getAllItems = async () => {
  return await items.find({});
};
const updateItem = async (
  id,
  productName,
  price,
  stock,
  photo,
  gender,
  type
) => {
  try {
    return await items.findOneAndUpdate(
      { _id: id },
      {
        productName: productName,
        price: price,
        stock: stock,
        PhotoFileName: photo,
        gender: gender,
        type: type,
      }
    );
  } catch (error) {
    return null;
  }
};
const deleteUser = async (name) => {
  try {
    await users.findOneAndDelete({ userName: name });
    return "success";
  } catch (error) {
    return null;
  }
};

const deleteItem = async (id) => {
  try {
    await items.findOneAndDelete({ _id: id });
    return "succes";
  } catch (error) {
    return null;
  }
};
const updateUser = async (
  id,
  userName,
  password,
  admin,
  adress,
  purchasesHistory
) => {
  try {
    await users.findOneAndUpdate(
      { userName: id },
      {
        userName: userName,
        password: password,
        admin: admin,
        adress: adress,
        purchasesHistory: purchasesHistory,
      }
    );
    return "success";
  } catch (error) {
    return null;
  }
};

const createUser = async (userName, password) => {
  try {
    const user = new users({
      userName: userName,
      password: password,
      purchaseHistory: [],
    });

    return await user.save();
  } catch (error) {
    return null;
  }
};

const getAllOrders = async () => {
  try {
    const order = await orders.find({});
    return order;
  } catch (error) {
    return null;
  }
};
const getOrder = async (orderid) => {
  try {
    const order = await orders.findOne({ OrderId: orderid });
    console.log(order);
    return order;
  } catch (error) {
    return null;
  }
};

const updateOrder = async (orderid, items, totalAmount) => {
  try {
    return await orders.findOneAndUpdate(
      { _id: orderid },
      { totalAmount: totalAmount, items: items }
    );
  } catch (error) {
    return null;
  }
};

const deleteOrder = async (orderid) => {
  try {
    await orders.findOneAndDelete({ _id: orderid });
    return "success";
  } catch (error) {
    return null;
  }
};

const getUserById = async (id) => {
  try {
    //console.log(name)
    const user = await users.findById(id);
    return user;
  } catch (error) {
    return null;
  }
};
const createOrder = async (totalAmount, user, items, date) => {
  try {
    const order = new orders({
      totalAmount: totalAmount,
      user: user,
      items: items,
      addedDate: date,
    });
    user = await users.findById(user._id).populate("orders");
    const newOrder = await order.save();
    if (newOrder) {
      user.orders.push(newOrder);
      await user.save();
    }
    return await newOrder;
  } catch (error) {
    return null;
  }
};

module.exports = {
  makeAdmin,
  getItemsList,
  getAllItems,
  crateItem,
  getItemByName,
  getItemById,
  updateItem,
  deleteItem,

  createUser,
  deleteUser,
  getAllusers,
  getUser,
  getUserById,
  updateUser,

  getAllOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,

  searchByParams,
};
