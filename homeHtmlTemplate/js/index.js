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
    apiBaseUrl: 'http://localhost:8046',
    isOpenAudioMsg: false,
    msgList: [],

    showAddDrug: false,
    addDrugform: {
      ...addDrugformInit
    }
  },
  async mounted() {
    this.no = new Date().valueOf().toString().slice(0, 12)
    const time = new Date()
    time.setMinutes(time.getMinutes() - time.getTimezoneOffset());
    this.dateTime = time.toJSON().slice(0, 30)
    console.log(this.dateTime)
    await this.handleMsgInfoFn()
  },
  methods: {
    startAutoFn: function () {
      const isOpen = !this.isOpenAudioMsg
      // todo 这里设置不开启时，关闭语音播报
      let speakAudio = new window.SpeechSynthesisUtterance(isOpen ? '语音提示已开启' : '语音提示已关闭')
      speakAudio.lang = "zh-CN";//使用语言
      speakAudio.rate = 1;//播放语速
      speakAudio.volume = 1;//播放音量
      //speakAudio.voice = '';//设置声音
      window.speechSynthesis.speak(speakAudio);//控制播放
      this.isOpenAudioMsg = isOpen
    },

    handleMsgInfoFn: async function () {
      const { status, data } = await axios.get(this.apiBaseUrl + '/getInfo');
      if (status === 200) {
        const { code, list } = data
        if (code === 200) {
          this.msgList = list
        }
      }
    },

    handleReadingMsgFn: function ({id, msg}) {
      let speakAudio = new window.SpeechSynthesisUtterance('开始语音播报')
      //配置
      speakAudio.lang = "zh-CN";//使用语言
      speakAudio.rate = 1;//播放语速
      speakAudio.volume = 1;//播放音量
      //speakAudio.voice = '';//设置声音
      speakAudio.text = msg;//改变播放文本内容
      window.speechSynthesis.speak(speakAudio);//控制播放
    },

    updateOneMsgFn: function ({id}) {
      $.post(this.baseUrl + '/updateMsgInfo', {id},
        function (response) {
          // 请求成功时的回调函数
          console.log(response);
          if (response && response.code === 200) {
            const {message} = response
            this.handleReadingMsgFn(message)
          }
        }).fail(function (xhr, status, error) {
        // 请求失败时的回调函数
        console.error(error);
      });
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
