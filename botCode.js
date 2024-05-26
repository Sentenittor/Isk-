			const Discord = require('discord.js');
			const client = new Discord.Client();
			const prefix = '/'; // Change this to your desired prefix
			
client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'announce') {
        message.reply('Please mention the channel where you want to send the announcement.');

        const filter = m => message.author.id === m.author.id;
        const channelCollector = new Discord.MessageCollector(message.channel, filter, { max: 1 });

        channelCollector.on('collect', channelMessage => {
            const channel = channelMessage.mentions.channels.first();
            if (!channel) return message.reply('You didn\'t mention a valid channel.');

            message.reply('What message would you like to announce?');

            const messageCollector = new Discord.MessageCollector(message.channel, filter, { max: 1 });

            messageCollector.on('collect', announcementMessage => {
                const announcement = announcementMessage.content;

                channel.send(announcement);
            });
        });
    }
});

						client.login('ef0557aee611c3d4acdc0971e4fb3050b04f2f91ec8bd695bc15ba5bb06f6880');