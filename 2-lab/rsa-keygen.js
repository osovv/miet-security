const io = require("./io");
const base64 = require("./base64");
const constants = require("./constants");

const calculateD = (phi, e) => {
  let d = 0.1;
  let k = 1;

  while (d % 1 !== 0) {
    d = (k * phi + 1) / e;
    k += 1;
  }

  return d;
};

const keygen = (p, q, e) => {
  const phi = (p - 1) * (q - 1);
  const n = p * q;

  const d = calculateD(phi, e);

  return {
    publicKey: base64.encode([e, n].toString()),
    privateKey: base64.encode([d, n].toString()),
  };
};

const parseKey = (encodedKey) => {
  const decodedKey = base64.decode(encodedKey).split(",");
  const key = decodedKey.map((value) => {
    return parseInt(value);
  });
  return key;
};

const q = 7;
const p = 13;
const e = 5;

const keys = keygen(p, q, e);

io.write(constants.PUBLIC_KEY_PATH, keys.publicKey);
io.write(constants.PRIVATE_KEY_PATH, keys.privateKey);

module.exports = {
  parseKey,
};
