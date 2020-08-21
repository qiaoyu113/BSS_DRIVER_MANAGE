<template>
  <div class="login">
    <div
      class="logo"
    />
    <div class="van-title">
      账号
    </div>
    <van-field
      v-model="loginForm.username"
      class="field-input"
      placeholder="请输入账号"
      :error-message="message.username"
      clearable
    />
    <div class="van-title">
      密码
    </div>
    <van-field
      v-model.trim="loginForm.password"
      class="field-input"
      placeholder="请输入密码"
      :error-message="message.password"
      clearable
    />
    <van-button type="info" @click="handleLogin">
      登陆
    </van-button>
  </div>
</template>
<script>
import { login } from '@/api/user';
import { Field, Icon, Button, Loading, NavBar } from 'vant';
// import { validator } from '../../utils/validator'
import AsyncValidator from 'async-validator'
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  components: {
    [Field.name]: Field,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Loading.name]: Loading
  },
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      message: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入名称' }
        ],
        password: [
          { required: true, message: '请输入密码' }
        ]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false
    };
  },
  created: function() {
    this.validator = new AsyncValidator(this.loginRules)
  },
  mounted() {},
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.clearMessage()
      this.validator.validate(this.loginForm, {
        firstFields: true
      }).then(() => {
        this.loading = true
        login(this.loginForm).then((res) => {
          setTimeout(() => {
            this.loading = false
          }, 0.6 * 1000)
          if (res) {
            this.token = res.token
            return
          }
          this.$router.replace({
            path: this.redirect || '/',
            query: this.otherQuery
          })
        })
      }).catch(({ errors }) => {
        // 校验未通过
        for (let { field, message } of errors) this.message[field] = message
      })
    },
    // 清空校验错误提示
    clearMessage() {
      for (let key in this.message) this.message[key] = ''
    },
    ...mapActions({
      login: 'user/login'
    })
  }
};
</script>
<style lang="scss" scoped>
.login {
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
  .login-form {
    padding: 0 20px;
    box-sizing: border-box;
    .wrapper {
      display: block;
      position: relative;
      width: 100%;
      text-align: center;
      margin: auto;
    }
    .button {
      height: 40px;
      text-align: center;
      text-decoration: none;
      color: #abcefb;
      font-size: 16px;
      display: inline-block;
      overflow: hidden;
      position: relative;
      margin: auto;
      background: #2f448a;
      border-radius: 10px;
    }
    .login-form {
      width: 100%;
      margin: auto;
      z-index: 100;
      padding: 10px 20px;
      box-sizing: border-box;
    }
    .el-form-item__content {
      background: #fff !important;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      /*color: $dark_gray;*/
      color: #4ca2cc !important;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }
    .title-container {
      display: none;
      .title {
        font-size: 32px;
        color: #ffffff;
        text-align: center;
        margin-top: 60px;
      }
      .set-language {
        color: #fff;
        position: absolute;
        top: 3px;
        font-size: 18px;
        right: 0px;
        cursor: pointer;
      }
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: #4ca2cc !important;
      cursor: pointer;
      user-select: none;
    }
    .thirdparty-button {
      position: absolute;
      right: 0;
      bottom: 6px;
    }
  }
}
</style>
