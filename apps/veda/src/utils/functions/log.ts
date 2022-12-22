/**
 * @param {string} functionName - Tên của action/function/.../ muốn debug
 * @param {...any} rest - Bất kì cái gì muốn log ra
 */
function customLog(functionName: string, ...rest: any) {
  console.log(
    `%c${functionName}%c${rest}`,
    `background: #DEDEE9; color: #2C36DC; padding: 1px 5px;`,
    `background: #f85959; color: #ffffff; padding: 1px 5px;`,
  );
}

export default customLog;
