

const {items,admins,users} =require('../models/index')

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

const crateItem = async (adminId, id, productName, price, stock) => {
    try {
      // Assuming you have an `Admin` model to query admins by `adminId`
      const admin = await admins.findById(adminId);
  
      if (admin) {
        const item = new items({
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
    try {
        const admin = await admins.findById(adminId);
        if(admin){
        await index.findByIdAndUpdate(id,{"productName":productName})
        return 6}
      } catch (error) {
        return null;
    
}}
// updateScript.js
// document.getElementById("updateForm").addEventListener("submit", async function (event) {
//   event.preventDefault(); // Prevent the default form submission

//   // Get the form data
//   const id = document.getElementById("id").value;
//   const productName = document.getElementById("productName").value;
//   const price = parseFloat(document.getElementById("price").value);
//   const stock = parseInt(document.getElementById("stock").value);

//   const updatedItem = await updateItem(id, productName, price, stock);
//   console.log(updatedItem);
// });

// async function updateItem(id, productName, price, stock) {
//   try {
//     const response = await fetch(`/update/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ productName, price, stock }),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.errors.join(", "));
//     }

//     const updatedItem = await response.json();
//     console.log("Item updated successfully:", updatedItem);
//     return updatedItem; // You can perform any other actions upon successful update here

//   } catch (error) {
//     console.error("Error updating item:", error.message);
//     return null; // You can display an error message or take appropriate actions here
//   }
// }

const deleteItem = async (id) =>
{
    try {
        await items.findByIdAndDelete(id)
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
    deleteItem,
    getAllusers,
    getUser
}