$(function () {
  const form = layui.form;
  // 自定义校验规则
  form.verify({
    nickname: (val) => {
      if (val.length > 6) return "昵称长度必须在 1 ~ 6 个字符之间！";
    },
  });

  const layer = layui.layer;
  // 获取用户数据
  const initUserinfo = () => {
    $.ajax({
      type: "GET",
      url: "/my/userinfo",
      success: (res) => {
        if (res.status !== 0) return layer.msg("获取用户信息失败！");
        // console.log(res);
        // 调用 form.val() 方法为表单赋值
        form.val("formUserInfo", res.data);
      },
    });
  };

  // 重置功能
  $("#btnReset").click((e) => {
    e.preventDefault();
    initUserinfo();
  });

  // 更新用户信息
  $(".layui-form").submit(function (e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "/my/userinfo",
        data: $(this).serialize(),
        success: (res) => {
            // console.log(res);
            if(res.status !== 0) return layer.msg("修改用户信息失败！")
            // 调用父页面渲染函数,调用 父页面 的函数，渲染欢迎语
            window.parent.getUserInfo()
        }
    })
  });

  initUserinfo();
});
