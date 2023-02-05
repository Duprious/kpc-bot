"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DelNoteCommand = void 0;
const discord_js_1 = require("discord.js");
const queryDB_1 = require("./../utils/queryDB");
const DelNoteCommand = async (msg, args, client) => {
    if (!msg.member?.roles.cache.has('845388176348545075'))
        return;
    if (args.length != 1)
        return msg.channel.send({ embeds: [new discord_js_1.EmbedBuilder().setColor("Red").setTitle("Error").setDescription(`Usage: .delnote <noteId>`)] });
    const noteId = args[0];
    if (Number.isNaN(parseInt(noteId)))
        return msg.channel.send({ embeds: [new discord_js_1.EmbedBuilder().setColor("Red").setTitle("Error").setDescription(`ID has to be a number`)] });
    (0, queryDB_1.delNoteQuery)(noteId, msg);
};
exports.DelNoteCommand = DelNoteCommand;
