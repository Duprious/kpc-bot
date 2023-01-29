"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeoutCommand = void 0;
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const ms_1 = tslib_1.__importDefault(require("ms"));
const TimeoutCommand = async (msg, args) => {
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
    try {
        const timeToTimeout = (0, ms_1.default)(args[1]);
        player.timeout(timeToTimeout);
        msg.channel.send({ embeds: [new discord_js_1.EmbedBuilder().setColor("Green").setTitle("Timed Out").setDescription(`User ${player.user.username} has been timed out for ${args[1]}`)] });
    }
    catch (e) {
        msg.channel.send({ embeds: [new discord_js_1.EmbedBuilder().setColor("Red").setTitle("Error").setDescription("Missing permissions or bad usage")] });
    }
};
exports.TimeoutCommand = TimeoutCommand;
