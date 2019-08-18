// axios 简单封装
var imageURL = 'http://172.16.93.93:5005/api/Public/DownLoadFile?FileName=' // 图片路径
// var packageURL = 'http://192.168.10.160:5002/appcenter/configinfo'
 var packageURL = 'http://172.16.93.93:5002/appcenter/configinfo' //请求接口地址
var newURL = 'http://192.168.10.38:5000'
//var token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImIzZDE3MGZiMjM2MzQ2MTkxZWI0ZTllNjBjMTIxNDMzIiwidHlwIjoiSldUIn0.eyJuYmYiOjE1NjE0NDI2MjMsImV4cCI6MTU2MTUyOTAyMywiaXNzIjoiaHR0cDovLzEyNy4wLjAuMTo1MDAyIiwiYXVkIjpbIldlU2FmZSIsImh0dHA6Ly8xMjcuMC4wLjE6NTAwMi9yZXNvdXJjZXMiXSwiY2xpZW50X2lkIjoiZmlyZURlcGFydG1lbnQtZnJvbnQiLCJzdWIiOiIyIiwiYXV0aF90aW1lIjoxNTYxNDQyNjIzLCJpZHAiOiJsb2NhbCIsInRlbmFudCI6IjEiLCJyb2xlcyI6IkFkbWluIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSJdfQ.NX2dc2xHlL_uEW7e3Ip46LBR7iKbeqJMiW4xgkigbWRd9wPyuY7qbLm1hxgyxypzlyamaAjpEGu_ALC3JuDR9bgaVoemzi0LUGKgS3kAQ36mbbeVT_HUI9XVxWRHvGpBiQDAb312YUX5w5LnwL30dSN319VnnUUsV77oqecOKI6Biu50cpAQ-36CjV_aXC_SICTRyte0WtlGgbZ2YoFRDNeykRaEx2lKye6XANwFQ-cqMbZxD5Qsw3pxcxg1BKE2quCrQCVo2-YKbSe-CxWnAeq4mX2Jaba07sUbytLZDCY6IgQOC4-A-gebwv0WxGfIAU9hHE12vZwScR54tmPmDA'

var token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImIzZDE3MGZiMjM2MzQ2MTkxZWI0ZTllNjBjMTIxNDMzIiwidHlwIjoiSldUIn0.eyJuYmYiOjE1NjIwMzU4NzksImV4cCI6MTU2MjEyMjI3OSwiaXNzIjoiaHR0cDovLzE5Mi4xNjguMTAuMzg6NTAwMiIsImF1ZCI6WyJXZVNhZmUiLCJodHRwOi8vMTkyLjE2OC4xMC4zODo1MDAyL3Jlc291cmNlcyJdLCJjbGllbnRfaWQiOiJ3ZXNhZmUtZnJvbnQiLCJzdWIiOiIxMDAiLCJhdXRoX3RpbWUiOjE1NjIwMzU4NzksImlkcCI6ImxvY2FsIiwidGVuYW50IjoiMSIsInJvbGVzIjpbIkFkbWluIiwiOGU2ZTEwMDc1MjQ2NDYwZjhiM2Q5MTgyMzhhMTA5MTMiXSwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSJdfQ.U0qm7iH1ShO3RIdjfah_HTaXcXeLUhxTcYnMs0fBSezk-ThUmjcZfZdEWiBkIQO03I7KDa2fLKy1ORSPnC-pzewOP2AvK3p39NeSGp17iyUB65H54mJJItkjoW9cBLuoTr11lMazsRX4MBgUV7gyvQMTmZKd9pAqv2jwaELPbKiek7_N3fk-bj7ap_9-8gfLwuAJk-oTrzYkAe00AYko6qQdM5jLc5g7ZOI4GRY5YE64ldvWa-qG-a3TdkkNxlnJX86roBiX2SJ8_xZxyUUfPMxN8OHX3VeJBz2nSKXR9h4opiCVxTOGymbAf3hWVvB-R3U6mL9xj4XFD6cOF9ZebA';



