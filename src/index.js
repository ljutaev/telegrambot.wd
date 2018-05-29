const TelegramBot = require('node-telegram-bot-api');
const mongoose = require('mongoose');
const config = require('./config');
const helper = require('./helper');
const answers = require('./answerTexts');
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
	}, 700)

	setTimeout(function() {
		bot.sendMessage(helper.getChatId(msg), text3, {
			reply_markup: {
				keyboard: keyboard.start
			}
		})
	}, 1200)
})

bot.on('message', msg => {
	const chatId = helper.getChatId(msg);
	switch (msg.text) {
		case kb.start.devSite:
			bot.sendMessage(chatId, `Хорошо. ${msg.from.first_name}, а у Вас уже есть сайт? `, {
				reply_markup: {keyboard: keyboard.hasSite}
			});
			break
		case kb.hasSite.haveSite:
			bot.sendMessage(chatId, `Вы хотите его улучшить?`, {
				reply_markup: {keyboard: keyboard.modernizeSite}
			});
			break
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
			bot.sendMessage(chatId, `Тогда я передаю Ваш запрос нашему менеджеру.\n\nОн расскажет подробнее, как мы работаем, предложит варианты и скажет цены.\n\nКак будет удобнее связаться с Вами?`, {
				reply_markup: {keyboard: keyboard.contactChoice}
			});
			break
		case kb.briefOrMeneger.one:
			bot.sendMessage(chatId, `Пожалуйста, скачайте и заполните БРИФ`, {
				reply_markup:  {remove_keyboard: true}
			});
			break
		case kb.briefOrMeneger.two:
			bot.sendMessage(chatId, `Тогда я передаю Ваш запрос нашему менеджеру.\n\nОн расскажет подробнее, как мы работаем, предложит варианты и скажет цены.\n\nКак будет удобнее связаться с Вами?`, {
				reply_markup: {keyboard: keyboard.contactChoice}
			});
			break
		case kb.contactChoice.phone:
			bot.sendMessage(chatId, `Введите пожалуйста ваш телефон в формате:\n<strong>+380507776655</strong> или отправьте контакт`, {
				reply_markup: {keyboard: keyboard.sendPhoneChoice},
				parse_mode: 'HTML'
			});
			break
		case kb.contactChoice.email:
			bot.sendMessage(chatId, `Напишите e-mail, удобный для связи`, {
				reply_markup:  {keyboard: keyboard.contactChoice}
			});
			break

		case kb.modernizeSite.yes:
			bot.sendMessage(chatId, answers.textModernizeSite, {
				reply_markup:  {keyboard: keyboard.noSendLink}
			});
			break
		case kb.noSendLink:
			bot.sendMessage(chatId, answers.textModernizeSiteNo, {
				reply_markup:  {keyboard: keyboard.contactChoice}
			});
			break
		case kb.modernizeSite.no:
			bot.sendMessage(chatId, `Так понимаю, хотите новый сайт?`, {
				reply_markup:  {keyboard: keyboard.wantNewSite}
			});
			break

		case kb.wantNewSite.yes:
			bot.sendMessage(chatId, `Отлично! Значит начнем с чистого листа и сделаем сайт с нуля..\n \nУ Вас уже есть описание будущего сайта?`, {
				reply_markup: {keyboard: keyboard.deskSite}
			});
			break
		case kb.wantNewSite.no:
			bot.sendMessage(chatId, `Хорошо!\n\nНаш специалист готов услышать Ваши пожелания...\n\nКак будет удобнее связаться с Вами?`, {
				reply_markup:  {keyboard: keyboard.contactChoice}
			});
			break
		

	}

});


// Answer email	
bot.onText(/\@(.+)/, (msg) => {

	bot.sendMessage(helper.getChatId(msg), answers.endTextF,{
		reply_markup:  {remove_keyboard: true}
	})

	setTimeout(function() {
		bot.sendMessage(helper.getChatId(msg), answers.endTextS)
	}, 700)

	setTimeout(function() {
		bot.sendMessage(helper.getChatId(msg), answers.endTextL)
	}, 1200)
})
// Answer input phone
bot.onText(/^\+38\d{3}\d{3}\d{2}\d{2}$/, (msg) => {
	bot.sendMessage(helper.getChatId(msg), answers.endTextF,{
		reply_markup:  {remove_keyboard: true}
	})

	setTimeout(function() {
		bot.sendMessage(helper.getChatId(msg), answers.endTextS)
	}, 700)

	setTimeout(function() {
		bot.sendMessage(helper.getChatId(msg), answers.endTextL)
	}, 1200)
})
// Answer on send contact
bot.on('contact', msg => { 
	bot.sendMessage(helper.getChatId(msg), answers.endTextF,{
		reply_markup:  {remove_keyboard: true}
	})

	setTimeout(function() {
		bot.sendMessage(helper.getChatId(msg), answers.endTextS)
	}, 700)

	setTimeout(function() {
		bot.sendMessage(helper.getChatId(msg), answers.endTextL)
	}, 1200)
})