/**
 * Created by hxw on 2017/3/28.
 */
var express=require('express');
var router=express.Router();
var Category=require('../models/category');
var Content=require('../models/content');

/*
*
* 首页
* */
router.get('/',function (req,res) {
    //用来保存说要数据
    var data={
        userInfo:req.userInfo,
        categories:[],
        page:Number(req.query.page || 1),
        limit:5,
        pages:0,
        count:0,
        contents:[]
    }
    //读取所有的分类信息
    Category.find().then(function (categories) {
        // console.log(rs);
        data.categories=categories;
        return Content.count().then(function (count) {
                    // console.log(count);
                    data.count=count;
                    //计算总页数
                    data.pages=Math.ceil(data.count/data.limit);//向上取整
                    //取值不超过pages
                    data.page=Math.min(data.page,data.pages);
                    //取值不小于1
                    data.page=Math.max(data.page,1)
                    var skip=(data.page-1)*data.limit;

                   return Content.find().limit(data.limit).skip(skip).populate(['category','user'])
                })
    }).then(function (contents){
        data.contents=contents;
        console.log(data);
        res.render('main/index',data)
    })
});


module.exports=router;