const Discord = require('discord.js');//yılmazdev
const data = require('quick.db');//yılmazdev
//yılmazdev
//yılmazdev
exports.run = async (client, message, args) => {
if(!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send(new Discord.MessageEmbed().setDescription(' Bu komutu kullanabilmek için `Mesajları Yönet` iznine sahip olmalısın.'));
if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setDescription('🧹 Silinecek mesaj miktarını girmelisin.'));
if(args[0] > 100) return message.channel.send(new Discord.MessageEmbed().setDescription('🧹`100` üzeri mesaj miktarını aynı anda silemem.'));
message.channel.bulkDelete(args[0]);
return message.channel.send(new Discord.MessageEmbed().setDescription('🧹'+`${args[0]}`+' adet mesaj başarıyla silindi.')).then(m => m.delete({timeout: 5000}));
};//yılmazdev
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["temizle"],
  permLevel: 1
};//yılmazdev
exports.help = {
  name: 'sil',//yılmazdev
  description: 'Belirlenen miktarda mesajı siler.',//yılmazdev
  usage: 'sil '//yılmazdev
  };
//yılmazdev