const shortId = require("short-unique-id");

const removeDoubleQuotations = (payload) => {
  let result = payload.replace(/['"]+/g, "");
  result = result.length !== 0 ? "" : result;
  return result.length > 0 ? result : payload;
};

const generateId = () => {
  const uid = new shortId({
    dictionary: "number",
    length: 7,
  });
  const uniqueId = uid.rnd();
  return uniqueId;
};

module.exports = { removeDoubleQuotations, generateId };
