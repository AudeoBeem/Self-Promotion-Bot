const discord = require('discord.js')
const dotEnv = require('dotenv')
const dclient = new discord.Client()

dotEnv.load()

dclient.on('message', msg => {
  if (msg.author.id !== dclient.user.id) return
  if (!msg.content.startsWith('~promote')) return
  let messageArray = msg.content.split(' ')
  let promotionMessage = messageArray.slice(1).join(' ')
  let channelsSent = []
  dclient.channels.findAll('name', 'self-promotion').forEach(c => {
    c.send(promotionMessage)
    channelsSent.push(' ' + c.guild.name)
  })
  msg.channel.send(`This message was sent to:${channelsSent}`)
})

dclient.on('ready', () => {
  console.log('Ready. Active user ' + dclient.user.tag)
})

dclient.login(process.env.DISCORD_TOKEN)
