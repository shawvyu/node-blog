/**
 * Created by hxw on 2017/3/28.
 */
var express=require('express');
var router=express.Router();
var Category=require('../models/category');



router.get('/',function (req,res,next) {

    //读取所有的分类信息
    Category.find().then(function (categories) {
        // console.log(rs);
        res.render('main/index',{
            userInfo:req.userInfo,
            categories:categories
        })
    })


});


module.exports=router;