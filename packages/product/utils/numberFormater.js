export default (num) => {
    if(num == 0) {
      return num
    }
    let number = Math.abs(Number(num));
    if (number > 999999) {
      return Math.trunc(Math.abs(num) / 1000000) + "M";
    } else if (number > 999) {
      return Math.trunc(Math.abs(num) / 1000) + "K";
    } else if (!number) {
      return "Non";
    } else {
      return number;
    }
  }
  