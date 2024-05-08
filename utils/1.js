const dayjs = require("dayjs");
/**
 Created by M on 2024/05/08 16
 */

const format = "YYYY-MM-DD";
const currentTimeFn = () => {
  return dayjs().add(8, 'h').format(`${format} HH:mm:ss`);
};

console.log(currentTimeFn())
