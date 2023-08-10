

const { get } = require('mongoose');
const {suppliers,items,users} =require('../models/index')

const adminError = "you are not an admin";

async function checkIfExist(id) 
{
  const query = { itemId: id };
  const pr=await items.findOne(query)
  console.log(pr)
  return pr;

}
async function checkIfSupplierExist(name) 
{
  const query = { supplierName: name };
  const pr=await suppliers.findOne(query)
  console.log(pr)
  return pr;

}
async function checkIfUserExist(name) 
{
  const query = { userName: name };
  const pr=await suppliers.findOne(query)
  console.log(pr)
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

const getUser =async(name,password)=>
{
    try {
        const user = await users.findOne({userName:name,password:password});
        console.log(user)
        return user;
      } catch (error) {
        return null;
      }
}

const crateItem = async (id, productName, price, stock,picture) => {
  if(await checkIfExist(id)){
    return null;}
  try {
        console.log(picture)
        const item = new items({
          itemId: id,
          productName: productName,
          price: price,
          stock: stock,
          PhotoFileName:picture
        }
        );
  
        return await item.save();

    } catch (error) {
      console.log("error")
      return null;
    }
  };
  

const getItemById =async(id)=>
{
    try {
        const item = await items.findById(id);
        console.log(item)
        return item;
      } catch (error) {
        return null;
      }
}
const getAllItems =async()=>
{
    return await items.find({})
}
const updateItem = async (adminId,id,productName) =>
{

}
const deleteUser = async (id) =>{

    try {
        await users.findOneAndDelete(id)
        return "success"
      } catch (error) {
        return null;
      }
}


const deleteItem = async (id) =>
{
    try {
        await items.findOneAndDelete(id)
        return "succes"
      } catch (error) {
        return null;
      }
}
const updateUser = async (id,userName,password,admin,adress) =>
{
    

}
const createUser = async (userName,password,admin,adress) =>
{
  if(await checkIfUserExist(userName)){
    return null;}
  try {

        const user = new users({
          userName: userName,
          password: password,
          admin: admin,
          adress: adress,
          purchaseHistory: []
        }
        );
  
        return await user.save();

    } catch (error) {
      return null;
    }
  }

const getAllSuppliers = async () => {}
const getSupplier = async (id) => {
    try {
        const supplier = await suppliers.findById(id);
        console.log(supplier)
        return supplier;
      } catch (error) {
        return null;
      }
}
const createSupplier = async (name, phone, email) =>
 {
  if(await checkIfSupplierExist(name)){
    return null;}
  try {

        const sup = new suppliers({
          supplierName: name,
          phone: phone,
          email:email
        }
        );
  
        return await item.save();

    } catch (error) {
      return null;
    }
 }
const updateSupplier = async (id, name, phone, adress) => {}
const deleteSupplier = async (id) => {}


  
module.exports=
{
    
    getAllItems,
    crateItem,
    getItemById,
    updateItem,
    deleteItem,

    createUser, 
    deleteUser,
    getAllusers,
    getUser,
    updateUser,

    getAllSuppliers,
    getSupplier,
    createSupplier,
    updateSupplier,
    deleteSupplier,
}