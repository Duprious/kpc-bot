import { EmbedBuilder, GuildMember, Message } from "discord.js";

export const ValidationBlacklistCommand = async (msg: Message, args: string[]) => {
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

  const validationBlacklistRole = msg.guild?.roles.cache.find((role) => role.id === '823597873731469383');
  const member = msg.guild?.members.cache.get(player.id);

  if (!validationBlacklistRole || !member) return;

  if (member.roles.cache.has(validationBlacklistRole.id)) {
    member.roles.remove(validationBlacklistRole)
    msg.channel.send(`Removed ${validationBlacklistRole.name} from ${player.user.username}`);
    return;
  } else {
    member.roles.add(validationBlacklistRole);
    msg.channel.send(`Validation blacklisted ${player.user.username}`);
    return;
  }

}