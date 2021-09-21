const md5 = require("md5");

let randomString = (i = 32) => {
    let rnd = '';
    while (rnd.length < i)
        rnd += Math.random().toString(36).substring(2);
    return rnd.substring(0, i);
};

let generateSessionToken = () => {
    return randomString();
};

let generateUserTokenAPI = () => {
    return randomString(64);
};

let generateAccessTokenApp = () => {
    return randomString(64);
};

module.exports = {
    generateSessionToken: generateSessionToken,
    generateUserTokenAPI: generateUserTokenAPI,
    generateAccessTokenApp: generateAccessTokenApp,
    randomString: randomString,
};