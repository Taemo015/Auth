module.exports = function (exp, mode = true) {
  return mode ? `[name].[hash].${exp}` : `[name]._prod_.[hash].${exp}`;
};
