"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AltCheckCommand = void 0;
const date_fns_1 = require("date-fns");
const AltCheckCommand = async (msg, args, client) => {
    const player = msg.mentions.users.first();
    if (!msg.member?.roles.cache.has('845388176348545075'))
        return;
    if (!player) {
        msg.channel.send('Please specify a player');
        return;
    }
    const monthAgo = (0, date_fns_1.sub)(new Date(), { months: 1 }).getTime();
    if (player.createdTimestamp < monthAgo) {
        msg.channel.send(`${player.username}'s account is older than a month \n${player.username} was created on ${player.createdAt.toLocaleString()} \n${player.username} joined the server on ${msg.guild?.members.cache.get(player.id)?.joinedAt?.toLocaleString()}`);
        return;
    }
    else {
        msg.channel.send(`${player.username}'s account is not older than a month \n${player.username} was created on ${player.createdAt.toLocaleString()} \n${player.username} joined the server on ${msg.guild?.members.cache.get(player.id)?.joinedAt?.toLocaleString()}`);
        return;
    }
};
exports.AltCheckCommand = AltCheckCommand;
