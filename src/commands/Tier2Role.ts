import { EmbedBuilder, GuildMember, Message } from "discord.js";

export const Tier2RoleCommand = async (msg: Message, args: string[]) => {

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

  const role = msg.guild?.roles.cache.find((role) => role.id === '785142632333836330');
  const member = msg.guild?.members.cache.get(player.id);

  if (!role || !member) return;

  if (member.roles.cache.has(role.id)) {
    member.roles.remove(role)
    msg.channel.send(`Removed ${role.name} from ${player.user.username}`);
    return;
  } else {
    member.roles.add(role);
    msg.channel.send(`Gave ${role.name} to ${player.user.username}`);
    return
  }
}