
const UserService = require('../services/UserService');
const loginService = require('../services/loginService')
const dataService = require('../services/services')
const { orders, items, users } = require('../models/index');
const sessionStorage = require('sessionstorage');


const createUser = async (req, res) => {
    const c = await dataService.createUser(req.body.email, req.body.password)
    console.log(c)
    if (c) {
        res.status(201).send("great")
    }
    else
        return res.status(404).json({ errors: ["cant create user"] })

}
const login = async (req, res) => {
    const { userName, password } = req.body;
    const user = await loginService.login(userName, password);
    const userType = await UserService.getUser(userName, password);
    const userid = userType._id
    console.log(user)
    if (user) {
        // req.session.userName = userName;
        sessionStorage.setItem('userName', userName);
        req.session.userType = userType.userType;
        req.session._id = userid;
    if(user.userType=="admin")
    {
        res.json({success:true,userType:"admin"})
        res.redirect('/admindashboard.html')
    }
    else{
      res.json({success:true,userType:"user"})
     res.redirect('/')
    }
    } else {
       res.redirect('/login?error=1')
    }
}

const createAdmin = async (req,res) => {
    const newAdmin = await UserService.createAdmin(req.body.email,req.body.password,"admin");
    if(newAdmin)
    return res.redirect('/admin')
    else return res.redirect('/admin/createUser?error=1')
}

const getUser = async (req, res) => {
    const c = await dataService.getUser(req.params.email, req.params.password)
    if (c) {
        return res.json(c)
    }
    else
        return res.status(404).json({ errors: ["user not found"] })
}

const getUsers = async (req,res) => {
    const Users = await UserService.getUsers();
    res.json(Users);
}

const updateUser = async (req,res) => {
    const User = await UserService.updateUser(req.body.existingEmail,req.body.firstName,req.body.lastName,req.body.userType);
    if (!User)
    return  res.redirect('/admin/updateUser?error=1')
    else return res.redirect('/admin')
    }

const deleteUser = async (req,res) =>{
    const User = await UserService.deleteUser(req.body.email);
    if(User)
    return res.redirect('/admin')
    else return res.redirect('/admin/deleteUser?error=1');
    }
    const getUserById = async (req, res) => {
        const c = await dataService.getUserById(req.params.id)
        if (c) {
            return res.json(c)
        }
        else {
            console.log("hey")
            return res.status(404).json({ errors: ["user not found"] })
        }
    }
    
    
    function isloggedin(req,res,next){
        if(req.session.userId){
        res.json({isloggedin:true,
                  email:req.session.email,
                 userType:req.session.userType})
                 next();
        }
        else
        res.redirect('/login')
      }

module.exports = {
    createUser,
    getUser,
    getUsers,
    updateUser,
    deleteUser,
    createAdmin,
    login,
    isloggedin,
    getUserById
}

// const loginService=require('../services/loginService')
// const UserService=require('../services/UserService')

// async function login(req, res) {
//   const { email, password } = req.body
//   const User= await UserService.getUser(email)
//   const result = await loginService.login(email, password)
//   if (result) {
//     req.session.email = email
//    req.session.firstName = User.firstName;
//    req.session.userType = User.userType
//     res.redirect('/')
//   }
//     else
//       res.redirect('/login?error=1')
//   }
//   async function register(req, res) {
//     const { firstName, lastName, email, password } = req.body;
  
//     try {
//       const request = await loginService.register(
//         firstName,
//         lastName,
//         email,
//         password,
//         null
//         );
//         console.log(password)
//         if (request) {
//           req.session.email = email;
//           req.session.firstName = firstName;
//           return res.redirect('/');
//         } else {
       
//         return res.redirect('/signup?error=1');
//       }
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ error: 'An error occurred' });
//     }
//   }
  
//   function logout(req, res) {
//     req.session.destroy(() => {
//       res.redirect('/login');
//     });
//   }

//   async function changePass(req,res){
//     const email=req.session.email
//     const newPassword=req.body.password
//       loginService.changePass(email,newPassword)

//   }
// function isloggedin(req,res){
//     if(req.session.email)
//     res.json({isloggedin:true,
//               email:req.session.email,
//             firstName:req.session.firstName,
//              userType:req.session.userType})
//     else
//     res.json({isloggedin:false})
//   }
  
//   module.exports = {
//     login,
//     register,
//     logout,
//     changePass,
//     isloggedin
// }