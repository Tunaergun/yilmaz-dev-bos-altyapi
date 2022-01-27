const Discord = require("discord.js");//Discord:https://discord.gg/GaUXSSVThC
const client = new Discord.Client();//Youtube:||kanal1:https://www.youtube.com/c/hakanycgyayin||kanal2:https://www.youtube.com/channel/UCQkXr7msreO788i7IhvTpGw
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
const Jimp = require("jimp");
const db = require("quick.db");
var prefix = ayarlar.prefix;

client.on("ready", () => {
  console.log(`Bot suan bu isimle aktif: ${client.user.tag}!`);
});

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

require("./util/eventLoader")(client);

client.login(ayarlar.token);
//yılmazdev
//yılmazdev
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });//yılmazdev
  });//yılmazdev
});//yılmazdev
//yılmazdev
client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }//yılmazdev
  });//yılmazdev
};//yılmazdev
//yılmazdev
client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
//yılmazdev
client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};//yılmazdev
//yılmazdev
client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("MANAGE_MESSAGES")) permlvl = 1;
  if (message.member.hasPermission("MANAGE_ROLES")) permlvl = 2;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 3;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 4;
  if (ayarlar.sahip.includes(message.author.id)) permlvl = 5;
  return permlvl;
};//yılmazdev
//yılmazdev
var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
//yılmazdev
client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});//yılmazdev
//yılmazdev
client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});//yılmazdev
//yılmazdev
client.login(ayarlar.token);
//yılmazdev