import CryptoJS from 'crypto-js';


// AES加密
export function AesEncryption(values,aesKey){
  let key = aesKey?aesKey(aesKey):CryptoJS.enc.Utf8.parse("8NONwyJtHesysWpM");
  let plaintText = values; // 明文
  let encryptedData = CryptoJS.AES.encrypt(plaintText, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
  });
  return encryptedData;
}

// AES解密
export function AesDecrypt(value,aesKey){
  let key = aesKey?aesKey(aesKey):CryptoJS.enc.Utf8.parse("8NONwyJtHesysWpM");
  let decryptedData = CryptoJS.AES.decrypt(value, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
  });
  let decryptedStr = decryptedData.toString(CryptoJS.enc.Utf8);
  return decryptedStr;
}

// 获取地址栏信息
export function GetQueryString(name){
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if(r!=null)return  decodeURI(r[2]); return null;
}
