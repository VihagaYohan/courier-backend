const removeDoubleQuotations = (payload) => {
  let result = payload.replace(/['"]+/g, "");
  result = result.length !== 0 ? "" : result;
  return result;
};

module.exports = { removeDoubleQuotations };
