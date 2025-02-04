module.exports = {
	name: 'new',
	category: 'Ticket',
	description: 'Creates a new ticket.',
	usage: 'new',
	run: async (message, prefix) => {
		if (message.guild.channels.cache.find(channel => channel.name === `ticket-${message.author.id}`)) {
			return message.reply('you already have a ticket, please close your existing ticket first before opening a new one!');
		}

		message.guild.channels.create(`ticket-${message.author.id}`, {
			permissionOverwrites: [
				{
					id: message.author.id,
					allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
				},
				{
					id: message.guild.roles.everyone,
					deny: ['VIEW_CHANNEL'],
				},
			],
			type: 'text',
		}).then(async channel => {
			message.reply(`you have successfully created a ticket! Please click on ${channel} to view your ticket.`);
			channel.send(`Hi ${message.author}, welcome to your ticket! Please be patient, we will be with you shortly. If you would like to close this ticket please run \`${prefix}close\``);
			const logchannel = message.guild.channels.cache.find(channel => channel.name === 'ticket-logs');
			if (logchannel) {
				logchannel.send(`Ticket ${message.author.id} created. Click the following to veiw <#${channel.id}>`);
			}
		});
	},
};
