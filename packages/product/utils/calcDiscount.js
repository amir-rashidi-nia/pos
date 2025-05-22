export default (n, off) => {
  const number = Number(n);
  let finalPrice = number - (number * off) / 100;
  return splitNumber(finalPrice);
};
