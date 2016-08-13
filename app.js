/**
 * Created by Ramiru on 13.08.16.
 */
var TelegramBot = require('node-telegram-bot-api');
var imagesnapjs = require('imagesnapjs'), fs = require('fs');
var token = '236579669:AAFjKQ9-8jdvJMSESubVJMqtGelvl5M06YU';
var filename = '/Users/Ramiru/projects/city-events-bot/photo/webcam.jpg';

var bot = new TelegramBot(token, {polling: true});

bot.on('message', function (msg) {
    var chatId = msg.chat.id;
    console.log(msg);
    // console.log(msg.text.length);
    // console.log("хуи" + msg.text.substring(msg.text.length - 3, msg.text.length));
    // bot.sendMessage(chatId, "хуи" + msg.text.substring(msg.text.length - 3, msg.text.length), {caption: "I'm a bot!"});
    if(msg.text == 'photo')
        fs.exists(filename, function (exists) {
            if(exists)
                fs.unlinkSync(filename);
            imagesnapjs.capture(filename, { cliflags: '-w 2'}, function(err) {
                console.log(err ? err : 'Success!');
                bot.sendPhoto(chatId, filename, {caption: "It's your photo!"});
            });
        });
});