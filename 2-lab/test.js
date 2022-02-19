const { keygen } = require("./rsa-keygen");
const { encode } = require("./rsa-encode");
const { decode } = require("./rsa-decode");
const io = require("./io");
const constants = require("./constants");
const { assert } = require("console");

const p = 7;
const q = 13;
const e = 5;

let i = 1;

const test = (message) => {
  io.write(constants.ORIGINAL_MESSAGE_PATH, message);
  const keys = keygen(p, q, e);
  const encodedMessage = encode();
  const decodedMessage = decode();

  console.log(`Test case #${i}`);
  console.log("Original message:");
  console.log(message);
  console.log("Generated keys:");
  console.dir(keys);
  console.log("Encoded message:");
  console.log(encodedMessage);
  console.log("Decoded message:");
  console.log(decodedMessage);
  assert(message === decodedMessage);
  console.log();

  i += 1;
};

test("HELLO, MIET!");
test("IT'S WORKING");
