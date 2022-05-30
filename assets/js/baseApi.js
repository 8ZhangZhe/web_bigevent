// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter((options) => {
    // console.log(option.url);
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = `http://www.liulongbin.top:3007` + options.url; 

    // 为 /my/ 相关接口注入 token
    // includes():方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回 false  
    // indexOf():方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1
    if(options.url.includes("/my/")) {
        options.headers = {
            Authorization: localStorage.getItem("token"),
          }
    }

    // 每次发送请求回来校验 token 是否存在，或者是否过期
    options.complete = (res) => {
        if(
            res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！"
        ) {
            // 1. 强制清空 token
            localStorage.removeItem("token")
            // 2. 跳转登录页面
            location.href = "/login.html"
        }
    }
});