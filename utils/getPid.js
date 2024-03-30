/**
 Created by M on 2024/03/29 21
 */
const { execSync } = window.require('child_process');
const os = window.require('os');
const platform = os.platform();

const GetProcessInfo = (port) =>
  new Promise((resolve, reject) => {
    if (platform === 'win32') {
      const order = `netstat -aon | findstr ${port}`;
      try {
        const stdout = execSync(order);
        const portInfo = stdout.toString().trim().split(/\s+/);
        const pId = portInfo[portInfo.length - 1];
        const processStdout = execSync(`tasklist | findstr ${pId}`);
        const [pName] = processStdout.toString().trim().split(/\s+/);
        resolve({
          pId,
          pName,
        });
      } catch (error) {
        reject(error);
      }
    } else {
      const order = `lsof -i :${port}`;
      try {
        const stdout = execSync(order);
        const [pName, pId] = stdout
          .toString()
          .trim()
          .split(/\n/)[1]
          .split(/\s+/);
        resolve({
          pId,
          pName,
        });
      } catch (error) {
        reject(error);
      }
    }
  });

module.exports = GetProcessInfo;
