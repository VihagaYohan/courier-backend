const removeDoubleQuotations = (payload) => {
  let result = payload.replace(/['"]+/g, "");
  result = result.length !== 0 ? "" : result;
  return result.length > 0 ? result : payload;
};

module.exports = { removeDoubleQuotations };
