//chat.js

let app = getApp();

Page({
  data: {
    a: "猜,这是谁!",
    imgUrls: [
      'http://7xlotq.com1.z0.glb.clouddn.com/o_1bii8333f128bcrkk1t0csoj9.jpg',
      'http://7xlotq.com1.z0.glb.clouddn.com/o_1bii8geta10rb19bosj54uqbfae.jpg',
      'http://7xlotq.com1.z0.glb.clouddn.com/o_1bii8m9a29afc15k0atcb1hrmj.jpeg',
      'http://orkfwj2rc.bkt.clouddn.com/baoqin/image/%E8%B5%AB%E8%90%9Dj.jpg',
    ],
    text_array: [],
    text_area: "",
    loading: false,
    userInfo: {},
  },
  swiper_change: function () {
    let arr = ["这是赫萝", '这还是赫萝', '还是我的赫萝'];
    let i = Math.floor(Math.random() * 3);
    this.setData({
      a: arr[i]
    })
  },
  onLoad: function () {
    app.wilddog_ref.child('message_with_name').on('child_added', snapshot => {
      this.data.text_array.unshift(snapshot.val())
      this.setData({
        text_array: this.data.text_array,
        loading: false,
      })
    });
    app.getUserInfo(userInfo=>{
      this.setData({
        userInfo:userInfo
      })
    })
  },
  submit: function () {
    setTimeout(() => {
      if (this.data.text_area !== "") {
        this.setData({
          loading: true
        }),
        app.wilddog_ref.child('message_with_name').push({
          text : this.data.text_area,
          userInfo : this.data.userInfo,
        });
        this.setData({
          text_area: ""
        })
      }
    }, 0)
  },
  textareaVal: function (e) {
    let text = e.detail.value;
    if (text !== "") {
      this.setData({
        text_area: text,
      })
      console.log('this.data.text_area',this.data.text_area)
    }
  }
})