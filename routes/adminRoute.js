const express=require('express')
const router=express.Router()
const dataController=require('../controllers/itemController.js')
const { dirname } = require('path');
const { json } = require('body-parser');
const appDir = dirname(require.main.filename)

