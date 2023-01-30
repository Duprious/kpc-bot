import { EmbedBuilder, Message } from "discord.js";
import { connection } from "./../bot"

export type Root = Root2[]

export interface Root2 {
  username: string
  id: number
  player_id: string
  note: string
}

export type DelNoteResults = DelNoteResult[]

export interface DelNoteResult {
  count: number
}



export const addNoteQuery = (playerId: string, playerUsername: string, note: string, msg: Message) => {
  connection.query(`
  INSERT INTO players (id, username) 
  SELECT '${playerId}', '${playerUsername}'
  FROM DUAL
  WHERE NOT EXISTS (SELECT id FROM players WHERE id = '${playerId}');
  `, function (err, results, fields) {
    if (err) {
      return
    } else {
      connection.query(`
      INSERT INTO notes (player_id, note)
      SELECT '${playerId}', '${note}'
      FROM DUAL
      WHERE EXISTS (SELECT id FROM players WHERE id = '${playerId}');
      `, function (err, results, fields) {
        if (err) {
          return
        } else {
          msg.channel.send({embeds: [new EmbedBuilder().setColor("Green").setTitle("Success").setDescription(`Added Note: ${note} to ${playerUsername}`)]});
        }
      });
    }
  });
}

export const listNotesQuery = (playerId: string, playerUsername: string, msg: Message) => {
  connection.query(`
    SELECT players.username, notes.* FROM notes JOIN players ON notes.player_id = players.id where players.id = ${playerId};
  `, function (err, results: Root, fields) {
    if (err) {
      return
    } else {
      if (results.length == 0) {
        msg.channel.send({embeds: [new EmbedBuilder().setColor("Red").setTitle("Error").setDescription(`${playerUsername} has no notes`)]});
      } else {
        const embed = new EmbedBuilder()
          .setTitle(`${playerUsername}'s notes`)
          .setTimestamp()
          .setColor("Blurple")

        for (const note of results) {
          embed.addFields(
            {
              name: `ID: ${note.id}`,
              value: `${note.note}`,
              inline: false
            }
          )
        }
        msg.channel.send({embeds: [embed]})
      }
    }
  }
  )
}

export const delNoteQuery = (noteId: string, msg: Message) => {
  const checkNoteExist = `SELECT COUNT(*) as count FROM notes WHERE id = ${noteId}`;

  connection.query(checkNoteExist, function (err, result: DelNoteResults) {
      if (err) throw err;
      if (result[0].count > 0) {
          const deleteNoteQuery = `DELETE FROM notes WHERE id = ${noteId}`;
          connection.query(deleteNoteQuery, function (err, result) {
              if (err) throw err;
              msg.channel.send({embeds: [new EmbedBuilder().setColor("Green").setTitle("Success").setDescription(`Note with id ${noteId} deleted successfully`)]});
          });
      } else {
        msg.channel.send({embeds: [new EmbedBuilder().setColor("Red").setTitle("Error").setDescription(`Note with id ${noteId} doesn't exist on any player`)]});
      }
  });
}