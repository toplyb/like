import {config} from "../config";

const message = {
  1:"出现错误",
  1005:'appkey 错误'
}

class Http {
  request(params) {
    if (!params.method) {
      params.method = 'GET'
    }
    wx.request({
      url: config.api_base_url + params.url,
      header: {
        'appkey': config.appkey,
        'content-type': 'application/json'
      },
      method: params.method,
      data: params.data,
      success:(res) =>{
        let code = res.statusCode.toString()
        if (code.startsWith('2')) {
          params.success && params.success(res.data)
        } else {
          let errorCode = res.data.error_code
          this._showError(errorCode)
        }
      },
      fail:(res) => {
        this._showError(1)
      }
    })
  }

  _showError(errorCode){
    if (!errorCode) {
      errorCode = 1
    }
    wx.showToast({
      title:message[errorCode],
      icon:"none",
      duration:2000
    })
  }
}

export {Http}
