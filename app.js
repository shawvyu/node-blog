/**
 * Created by hxw on 2017/3/28.
 *
 * 应用程序启动（入口）文件
 */


//加载express模块
var express=require('express');
//加载模版
var swig=require('swig');
//创建app应用
var app=express();
//加载数据库
var  mongoose=require('mongoose');
//加载bodyparse 用来处理客户端传递过来的数据
var bodyParser=require('body-parser');
//加载cookies模块
var Cookies=require('cookies');


var User=require('./models/user');

//bodyparser 设置
app.use(bodyParser.urlencoded({extended:true}))
//设置cookies
app.use(function (req,res,next) {
    req.cookies=new Cookies(req,res);
    //解析登录用户的cookies信息
    req.userInfo={};
    if (req.cookies.get('userInfo')){
        try {
             req.userInfo=JSON.parse(req.cookies.get('userInfo'));

            //获取当前登录用户的类型，是否是管理员
            User.findById(req.userInfo._id).then(function (userInfo) {
                req.userInfo.isAdmin=Boolean(userInfo.isAdmin);
                next();
            })
        }catch (err) {
            next();
        }
    }else{
        next();
    }

})




//设置静态文件托管
//当用户访问的URL以/public开始，那么直接返回对应__dirname+'/public'下的文件
app.use('/public',express.static(__dirname+'/public'));


/*
配置应用模版
定义当前使用的模版引擎
第一个参数是：模版引擎名称，第二个参数是；用于解析处理模版内容的方法
 */
app.engine('html',swig.renderFile);
//设置模版文件存放的目录，第一个参数必须是views，第二个参数是目录
app.set('views','./views');
//第一个参数必须是view engine，第二个参数和app.engine设置的模版引擎名称一致
app.set('view engine','html');
//开发过程中，需要取消模版缓存
swig.setDefaults({cache:false});


/**
 * 首页
 * req request对象
 * res response对象
 * next 函数
 * */


// 根据不同功能划分模块
app.use('/admin',require('./routers/admin'));
app.use('/api',require('./routers/api'));
app.use('/',require('./routers/main'));

mongoose.connect('mongodb://localhost:27018/blog',function (err) {
    if (err){
        console.log(err);
        console.log('数据库连接失败')
    }else {
        console.log('数据库连接成功')
        //监听http请求
        app.listen(8082);
    }
});









