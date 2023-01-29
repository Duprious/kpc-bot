"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlacklistCommand = void 0;
const discord_js_1 = require("discord.js");
const BlacklistCommand = async (msg, args) => {
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
    const blacklistedRole = msg.guild?.roles.cache.find((role) => role.id === '892855186941444096');
    const member = msg.guild?.members.cache.get(player.id);
    if (!blacklistedRole || !member)
        return;
    if (member.roles.cache.has(blacklistedRole.id)) {
        member.roles.remove(blacklistedRole);
        msg.channel.send(`Removed ${blacklistedRole.name} from ${player.user.username}`);
        return;
    }
    else {
        member.roles.add(blacklistedRole);
        msg.channel.send(`Blacklisted ${player.user.username}`);
        return;
    }
};
exports.BlacklistCommand = BlacklistCommand;
