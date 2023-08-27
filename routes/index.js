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
const loginController = require('../controllers/loginController')

function ensureAdmin(req, res, next) {
    if (req.session.userType == "admin") {
      next();
    }
    else {
        res.status(403).json({ errors: ["you are not admin"] })
    }
}

router.get('/', (req, res) => {
    res.sendFile(path.join(appDir, 'forms', 'index.html'));
});


router.get('/admin/edit', (req, res) => {
    res.sendFile(path.join(appDir, 'forms', 'updateProduct.html'));
});
router.route('/admin/add').
    get((req, res) => {
        res.sendFile(appDir + '/forms/add.html')
    })
router.route('/admin/edit').get((req, res) => {
    res.sendFile(appDir + '/forms/updateProduct.html')
})
router.post('/admin/update', ensureAdmin,dataController.updateData)
router.get('/admin/update/:id', ensureAdmin,dataController.updateData)
router.post('/createUser', loginController.createUser)
router.post('/admin/addAnItem',ensureAdmin, dataController.createItem)
router.get('/user/username', loginController.getUserById)
    

router.get('/getItems', dataController.getItems)
router.get('/getUser/:password/:email', loginController.getUser)
router.get('/getUserById/:id', loginController.getUserById)
router.get('/getItemById/:id', dataController.getItemById);
router.get('/check-login',loginController.isloggedin);
router.post('/createOrder', dataController.createOrder)


//router.get('/getSpecificItems', dataController.getSpecificItems)
router.post('/search', dataController.searchByParams)
router.route('/login').get(function(req,res)  {
    res.sendFile(path.join(dirname,"../forms/log_in.html"))
}).post(loginController.login)
//router.get('/some-protected-routes',loginController.isloggedin)


//router.get('/logout',login.logout)




module.exports = router