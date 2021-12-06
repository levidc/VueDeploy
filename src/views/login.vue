<template>
  <div class="loginBg">
    <div class="container">
      <div style="width:500px;background-color:skyblue;padding-top:100px">
        <span>文字占位符</span>
      </div>
      <el-button @click="$router.back(-1)">返回上一页</el-button>
      <el-form ref="loginForm" class="login-form" status-icon :rules="loginRules" :model="loginForm" label-width="120px">
        <el-form-item prop="username" :label="$t('username')">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user" size="small" auto-complete="off" placeholder="请输入用户名" @keyup.enter.native="handleLogin">
            <i slot="prefix" class="icon-yonghu" />
          </el-input>
        </el-form-item>
        <el-form-item prop="password" :label="$t('password')">
          <el-input v-model="loginForm.password" prefix-icon="el-icon-unlock" size="small" :type="passwordType" auto-complete="off" :placeholder="$t('checkpassword')" show-password @keyup.enter.native="handleLogin" />
        </el-form-item>
        <el-row class="handleLogin">
          <el-form-item>
            <el-checkbox v-model="checked">{{ $t('rememberAccount') }}</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" class="login-submit" @click.native.prevent="handleLogin">{{ $t('login') }}</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import staff from '@/article/staff.json'
import { getAccount } from '@/utils/auth'
import { isvalidUsername } from '@/utils/validate'
export default {
  name: 'Userlogin',
  props: [],
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validateCode = (rule, value, callback) => {
      if (this.code.value !== value) {
        this.loginForm.code = ''
        this.refreshCode()
        callback(new Error('请输入正确的验证码'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
      },
      checked: false,
      code: {
        src: '',
        value: '',
        len: 4,
        type: 'text'
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, message: this.$t('checkpassword'), trigger: 'blur' },
          { min: 6, message: '密码长度最少为6位', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '验证码长度为4位', trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validateCode }
        ]
      },
      passwordType: 'password'
    }
  },
  computed: {
  },
  created() {
    console.log(staff)
  },
  mounted() {
    console.log(this.$route)
    const res = getAccount()
    this.$set(this.loginForm, 'username', res)
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('Login', this.loginForm).then(res => {
            this.$router.push({ path: '/home' })
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .login-form{
  width: 450px;
  margin: 200px auto;
  .handleLogin{
   display: flex;
  }
  .el-form-item{
    width: 480px;
    margin-left: -45px;
    .el-form-item__label{
      &::before{
        display: none;
      }
    }
  }

}
.loginBg{
  /* min-width: 1366px; */
  height: 100%;
  background: url('../../public/static/login_bg.png');
  background-color: #ccc;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.container{
  width: 1000px;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
}

</style>
