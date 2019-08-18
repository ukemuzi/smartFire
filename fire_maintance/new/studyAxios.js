// 从浏览器中创建 XMLHttpRequests
// 从 node.js 创建 http 请求
// 支持 Promise API
// 拦截请求和响应
// 转换请求数据和响应数据
// 取消请求
// 自动转换 JSON 数据
// 客户端支持防御 XSRF


//安装或引入（cdn或本地）
//get请求
axios.get('/user?id=123').then(function(response){
    console.log(response);  //
})
.catch(function(error){
    console.log(error);
});

//等同于下面的
axios.get('/user',{
    params:{
        id:123
    }
}).then(function(response){
    console.log(response);
})
.catch(function(error){
    console.log(error);
})

//post请求
axios.post('/user',{
    firstName:'Fred',
    last:'Ann'
})
.then(function(response){
    console.log(response);
})
.catch(function(error){
    console.log(error);
})

//执行多个并发请求
function getUserAccont(){
    return axios.get('/user/123');
}
function getUserPermission(){
    return axios.get('/user/123/permission');
}
axios.all([getUserAccont(),getUserPermission()])
    .then(axios.spread(function(acct,perms){
        //2个请求现在都执行完成
    }))

//axios API
//axios(config);  传递配置创建请求
//post
axios({
    method:'post',
    url:'/user/123',
    data:{
        fistName:'Fred',
        lastName:'Ann'
    }
})

//axios(url[, config])

//自定义配置新建一个axios实例   axios.create([config])
var instance = axios.create({
    baseURL:'http://some/api',  //请求服务器的根路径，在每次请求的url之前加入的
    method:'get',  //默认是get
    timeout:1000, //指定请求超时的时间。超过该时间了，请求将被中断
    headers:{'Content-Type':'application/json'},  //即将被发送的自定义请求头
    transformResponse:[function(data){
        //允许对data进行转换处理
        return data;
    }],
    params:{
        id:123  //和请求一起发送的URL参数
    },
    responseType:'json',  //默认是，可以设置blob arrayBuffer  text等
})

//全局的axios默认值
axios.defaults.baseURL = 'http://api';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//在axios.create()创建了实例后可以修改默认值


//拦截器 ：  在请求或相应被then 或catch处理之前先拦截
//添加请求拦截器
axios.interceptors.request.use(function(config){
    //在发送请求之前要做的 ,配置token
    return config;
},function(error){
  //  console.log(error);
    return Promise.reject(error);
})

//添加响应拦截器
axios.interceptors.response.use(function(response){
   //对响应数据做的
    return response;
},function(error){
    //
    return Promise.reject(error);
})




















