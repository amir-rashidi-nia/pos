export default (n) => {
    const farsiDigits = {
      0: "۰",
      1: "۱",
      2: "۲",
      3: "۳",
      4: "۴",
      5: "۵",
      6: "۶",
      7: "۷",
      8: "۸",
      9: "۹",
      o: ",",
      '.': ".",
    };
  
    if (n === null || n == undefined || n == 0) {
      return "0";
    }
    let value = n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "o");
  
    return value
      .toString()
      .split("")
      .map((x) => farsiDigits[x])
      .join("");
  }
  