
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

const createAdmin = async (req, res) => {
    const newAdmin = await UserService.createAdmin(req.body.email, req.body.password, "admin");
    if (newAdmin)
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

const getUsers = async (req, res) => {
    const Users = await UserService.getUsers();
    res.json(Users);
}

const updateUser = async (req,res) => {
    const User = await UserService.updateUser(req.body.current,req.body.newUser, req.body.password);
    if (User)
        res.json(User)
    else  return res.status(404).json({ errors: ["user not found"] })
}

const deleteUser = async (req, res) => {
    const User = await UserService.deleteUser(req.params.userName);
    if (!User)
    { return res.status(404).json({ errors: ["User not found"] }) }
    else {
        res.json("User deleted")
    }
    
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


function isloggedin(req, res, next) {
    if (req.session.userId) {
        res.json({
            isloggedin: true,
            email: req.session.email,
            userType: req.session.userType
        })
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
    isloggedin,
    getUserById
}

