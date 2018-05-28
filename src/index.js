const TelegramBot = require('node-telegram-bot-api');
const mongoose = require('mongoose');
const config = require('./config');
const helper = require('./helper');
const keyboard = require('./keyboard');
const kb = require('./keyboard-buttons');
const date = new Date();
const timeStart = `${date.getMinutes()}`;


// Log start
helper.logStart();

// Bot init
const bot = new TelegramBot(config.TOKEN, {
  polling: true
});
// Bot start
bot.onText(/\/start/, msg => {

  const text = `${msg.from.first_name}, Здраствуйте!`
  const text2 = `Я - WebDeluxeBot \nВаш личный Робот-помощник!`
  const text3 = `Выберите, что Вас интересует или выберите "другое":`

  bot.sendMessage(helper.getChatId(msg), text)
  setTimeout(function() {
  	bot.sendMessage(helper.getChatId(msg), text2)
  }, 500)
  setTimeout(function() {
  	bot.sendMessage(helper.getChatId(msg), text3, {
    reply_markup: {
      keyboard: keyboard.start
    }
  })
  },800)
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
			bot.sendMessage(chatId, `Вы хотите его улучшить?`, {
				reply_markup: {keyboard: keyboard.modernizeSite}
			});
			break

		// Ansver no site
		case kb.hasSite.noSite:
			bot.sendMessage(chatId, `Отлично! Значит начнем с чистого листа и сделаем сайт с нуля..\n \nУ Вас уже есть описание будущего сайта?`, {
				reply_markup: {keyboard: keyboard.deskSite}
			});
			break
		case kb.deskSite.noDesk:
			bot.sendMessage(chatId, `Ничего страшного!\nМы поможем определиться, какой сайт Вам нужен. \n\nДля этого готовы заполнить бриф? Или связать Вас с менеджером?`, {
				reply_markup: {keyboard: keyboard.briefOrMeneger}
			});
			break
		case kb.deskSite.haveDesk:
			bot.sendMessage(chatId, `Тогда я передаю Ваш запрос нашему менеджеру.\nОн расскажет подробнее, как мы работаем, предложит варианты и скажет цены.\nКак будет удобнее связаться с Вами?`, {
				reply_markup: {keyboard: keyboard.contact2}
			});
			break

		case kb.briefOrMeneger.two:
			bot.sendMessage(chatId, `Тогда я передаю Ваш запрос нашему менеджеру.\nОн расскажет подробнее, как мы работаем, предложит варианты и скажет цены.\nКак будет удобнее связаться с Вами?`, {
				reply_markup: {keyboard: keyboard.contact2}
			});
			
		

		// Send contact phone
		case kb.contact.phone:
			bot.sendMessage(chatId, `Отлично! Значит начнем с чистого листа и сделаем сайт с нуля..\n \nУ Вас уже есть описание будущего сайта?`, {
				reply_markup: {keyboard: keyboard.contact3}
			});
			break

		case kb.contact.email:
			bot.sendMessage(chatId, `Напишите e-mail, удобный для связи`, {
				reply_markup:  {
					remove_keyboard: true
				}
			});
			break

		case kb.contact.input_phone:
			bot.sendMessage(chatId, `Введите пожалуйста ваш телефон в формате:\n<strong>+380507776655</strong> `, {
				parse_mode: 'HTML',
				reply_markup: {
					remove_keyboard: true
				}
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

bot.onText(/^\+38\d{3}\d{3}\d{2}\d{2}$/, (msg) => {
	bot.forwardMessage(msg.chat.id, msg.chat.id, msg.message_id)
	bot.sendChatAction(msg.chat.id,  msg.message_id)
})

