/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios';
import QS from 'qs';
import {devuri} from './host';
import {message} from 'antd';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 环境切换
 * **/ 
// eslint-disable-next-line
if(process.env.NODE_ENV == 'development'){
  axios.defaults.baseURL = devuri;
  // eslint-disable-next-line
}else if(process.env.NODE_ENV == 'debug'){
// eslint-disable-next-line
}else if(process.env.NODE_ENV=='production'){
  axios.defaults.baseURL = devuri
}

/**
 * 请求超时时间
 * **/
axios.defaults.timeout = 10000;

/**
 * 默认false
 * 跨域访问需要发送cookie时一定要加axios.defaults.withCredentials = true;
 * **/
axios.defaults.withCredentials=false;

/**
 * post请求头
**/
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

/**
 * 请i去拦截
 **/

// axios.interceptors.request.use(
//   config=>{
//     console.log(config,'请求拦截')
//     // 如果是base的话那么不需要token直接发送请求
//     if (config.url.indexOf("/user/oauthBasic") !== -1){
//       return config;
//     }
//     // 请求的时候有token 就加上token
//     const token = localStorage.getItem('Token');
//     token && (config.headers.Authorization = token);
//     console.log('intercrptors-request: ', token && (config.headers.common["token"] = token))
//     return config;
//   },
//   error => {
//     if (error.message.includes('timeout')){
//       return Promise.error(error);    
//     }
//   }
// )

/**
 * 响应拦截器
 * **/

// axios.interceptors.response.use(
//   response => {
//     if(response.status === 200){
//       if(response.data.code === 10000){
//         sessionStorage.setItem('code',10000)
//         window.location='./login';
//         return false;
//       }
//       return Promise.resolve(response);
//     }else{
//       return Promise.reject(response);
//     }
//   },
//   error => {
//     let originalRequest = error.config; // 请求超时处理
//     if(error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1 && !originalRequest._retry){
//       message.info('服务器繁忙，请稍后重试');
//       return Promise.error(error);  
//     }
//     if(error.response.status) {
//       switch (error.response.status){
//         case 401:
//           localStorage.clear();
//           sessionStorage.clear();
//           window.location='/login';
//           break;
//         default: 
//           return Promise.reject(error.response);
//       }
//     }
//   }
// )


//生成随机字符串
// function randomString(len) {
//   len = len || 32;
//   /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
//   var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
//   var maxLen = $chars.length;
//   var str = '';
//   for (let i = 0; i < len; i++) {
//       str += $chars.charAt(Math.floor(Math.random() * maxLen));
//   }
//   return str;
// }

// //无需校验的请求类型
// const typeArr = ['getPublicKey'];
// //排除不需要加密的请求类型
// function validateType(requestType) {
//   let result = true;
//   typeArr.forEach(value => {
//     if (requestType === value) {
//       result = false;
//       return result;
//     }
//   });
//   return result;
// }

//AES加密
// function encrypt(word,keyStr){
//   //生成密钥，如果密钥值为空则使用默认值
//   keyStr = keyStr ? keyStr : "abcdefgabcdefg12";
//   //执行加密
//   var key = CryptoJS.enc.Utf8.parse(keyStr);//Latin1 w8m31+Yy/Nw6thPsMpO5fg==
//   var srcs = CryptoJS.enc.Utf8.parse(word); // word 是参数列表 userName=yangyusen&password=17621576875
//   var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
//   return encrypted.toString();
// }

