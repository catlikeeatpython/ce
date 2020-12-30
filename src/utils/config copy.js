/**axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios';
// import QS from 'qs';
import CryptoJS from 'crypto-js';
import { JSEncrypt } from 'jsencrypt';

// import { Base64_decode } from './utils';
import { devUri } from "../host";

import { message } from 'antd';

// 环境的切换
if (process.env.NODE_ENV === 'development') {    
  // "proxy": "http://dev.upcsd.net:1080",
    axios.defaults.baseURL = devUri;
} else if (process.env.NODE_ENV === 'debug') {    
    axios.defaults.baseURL = '';
} else if (process.env.NODE_ENV === 'production') {    
    axios.defaults.baseURL = devUri;
}

// 请求超时时间
axios.defaults.timeout = 60000;

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截器
axios.interceptors.request.use(    
    config => {
        const Token = localStorage.getItem("Token");
        if(config.url.indexOf("/user/login") !== -1){
            return config;    
        }
        if(Token){
            config.headers.Authorization = Token;
        }
        return config;
    },    
    error => {            
        return Promise.error(error);    
})


// let alterModal = true;
// 响应拦截器
axios.interceptors.response.use(    
    response => {        
        if (response.status === 200) { 
          if(response.data.code === 10000 ){ // 当后端更新版本时 接口返回code=10000 需重新登录
            sessionStorage.setItem('code',10000);
            window.location="/login";
            return false;
          }
          return Promise.resolve(response);        
        } else {            
          return Promise.reject(response);        
        }    
    },
    error => { 
        var originalRequest = error.config; //请求超时处理
        // var reLogin = sessionStorage.getItem('reLogin'); 
        if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1 && !originalRequest._retry ) {
            // originalRequest._retry = true;
            message.error('服务器繁忙，请稍后重试');
            return Promise.error(error);  
        }        
        if (error.response.status) { 
            switch (error.response.status) {                
                // 401: 未登录                
                // 未登录则跳转登录页面，并携带当前页面的路径                
                // 在登录成功后返回当前页面，这一步需要在登录页操作。                
                case 401:                    
                    localStorage.clear();
                    sessionStorage.clear();
                    // this.props.history.push("/login");
                    window.location="/login";
                    
                    // if(alterModal){
                    //     alterModal = false;
                    //     Modal.warning({
                    //         title: '登录状态提示',
                    //         content: '登录过期，请重新登录',
                    //         okText: '确认',
                    //         onOk() {
                    //           window.location="/login";
                    //           return;
                    //         },
                    //       });
                    // }

                    // if(!reLogin){
                    //     message.warning('登录过期，需重新登录');
                    //     sessionStorage.setItem('reLogin','1');
                    // }

                    // setTimeout(()=>{
                    //     sessionStorage.removeItem('reLogin');
                    //     window.location="/login";
                    // },1000);
                    break;             
                default:                            
                    return Promise.reject(error.response);           
            }            
        }       
    }

);

//生成随机字符串
function randomString(len) {
    len = len || 32;
    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxLen = $chars.length;
    var str = '';
    for (let i = 0; i < len; i++) {
        str += $chars.charAt(Math.floor(Math.random() * maxLen));
    }
    return str;
}
  
  //无需校验的请求类型
  const typeArr = ['getPublicKey'];
  //排除不需要加密的请求类型
  function validateType(requestType) {
    let result = true;
    typeArr.forEach(value => {
      if (requestType === value) {
        result = false;
        return result;
      }
    });
    return result;
  }
  
  //AES加密
  function encrypt(word,keyStr){
    //生成密钥，如果密钥值为空则使用默认值
    keyStr = keyStr ? keyStr : "abcdefgabcdefg12";
    //执行加密
    var key = CryptoJS.enc.Utf8.parse(keyStr);//Latin1 w8m31+Yy/Nw6thPsMpO5fg==
    var srcs = CryptoJS.enc.Utf8.parse(word); // word 是参数列表 userName=yangyusen&password=17621576875
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    return encrypted.toString();
  }
  
  //  对请求报文加密
  axios.interceptors.request.use(
    request => {
      // console.log(request)
      /*第一步：校验当前请求类型是否需要加密*/
      //获取请求头
      var requestUrl = request.url;
      var requestObj = Object.assign({},request)
      console.log(requestUrl)
      // console.log(requestObj)
      console.log(requestObj.data,requestObj.params)
      var requestType = requestUrl.substr(requestUrl.lastIndexOf("/") + 1, requestUrl.length);
      //校验请求类型是否需要加密
      if (validateType(requestType)) {
        /*第二步：对报文进行AES加密*/
        //生成AES密钥
        var secreatKey = randomString(16);
        //获取参数列表，转化为JSON
        var dataList = '';
        // debugger
        if(request.method === 'post'){
            // dataList = request.data; // dataList 值形式 'uesrName=kkk&password=2222'
            if(request.data){
              dataList = encodeURIComponent(JSON.stringify(request.data));
            }
        }else{
            // var keyArr = Object.keys(request.params);
            // var str = '';
            // for(let item of keyArr){
            //     str = item + '=' + request.params[item] + '&';
            // }
            // dataList = str; // dataList 值形式 'attachType=introductionProcessAttach&'
            if(request.params){
              dataList = JSON.stringify(request.params);
            }
        }
        // if(request.data){
        //   dataList = JSON.stringify(request.data);
        // }
        //对参数列表进行AES加密
        var encodeDataList = encrypt(dataList,secreatKey);
        if(request.method === 'post'){
            encodeDataList = encodeDataList.replace(/\+/g,'%2B')
            // encodeDataList = encodeURIComponent(encodeDataList) 
        }
        
        //将加密后的参数列表存入请求头
        // request.headers['cipherText'] = encodeDataList;
        /*第三步：对AES密钥进行RSA加密*/
        //获取本地存储的公钥
        const publicKey = localStorage.getItem("publicKey");
        // if(!publicKey){
        //   return false;
        // }
        // const publicKey = Base64_decode(localStorage.getItem("publicKey"));
        //新建加密工具对象
        const encryptor = new JSEncrypt();
        //设置公钥
        encryptor.setPublicKey(publicKey);
        //对AES密钥数据进行RSA加密
        var ParamKey = encryptor.encrypt(secreatKey);
        //校验加密是否成功

        if (!ParamKey) {
          // message.warning('公钥非法')  领导要求不要提示语
          return false;
        } else {
          //将密文存入请求头
          request.headers['paramKey'] = ParamKey;
        //   request.headers['encodeData'] = encodeDataList;
          //将加密后的报文存入请求体
        //   request.data = encodeDataList;
        if(request.method === 'post'){
            request.data = 'requestData='+encodeDataList;
        }else{
            request.params = {requestData: encodeDataList};
        }
          return request;
        }
      }
      return request;
    }
  );



