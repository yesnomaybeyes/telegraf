var Telegraf = require('../lib/telegraf')
var telegraf = new Telegraf(process.env.BOT_TOKEN)

// Set telegram webhook
// npm install -g localtunnel && lt --port 3000
telegraf.setWebHook('https://--------.localtunnel.me/secret-path', {content: 'webhook.pem'})

// Start https webhook
// FYI: First non-file reply will be served via webhook response
telegraf.startWebHook('/secret-path', null, 3000)

telegraf.on('text', function * () {
  this.reply('Coke or Pepsi?', {
    reply_markup: {
      inline_keyboard: [[
        { text: 'Coke', callback_data: 'Coke' },
        { text: 'Pepsi', callback_data: 'Pepsi' }
      ]]
    }
  })
})

telegraf.on('callback_query', function * () {
  // Will be sent via webhook, cause this is first reply
  yield this.answerCallbackQuery()

  // Will be sent via api request
  yield this.reply(`Oh, ${this.callbackQuery.data}! Great choise`)
})
