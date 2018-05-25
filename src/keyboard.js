const kb = require('./keyboard-buttons')

module.exports = {
  start: [
    [kb.start.devSite],
    [kb.start.seo],
    [kb.start.devApp],
    [kb.start.other]
  ],
  hasSite: [
    [kb.hasSite.haveSite, kb.hasSite.noSite]
  ],
  deskSite: [
    [kb.deskSite.haveDesk, kb.deskSite.noDesk]
  ],
  contact: [
    [kb.contact.phone, kb.contact.email],
    [kb.contact.input_phone]
  ],
  films: [
  	[kb.film.random],
  	[kb.film.action, kb.film.comedy],
  	[kb.back]
  ],

  cinemas: [
  	[
  		{
  			text: 'Отправить местоположения',
  			request_location: true
  		}
  	],
  	[kb.back]
  ]
}