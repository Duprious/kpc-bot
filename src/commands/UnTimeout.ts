import { EmbedBuilder, GuildMember, Message } from "discord.js";

export const UnTimeoutCommand = async (msg: Message, args: string[]) => {
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
  player.timeout(null)
  msg.channel.send({embeds: [new EmbedBuilder().setColor("Green").setTitle("Untimed Out").setDescription(`Player: ${player.user.username} has been untimed out`)]});
}