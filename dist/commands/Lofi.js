"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LofiCommand = void 0;
const discord_js_1 = require("discord.js");
const distube_1 = require("distube");
const LofiCommand = async (msg, args, client) => {
    if (!msg.member?.roles.cache.has('845388176348545075'))
        return;
    const distube = new distube_1.DisTube(client, {
        leaveOnStop: false,
        leaveOnFinish: false,
        leaveOnEmpty: false,
        emitNewSongOnly: false,
    });
    if (args.length < 1) {
        if (!msg.member?.roles.cache.has('845388176348545075') && !msg.author.bot)
            return;
        const voiceChannel = client?.guilds.cache.get('672146248182136863')?.channels.cache?.find((channel) => channel.id === '1060581592029987027')?.type === discord_js_1.ChannelType.GuildVoice ? client?.guilds.cache.get('672146248182136863')?.channels.cache?.find((channel) => channel.id === '1060581592029987027') : undefined;
        if (!voiceChannel)
            return;
        if (voiceChannel.type !== discord_js_1.ChannelType.GuildVoice)
            return;
        distube.play(voiceChannel, 'https://www.youtube.com/watch?v=jfKfPfyJRdk', {
            member: msg.member,
            textChannel: msg.channel.type === discord_js_1.ChannelType.GuildText ? msg.channel : undefined,
            message: msg,
        });
    }
    else if (args[0] === 'stop') {
        distube.voices.leave(msg);
    }
};
exports.LofiCommand = LofiCommand;
