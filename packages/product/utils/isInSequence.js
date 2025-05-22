export default (index) => {
  index += 1;
  return (index - 1) % 10 == 0 || (index + 2) % 10 == 0;
};
