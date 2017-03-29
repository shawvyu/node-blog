/**
 * Created by hxw on 2017/3/28.
 */
var express=require('express');
var router=express.Router();

router.get('/user',function (req,res,next) {
    res.send('admin-user');
});


module.exports=router;