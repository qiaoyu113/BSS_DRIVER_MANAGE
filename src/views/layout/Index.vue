<template>
  <div class="index">
    <van-nav-bar :title="title">
      <template #right>
        <div class="navBarTit">
          <van-dropdown-menu>
            <van-dropdown-item v-model="value" :options="option" />
          </van-dropdown-menu>
        </div>
      </template>
    </van-nav-bar>
    <div class="list-wrap">
      <div class="van-title">
        工作台
      </div>
      <van-grid>
        <van-grid-item icon="user-o" text="客户管理" @click="handleCustomClick" />
        <van-grid-item icon="notes-o" text="项目管理" />
        <van-grid-item icon="cluster-o" text="线路管理" />
        <van-grid-item icon="logistics" text="拼线" />
      </van-grid>
      <div class="van-title">
        数据看板
      </div>
    </div>
    <footer-tabbar />
  </div>
</template>
<script>
import { Tabbar, TabbarItem, Toast, Tab, Tabs, Grid, GridItem } from 'vant'
// import { fetchList } from '@/api/clue'
import FooterTabbar from '@/components/FooterTabbar'
import 'vo-pages/lib/vo-pages.css'
export default {
  name: 'Index',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Toast.name]: Toast,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    FooterTabbar
  },
  data() {
    return {
      listQuery: {
        key: '',
        page: 1,
        limit: 100,
        endDate: '',
        appletSource: '',
        startDate: '',
        expandManager: '',
        clueType: '',
        carType: '',
        isSettledIn: '',
        workCity: '',
        sourceType: '',
        isPayDeposit: '',
        state: '1'
      },
      active: 1,
      list: [],
      total: 0,
      page: 1,
      loadedAll: false,
      option: [
        { text: '线路云', value: 0 },
        { text: '司机云', value: 1 },
        { text: '试跑', value: 2 }
      ],
      value: 0
    }
  },
  computed: {
    title() {
      return this.$route.meta.title;
    }
  },
  mounted() {
    // const wx = window.wx;
    // this.getList()
    // wx.config({
    //   beta: true,
    //   debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //   appId: 'ww1350e9d33db61819', // 必填，企业号的唯一标识，此处填写企业号corpid
    //   timestamp: 1584529830, // 必填，生成签名的时间戳
    //   nonceStr: '6xABWDk2tJGMDqB3', // 必填，生成签名的随机串
    //   signature: '23d17bad21f8f7809ec72dc63e3079a0e7cab760', // 必填，签名，见附录1
    //   jsApiList: ['agentConfig', 'sendChatMessage', 'getCurExternalContact'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    // });
    // wx.ready(function() {
    //   // 开启企业微信debug模式wx.config里的debug为true
    //   wx.checkJsApi({
    //     jsApiList: [
    //       'agentConfig',
    //       'sendChatMessage',
    //       'getCurExternalContact'
    //     ],
    //     success: function(res) {
    //       wx.agentConfig({
    //         corpid: 'ww1350e9d33db61819', // 必填，企业微信的corpid，必须与当前登录的企业一致
    //         agentid: '1000013', // 必填，企业微信的应用id （e.g. 1000247）
    //         timestamp: 1584529872, // 必填，生成签名的时间戳
    //         nonceStr: '78yFxktUYuKnvwSo', // 必填，生成签名的随机串
    //         signature: '1c6e582e3b7942258fbdf8351d8135898051af62', // 必填，签名，见附录1
    //         jsApiList: ['sendChatMessage', 'getCurExternalContact'], // 必填
    //         success: function(res) {
    //           console.log('success', res)
    //           wx.invoke('getCurExternalContact', {
    //           }, function(res) {
    //             if (res.err_msg === 'getCurExternalContact:ok') {
    //               console.log(res.userId) // 返回当前外部联系人userId
    //             } else {
    //               // 错误处理
    //             }
    //           });
    //           wx.invoke('sendChatMessage', {
    //             msgtype: 'text', // 消息类型，必填
    //             text: {
    //               content: '测试' // 文本内容
    //             },
    //             image:
    //               {
    //                 mediaid: '2TLVdgtYCwWc3BXOlAErsdp93e7IKfqA__9OYWVOtNEA_ex0lGEK3cxC1yze78X09' // 图片的素材id
    //               },
    //             video:
    //               {
    //                 mediaid: '' // 视频的素材id
    //               },
    //             file:
    //               {
    //                 mediaid: '' // 文件的素材id
    //               },
    //             news:
    //               {
    //                 link: 'www.baidu.com', // H5消息页面url 必填
    //                 title: '百度', // H5消息标题
    //                 desc: '百度', // H5消息摘要
    //                 imgUrl: 'https://upload.jianshu.io/users/upload_avatars/10311999/16dbb33b-6d2d-47c9-9d6a-fbadccc67e85.png?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96/format/webp' // H5消息封面图片URL
    //               }
    //           }, function(res) {
    //             console.log('测试1通过')
    //             wx.invoke('sendChatMessage', {
    //               msgtype: 'text', // 消息类型，必填
    //               text: {
    //                 content: '测试22222' // 文本内容
    //               },
    //               image:
    //               {
    //                 mediaid: '2TLVdgtYCwWc3BXOlAErsdp93e7IKfqA__9OYWVOtNEA_ex0lGEK3cxC1yze78X09' // 图片的素材id
    //               },
    //               video:
    //               {
    //                 mediaid: '' // 视频的素材id
    //               },
    //               file:
    //               {
    //                 mediaid: '' // 文件的素材id
    //               },
    //               news:
    //               {
    //                 link: 'www.baidu.com', // H5消息页面url 必填
    //                 title: '百度', // H5消息标题
    //                 desc: '百度', // H5消息摘要
    //                 imgUrl: 'https://upload.jianshu.io/users/upload_avatars/10311999/16dbb33b-6d2d-47c9-9d6a-fbadccc67e85.png?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96/format/webp' // H5消息封面图片URL
    //               }
    //             }, function(res) {
    //               console.log('测试2通过')
    //             })
    //           })
    //         },
    //         fail: function(res) {
    //           console.log('err', res)
    //           if (res.errMsg.indexOf('is not a function') > -1) {
    //             alert('<i class="weui-icon-warn">版本过低请升级</i>')
    //           }
    //         }
    //       });
    //     },
    //     fail: function(res) {
    //       alert('版本过低请升级');
    //     }
    //   });
    // });
    // wx.error(function(res) {
    //   console.log(res);
    // });
  },
  methods: {
    pullingDown() {
      this.beforePullDown = false
      this.listQuery.page = 1
      this.getList(false)
    },
    pullingUp() {
      this.listQuery.page += 1
      this.getList()
    },
    async getList(loadMore = true) {
      // fetchList(this.listQuery).then(result => {
      // console.log(result)
      // letresult.data.data = []
      this.total = 0
      const newList = []
      if (loadMore) {
        this.list = this.list.concat(newList)
      } else {
        this.list = newList
      }
      if (!this.beforePullDown) {
        this.beforePullDown = true
      }
      this.loadedAll = this.total <= this.list.length
      // }).catch(error => {
      //   Toast.error(error)
      // })
    },
    handleCustomClick() {
      this.$router.push({
        path: '/line'
      })
    }
  }
}
</script>
<style lang="less" scoped>
.index {
  ::v-deep .van-dropdown-menu{
    .van-ellipsis{
      color: @white;
    }
    .van-dropdown-menu__bar{
      background-color: rgba(0,0,0,0);
    }
    .van-dropdown-menu__title::after{
      border-color: transparent transparent @white @white;
    }
  }
  p{
    margin-block-start: 0;
    margin-block-end: 0;
  }
  .container{
    height: 100%;
    width: 100%;
    background: #f5f5f5;
    .list-wrap{
      height: calc(100% - 50px);
      overflow-y: hidden;
    }
  }

  .article-list {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding: 15px 15px 0;
    .article {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding: 10px 15px;
      box-sizing: border-box;
      background: #FFF;
      border-radius: 5px;
      box-shadow: 0 0 6px #e3e3e3;
      .left {
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
        }
      }
      .right {
        padding-left: 15px;
        box-sizing: border-box;
        display: flex;
        width: 235px;
        height: 80px;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-around;
        p {
          width: 100%;
          line-height: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 16px;
        }
        .more-info{
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
          color: #666;
        }
      }
    }
  }
  .focus{
    width:100%;
    text-align: center;
    padding-top: 1rem;
    box-sizing: border-box;
    img{
      width: 60%;
    }
    p{
      color:#666;
      font-size: 14px;
    }
  }
}
</style>
