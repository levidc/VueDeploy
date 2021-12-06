<template>
  <div id="app">
    <div class="top">
      <input
        id="Button1"
        ref="ipt"
        type="button"
        :value="notClick === true ? '退出全屏' : '点击全屏'"
        @click="kaishi()"
      >
      <el-button @click="changeLangu">{{ $t('changeLanguage') }}</el-button>
      <a id="dddd" href="333" data-id="1">123</a>
    </div>
    <router-view :key="key" />
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
export default {
  data() {
    return {
      notClick: false
    }
  },
  computed: {
    ...mapGetters(['fullScreen']),
    ...mapState(['lang']),
    key() {
      // 渲染 fullPath,也就是点击跳转的菜单栏的对应path
      return this.$route.fullPath
    }
  },
  mounted() {
    console.log(
      document.querySelector('#dddd').dataset
    )
    const _this = this
    window.onresize = function() {
      _this.notClick = _this.checkFull()
    }
  },
  methods: {
    changeLangu() {
      this.$i18n.locale === 'zh' ? this.$i18n.locale = 'en' : this.$i18n.locale = 'zh'
    },
    checkFull() {
      // 判断浏览器是否处于全屏状态 （需要考虑兼容问题）
      // 火狐浏览器
      var isFull = document.mozFullScreen ||
		document.fullScreen ||
		// 谷歌浏览器及Webkit内核浏览器
		document.webkitIsFullScreen ||
		document.webkitRequestFullScreen ||
		document.mozRequestFullScreen ||
		document.msFullscreenEnabled
      if (isFull === undefined) {
        isFull = false
      }
      return isFull
    },
    kaishi() {
      console.log(this.notClick)
      if (!this.notClick) {
        this.$store.commit('SET_FUllSCREEN', true)
      } else {
        this.$store.dispatch('ChangeFullScreen')
      }
      this.judgeFullScreen()
    },
    judgeFullScreen() {
      if (this.fullScreen) {
        this.$refs['ipt'].value = '退出全屏'
        var docElm = document.documentElement
        // W3C
        if (docElm.requestFullscreen) {
          docElm.requestFullscreen()
        } else if (docElm.mozRequestFullScreen) {
          // FireFox
          docElm.mozRequestFullScreen()
          console.log('moz')
        } else if (docElm.webkitRequestFullScreen) {
          docElm.webkitRequestFullScreen()
          console.log('google')
        // Chrome等
        } else if (docElm.msRequestFullscreen) {
          console.log('ie')
          docElm.msRequestFullscreen()
          // IE11
        }
      } else {
        this.$refs['ipt'].value = '点击全屏'
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding:0px;
  margin:0px;
  position:absolute;
  top:0px;
  left:0px;
  width:100%;
  height:100%;
  border:hidden;
}
html{
  height: 100%;
}
body{
  height: 100%;
}
.top{
  position: absolute;
  z-index: 11;
  top: 20px
}
</style>
