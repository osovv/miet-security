const io = require("./io");
const base64 = require("./base64");
const constants = require("./constants");
const { parseKey } = require("./rsa-keygen");

const [_, DEFAULT_MESSAGE] = io.read(constants.ORIGINAL_MESSAGE_PATH);
const [__, DEFAULT_PUBLIC_KEY] = io.read(constants.PUBLIC_KEY_PATH);

const encode = (message = DEFAULT_MESSAGE, publicKey = DEFAULT_PUBLIC_KEY) => {
  const [e, n] = parseKey(publicKey);
  const msg = [...message.toUpperCase()]
    .map((char) => {
      const charCode = char.charCodeAt();
      const pow = Math.pow(charCode, e);
      const mod = pow % n;
      return mod;
    })
    .join();
  io.write(constants.ENCODED_MESSAGE_PATH, msg);
  return msg;
};

let encodedMessage = encode();
console.log(encodedMessage);
