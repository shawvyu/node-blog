/**
 * Created by hxw on 2017/3/29.
 */

var mongoose=require('mongoose');
var contentSchema=require('../schemas/contents');

module.exports=mongoose.model('content',contentSchema);