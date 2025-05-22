export default (num) => {
  let number = +num;
  if (number == 0) {
    return `لحظاتی`;
  }
  if (number < 60) {
    return `${number} دقیقه`;
  }
  let hour = Math.trunc(number / 60);
  let minite = number % 60;
  return `${hour} ساعت و ${minite} دقیقه`;
};
