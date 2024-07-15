const { Client, Intents, MessageEmbed } = require('discord.js');
require('dotenv').config({ path: './config.env' }); // Lade die Umgebungsvariablen aus der config.env-Datei

// Erstelle einen neuen Discord-Client
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.MESSAGE_CONTENT
    ]
});

// Event: Bot ist bereit
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Event: Nachricht erhalten
client.on('messageCreate', async message => {
    // Ignoriere Nachrichten vom Bot selbst
    if (message.author.bot) return;

    // Überprüfe, ob die Nachricht mit dem Befehl !wunsch beginnt
    if (message.content.startsWith('!wunsch ')) {
        const wunschText = message.content.slice(8).trim();

        if (wunschText.length === 0) {
            message.reply('Bitte gib einen Wunschtext ein.');
            return;
        }

        // Erstelle eine Einbettung
        const embed = new MessageEmbed()
            .setColor('#00FF00')
            .setTitle('Neuer Wunsch eingereicht')
            .setDescription(wunschText)
            .setFooter(`Eingereicht von ${message.author.tag}`, message.author.displayAvatarURL());

        // Sende die Einbettung und reagiere mit den Emojis
        const wishMessage = await message.channel.send({ embeds: [embed] });
        await wishMessage.react('✅');
        await wishMessage.react('❌');
    }
});

// Bot mit dem Token aus der config.env-Datei einloggen
client.login(process.env.TOKEN);
