const io = require("./io");
const constants = require("./constants");
const { parseKey } = require("./rsa-keygen");

const defaultMessage = () => {
  [_, msg] = io.read(constants.ORIGINAL_MESSAGE_PATH);
  return msg;
};
const defaultPublicKey = () => {
  const [__, key] = io.read(constants.PUBLIC_KEY_PATH);
  return key;
};

const encode = (msg, publicKey) => {
  const message = msg || defaultMessage();
  const key = publicKey || defaultPublicKey();
  const [e, n] = parseKey(key);
  const result = [...message.toUpperCase()]
    .map((char) => {
      const charCode = char.charCodeAt();
      const pow = Math.pow(charCode, e);
      const mod = pow % n;
      return mod;
    })
    .join();
  io.write(constants.ENCODED_MESSAGE_PATH, result);
  return result;
};

module.exports = {
  encode,
};
