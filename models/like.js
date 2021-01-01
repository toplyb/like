import {Http} from "../until/http";

class Like extends Http {
  like(behavior,artId,category) {
    let url = behavior == 'like'?'like':'like/cancel'
    this.request({
      url:url,
      method:'post',
      data:{
        art_id:artId,
        type:category
      }
    })
  }

  getClassicLikeStatus(artId,category,sCallback){
    this.request({
      url:'classic/' + category + '/' + artId + '/favor',
      success:sCallback
    })
  }
}

export {Like}
