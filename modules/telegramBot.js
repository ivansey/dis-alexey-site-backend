const telegramBot = require("node-telegram-bot-api");
const adminsTG = require("../models/orders/adminsTG");

const token = process.env.TELEGRAM_BOT_API_KEY;

const bot = new telegramBot(token, {polling: true});

bot.onText(/\/start (.+)/, (msg, match) => {
    console.log("msg");
    const user = new adminsTG({idAdminTG: msg.chat.id});
    user.save().then(() => {
        bot.sendMessage(msg.chat.id, "OK, вы будете получать новые заказы")
    });
})

const send = (msg) => {
    const admins = adminsTG.find({});
    admins.map(e => {
        bot.sendMessage(e.idAdminTG, msg);
    })
}

module.exports = {
    send: send,
}