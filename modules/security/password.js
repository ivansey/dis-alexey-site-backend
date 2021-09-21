const md5 = require("md5");

const generatePassword = (pass) => {
    return md5(pass);
};

module.exports = {
    generatePassword: generatePassword,
};