const io = require("./io");
const constants = require("./constants");
const { parseKey } = require("./rsa-keygen");

const defaultEncodedMessage = () => {
  [_, msg] = io.read(constants.ENCODED_MESSAGE_PATH);
  return msg;
};
const defaultPrivateKey = () => {
  const [__, key] = io.read(constants.PRIVATE_KEY_PATH);
  return key;
};

const decode = (msg, privateKey) => {
  const message = msg || defaultEncodedMessage();
  const key = privateKey || defaultPrivateKey();
  const [d, n] = parseKey(key);
  const result = message
    .split(",")
    .map((char) => {
      const charCode = parseInt(char);
      let mod = 1;
      for (let i = 0; i < d; i++) {
        mod = (mod * charCode) % n;
      }
      return String.fromCharCode(mod);
    })
    .join("");

  io.write(constants.DECODED_MESSAGE_PATH, result);
  return result;
};

module.exports = {
  decode,
};
