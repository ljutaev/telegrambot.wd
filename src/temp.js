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


if(msg.contact) {
	console.log('Getting contact');
	bot.forwardMessage(msg.chat.id, msg.chat.id, msg.message_id)
}


// Forward E-mail	
bot.onText(/\@(.+)/, (msg) => {
	bot.forwardMessage(msg.chat.id, msg.chat.id, msg.message_id)
	bot.sendChatAction(msg.chat.id,  msg.message_id)
})

bot.onText(/^\+38\d{3}\d{3}\d{2}\d{2}$/, (msg) => {
	bot.forwardMessage(msg.chat.id, msg.chat.id, msg.message_id)
	bot.sendChatAction(msg.chat.id,  msg.message_id)
})

if(msg.contact) {
		console.log('Getting contact');
		bot.forwardMessage(msg.chat.id, msg.chat.id, msg.message_id)
	}