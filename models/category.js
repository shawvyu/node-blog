/**
 * Created by hxw on 2017/3/29.
 */

var mongoose=require('mongoose');
var categorySchema=require('../schemas/categories');

module.exports=mongoose.model('Category',categorySchema);