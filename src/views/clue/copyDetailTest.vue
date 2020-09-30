<template>
  <div class="clueDetail">
    <div class="list-wrap">
      <van-tabs color="#3986CB" sticky>
        <van-tab title="基本">
          <van-cell-group v-if="JSON.stringify(detail) != '{}'">
            <!-- <h2 class="van-doc-demo-block__title">
              基本信息
            </h2> -->
            <div class="step-bar">
              <div class="list-item pass">
                <div class="head">
                  <div class="line-wrapper">
                    <i class="line"></i>
                  </div>
                  <div class="icon-wrapper">
                    <van-icon v-if="isJoinCorpWechat" name="checked" color="#70C740" size="28" />
                    <van-icon v-else name="warning" color="#DC6857" size="28" />
                  </div>
                </div>
                <div class="content-wrapper">
                  <span class="content">加入会员</span>
                </div>
              </div>
              <div class="list-item current">
                <div class="head">
                  <div class="line-wrapper">
                    <i class="line"></i>
                  </div>
                  <div class="icon-wrapper">
                    <van-icon v-if="isFollowWorkBench" name="checked" color="#70C740" size="28" />
                    <van-icon v-else name="warning" color="#DC6857" size="28" />
                  </div>
                </div>
                <div class="content-wrapper">
                  <span class="content">订阅线路</span>
                </div>
              </div>
              <div class="list-item future">
                <div class="head">
                  <div class="line-wrapper">
                    <i class="line"></i>
                  </div>
                  <div class="icon-wrapper">
                    <van-icon v-if="isActivationPush" name="checked" color="#70C740" size="28" />
                    <van-icon v-else name="warning" color="#DC6857" size="28" />
                  </div>
                </div>
                <div class="content-wrapper">
                  <span class="content">推送验证</span>
                </div>
              </div>
            </div>
            <div class="matchList">
              <div class="title_sm">
                基本信息
              </div>
            </div>
            <van-cell title="姓名" :value="detail.name | DataIsNull" />
            <van-cell title="联系电话" :value="detail.phone | DataIsNull" />
            <van-cell title="来源渠道" :value="detail.sourceTypeName | DataIsNull" />
            <van-cell title="工作城市" :value="detail.workCityName | DataIsNull" />
            <van-cell title="是否能邀约面试" :value=" detail.invited ? (detail.invited === 2 ? '否' : '是') : '暂无数据'" />
            <van-cell title="是否添加微信" :value=" detail.isAddWechat ? (detail.isAddWechat === 2 ? '否' : '是') : '暂无数据'" />
            <van-cell title="备注" :value="detail.remark | DataIsNull" />
          </van-cell-group>
          <p v-if="JSON.stringify(detail) == '{}'" class="noMore">
            暂无信息
          </p>
          <!-- <div v-if="!matchModule" class="match_box">
            <p class="hint_weight">
              未设置接活意向
            </p>
            <van-button round type="info" color="#2F7DCD" class="btn2" @click="goRouter(detail.driverId)">
              马上设置
            </van-button>
          </div>
          <div v-else>
            <div class="matchList">
              <div class="title_sm">
                车型
              </div>
              <div class="tage_type">
                <van-tag v-for="item in matchDetail.carType" :key="item" round type="primary" color="#4F77AA" class="tag" size="medium">
                  {{ item }}
                </van-tag>
                <p v-if="!matchDetail.carType.length" class="noMore_min">
                  暂无数据
                </p>
              </div>
            </div>
            <div class="matchList">
              <div class="title_sm">
                货物类型
              </div>
              <div class="tage_type">
                <van-tag v-for="item in matchDetail.cargoType" :key="item" round type="primary" color="#4F77AA" class="tag" size="medium">
                  {{ item }}
                </van-tag>
                <p v-if="!matchDetail.cargoType.length" class="noMore_min">
                  暂无数据
                </p>
              </div>
            </div>
            <div class="matchList">
              <div class="title_sm">
                到仓区域
              </div>
              <div class="tage_type">
                <van-tag v-for="item in matchDetail.arrivalArea" :key="item" round type="primary" color="#4F77AA" class="tag" size="medium">
                  {{ item }}
                </van-tag>
                <p v-if="!matchDetail.deliveryArea.length" class="noMore_min">
                  暂无数据
                </p>
              </div>
            </div>
            <div class="matchList">
              <div class="title_sm">
                配送区域
              </div>
              <div class="tage_type">
                <van-tag v-for="item in matchDetail.deliveryArea" :key="item" round type="primary" color="#4F77AA" class="tag" size="medium">
                  {{ item }}
                </van-tag>
                <p v-if="!matchDetail.deliveryArea.length" class="noMore_min">
                  暂无数据
                </p>
              </div>
            </div>
            <div class="matchList">
              <div class="title_sm">
                装卸难度
              </div>
              <div class="tage_type">
                <van-tag v-for="item in matchDetail.handlingDifficultyDegree" :key="item" round type="primary" color="#4F77AA" class="tag" size="medium">
                  {{ item }}
                </van-tag>
                <p v-if="!matchDetail.handlingDifficultyDegree.length" class="noMore_min">
                  暂无数据
                </p>
              </div>
            </div>
            <div class="matchList">
              <div class="title_sm">
                出车时段
              </div>
              <div class="tage_type">
                <van-tag v-for="item in matchDetail.departureTime" :key="item" round type="primary" color="#4F77AA" class="tag" size="medium">
                  {{ item }}
                </van-tag>
                <p v-if="!matchDetail.departureTime.length" class="noMore_min">
                  暂无数据
                </p>
              </div>
            </div>
          </div> -->
        </van-tab>
        <van-tab title="跟进">
          <van-cell-group v-if="JSON.stringify(detail) != '{}'">
            <!-- <h2 class="van-doc-demo-block__title">
              跟进信息
            </h2> -->
            <van-cell title="跟进方式" :value="detail.wayName | DataIsNull" />
            <van-cell title="跟进情况" :value="detail.situation | DataIsNull" />
          </van-cell-group>
          <p v-if="JSON.stringify(detail) == '{}'" class="noMore">
            暂无信息
          </p>
        </van-tab>
        <van-tab title="行为">
          <van-cell-group v-if="clueLog.length">
            <!-- <h2 class="van-doc-demo-block__title">
              行为信息
            </h2> -->
            <van-cell v-for="item in clueLog" :key="item.type" :title="item.operType" :value="'(' + item.creatorName + ')' + item.createDate" />
          </van-cell-group>
          <p v-if="!clueLog.length" class="noMore">
            暂无信息
          </p>
        </van-tab>
      </van-tabs>
      <van-button type="info" block class="btn_bottom" @click="check">
        操作
      </van-button>
      <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
    </div>
  </div>
