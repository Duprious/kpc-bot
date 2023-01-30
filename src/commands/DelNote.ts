import { Client, EmbedBuilder, GuildMember, Message } from "discord.js";
import { delNoteQuery } from "./../utils/queryDB";

export const DelNoteCommand = async (msg: Message, args: string[], client: Client) => {
  if (!msg.member?.roles.cache.has('845388176348545075')) return;

  if (args.length != 1) return msg.channel.send({embeds: [new EmbedBuilder().setColor("Red").setTitle("Error").setDescription(`Usage: .delnote <noteId>`)]});

  const noteId = args[0]

  if (Number.isNaN(parseInt(noteId))) return msg.channel.send({embeds: [new EmbedBuilder().setColor("Red").setTitle("Error").setDescription(`ID has to be a number`)]});

  delNoteQuery(noteId, msg)


}