import {Http} from "../until/http";

class Classic extends Http {
  getLatest(sCallback) {
    this.request({
      url: 'classic/latest',
      success: (res) => {
        sCallback(res)
        this._setLatestIndex(res.index)
        let key = this._getKey(res.index)
        wx.setStorageSync(key, res)
      }
    })
  }

  getClassic(index, nextOrPrevious, sCallback) {
    let key = nextOrPrevious == 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
    let classic = wx.getStorageSync(key)
    if (!classic) {
      let url = 'classic/' + index + '/' + nextOrPrevious
      this.request({
        url: url,
        success(res) {
          wx.setStorageSync('classic-' + res.index, res)
          sCallback(res)
        }
      })
    } else {
      sCallback(classic)
    }

  }

  isFirst(index) {
    return index == 1 ? true : false
  }

  isLatest(index) {
    let latestIndex = this._getLatestIndex()
    return index == latestIndex ? true : false
  }

  _setLatestIndex(index) {
    wx.setStorageSync('latest-index', index)
  }

  _getLatestIndex() {
    return wx.getStorageSync('latest-index')
  }

  _getKey(index) {
    return 'classic-' + index
  }
}

export {Classic}
