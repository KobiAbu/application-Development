const express=require('express')
const router=express.Router()
const dataController=require('../controllers/index')
const { dirname } = require('path');
const appDir = dirname(require.main.filename)


router.route('/').
get((req,res)=>{res.sendFile(appDir+'/forms/login.html')})
router.route('/register').
get((req,res)=>{res.sendFile(appDir+'/forms/registar.html')})
//post()
// router.route('/admin/delete').
// get((req,res)=>{res.sendFile(appDir+'/forms/add.html')})

router.route('/admin/add').
get((req,res)=>{res.sendFile(appDir+'/forms/add.html')})

router.route('/admin/addAnItem').
post((req,res)=>{
    dataController.createItem(req)
    
})

router.route('/admin/update').
get((req,res)=>{res.sendFile(appDir+'/forms/update.html')})

router.route('/:id').
get(
dataController.getItemById)
module.exports=router