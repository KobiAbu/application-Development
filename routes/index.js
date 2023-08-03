const express=require('express')
const router=express.Router()
const dataController=require('../controllers/index')
const { dirname } = require('path');
const appDir = dirname(require.main.filename)


router.route('/').
get(dataController.getItems)

//post()
router.route('/admin/:adminId/:id').
delete(dataController.deleteData).
put((req,res)=>{res.sendFile(appDir+'/forms/add.html')
})

router.route('/admin/update').
get((req,res)=>{res.sendFile(appDir+'/forms/update.html')})

router.route('/:id').
get(
dataController.getItemById)
module.exports=router