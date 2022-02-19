const io = require("./io");
const constants = require("./constants");
const { parseKey } = require("./rsa-keygen");

const [_, DEFAULT_ENCODED_MESSAGE] = io.read(constants.ENCODED_MESSAGE_PATH);
const [__, DEFAULT_PRIVATE_KEY] = io.read(constants.PRIVATE_KEY_PATH);

const decode = (
  message = DEFAULT_ENCODED_MESSAGE,
  privateKey = DEFAULT_PRIVATE_KEY
) => {
  const [d, n] = parseKey(privateKey);
  const msg = message
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

  io.write(constants.DECODED_MESSAGE_PATH, msg);
  return msg;
};

let decodedMessage = decode();
console.log(decodedMessage);
