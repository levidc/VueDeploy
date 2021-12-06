<template>
  <div class="home">
    <iframe width="400" height="100" frameborder="0" scrolling="no" hspace="0" src="https://i.tianqi.com/?c=code&a=getcode&id=35&site=34&icon=1" style="font-family:'alter';" />
    <br>
    <!-- <input
      id="Button1"
      ref="ipt"
      type="button"
      :value="notClick === true ? '退出全屏' : '点击全屏'"
      @click="kaishi()"
    >
    <div>{{ fullScreen }}</div> -->
    <router-link to="/404">登陆走起</router-link> ||
    <router-link to="/about">简介走起</router-link>
    <div @click="logout">登出</div>
    <el-button @click="testMo">mockapi</el-button>
    <el-button @click="testCookie">setcookie</el-button>
    <el-button @click="getCookie">getcookie</el-button>
    <el-button @click="removeC">removeCookie</el-button>
    <div id="main" style="width: 1600px; height: 400px" />
    <div>
      <button :disabled="enableOpen" @click="openWeb">开启</button>
      <button :disabled="enableClose" @click="closeWeb">关闭</button>
    </div>
    <div id="cpu" style="width: 1600px; height: 400px" />
    <timer />
  </div>
</template>
<style lang='scss' scoped>
.router-link-active {
	background-color: #3498db !important;
	color: red !important;
}
input{
  font-family: 'alter';
}
.tianqi-shuzhi{
  p{
    font-family: 'alter';
  }
}
</style>
<script>
import { logout, testMock } from '@/api/login.js'
import Cookies, { testCookie } from '@/utils/auth'
import timer from './timedata.vue'
export default {
  name: 'Home',
  components: { timer },
  data() {
    return {
      cpuOption: {
        tooltip: {
          trigger: 'axis',
          position: function(pt) {
            return [pt[0], '10%']
          }
        },
        legend: {
          data: ['CPU使用率(%)'],
          left: 'right'
        },
        // backgroundColor: '#ccc',
        xAxis: {
          type: 'category',
          boundaryGap: true,
          data: [],
          axisTick: {
            alignWithLabel: true,
            lineStyle: {
              color: 'red',
              width: 5,
              tpye: 'solid'
            }
          }
        },
        yAxis: {
          type: 'value',
          // name: '%',
          axisLabel: {
            formatter: '{value} %'
          },
          boundaryGap: [0, '100%'],
          max: 100,
          min: 0
        },
        grid: {
          left: '87px',
          right: '50px'
        },
        series: [
          {
            name: 'CPU使用率(%)',
            data: [],
            symbolSize: 5,
            smooth: true,
            sampling: 'average',
            itemStyle: {
              normal: {
                color: '#a95af5'
              }
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(48,149,255,0.05)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(48,149,255,0.05)'
                  }
                ])
              }
            },
            type: 'line'
          }
        ]
      },
      option: {
        title: {
          text: '展示标题'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'cross' }
        },
        legend: {
          data: ['购物']
        },
        xAxis: {
          data: []
        },
        yAxis: [
          {
            type: 'value',
            name: '件数',
            min: 0,
            max: 100,
            position: 'left',
            axisLabel: {
              formatter: '{value} 件'
            }
          },
          {}
        ],
        series: [
          {
            name: '购物',
            type: 'line',
            data: [],
            smooth: true
          }
        ]
      },
      stopWebsocket: false,
      enableOpen: false,
      enableClose: true,
      notClick: false
    }
  },
  computed: {
    optionUpadate() {
      return JSON.parse(JSON.stringify(this.option))
    }
  },

  // 基于websocket实时获取数据，并赋值给相关数据,
  watch: {
    optionUpadate: {
      handler(newV, old) {
        if (newV.xAxis.data.length > 500) {
          this.option.xAxis.data.shift()
          this.option.series[0].data.shift()
        }
        this.myChart.setOption(this.option)
      }
    }
  },
  created() {

  },
  mounted() {
    // this.notClick = this.fullScreen
    var _this = this
    // window.onresize = function() {
    //   _this.notClick = _this.checkFull()
    // }
    this.cpuChart = this.$echarts.init(document.getElementById('cpu'))
    // websocket end
    // 基于准备好的dom，初始化echarts实例
    this.myChart = this.$echarts.init(document.getElementById('main'))
    // 指定图表的配置项和数据
    this.myChart.setOption(this.option)
    setInterval(() => {
      var randomX = ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'][
        parseInt(Math.random() * 6)
      ]
      _this.option.xAxis.data.push(randomX)
      var randomY = [10, 22, 33, 41, 35, 46, 67][parseInt(Math.random() * 7)]
      _this.option.series[0].data.push(randomY)
    }, 2000)
  },
  beforeDestroy() {
    // this.ws.send('10.0.2.172##stop')
    // this.closeWeb()
    console.log('destroy')
    // this.$store.commit('SET_FUllSCREEN', this.notClick)
  },
  methods: {
    removeC() {
      Cookies.remove('test')
    },
    testCookie() {
      testCookie()
    },
    getCookie() {
      var res = Cookies.get('test')
      console.log(res)
    },
    testMo() {
      testMock({
        p1: '123',
        p2: '456'
      }).then(res => {
        console.log(res)
      })
    },
    logout() {
      logout().then(res => {
        console.log(res)
      })
    },
    openWeb() {
      this.initwebsockt()
      this.enableOpen = !this.enableOpen
      this.enableClose = !this.enableClose
    },
    closeWeb() {
      this.stopWebsocket = true
      this.ws.send('10.0.2.172##stop')
      // this.heartCheck.reset()
      this.enableClose = !this.enableClose
      setTimeout(() => {
        this.enableOpen = !this.enableOpen
      }, 500)
    },
    initwebsockt() {
      const _this = this
      var lockReconnect = false // 避免ws重复连接
      var ws = null // 判断当前浏览器是否支持WebSocket
      var wsUrl = 'ws://10.0.2.1:8083/ws'
      createWebSocket(wsUrl) // 连接ws

      function createWebSocket(url) {
        try {
          if ('WebSocket' in window) {
            ws = new WebSocket(url)
            _this.ws = ws
          }
          initEventHandle()
        } catch (e) {
          reconnect(url)
          console.log(e)
        }
      }
      function initEventHandle() {
        ws.onclose = function() {
          if (_this.stopWebsocket) {
            _this.stopWebsocket = false
            console.log('llws连接关闭!' + new Date().toLocaleString())
          } else {
            reconnect(wsUrl)
          }
        }
        ws.onerror = function() {
          reconnect(wsUrl)
          console.log('llws连接错误!')
        }
        ws.onopen = function() {
          heartCheck.reset().start() // 心跳检测重置
          console.log('llws连接成功!' + new Date().toLocaleString())
          ws.send('10.0.2.172##start')
        }
        ws.onmessage = function(event) {
          // 如果获取到消息，心跳检测重置
          heartCheck.reset().start() // 拿到任何消息都说明当前连接是正常的
          console.log('llws收到消息啦:' + event.data)
          if (event.data !== 'pong') {
            const data = JSON.parse(event.data)
            if (data.performanceMessage.counterKey === 'CPU') {
              const { startTime, counterValue } = data.performanceMessage
              _this.cpuOption.xAxis.data.push(_this.formData(startTime))
              _this.cpuOption.series[0].data.push(counterValue)
              if (_this.cpuOption.xAxis.data.length > 500) {
                _this.cpuOption.xAxis.data.shift()
                _this.cpuOption.series[0].data.shift()
              }
              _this.cpuChart.setOption(_this.cpuOption)
            } else if (data.performanceMessage.counterKey === 'MEMORY') {
              // console.log(2)
            }
          }
        }
      }
      // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
      window.onbeforeunload = function() {
        ws.close()
      }

      function reconnect(url) {
        if (lockReconnect) return
        lockReconnect = true
        setTimeout(function() {
          // 没连接上会一直重连，设置延迟避免请求过多
          createWebSocket(url)
          lockReconnect = false
        }, 1000)
      }

      // 心跳检测
      var heartCheck = {
        timeout: 1000, // 1分钟发一次心跳
        timeoutObj: null,
        serverTimeoutObj: null,
        reset: function() {
          clearTimeout(this.timeoutObj)
          clearTimeout(this.serverTimeoutObj)
          return this
        },
        start: function() {
          var self = this
          this.timeoutObj = setTimeout(function() {
            // 这里发送一个心跳，后端收到后，返回一个心跳消息，
            // onmessage拿到返回的心跳就说明连接正常
            ws.send('ping')
            console.log('ping!')
            self.serverTimeoutObj = setTimeout(function() {
              // 如果超过一定时间还没重置，说明后端主动断开了
              ws.close() // 如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
            }, self.timeout)
          }, this.timeout)
        }
      }
      this.heartCheck = heartCheck
    },
    formData(data) {
      var time = new Date(parseInt(data))
      var month = time.getMonth() + 1
      var day = time.getDate()
      var hour = time.getHours()
      var minute = time.getMinutes()
      var second = time.getSeconds()
      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      if (hour < 10) {
        hour = '0' + hour
      }
      if (minute < 10) {
        minute = '0' + minute
      }
      if (second < 10) {
        second = '0' + second
      }
      return (
      // time.getFullYear() +
      // '/' +
      // month +
      // '/' +
      // day +
      // ' ' +
        hour + ':' + minute + ':' + second
      )
    }
  }
}
</script>
