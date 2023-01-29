import { EmbedBuilder, GuildMember, Message } from "discord.js";

export const BlacklistCommand = async (msg: Message, args: string[]) => {
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

  const blacklistedRole = msg.guild?.roles.cache.find((role) => role.id === '892855186941444096');
  const member = msg.guild?.members.cache.get(player.id);

  if (!blacklistedRole || !member) return;

  if (member.roles.cache.has(blacklistedRole.id)) {
    member.roles.remove(blacklistedRole)
    msg.channel.send(`Removed ${blacklistedRole.name} from ${player.user.username}`);
    return;
  } else {
    member.roles.add(blacklistedRole);
    msg.channel.send(`Blacklisted ${player.user.username}`);
    return;
  }

}