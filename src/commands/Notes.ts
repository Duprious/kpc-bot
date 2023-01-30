import { Client, EmbedBuilder, GuildMember, Message } from "discord.js";
import { listNotesQuery } from "./../utils/queryDB";

export const NotesCommand = async (msg: Message, args: string[], client: Client) => {
  if (!msg.member?.roles.cache.has('845388176348545075')) return;

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

  listNotesQuery(playerId, playerUsername, msg)

}