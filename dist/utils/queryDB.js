"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delNoteQuery = exports.listNotesQuery = exports.addNoteQuery = void 0;
const discord_js_1 = require("discord.js");
const bot_1 = require("./../bot");
const addNoteQuery = (playerId, playerUsername, note, msg) => {
    bot_1.connection.query(`
  INSERT INTO players (id, username) 
  SELECT '${playerId}', '${playerUsername}'
  FROM DUAL
  WHERE NOT EXISTS (SELECT id FROM players WHERE id = '${playerId}');
  `, function (err, results, fields) {
        if (err) {
            return;
        }
        else {
            bot_1.connection.query(`
      INSERT INTO notes (player_id, note)
      SELECT '${playerId}', '${note}'
      FROM DUAL
      WHERE EXISTS (SELECT id FROM players WHERE id = '${playerId}');
      `, function (err, results, fields) {
                if (err) {
                    return;
                }
                else {
                    msg.channel.send({ embeds: [new discord_js_1.EmbedBuilder().setColor("Green").setTitle("Success").setDescription(`Added Note: ${note} to ${playerUsername}`)] });
                }
            });
        }
    });
};
exports.addNoteQuery = addNoteQuery;
const listNotesQuery = (playerId, playerUsername, msg) => {
    bot_1.connection.query(`
    SELECT players.username, notes.* FROM notes JOIN players ON notes.player_id = players.id where players.id = ${playerId};
  `, function (err, results, fields) {
        if (err) {
            return;
        }
        else {
            if (results.length == 0) {
                msg.channel.send({ embeds: [new discord_js_1.EmbedBuilder().setColor("Red").setTitle("Error").setDescription(`${playerUsername} has no notes`)] });
            }
            else {
                const embed = new discord_js_1.EmbedBuilder()
                    .setTitle(`${playerUsername}'s notes`)
                    .setTimestamp()
                    .setColor("Blurple");
                for (const note of results) {
                    embed.addFields({
                        name: `ID: ${note.id}`,
                        value: `${note.note}`,
                        inline: false
                    });
                }
                msg.channel.send({ embeds: [embed] });
            }
        }
    });
};
exports.listNotesQuery = listNotesQuery;
const delNoteQuery = (noteId, msg) => {
    const checkNoteExist = `SELECT COUNT(*) as count FROM notes WHERE id = ${noteId}`;
    bot_1.connection.query(checkNoteExist, function (err, result) {
        if (err)
            throw err;
        if (result[0].count > 0) {
            const deleteNoteQuery = `DELETE FROM notes WHERE id = ${noteId}`;
            bot_1.connection.query(deleteNoteQuery, function (err, result) {
                if (err)
                    throw err;
                msg.channel.send({ embeds: [new discord_js_1.EmbedBuilder().setColor("Green").setTitle("Success").setDescription(`Note with id ${noteId} deleted successfully`)] });
            });
        }
        else {
            msg.channel.send({ embeds: [new discord_js_1.EmbedBuilder().setColor("Red").setTitle("Error").setDescription(`Note with id ${noteId} doesn't exist on any player`)] });
        }
    });
};
exports.delNoteQuery = delNoteQuery;
