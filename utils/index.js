const dayjs = require("dayjs");
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc)
dayjs.extend(timezone)

const format = "YYYY-MM-DD";
const currentTimeFn = () => {
  return dayjs().add(8, 'h').format(`${format} HH:mm:ss`);
};

const transferFn = function (num) {
  console.log(num)
  /**
   * 例如： 324300, 10000, 【十万级】, W
   * @param num
   * @param unit
   * @param des
   * @param unitDes
   * @return string
   */
  const replaceFn = function (num, unit, des, unitDes) {
    const pre = parseInt(num / unit)
    const end = num.toString().replace(pre, '')
    return `${des}${pre}${unitDes}${end}`
  }
  if (!num) return 0
  if (num < 1e4) { // 1万以内
    return num
  } else if (num < 1e5) { // 【10w以内】
    return replaceFn(num, 1e4, '【万级】', 'w ')
  } else if (num < 1e6) { // 【10w---100w)
    return replaceFn(num, 1e4, '【十万+级】', 'w ')
  } else if (num < 1e7) { // 【100w---1000w)
    return replaceFn(num, 1e4, '【百万+级】', 'w ')
  } else if (num < 1e8) { // 【1000w---1亿)
    return replaceFn(num, 1e4, '【千万+级】', 'w ')
  } else if (num < 1e9) { // 【1亿---10亿)
    return replaceFn(num, 1e8, '【亿级】', '亿 ')
  } else { // 【10亿---100亿)
    return `【十亿 + 】${num}`
  }
}

const getOnePlatSettingValueFn = ({ data, key }) => {
  let onePlatSetting = '❌❌ not get value ❌❌'
  const arr = data.filter(item => item.key === key)
  if (arr.length === 1) {
    onePlatSetting = arr[0].value
  }
  return onePlatSetting
}

const waitForFn =  async(ms) => {
  await new Promise(r => setTimeout(r, ms));
}

function getStackTrace() {
  let obj = {};
  Error.captureStackTrace(obj, getStackTrace);
  return obj.stack;
}

const logFn = (data) => {
  let stack = getStackTrace()
  // console.log(stack)    // 用这行命令查看下完整显示的信息
  const projectName = 'sbi_corp_bank/'
  // stack = stack.split(projectName)[1]  //stack中的第二行是正确信息
  stack = stack.split('\n')[2] //stack中的第二行是正确信息
  const line = stack.split(projectName)[1].replaceAll(')', '') + "行日志: "
  console.log(line + data)
  // stack = stack.slice(stack.indexOf("js:")+3, stack.length)
  // console.log("<" + "第" + stack + "行> " + data)
}

module.exports = {
  transferFn, getOnePlatSettingValueFn, waitForFn, logFn, currentTimeFn
}

