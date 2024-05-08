var addDrugformInit = {
  id: '', // 编号
  name: '',
  dosage: '', // 用法用量
  dateTime: '',
  type: '', // 规格
  count: ''
}
var app = new Vue({
  el: '#app',
  data: {
    voiceType: 'zh-TW',
    // apiBaseUrl: 'http://localhost:8080', // todo-la 这里改为真实的服务地址
    isOpenAudioMsg: false,
    msgList: [],
    readingMsgInterval: null, // 轮询读取信息的时间任务标识
    showListInterval: null, // 仅仅展示消息列表的标识
  },
  computed: {
    apiBaseUrl() {
      return location.origin
    }
  },
  async mounted() {
    this.no = new Date().valueOf().toString().slice(0, 12)
    const time = new Date()
    time.setMinutes(time.getMinutes() - time.getTimezoneOffset());
    this.dateTime = time.toJSON().slice(0, 30)
    console.log(this.dateTime)
    // todo-la 这里要注意缓存 打开语音开启的状态
    await this.getMsgListFn()
    this.cycleGetMsgListFn()
  },
  unmount() {
    if (this.readingMsgInterval) {
      clearInterval(this.readingMsgInterval)
    }
    if (this.showListInterval) {
      clearInterval(this.showListInterval)
    }
  },
  methods: {

    async getMsgListFn() {
      const platform = this.getPlatformfn()
      if (!platform) {
        alert('浏览器地址不对，请核查!')
        return
      }
      const { status, data } = await axios.post(this.apiBaseUrl + `/getInfo`, { platform });
      if (status === 200) {
        const { code, list, message } = data
        if (code === 200) {
          this.msgList = list
        } else {
          vant.Toast({ message, timeout: 4 * 1000 })
        }
      }
    },

    async cycleReadMsgFn() {
      const readingMsgInterval = setInterval(async () => {
        await this.handleMsgInfoFn()
      }, 8 * 1000)
      this.readingMsgInterval = readingMsgInterval
    },

    async cycleGetMsgListFn() {
      const showListInterval = setInterval(async () => {
        await this.getMsgListFn()
      }, 8 * 1000)
      this.showListInterval = showListInterval
    },

    async startAutoFn () {
      const isOpen = !this.isOpenAudioMsg
      // todo 这里设置不开启时，关闭语音播报
      let speakAudio = new window.SpeechSynthesisUtterance(isOpen ? '语音提示已开启' : '语音提示已关闭')
      speakAudio.lang = this.voiceType;//使用语言
      speakAudio.rate = 1;//播放语速
      speakAudio.volume = 1;//播放音量
      //speakAudio.voice = '';//设置声音
      window.speechSynthesis.speak(speakAudio);//控制播放
      this.isOpenAudioMsg = isOpen
      if (isOpen) {
        if (this.showListInterval) {
          clearInterval(this.showListInterval)
        }
        await this.cycleReadMsgFn()
      } else {
        if (this.readingMsgInterval) {
          clearInterval(this.readingMsgInterval)
        }
        await this.getMsgListFn()
      }
    },

    getPlatformfn: function () {
      const platform = location.href.split('home?')[1]
      return platform
    },

    handleMsgInfoFn: async function () {
      const platform = this.getPlatformfn()
      if (!platform) {
        alert('浏览器地址不对，请核查!')
        return
      }
      const { status, data } = await axios.post(this.apiBaseUrl + `/getInfo`, { platform });
      if (status === 200) {
        const { code, list, message } = data
        if (code === 200) {
          for (let i = list.length -1; i >=0; i--) {
            const item = list[i]
            const { audioStatus, messageText, id } = item
            if (audioStatus && audioStatus.toLowerCase() === 'todo') {
              item.audioStatus = 'DOING'
              this.msgList = list
              await this.handleReadingMsgFn({ messageText, id })
              break;
            }
          }
        } else {
          vant.Toast(message)
        }
      }
    },

    handleReadingMsgFn: async function ({id, messageText}) {
      let speakAudio = new window.SpeechSynthesisUtterance('开始语音播报')
      //配置
      speakAudio.lang = this.voiceType;//使用语言
      speakAudio.rate = 1;//播放语速
      speakAudio.volume = 1;//播放音量
      //speakAudio.voice = '';//设置声音
      speakAudio.text = messageText;//改变播放文本内容
      speakAudio.onend = async (event) => {
        await this.updateOneMsgFn({id})
        await this.getMsgListFn()
      }
      window.speechSynthesis.speak(speakAudio);//控制播放
    },

    updateOneMsgFn: async function ({id}) {

      const platform = this.getPlatformfn()
      if (!platform) {
        alert('浏览器地址不对，请核查!')
        return
      }
      const { status, data } = await axios.post(this.apiBaseUrl + '/updateOneMsgInfo', { id ,platform });
      if (status === 200) {
        const { code, list } = data
        if (code === 200) {}
      }
    },

    deleteMsgFn: async function (id) {
      const platform = this.getPlatformfn()
      if (!platform) {
        alert('浏览器地址不对，请核查!')
        return
      }
      console.log(id)
      const { status } = await axios.post(this.apiBaseUrl + '/deleteInfo', { ids: id, platform });
      if (status === 200) {
        await this.getMsgListFn()
        vant.Toast('删除成功 ！')
      } else {
        vant.Toast('删除失败 ！')
      }
    },

    deleteDrugFn: function (index) {
      vant.Dialog.confirm({
        title: '确认删除该药品？',
      })
        .then(() => {
          this.drugList.splice(index, 1)
          localStorage.setItem('drugList', JSON.stringify(this.drugList))
          vant.Toast('删除成功！')
        })
        .catch(() => {
          // on cancel
        });
    },
    cleanDrugFn: function () {
      vant.Dialog.confirm({
        title: '确认删除？',
        message: '删除后不可恢复！！！',
      })
        .then(() => {
          this.drugList = []
          localStorage.clear()
          vant.Toast('删除成功！')
        })
        .catch(() => {
          // on cancel
        });
    },
    downLoadFn: function () {
      if (!this.name) {
        vant.Toast('请输入姓名')
        return
      }
      const pngName = this.name + '.png' // 'download.png'
      const previewId = 'preview'
      // if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE8.0" || navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE9.0") {
      //   //IE
      //   alert("请升级您的IE浏览器版本，暂不支持IE9及以下版本导出图片。")
      // }
      const height = document.getElementById('preview').clientHeight
      html2canvas(document.getElementById('preview'), {
        width: 420,
        height,
        allowTaint: true,
        useCORS: true
      }).then(function (canvas) {
        var imgData = canvas.toDataURL('image/octet-stream');
        if (canvas.msToBlob) {     // IE 9+浏览器
          var blob = canvas.msToBlob();
          window.navigator.msSaveBlob(blob, pngName);
        } else {
          this.app.saveFile(imgData, pngName);
        }
      })
    }
  }
})
