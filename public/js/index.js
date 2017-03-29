/**
 * Created by hxw on 2017/3/29.
 */
$(function () {
    var loginBox=$('#loginBox');
    var registerBox=$('#registerBox');

    //显示注册，隐藏登录
    loginBox.find('a').on('click',function () {
        registerBox.show();
        loginBox.hide();
    });
    //显示登录，隐藏注册
    registerBox.find('a').on('click',function () {
        loginBox.show();
        registerBox.hide();
    })

    //注册
    registerBox.find('button').on('click',function () {
        //通过ajax提交数据
        $.ajax({
            type:'post',
            url:'/api/user/register',
            data:{
                username:registerBox.find('[name="username"]').val(),
                password:registerBox.find('[name="password"]').val(),
                repassword:registerBox.find('[name="repassword"]').val()
            },
            dataType:'json',
            success:function (result) {
               registerBox.find('.message').html(result.message);
                if (!result.code){
                    //注册成功
                    setTimeout(function () {
                        loginBox.show();
                        registerBox.hide();
                    },1000)
                }
            }
        })
    })
})