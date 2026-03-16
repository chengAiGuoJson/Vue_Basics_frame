/**
*
// 1.给你一个字符串 path ，表示指向某一文件或目录的 Unix 风格 绝对路径 （以 '/' 开头），请你将其转化为更加简洁的规范路径。

// 在 Unix 风格的文件系统中，一个点（.）表示当前目录本身；此外，两个点 （..） 表示将目录切换到上一级（指向父目录）；两者都可以是复杂相对路径的组成部分。任意多个连续的斜杠（即，'//'）都被视为单个斜杠 '/' 。 对于此问题，任何其他格式的点（例如，'...'）均被视为文件/目录名称。

// 请注意，返回的 规范路径 必须遵循下述格式：

// 始终以斜杠 '/' 开头。
// 两个目录名之间必须只有一个斜杠 '/' 。
// 最后一个目录名（如果存在）不能 以 '/' 结尾。
// 此外，路径仅包含从根目录到目标文件或目录的路径上的目录（即，不含 '.' 或 '..'）。
// 返回简化后得到的 规范路径 。



// 示例 1：

// 输入：path = "/home/"
// 输出："/home"
// 解释：注意，最后一个目录名后面没有斜杠。 
// 示例 2：

// 输入：path = "/../"
// 输出："/"
// 解释：从根目录向上一级是不可行的，因为根目录是你可以到达的最高级。
// 示例 3：

// 输入：path = "/home//foo/"
// 输出："/home/foo"
// 解释：在规范路径中，多个连续斜杠需要用一个斜杠替换。
// 示例 4：

// 输入：path = "/a/./b/../../c/"
// 输出："/c"

/**
 * @param {string} path
 * @return {string}
 */
const simplifyPath = function (path) {
  const components = path.split("/");
  const stack = [];

  for (let component of components) {
    if (component === "" || component === ".") {
      continue;
    } else if (component === "..") {
      if (stack.length > 0) {
        stack.pop();
      }
    } else {
      stack.push(component);
    }
  }
  return "/" + stack.join("/");
};

console.log(simplifyPath("/home/"));
console.log(simplifyPath("/../"));
console.log(simplifyPath("/home//foo/"));
console.log(simplifyPath("/a/./b/../../c/"));
// 2. 请实现一个大数加法函数，用以处理极大数字之间的加法运算，不可以使用bigint的方式。数据约定：两个数字均为正整数。

// 示例 ：
// 输入：a = "999999999927362553333323233222133332233342323"，b = "12"
// 输出："999999999927362553333323233222133332233342335"

/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
const bigNumAdd = function (a, b) {
  let i = a.length - 1;
  let j = b.length - 1;
  let carry = 0;
  let result = "";

  while (i >= 0 || j >= 0 || carry > 0) {
    const digitA = i >= 0 ? parseInt(a[i]) : 0;
    const digitB = j >= 0 ? parseInt(b[j]) : 0;
    const sum = digitA + digitB + carry;

    result = (sum % 10) + result;
    carry = Math.floor(sum / 10);

    i--;
    j--;
  }

  return result;
};
console.log(bigNumAdd("999999999927362553333323233222133332233342323", "12"));
// 3. 金额格式化展示。展示出诸如"12,345,678.90"格式的字符串。

// 示例1：
// 输入：a = "123.1",
// 输出："123.10",

// 示例2：
// 输入：a = "1234",
// 输出："1,234.00",

// 示例3：
// 输入：a = "1234.56",
// 输出："1,234.56",

// 示例4：
// 输入：a = "0",
// 输出："0.00",

/**
 * @param {string} a
 * @return {string}
 */
const formatMoney = function (a) {
  if (a === null || a === undefined || a === "") {
    a = 0;
  }

  const num = Number(a);
  if (isNaN(num)) {
    return "0.00";
  }

  const fixedNumStr = num.toFixed(2);

  let [integerPart, decimalPart] = fixedNumStr.split(".");

  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return `${integerPart}.${decimalPart}`;
};
console.log(formatMoney(123.1));
console.log(formatMoney(1234));
console.log(formatMoney(1234.56));
console.log(formatMoney(0));
