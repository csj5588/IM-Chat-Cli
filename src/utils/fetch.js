import fetch from "isomorphic-fetch";

const codeMessage = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。",
};

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  const error = new Error(response.statusText);
  error.status = response.status;
  error.errCode = response.errCode!=null?response.errCode:response.status;
  error.errortext = errortext;
  throw error;
}

function parseJSON(response) {
  return response.json();
}

export const request = (url, options) => {
  const newOptions = {
    // credentials: "include",
    credentials: "same-origin",
    mode: "cors",
    ...options,
    headers: {
      "x-requested-with": "XMLHttpRequest",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(options.headers || {}),
    },
  };
  return fetch(url, newOptions)
    .then(checkStatus)
    .then(parseJSON);
};

function getError(option, xhr) {
  const msg = `cannot post ${option.action} ${xhr.status}'`;
  const err = new Error(msg);
  err.status = xhr.status;
  err.method = "post";
  err.url = option.action;
  return err;
}

function getBody(xhr) {
  const text = xhr.responseText || xhr.response;
  if (!text) {
    return text;
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}

/**
 * 发送文件的请求
 * action: 目标地址
 * headers: 请求头信息
 * withCredentials: 是否需要认证，布尔值
 * onProgress: 监听onProgress的回调。
 * onError: 监听出错的回调。
 * onSuccess: 监听成功的回调。
 * data: 传递需要POST的数据。
 * file: 传递要上传的文件对象。
 * @param {Object}
 */
export const uploadFile = option => {
  const xhr = new XMLHttpRequest();

  if (option.onProgress && xhr.upload) {
    xhr.upload.onprogress = function progress(e) {
      if (e.total > 0) {
        // eslint-disable-next-line no-param-reassign
        e.percent = (e.loaded / e.total) * 100;
      }
      option.onProgress(e);
    };
  }
  const formData = new FormData();
  if (option.data) {
    Object.keys(option.data).forEach(key => {
      formData.append(key, option.data[key]);
    });
  }
  formData.append("file", option.file);
  xhr.onerror = function error(e) {
    option.onError(e);
  };
  xhr.onload = function onload() {
    if (xhr.status < 200 || xhr.status >= 300) {
      return option.onError(getError(option, xhr), getBody(xhr));
    }
    option.onSuccess(getBody(xhr), xhr);
  };
  xhr.open("post", option.action, true);
  if (option.withCredentials && "withCredentials" in xhr) {
    xhr.withCredentials = true;
  }
  const headers = option.headers || {};
  if (headers["X-Requested-With"] !== null) {
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  }
  Object.keys(headers).forEach(h => {
    xhr.setRequestHeader(h, headers[h]);
  });
  xhr.send(formData);
  return {
    abort() {
      xhr.abort();
    },
  };
};