</template>
<script>
import { Tabbar, TabbarItem, Toast, Tab, Tabs, Cell, CellGroup, Button, ActionSheet, Step, Steps, Icon } from 'vant'
import { clueDetail, clueLog, getActivationStatus, getMediaIdOfActivationQrCode, getCorpSignature, getAgentSignature } from '@/api/user'
// import VoPages from 'vo-pages'
import 'vo-pages/lib/vo-pages.css'
// import wx from 'jWeixin';
const wx = window.wx;
export default {
  name: 'Clue',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Toast.name]: Toast,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Step.name]: Step,
    [Steps.name]: Steps,
    [ActionSheet.name]: ActionSheet
  },
  data() {
    return {
      active: 1,
      clueLog: [],
      orderList: [],
      lineList: [],
      matchDetail: {
        carType: [],
        cargoType: [],
        arrivalArea: [],
        deliveryArea: [],
        handlingDifficultyDegree: [],
        departureTime: []
      },
      cost: [],
      total: 0,
      page: 1,
      isActivationPush: false,
      isFollowWorkBench: false,
      isJoinCorpWechat: false,
      driverId: '',
      driverType: '1',
      detail: '',
      show: false,
      actions: [
        { name: '激活推送', color: '#3F8AF2' },
        { name: '产品介绍', color: '#3F8AF2' },
        { name: '推荐线路', color: '#3F8AF2' }
      ],
      loadedAll: false
    }
  },
  mounted() {
    let clueId = this.$route.query.clueId;
    this.clueId = clueId;
    this.getDetail(clueId)
    this.getActivation()
  },
  methods: {
    getDetail(clueId) {
      clueDetail({
        clueId: clueId
      }).then((res) => {
        if (res.data.success) {
          this.detail = res.data.data
        }
      })
      clueLog({
        clueId: clueId
      }).then((res) => {
        if (res.data.success) {
          this.clueLog = res.data.data
        }
      })
    },
    getActivation() {
      const externalUserId = localStorage.getItem('externalUserId')
      let that = this;
      getActivationStatus({
        externalUserId: externalUserId
      }).then((res) => {
        if (res.data.success) {
          that.isActivationPush = res.data.data.isActivationPush
          that.isFollowWorkBench = res.data.data.isFollowWorkBench
          that.isJoinCorpWechat = res.data.data.isJoinCorpWechat
        }
      })
    },
    goRouter(driverId) {
      let that = this;
      that.$router.push({ path: '/driverintention', query: { driverId: driverId }})// 撮合跟进
    },
    check() {
      this.show = true;
    //   customerDetail({
    //     custClueId: 201910231017
    //   }).then((res) => {
    //     if (res.data.success) {
    //       console.log(res.data.data)
    //       this.detail = res.data.data
    //     }
    //   })
    },
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = false;
      // Toast(item.name);
      if (item.name === '产品介绍') {
        this.$router.push({ path: '/productinfo' })
      } else if (item.name === '激活推送') {
        this.pushSendLink()
      } else {
        this.$router.push({ path: '/linecommend' })
      }
    },
    pushSendLink() {
      Toast.loading({
        message: '正在获取二维码...',
        forbidClick: true
      });
      const hostName = window.location.href
      let that = this;
      getCorpSignature({
        url: hostName
      }).then((res) => {
        if (res.data.success) {
          let data = res.data.data;
          wx.config({
            beta: true,
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.corpId, // 必填，企业号的唯一标识，此处填写企业号corpid
            timestamp: Number(data.timestamp), // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature, // 必填，签名，见附录1
            jsApiList: ['agentConfig'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          wx.ready(function() {
            // 开启企业微信debug模式wx.config里的debug为true
            wx.checkJsApi({
              jsApiList: [
                'agentConfig',
                'sendChatMessage',
                'getCurExternalContact'
              ],
              success: function(res) {
                getAgentSignature({
                  agentId: that.GLOBAL.agentId,
                  url: hostName
                }).then((res) => {
                  if (res.data.success) {
                    const agentData = res.data.data
                    wx.agentConfig({
                      corpid: agentData.corpId, // 必填，企业微信的corpid，必须与当前登录的企业一致
                      agentid: agentData.agentId, // 必填，企业微信的应用id （e.g. 1000247）
                      timestamp: '' + agentData.timestamp, // 必填，生成签名的时间戳
                      nonceStr: agentData.nonceStr, // 必填，生成签名的随机串
                      signature: agentData.signature, // 必填，签名，见附录1
                      jsApiList: ['sendChatMessage', 'getCurExternalContact'], // 必填
                      success: function(res) {
                        // that.GLOBAL.buryPointFunction('send_line', '发送线路', {
                        //   value: '发送线路'
                        // })
                        const externalUserId = localStorage.getItem('externalUserId')
                        getMediaIdOfActivationQrCode({
                          externalUserId: externalUserId
                        }).then((res) => {
                          if (res.data.success) {
                            let imageData = res.data.data;
                            if (imageData === '') {
                              Toast.success('已通过后台发送')
                              return
                            }
                            wx.invoke('sendChatMessage', {
                              msgtype: 'image', // 消息类型，必填
                              image:
                                {
                                  mediaid: imageData // 图片的素材id
                                }
                            }, function(res) {
                              Toast.clear();
                              if (res.err_msg === 'sendChatMessage:permission denied') {
                                Toast.fail('暂无功能权限')
                              }
                              return
                            })
                            var u = navigator.userAgent;
                            if (u.indexOf('iPhone') > -1 || u.indexOf('iOS') > -1) {
                              setTimeout(() => {
                                wx.invoke('sendChatMessage', {
                                  msgtype: 'image', // 消息类型，必填
                                  image:
                                {
                                  mediaid: imageData // 图片的素材id
                                }
                                }, function(res) {
                                  // alert(JSON.stringify(res))
                                  Toast.clear();
                                  if (res.err_msg === 'sendChatMessage:permission denied') {
                                    Toast.fail('暂无功能权限')
                                  }
                                })
                              }, 100)
                            }
                          }
                        })
                      },
                      fail: function(res) {
                        console.log('err', res)
                        if (res.errMsg.indexOf('is not a function') > -1) {
                          alert('<i class="weui-icon-warn">版本过低请升级</i>')
                        }
                      }
                    });
                  }
                  that.disable = false;
                  Toast.clear();
                })
              },
              fail: function(res) {
                alert('版本过低请升级');
              }
            });
          });
          wx.error(function(res) {
            console.log(res);
          });
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/common.scss';
.clueDetail{
  background: #F5F5F5;
  .match_box{
    width: 100%;
    text-align: center;
    padding:20px 0;
    box-sizing: border-box;
    img{
      width: 90px;
      height: 90px;
    }
    .hint_weight{
      font-size: 20px;
      color: #9B9B9B;
      font-weight: bold;
      padding:0 0 14px;
      box-sizing: border-box;
    }
    .text_nomarl{
      font-size: 14px;
      color: #9B9B9B;
      line-height: 22px;
    }
    .btn2{
      width: 70%;
    }
  }
  .matchList{
      width:100%;
      background: #fff;
      box-sizing: border-box;
      .title_sm{
        height:24px;
        line-height: 24px;
        font-size: 12px;
        color: #B2B2B2;
        background: #F5F5F5;
        border-top: 1px solid #ebedf0;
        border-bottom: 1px solid #ebedf0;
        padding: 0 10px;
        box-sizing: border-box;
      }
      .tage_type{
        overflow: hidden;
        padding:14px 20px 8px;
        box-sizing: border-box;
        // border-top: 1px solid #ebedf0;
        // border-bottom: 1px solid #ebedf0;
        .van-tag{
          padding:0 12px;
          box-sizing: border-box;
          font-size: 13px;
          color: #FFFFFF;
          margin-right: 10px;
          margin-bottom: 6px;
        }
        // .tag{
          // margin: 2px 6px 8px 0;
        // }
      }
    }
    /*进度条start*/
    .step-bar {
      padding: 15px 10px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      .van-icon{
        background: #fff;
      }
    }
    .list-item {
        flex: 1;
        .head {
          position: relative;
        }
        .line-wrapper {
          position: absolute;
          height: 3px;
          background-color: #5877A6;
          /* 实现n个元素但有n-1条线的必要条件，且需要将最后的线删除 */
          left: 50%;
          right: -50%;
          top: 13px;
          .line {
                display: block;
                width: 100%;
                height: 100%;
          }
        }
        .icon-wrapper,
        .content-wrapper {
          text-align: center;
        }
        .content-wrapper {
          margin-top: 6px;
        }
        &:last-of-type {
          .line-wrapper {
                display: none;
          }
        }
        .icon {
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          position: relative;
          z-index: 1;
          border: 2px solid #FFF;
        }
        &.current {
          .icon {
            background-color: #2298fe;
          }
          .content {
            color: #333;
          }
        }
        &.pass {
          .icon {
                background-color: #b9defe;
          }
          .content {
            color: #333;
          }
          .line {
                background-color: #5877A6;
          }
        }
        &.future {
          .icon {
                background-color: #dfe4e8;
          }
          .content {
            color: #333;
          }
        }
    }
    .van-step--horizontal:last-child{
      .van-step__line{
        background-color: #5877A6 !important;
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

  .noMore{
    width: 100%;
    text-align: center;
    height:5rem;
    line-height: 6rem;
  }
  .noMore_min{
    width: 100%;
    text-align: center;
    height:20px;
    line-height: 20px;
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

  .van-doc-demo-block__title{
    margin: 0;
    text-align: center;
    padding: 16px;
    color: #4D86C6;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    background-color: #f7f8fa;
  }
}
</style>
