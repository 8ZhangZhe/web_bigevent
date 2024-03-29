// 获取用户基本信息
function getUserInfo() {
  $.ajax({
    type: "GET",
    url: "/my/userinfo",
    // headers: {
    //   Authorization: localStorage.getItem("token"),
    // },
    success: (res) => {
      if (res.status !== 0) return layer.msg("获取用户信息失败！");
      layer.msg("获取用户信息成功！");
      //   console.log(res);
      renderAvatar(res.data);
    },
  });
}

// 渲染用户信息
const renderAvatar = (user) => {
  // console.log(user);
  let uname = user.nickname || user.username;
  // 渲染欢迎语
  $("#welcome").html(`欢迎 ${uname}`);
  // 按需渲染头像
  if (user.user_pic !== null) {
    // 设置图片头像
    $(".layui-nav-img").attr("src", user.user_pic);
    $(".text-avatar").hide();
  } else {
    // 设置文本头像
    $(".layui-nav-img").hide();
    $(".text-avatar").html(uname[0].toUpperCase());
  }
};

$("#btnlogout").click(() => {
  layer.confirm("是否残忍退出？", { icon: 3, title: "提示" }, function (index) {
    //do something
    localStorage.removeItem("token")
    location.href = "/login.html"
  });
});

getUserInfo();

// 文章发布后跳转到文章列表，实现高亮切换函数封装，后面js点击后调用
function change() {
  $("#change").attr("class","layui-this").next().attr("class","")
}
