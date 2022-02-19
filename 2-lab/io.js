const fs = require("fs");

const read = (fileName) => {
  let success = true;
  let data;

  try {
    data = fs.readFileSync(fileName, { encoding: "utf8" });
  } catch (err) {
    console.log("Error while reading file!");
    console.log(err);
    success = false;
  }

  return [success, data.toString()];
};

const write = (fileName, message) => {
  let success;

  try {
    fs.writeFileSync(fileName, message, { encoding: "utf8" });
  } catch (err) {
    console.log("Error while writing file!");
    console.log(err);
    success = false;
  }

  return success;
};

module.exports = {
  read,
  write,
};
