/**
 * Created by hxw on 2017/3/28.
 */
var express=require('express');
var router=express.Router();

router.get('/',function (req,res,next) {
    res.render('main/index',{
        userInfo:req.userInfo
    })
});


module.exports=router;