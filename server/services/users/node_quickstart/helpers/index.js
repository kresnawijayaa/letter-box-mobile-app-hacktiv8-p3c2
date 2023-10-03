const bcrypt = require("bcryptjs");

function hashPassword(data) {
  return bcrypt.hashSync(data);
}

function verifyPassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}
function validateEmail(email) {
  var re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

module.exports = {
  hashPassword,
  verifyPassword,
  validateEmail,
};
