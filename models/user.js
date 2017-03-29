/**
 * Created by hxw on 2017/3/29.
 */

var mongoose=require('mongoose');
var userSchema=require('../schemas/users');

module.exports=mongoose.model('user',userSchema);