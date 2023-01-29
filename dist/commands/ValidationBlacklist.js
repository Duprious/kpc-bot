"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationBlacklistCommand = void 0;
const discord_js_1 = require("discord.js");
const ValidationBlacklistCommand = async (msg, args) => {
    if (!msg.member?.roles.cache.has('845388176348545075'))
        return;
    let player;
    try {
        player = msg.mentions?.members?.first() || (await msg.guild?.members.fetch(args[0]));
    }
    catch (e) {
        msg.channel.send({ embeds: [new discord_js_1.EmbedBuilder().setColor("Red").setTitle("Error").setDescription("User not found.")] });
        return;
    }
    if (!player) {
        msg.channel.send('Please specify a player');
        return;
    }
    const validationBlacklistRole = msg.guild?.roles.cache.find((role) => role.id === '823597873731469383');
    const member = msg.guild?.members.cache.get(player.id);
    if (!validationBlacklistRole || !member)
        return;
    if (member.roles.cache.has(validationBlacklistRole.id)) {
        member.roles.remove(validationBlacklistRole);
        msg.channel.send(`Removed ${validationBlacklistRole.name} from ${player.user.username}`);
        return;
    }
    else {
        member.roles.add(validationBlacklistRole);
        msg.channel.send(`Validation blacklisted ${player.user.username}`);
        return;
    }
};
exports.ValidationBlacklistCommand = ValidationBlacklistCommand;