if (typeof Object.assign != 'function') {
  Object.assign = function (target) {
    'use strict';
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    target = Object(target);
    for (var index = 1; index < arguments.length; index++) {
      var source = arguments[index]; //拿到参数每一项
      if (source != null) {
        for (var key in source) {
          //深拷贝？
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
    }
    return target;
  };
}

//axios.create()是创建axios的实例方法，里面参数配置可自行配置
var instance = axios.create({
   //baseURL: '192.168.10.160:5002/api',
  // withCredentials: false,
  timeout: 5000,
  headers: {'Content-Type': 'application/json'}
})

instance.interceptors.request.use(
  function (config) {
    if (token) {
      //token设置

      Object.assign(config.headers, {'Authorization': token});
    }

    if (config.showLoading) {

    }

    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  function (res) {
    return res
  },
  function (error) {
    return Promise.reject(error.response)
  }
)

function _apiGet(url, params, set) {
  params = params || {}
  set = set || {}
  if (set.timeout === undefined) {
    set.timeout = 20000
  }
  if (set.showLoading === undefined) {
    set.showLoading = true
  }

  return new Promise(function (resolve, reject) {
    instance.get(url, {
      params: params,
      timeout: set.timeout,
      showLoading: set.showLoading,
    }).then(function (response) {
      resolve(response)
    }).catch(function (error) {
      reject(error)
    })
  })
}

function _apiPost(url, data, set) {
  data = data || {}
  set = set || {}
  if (set.timeout === undefined) {
    set.timeout = 20000
  }
  if (set.showLoading === undefined) {
    set.showLoading = true
  }

  return new Promise(function (resolve, reject) {
    instance.post(url, data, set).then(function (response) {
      resolve(response)
    }).catch(function (error) {
      reject(error)
    })
  })
}


function apiGet(url, params, set) {
  url = /^\//.test(url) ? url : '/' + url;// 如果地址有/就直接+url,无/就加上/url;

  return new Promise(function (resolve, reject) {
    if (sessionStorage.getItem('resourceUrl')) {
      _apiGet(sessionStorage.getItem('resourceUrl') + 'api' + url, params, set).then(function (response) {
        resolve(response)
      }).catch(function (error) {
        reject(error)
      })
      return
    }

    _apiGet(packageURL).then(function (_response) {
      var package = _response.data.package
      var resourceUrl = ''

      for (var i = 0; i < package.length; i++) {
        if (package[i].id == 'fireDepartmentWebApi') {
          resourceUrl = package[i].resourceUrl
        }
      }
      sessionStorage.setItem('resourceUrl', resourceUrl)

      _apiGet(resourceUrl + 'api' + url, params, set).then(function (response) {
        resolve(response)
      }).catch(function (error) {
        setTimeout(function () {
          reject(error)
        }, 3000)
      })

    }).catch(function (error) {
      reject(error)
    })
  })
}

function apiGet_new(url, params, set) {
  params = params || {}
  set = set || {}
  if (set.timeout === undefined) {
    set.timeout = 20000
  }
  if (set.showLoading === undefined) {
    set.showLoading = true
  }
  return new Promise(function (resolve, reject) {
    if (newURL) {
      instance.get(newURL+ url,  {
               params: params,
               timeout: set.timeout,
               showLoading: set.showLoading,
             }).then(function (response) {
        resolve(response)
      }).catch(function (error) {
        reject(error)
      })
    }
  })
}


function apiPost(url, data, set) {
  url = /^\//.test(url) ? url : '/' + url

  return new Promise(function (resolve, reject) {
    if (sessionStorage.getItem('resourceUrl')) {
      _apiPost(sessionStorage.getItem('resourceUrl') + 'api' + url, data, set).then(function (response) {
        resolve(response)
      }).catch(function (error) {
        reject(error)
      })
      return
    }

    _apiGet(packageURL).then(function (_response) {
      var package = _response.data.package
      var resourceUrl = ''

      for (var i = 0; i < package.length; i++) {
        if (package[i].id == 'fireDepartmentWebApi') {
          resourceUrl = package[i].resourceUrl
        }
      }
      sessionStorage.setItem('resourceUrl', resourceUrl)

      _apiPost(resourceUrl + 'api' + url, data, set).then(function (response) {
        resolve(response)
      }).catch(function (error) {
        setTimeout(function () {
          reject(error)
        }, 3000)
      })

    }).catch(function (error) {
      reject(error)
    })
  })
}
//apiGet_new  _apiGet
Vue.apiGet = apiGet
Vue.apiPost = apiPost
Vue.apiGet_new = apiGet_new
Vue._apiGet = _apiGet
Vue.prototype.apiGet = apiGet
Vue.prototype.apiPost = apiPost
Vue.prototype.apiGet_new = apiGet_new
Vue.prototype._apiGet = _apiGet
