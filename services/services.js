const {index,admins} =require('../models/index')

const crateItem = async (adminId, id, productName, price, stock) => {
    try {
      // Assuming you have an `Admin` model to query admins by `adminId`
      const admin = await admins.findById(adminId);
  
      if (admin) {
        const item = new index({
          id: id,
          productName: productName,
          price: price,
          stock: stock,
        });
  
         await item.save();
        return id;
      } else {
        return null;
      }
    } catch (error) {

      return null;
    }
  };
  

const getItemById =async(id)=>
{
    try {
        const item = await index.findById(id);
        console.log(items)
        return item;
      } catch (error) {
        return null;
      }
}
const getAllItems =async()=>
{
    return await index.find({})
}
const updateItem = async (adminId,id,productName) =>
{
    try {
        const admin = await admins.findById(adminId);
        if(admin){
        await index.findByIdAndUpdate(id,{"productName":productName})
        return 6}
      } catch (error) {
        return null;
    
}}
const deleteItem = async (id) =>
{
    try {
        await index.findByIdAndDelete(id)
        return 6
      } catch (error) {
        return null;
      }}
module.exports=
{
    getAllItems,
    crateItem,
    getItemById,
    updateItem,
    deleteItem
}