/** 
 * get方法，对应get请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
// export const $get =(url,...params)=>{    
//     return new Promise((resolve, reject) =>{        
//         axios.get(url, {            
//             params: params        
//         })        
//         .then(res => {            
//             resolve(res.data);        
//         })        
//         .catch(err => {            
//             reject(err.data)        
//         })    
//     });
// }

export const $get = (url,params)=>{    
    return new Promise((resolve, reject) =>{        
        axios.get(url, { params: params })        
        .then(res => {            
            resolve(res.data);        
        })        
        .catch(err => {            
            reject(err.data)        
        })    
    });
}
/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export const $post = (url,params) =>{    
    return new Promise((resolve, reject) => {         
        axios.post(url, params)        
        .then(res => {            
            resolve(res.data);        
        })        
        .catch(err => {            
            reject(err.data)        
        })    
    });
}

// export const $post = (url,...params) =>{    
//   return new Promise((resolve, reject) => {         
//       axios.post(url, QS.stringify(...params))        
//       .then(res => {            
//           resolve(res.data);        
//       })        
//       .catch(err => {            
//           reject(err.data)        
//       })    
//   });
// }


/**
 * 请求不需要qs的情况
 */
export const $http=(url,params)=>{
    return new Promise((resolve,reject)=>{
       axios.post(url,params)
       .then(res=>{
         resolve(res.data)
       })
       .catch(err=>{
         reject(err.data)
       })
    })
  }
  
export default {
    $http,
    $post,
    $get,
}