"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnTimeoutCommand = void 0;
const discord_js_1 = require("discord.js");
const UnTimeoutCommand = async (msg, args) => {
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
    player.timeout(null);
    msg.channel.send({ embeds: [new discord_js_1.EmbedBuilder().setColor("Green").setTitle("Untimed Out").setDescription(`Player: ${player.user.username} has been untimed out`)] });
};
exports.UnTimeoutCommand = UnTimeoutCommand;
