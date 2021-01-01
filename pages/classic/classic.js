// pages/classic/classic.js
import {Classic} from "../../models/classic";
import {Like} from "../../models/like";

let classicModel = new Classic()
let LikeModel = new Like()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    latest: true,
    first: false,
    likeCount:0,
    likeStatus:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest((res) => {
      this.setData({
        classic: res,
        likeStatus:res.like_status,
        likeCount:res.fav_nums
      })
    })
  },

  onLike(event) {
    let behavior = event.detail.behavior
    LikeModel.like(behavior, this.data.classic.id, this.data.classic.type)
  },

  onPrevious() {
    this._updateClassic('previous')
  },

  onNext() {
    this._updateClassic('next')
  },

  _updateClassic(type){
    let index = this.data.classic.index
    classicModel.getClassic(index, type,(res) => {
      this._getLikeStatus(res.id,res.type)
      this.setData({
        classic: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      })
    })
  },

  _getLikeStatus(artId,category){
    LikeModel.getClassicLikeStatus(artId,category,(res) => {
      this.setData({
        likeStatus:res.like_status,
        likeCount:res.fav_nums
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
