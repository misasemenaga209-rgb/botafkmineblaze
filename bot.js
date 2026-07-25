const mineflayer = require('mineflayer')

const config = {
  host: 'mineblaze.net',
  port: 25565,
  username: 'ТвойНик',          // сюда свой ник
  version: false,               // автоопределение версии
  // auth: 'microsoft'          // раскомментируй, если лицензия
}

function createBot() {
  const bot = mineflayer.createBot(config)

  bot.once('spawn', () => {
    console.log('Бот зашёл на сервер')
    setTimeout(() => {
      bot.chat('/g3')
    }, 1500)
  })

  // Анти-АФК — бьёт только рукой каждые 4-7 секунд
  const antiAfk = setInterval(() => {
    if (!bot.entity) return
    bot.swingArm('right')
  }, 4000 + Math.random() * 3000)

  // Анти-перезаход
  bot.on('end', (reason) => {
    console.log('Отключило:', reason)
    clearInterval(antiAfk)
    console.log('Перезаход через 8 секунд...')
    setTimeout(createBot, 8000)
  })

  bot.on('kicked', (reason) => {
    console.log('Кикнуло:', reason)
  })

  bot.on('error', (err) => {
    console.log('Ошибка:', err)
  })
}

createBot()