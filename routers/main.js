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
        category:req.query.category || '',
        page:Number(req.query.page || 1),
        limit:1,
        pages:0,
        count:0,
        contents:[]
    }
    //where
    var where={};
    if(data.category){
        where.category=data.category;
    }

    //读取所有的分类信息
    Category.find().then(function (categories) {
        // console.log(rs);
        data.categories=categories;
        return Content.where(where).count().then(function (count) {
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
                })
    }).then(function (contents){
        data.contents=contents;
        console.log(data);
        res.render('main/index',data)
    })
});


module.exports=router;