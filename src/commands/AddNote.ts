import { Client, EmbedBuilder, GuildMember, Message } from "discord.js";
import { addNoteQuery } from "./../utils/queryDB";

export const AddNoteCommand = async (msg: Message, args: string[], client: Client) => {
  if (!msg.member?.roles.cache.has('845388176348545075')) return;

  if (args.length != 2) return msg.channel.send({embeds: [new EmbedBuilder().setColor("Red").setTitle("Error").setDescription("Usage: .addnote <user or userId> <note>")]});

  let player: GuildMember | undefined;

  try {
    player = msg.mentions?.members?.first() || (await msg.guild?.members.fetch(args[0]));
  } catch (e) {
    msg.channel.send({embeds: [new EmbedBuilder().setColor("Red").setTitle("Error").setDescription("User not found.")]});
    return;
  }
  if (!player) {
    msg.channel.send('Please specify a player');
    return;
  }

  const playerId = player.id
  const playerUsername = player.user.username
  const note = args[1]

  addNoteQuery(playerId, playerUsername, note, msg)

}