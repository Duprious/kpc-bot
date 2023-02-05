"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddNoteCommand = void 0;
const discord_js_1 = require("discord.js");
const queryDB_1 = require("./../utils/queryDB");
const AddNoteCommand = async (msg, args, client) => {
    if (!msg.member?.roles.cache.has('845388176348545075'))
        return;
    if (args.length < 2)
        return msg.channel.send({ embeds: [new discord_js_1.EmbedBuilder().setColor("Red").setTitle("Error").setDescription("Usage: .addnote <user or userId> <note>")] });
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
    const playerId = player.id;
    const playerUsername = player.user.username;
    args.shift();
    const note = args.join(" ");
    (0, queryDB_1.addNoteQuery)(playerId, playerUsername, note, msg);
};
exports.AddNoteCommand = AddNoteCommand;
