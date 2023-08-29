const express = require('express')

const router = express.Router()
const dataController = require('../controllers/itemController.js')
const { dirname } = require('path');
const { json } = require('body-parser');
const appDir = dirname(require.main.filename)

const path = require('path');
router.use(express.static(path.join(appDir, 'forms')));
const dataService = require('../services/services')
const UserService = require('../services/UserService')
const loginService = require('../services/loginService')
const loginController = require('../controllers/loginController');
const session = require('express-session');

function ensureAdmin(req, res, next) {
    if (req.session.userType === "admin") {
        next();
    }
    else {
        res.send(req.session)
        res.status(403).json({ errors: ["you are not admin"] })
    }
}

router.get('/', (req, res) => {
    res.sendFile(path.join(appDir, 'forms', 'index.html'));
});




router.get('/admin/edit', ensureAdmin, (req, res) => {
    res.sendFile(path.join(appDir, 'forms', 'updateProduct.html'));
});
router.route('/admin/add').
    get((req, res) => {
        res.sendFile(appDir + '/forms/add.html')
    })
router.route('/admin/edit').get((req, res) => {
    res.sendFile(appDir + '/forms/updateProduct.html')
})

router.get('/logOut', (req, res) => {
    req.session = null
    res.sendFile(appDir + '/forms/index.html')
});
router.get('/kill', (req, res) => {
    req.session = null
    res.status(201).send("great")
});
router.delete('/admin/deleteUser/:userName', ensureAdmin, loginController.deleteUser);
router.post('/admin/update', ensureAdmin, dataController.updateData)
router.get('/admin/update/:id', ensureAdmin, dataController.updateData)
router.post('/createUser', loginController.createUser)
router.post('/admin/addAnItem', ensureAdmin, dataController.createItem)
router.get('/user/username', loginController.getUserById)
router.get('/getAllOrders', dataController.getAllOrders)
router.post('/admin/updateOrder', dataController.updateOrder)
//router.post()


router.get('/getItems', dataController.getItems)
router.get('/getAllUsers',loginController.getUsers)
router.get('/getUser/:password/:email', loginController.getUser)
router.get('/getUserById/:id', loginController.getUserById)
router.get('/getItemById/:id', dataController.getItemById);
router.post('/getItemsList', dataController.getItemsList);

// router.post("/updateItem",(req,res)=>{

// })
router.post('/checkAdmin', (req, res) => {
    if (req.body.admin === 'admin') {
        req.session.userType = "admin"
    }
    else {
        req.session.userType = 'user'
    }
    req.session.user = req.body.user
    res.send(req.session)

})
router.post('/createToken', (req, res) => {
    if (req.body.admin === 'admin') {
        req.session.userType = "admin"
    }
    else {
        req.session.userType = 'user'
    }
    req.session.user = req.body.user
    res.send(req.session)

})
router.get('/getUserType', (req, res) => {
    if (req.session.userType) {
        res.send(req.session.userType)
    }
    else {
        res.send(null)
    }
})
router.get('/getEmailandPass', (req, res) => {
    res.send({
        email: req.session.name,
        password: req.session.password
    })
})
router.post('/createOrder', dataController.createOrder)
router.get('/getUserData', (req, res) => {

    res.send(req.session.user)
})
router.post('/updateUserData', loginController.updateUser)
router.post('/search', dataController.searchByParams)





module.exports = router