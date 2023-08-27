//loginService
const userService=require('./UserService')
const { orders, items, users } = require('../models/index');

async function login(email, password) {
    const findUser = await users.findOne({ userName: email, password: password });
    if(findUser)
    return {succsess:true,userType:findUser.userType};
    else return {succsess:false};
}


async function register(firstName,lastName,email,password,userType) {
	const existUser= await users.findOne({email:email})
    if(existUser){
        return false;
    }

    await userService.createUser(firstName,lastName,email,password,userType)    
        return true

}
async function changePass(email,newPassord){
    const user=await users.findOne({email:email})
    userService.updateUser(user.firstName,user.lastName,email,newPassord,null)
}

module.exports = { login, register,changePass }