// //  对请求报文加密
// axios.interceptors.request.use(
//   request => {
//     // console.log(request)
//     /*第一步：校验当前请求类型是否需要加密*/
//     //获取请求头
//     var requestUrl = request.url;
//     var requestObj = Object.assign({},request)
//     console.log(requestUrl)
//     // console.log(requestObj)
//     console.log(requestObj.data,requestObj.params)
//     var requestType = requestUrl.substr(requestUrl.lastIndexOf("/") + 1, requestUrl.length);
//     //校验请求类型是否需要加密
//     if (validateType(requestType)) {
//       /*第二步：对报文进行AES加密*/
//       //生成AES密钥
//       var secreatKey = randomString(16);
//       //获取参数列表，转化为JSON
//       var dataList = '';
//       // debugger
//       if(request.method === 'post'){
//           // dataList = request.data; // dataList 值形式 'uesrName=kkk&password=2222'
//           if(request.data){
//             dataList = encodeURIComponent(JSON.stringify(request.data));
//           }
//       }else{
//           // var keyArr = Object.keys(request.params);
//           // var str = '';
//           // for(let item of keyArr){
//           //     str = item + '=' + request.params[item] + '&';
//           // }
//           // dataList = str; // dataList 值形式 'attachType=introductionProcessAttach&'
//           if(request.params){
//             dataList = JSON.stringify(request.params);
//           }
//       }
//       // if(request.data){
//       //   dataList = JSON.stringify(request.data);
//       // }
//       //对参数列表进行AES加密
//       var encodeDataList = encrypt(dataList,secreatKey);
//       if(request.method === 'post'){
//           encodeDataList = encodeDataList.replace(/\+/g,'%2B')
//           // encodeDataList = encodeURIComponent(encodeDataList) 
//       }
      
//       //将加密后的参数列表存入请求头
//       // request.headers['cipherText'] = encodeDataList;
//       /*第三步：对AES密钥进行RSA加密*/
//       //获取本地存储的公钥
//       const publicKey = localStorage.getItem("publicKey");
//       // if(!publicKey){
//       //   return false;
//       // }
//       // const publicKey = Base64_decode(localStorage.getItem("publicKey"));
//       //新建加密工具对象
//       const encryptor = new JSEncrypt();
//       //设置公钥
//       encryptor.setPublicKey(publicKey);
//       //对AES密钥数据进行RSA加密
//       var ParamKey = encryptor.encrypt(secreatKey);
//       //校验加密是否成功

//       if (!ParamKey) {
//         // message.warning('公钥非法')  领导要求不要提示语
//         return false;
//       } else {
//         //将密文存入请求头
//         request.headers['paramKey'] = ParamKey;
//       //   request.headers['encodeData'] = encodeDataList;
//         //将加密后的报文存入请求体
//       //   request.data = encodeDataList;
//       if(request.method === 'post'){
//           request.data = 'requestData='+encodeDataList;
//       }else{
//           request.params = {requestData: encodeDataList};
//       }
//         return request;
//       }
//     }
//     return request;
//   }
// );

/** 
 * post方法，对应post请求 
 */
export const $post = (url, ...params) => {
  return new Promise((resolve, reject) => {
    axios.post(url, QS.stringify(...params))
    .then(res => {
      console.log(res.data)
      resolve(res.data);
    })
    .catch(err => {
      console.log(err.data)
      reject(err.data)
    })
  });
}


/** 
 * get方法，对应get请求 
 */
export const $get = (url, ...params) => {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
    .then(res => {
      // console.log('res')
      resolve(res.data);
    })
    .catch(err => {
      // console.log('err')
      reject(err.data)
    })
  });
}

/**
 * 
 * @param {string} url 
 * @param { Image.files[0] } fils  
 */
export const $form = (url, file) => {
  // let file = e.target.files[0];           
  let param = new FormData(); //创建form对象
  param.append('tweetPic', file, file.name);//通过append向form对象添加数据     
  let config = {
      headers: { 'Content-Type': 'multipart/form-data' }
  };
  axios.post(url, param, config)
  .then(response => {
    console.log(response.data);
  })
}


export default function request (opt) {

  // 存在请求，但是服务器的返回一个状态码，它们都在2xx之外

  // 调用 axios api，统一拦截
  return axios(opt)
    .then((response) => {
      console.log(`【${opt.method} ${opt.url}】请求成功，响应数据：%o`, response);

      return response.data;
    })
    .catch((error) => {
      console.log(error)
      // 响应时状态码处理 
      const status = error.response.status;
      const errortext = codeMessage[status] || error.response.statusText;

      message.error(`请求错误 ${status}` + errortext)
        
    })
}