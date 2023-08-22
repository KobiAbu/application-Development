const express=require('express')
const router=express.Router()
const dataController=require('../controllers/itemController.js')
const { dirname } = require('path');
const { json } = require('body-parser');
const appDir = dirname(require.main.filename)
const path = require('path');
const multer = require('multer');
router.use(express.static(path.join(appDir, 'forms')));

 
router.get('/', (req, res) => {
    res.sendFile(path.join(appDir, 'forms','index.html'));
});


router.get('/admin/edit', (req, res) => {
    res.sendFile(path.join(appDir, 'forms','updateProduct.html'));
});
router.route('/admin/add').
get((req,res)=>{
    res.sendFile(appDir+'/forms/add.html')
})
router.route('/admin/edit').get((req,res)=>{
    res.sendFile(appDir+'/forms/updateProduct.html')
})
router.post('/admin/update',dataController.updateData)
router.get('/admin/update/:id',dataController.updateData)

router.post('/admin/addAnItem',dataController.createItem)


router.get(dataController.getItemById)


module.exports=router