const TelegramBot = require('node-telegram-bot-api');
const mongoose = require('mongoose');
const config = require('./config');
const helper = require('./helper');
const keyboard = require('./keyboard');
const kb = require('./keyboard-buttons');

// Log start
helper.logStart();

// Bot init
const bot = new TelegramBot(config.TOKEN, {
  polling: true
});

bot.onText(/\/start/, msg => {

  const text = `${msg.from.first_name}, Здраствуйте!`
  const text2 = `Я - WebDeluxeBot \nВаш личный Робот-помощник!`
  const text3 = `Выберите, что Вас интересует или выберите "другое":`

  bot.sendMessage(helper.getChatId(msg), text)

  bot.sendMessage(helper.getChatId(msg), text2)

  bot.sendMessage(helper.getChatId(msg), text3, {
    reply_markup: {
      keyboard: keyboard.start
    }
  })

})

bot.on('message', msg => {
	

	const chatId = helper.getChatId(msg);

	switch (msg.text) {
		// Ansver dev site
		case kb.start.devSite:
			bot.sendMessage(chatId, `Хорошо. ${msg.from.first_name}, а у Вас уже есть сайт? `, {
				reply_markup: {keyboard: keyboard.hasSite}
			});
			break

		// Ansver have site
		case kb.hasSite.haveSite:
			bot.sendMessage(chatId, `Хорошо. ${msg.from.first_name}, а у Вас уже есть сайт? `, {
				reply_markup: {keyboard: keyboard.hasSite}
			});
			break

		// Ansver no site
		case kb.hasSite.noSite:
			bot.sendMessage(chatId, `Отлично! Значит начнем с чистого листа и сделаем сайт с нуля..\n \nУ Вас уже есть описание будущего сайта?`, {
				reply_markup: {keyboard: keyboard.contact}
			});
			break

		// Send contact phone
		case kb.contact.phone:
			bot.sendMessage(chatId, `Отлично! Значит начнем с чистого листа и сделаем сайт с нуля..\n \nУ Вас уже есть описание будущего сайта?`, {
				reply_markup: {keyboard: keyboard.contact}
			});
			break
	}

	if(msg.contact) {
		console.log('Getting contact');
		bot.forwardMessage(msg.chat.id, msg.chat.id, msg.message_id)
	}

});

// Forward E-mail	
bot.onText(/\@(.+)/, (msg) => {
	bot.forwardMessage(msg.chat.id, msg.chat.id, msg.message_id)
	bot.sendChatAction(msg.chat.id,  msg.message_id)
})
