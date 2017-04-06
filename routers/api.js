/**
 * Created by hxw on 2017/3/28.
 */
var express=require('express');
var router=express.Router();
//引人之前定义的数据模型
var User=require('../models/user');

//统一返回格式
var responseData;

router.use(function (req,res,next) {
    responseData={
        code:0,
        message:''
    }
    next();
})


/*
* 用户注册
* */
router.post('/user/register',function (req,res,next) {
    var username=req.body.username;
    var password=req.body.password;
    var repassword=req.body.repassword;

    //用户名不能为空
    if(username==''){
        responseData.code=1;
        responseData.message='用户名不能为空';
        res.json(responseData);
        return;
    }
    //密码不能为空
    if (password==''){
        responseData.code=2;
        responseData.message='密码不能为空';
        res.json(responseData);
        return;
    }
    //两次密码必须一致
    if (password != repassword){
        responseData.code=3;
        responseData.message='两次输入的密码不一致';
    res.json(responseData);
    return;
}

    //用户名是否已经注册了，如果数据库中已经存在和我们要注册的用户名同名的数据，表示该用户已经被注册了
    User.findOne({
        username:username
    }).then(function (userInfo) {
        if (userInfo){
            //表示数据库中有该记录
            responseData.code=4;
            responseData.message='用户名已经被注册了';
            res.json(responseData);
            return;
        }
        //保存用户信息到数据库
        var user=new User({
            username:username,
            password:password
        });
        return user.save();
    }).then(function (newUserInfo) {
        console.log(newUserInfo);
        //注册成功
        responseData.message="注册成功";
        res.json(responseData);
    });
});

//登录
router.post('/user/login',function (req,res,next) {
    var username=req.body.username;
    var password=req.body.password;
    //用户名不能为空,密码不能为空
    if(username==''|| password==''){
        responseData.code=1;
        responseData.message='用户名和密码不能为空';
        res.json(responseData);
        return;
    }
    //查询数据库中是否有相同用户名和密码
    User.findOne({
        username:username,
        password:password
    }).then(function (userInfo) {
        if(!userInfo){
            responseData.code=2;
            responseData.message='用户名或密码错误'
        }else{
            //用户名和密码正确
            responseData.message='登录成功';
            responseData.userInfo={
                _id:userInfo._id,
                username:userInfo.username
            }
            req.cookies.set('userInfo',JSON.stringify({
                _id:userInfo._id,
                username:userInfo.username
            }));
            res.json(responseData);
            return;
        }
    })

})

//退出
router.get('/user/logout',function (req,res) {
    req.cookies.set('userInfo',null);
    responseData.message='退出成功';
    res.json(responseData);
    return;
})

module.exports=router;