/**
 * Created by hxw on 2017/3/28.
 */
var express=require('express');
var router=express.Router();
var Category=require('../models/category');
var Content=require('../models/content');

//用来保存说要数据
var data;
/*
* 通过中间件的形式来获取公用数据
* */
router.use(function (req,res,next) {
    data={
        userInfo:req.userInfo,
        categories:[]
    }
    //读取所有的分类信息
    Category.find().then(function (categories) {
        data.categories=categories;
        next();
    })
})


/*
*
* 首页
* */
router.get('/',function (req,res) {
    data.category=req.query.category || '';
    data.page=Number(req.query.page || 1);
    data.limit=5;
    data.pages=0;
    data.count=0;
    data.contents=[];

    //where
    var where={};
    if(data.category){
        where.category=data.category;
    }
    Content.where(where).count().then(function (count) {
        // console.log(count);
        data.count=count;
        //计算总页数
        data.pages=Math.ceil(data.count/data.limit);//向上取整
        //取值不超过pages
        data.page=Math.min(data.page,data.pages);
        //取值不小于1
        data.page=Math.max(data.page,1)
        var skip=(data.page-1)*data.limit;

        return Content.where(where).find().limit(data.limit).skip(skip).populate(['category','user'])
    }).then(function (contents){
        data.contents=contents;
        console.log(data);
        res.render('main/index',data)
    })


});

/*
*
* */
router.get('/views',function (req,res) {
    var contentid=req.query.contentid || '';
    Content.findOne({
        _id:contentid
    }).populate(['category','user']).then(function (content) {
        data.content=content;
        content.views++;
        content.save();
        console.log(data);
        res.render('main/views',data)
    })
})




module.exports=router;