const discord = require('discord.js')
const dotEnv = require('dotenv')
const dclient = new discord.Client()

dotEnv.load()

let channelNames = [
  'self-promotion',
  'self-advertisement',
  'advertising'
]

dclient.on('message', msg => {
  if (msg.author.id !== dclient.user.id) return
  if (!msg.content.startsWith('~promote')) return
  let messageArray = msg.content.split(' ')
  let promotionMessage = messageArray.slice(1).join(' ')
  let channelsSent = []
  channelNames.forEach(channelName => {
    dclient.channels.findAll('name', channelName).forEach(c => {
      c.send(promotionMessage)
      channelsSent.push('\n' + c.guild.name + ' | #' + c.name)
    })
  })
  msg.channel.send(`This message was sent to:\n\`${channelsSent}\``)
})

dclient.on('ready', () => {
  console.log('Ready. Active user ' + dclient.user.tag)
})

dclient.login(process.env.DISCORD_TOKEN)
