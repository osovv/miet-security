const encode = (message) => {
  const buff = Buffer.from(message, "utf-8");
  return buff.toString("base64");
};

const decode = (message) => {
  const buff = Buffer.from(message, "base64");
  return buff.toString("utf-8");
};

module.exports = {
  encode,
  decode,
};
