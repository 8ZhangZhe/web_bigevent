$(function () {
  // 登录注册切换功能
  // 点击去注册账号 让登录框隐藏，注册框显示
  $("#link_reg").click(() => {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  // 点击去登录 让注册框隐藏，登录框显示
  $("#link_login").click(() => {
    $(".login-box").show();
    $(".reg-box").hide();
  });

  //   引入 form 模块
  const form = layui.form;
  const layer = layui.layer;

  //   自定义校验规则
  form.verify({
    // 密码校验规则
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    // 确认密码校验规则
    repwd: (value) => {
      // 1.获取当前输入的值
      // 2.获取密码框的值
      // 3.两者进行判断
      // 4.两次输入不一致，提示消息
      const pwd = $("#form_reg [name=password]").val();
      if (pwd !== value) return "两次密码不一致！";
    },
  });

  //   设置 baseurl
//   const baseUrl = "http://www.liulongbin.top:3007";

  //   注册功能
  $("#form_reg").on("submit", (e) => {
    //   阻止默认提交事件
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/api/reguser",
      data: {
        username: $("#form_reg [name=username]").val(),
        password: $("#form_reg [name=password]").val(),
      },
      success: (res) => {
        console.log(res);
        if (res.status !== 0) return layer.msg(res.message);
        layer.msg("注册成功！");
        // 模拟点击跳转登录
        $("#link_login").click();
      },
    });
  });

  // 登录功能
  $('#form_login').on('submit', function(e) {
    //   阻止默认提交事件
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: '/api/login',
        data: $(this).serialize(),
        // username=zhangzhe&password=123456
        success: (res) => {
            console.log(res);
            if(res.status !== 0) return layer.msg("登陆失败！")
            layer.msg("登陆成功！")
            // 登陆成功之后把 token 令牌存放在本地
            localStorage.setItem("token",res.token)
            // 跳转到主页
            // location.href = "/index.html"
            console.log(location.search);  //?username=zhangzhe&password=123456
        }
    })

  })

});
