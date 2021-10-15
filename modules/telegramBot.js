const telegramBot = require("node-telegram-bot-api");
const adminsTG = require("../models/orders/adminsTG");

const token = process.env.TELEGRAM_BOT_API_KEY;

const bot = new telegramBot(token, {polling: true});

bot.onText(/\/start/, (msg, match) => {
    bot.sendMessage(msg.chat.id, "Для получения уведомлений о заказах, введите код")
});

bot.onText(/\/reg (.+)/, (msg, match) => {
    if (match[1] === "1029384756") {
        if (adminsTG.findOne({idAdminTG: match[1]})) {
            bot.sendMessage(msg.chat.id, "Вы уже получаете уведомления");
        }
        const user = new adminsTG({idAdminTG: msg.chat.id});
        user.save().then(() => {
            bot.sendMessage(msg.chat.id, "OK, вы будете получать новые заказы");
        });
    } else {
        bot.sendMessage(msg.chat.id, "Введён не правильный код");
    }
})

const send = async (msg) => {
    const admins = await adminsTG.find({});
    admins.map(e => {
        bot.sendMessage(e.idAdminTG, msg);
    })
}

module.exports = {
    bot: bot,
    send: send,
}