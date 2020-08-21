<template>
  <div class="login">
    <div
      class="logo"
    />
    <van-form ref="loginForm" :show-error="false" class="form" @submit="onSubmit">
      <template v-if="loginWay === 'account'">
        <van-field
          v-model="loginForm.account"
          name="validatorAccount"
          placeholder="请输入账号"
          :rules="[
            { required: true, message: '请输入账号' },
            { validator: validatorAccount, message: '请输入正确的账号' }
          ]"
        >
          <div slot="left-icon">
            <img src="./imgs/phone.svg" alt="" class="phoneIcon">
          </div>
        </van-field>
        <van-field
          v-model="loginForm.password"
          left-icon="smile-o"
          type="password"
          name="validatorPassword"
          placeholder="密码"
          :rules="[
            { required: true, message: '请输入密码' },
            { validator: validatorPassword, message: '请输入正确的密码' }
          ]"
        >
          <div slot="left-icon">
            <img src="./imgs/lock.png" alt="" class="lockIcon">
          </div>
        </van-field>
      </template>
      <template v-else>
        <van-field
          v-model="loginForm.phone"
          left-icon="smile-o"
          placeholder="请输入手机号"
          :rules="[
            { required: true, message: '请输入手机号' },
            {pattern:phonePattern, message: '请输入正确的手机号'}
          ]"
        >
          <div slot="left-icon">
            <img src="./imgs/phone.svg" alt="" class="phoneIcon">
          </div>
        </van-field>
        <van-field
          v-model="loginForm.code"
          left-icon="smile-o"
          name="validatorCode"
          placeholder="验证码"
          :rules="[
            { required: true, message: '请输入验证码' },
            { validator: validatorCode, message: '请输入正确的验证码' },
          ]"
        >
          <div slot="left-icon">
            <img src="./imgs/lock.png" alt="" class="lockIcon">
          </div>
          <div slot="right-icon" class="code" @click="handleGetCodeClick">
            {{ isSendCode ? `${count} s` :'获取验证码' }}
          </div>
        </van-field>
      </template>

      <van-button type="info" block class="loginBtn" color="#2F448A">
        登陆
      </van-button>
      <span class="loginWay" @click="handleChangeLoginWay">{{ loginWay === 'account' ? '使用手机登陆' :'使用账号登陆' }}</span>
    </van-form>
  </div>
</template>
<script>
import { login } from '@/api/user';
import { Form, Field, Icon, Button } from 'vant';
import { phoneRegExp } from '@/utils/index'
export default {
  name: 'Login',
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Icon.name]: Icon,
    [Button.name]: Button

  },
  data() {
    return {
      loginForm: {
        account: '', // 账号
        password: '', // 密码
        phone: '', // 手机号
        code: '' // 手机验证码
      },
      loginWay: 'account', // 登录方式
      isSendCode: false, // 发送验证码是否正在倒计时
      count: 60 // 倒计时的秒数
    };
  },
  created() {
    this.phonePattern = phoneRegExp
  },
  mounted() {},
  beforeDestroy() {
    this.clearTimer()
  },
  methods: {
    /**
     * 登录
     */
    async onSubmit() {
      try {
        this.$toast.loading({
          duration: 0,
          message: '加载中...',
          forbidClick: true,
          loadingType: 'spinner'
        })
        let { data: res } = await login()
        if (res.success) {
          this.$store.commit('LOGIN', res.data)
          this.$router.replace({
            path: this.redirect || '/',
            query: this.otherQuery
          })
        }
      } catch (err) {
        console.log(`login error:${err}`,)
      } finally {
        this.$toast.clear()
      }
    },
    /**
     * 切换登录方式
     */
    handleChangeLoginWay() {
      this.$refs.loginForm.resetValidation()
      if (this.loginWay === 'account') {
        this.loginWay = 'code'
      } else {
        this.loginWay = 'account'
      }
    },
    /**
     *获取验证码
     */
    handleGetCodeClick() {
      // 正在倒计时或者手机号不合法
      if (this.isSendCode || !phoneRegExp.test(this.loginForm.phone)) {
        return false
      } else {
        // 调方法获取手机验证码
        this.getPhoneCode()
      }
    },
    /**
     * 获取手机验证码
     */
    getPhoneCode() {
      try {
        this.isSendCode = true
        this.timer = setInterval(() => {
          if (this.count > 1) {
            this.count--
          } else {
            this.clearTimer()
          }
        }, 1000)
      } catch (err) {
        this.clearTimer()
      }
    },
    /**
     * 清除定时器
     */
    clearTimer() {
      clearInterval(this.timer)
      this.timer = null
      this.count = 60
      this.isSendCode = false
    },
    /**
     * 手机验证码校验
     */
    validatorCode(val) {
      return val.length === 4
    },
    /**
     * 校验密码
     */
    validatorPassword(val) {
      return true
    },
    /**
     * 校验账号
     */
    validatorAccount(val) {
      return true
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  font-family: PingFangSC-Regular;
  width: 100%;
  height: 100vh;
  -webkit-background-size: cover;
  background-size: cover;
  overflow: hidden;
  .logo {
    width: 100%;
    height: 28vh;
    background: url("https://qizhiniao-dev.oss-cn-beijing.aliyuncs.com/img/a6ce085a5d6e425295ab487097e9cd3a")
      no-repeat;
    -webkit-background-size: cover;
    background-size: cover;
  }
  .form {
    margin:37.5px;
    .loginBtn {
     margin-top:55.5px;
     button {
       color:#D4DAE9;
     }
    }
    .loginWay {
      display: inline-block;
      margin-top:6.5px;
      font-size: 11px;
      color: #838A9D;
    }
    .code {
      font-size: 13px;
      color: #649CEE;
    }
    .phoneIcon {
      width: 10px;
      height:15px;
      vertical-align: middle;
    }
    .lockIcon {
     object-fit: contain;
      width: 12px;
      height:15px;
      vertical-align: middle;
    }
  }

}
</style>

<style scoped>
  .login >>> .van-cell::after {
    border-color: #2F448A;
  }
</style>
