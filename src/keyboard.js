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
  modernizeSite: [
    [kb.modernizeSite.yes, kb.modernizeSite.no]
  ],
  briefOrMeneger: [
    [kb.briefOrMeneger.one, kb.briefOrMeneger.two]
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