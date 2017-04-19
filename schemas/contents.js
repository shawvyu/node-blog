/**
 * Created by hxw on 2017/3/28.
 */
var  mongoose=require('mongoose');

//内容表结构
module.exports=new mongoose.Schema({
    //关联字段-内容分类的id
    category:{
        //类型
        type:mongoose.Schema.Types.ObjectId,
        //引用
        ref:'category'
    },

    //标题
    title:String,
    //简介
    description:{
        type:String,
        default:''
    },
    //内容
    content:{
        type:String,
        default:''
    }

})