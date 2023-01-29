import { EmbedBuilder, GuildMember, Message } from "discord.js";
import ms from 'ms'

export const TimeoutCommand = async (msg: Message, args: string[]) => {
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
  try {
    const timeToTimeout = ms(args[1])
    player.timeout(timeToTimeout)
    msg.channel.send({embeds: [new EmbedBuilder().setColor("Green").setTitle("Timed Out").setDescription(`User ${player.user.username} has been timed out for ${args[1]}`)]});
  } catch (e) {
    msg.channel.send({embeds: [new EmbedBuilder().setColor("Red").setTitle("Error").setDescription("Missing permissions or bad usage")]});
  }


  

}