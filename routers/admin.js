/**
 * Created by hxw on 2017/3/28.
 */
var express=require('express');
var router=express.Router();
var User=require('../models/user');
var Category=require('../models/category');

router.use(function (req,res,next) {
    if (!req.userInfo.isAdmin){
        //如果当前登录用户不是管理员
        res.send('对不起，只有管理员才可以进入后台管理');
        return;
    }
    next();
})


/**
 * 首页
 * */
router.get('/',function (req,res,next) {
    res.render('admin/index',{
        userInfo:req.userInfo
    });
});

/**
 * 用户管理
 * */
router.get('/user',function (req,res,next) {

    /**
     *
     * 从数据库中读取所有的用户数据
     *
     * limit(number) 限制获取数据的条数
     * skip(2)忽略数据的条数
     *
     * 每页显示两条
     * 1:1-2 skip(0) -> (当前页-1)*limit
     * 2:3-4 skip(2)
     * */
    var page=Number(req.query.page || 1);
    var limit=5;
    var pages=0;
    User.count().then(function (count) {
        console.log(count);
        //计算总页数
        pages=Math.ceil(count/limit);//向上取整
        //取值不超过pages
        page=Math.min(page,pages);
        //取值不小于1
        page=Math.max(page,1)
        var skip=(page-1)*limit;
        User.find().limit(limit).skip(skip).then(function (users) {
            console.log(users);
            res.render('admin/user_index',{
                userInfo:req.userInfo,
                users:users,
                count:count,
                page:page,
                pages:pages,
                limit:limit
            });
        })
    })




})

/*
* 分类首页
* */
router.get('/category',function (req,res) {
    res.render('admin/category_index',{
        userInfo:req.userInfo
    })
})
/*
 * 分类添加
 * */
router.get('/category/add',function (req,res) {
    res.render('admin/category_add',{

    })
})





module.exports=router;