import { Client, EmbedBuilder, GuildMember, Message, TextChannel } from "discord.js";

export const BlacklistCommand = async (msg: Message, args: string[], client: Client) => {
  const logschannel = client.channels.cache.get('1078362719431970926') as TextChannel //kpc: 801552076726730752

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

  const blacklistedRole = msg.guild?.roles.cache.find((role) => role.id === '1076500082075107418'); //kpc: 892855186941444096
  const member = msg.guild?.members.cache.get(player.id);

  if (!blacklistedRole || !member) return;

  if (member.roles.cache.has(blacklistedRole.id)) {

    let logembed = new EmbedBuilder()
      .setTitle(`Blacklist command has been ran!`)
      .setDescription(`Moderator: ${msg.author}`)
      .setAuthor({ name: `User: ${player?.user.username}`, iconURL: player?.displayAvatarURL() })
      .setColor('Green')
      .setTimestamp()

    let doneembed = new EmbedBuilder()
      .setTitle('Successfully done!')
      .setDescription(`${player?.user.username} has been unblacklisted / whitelisted`)
      .setColor("Green")
      .setTimestamp()

    member.roles.remove(blacklistedRole)
    msg.channel.send({ embeds: [doneembed] })
    logschannel.send({ embeds: [logembed] });
    return;
  } else {

    let logembed2 = new EmbedBuilder()
      .setTitle(`Blacklist command has been ran!`)
      .setDescription(`Moderator: ${msg.author}`)
      .setAuthor({ name: `User: ${player?.user.username}`, iconURL: player?.displayAvatarURL() })
      .setColor('Green')
      .setTimestamp()
    
    let doneembed2 = new EmbedBuilder()
      .setTitle('Successfully done!')
      .setDescription(`${player?.user.username} has been blacklisted`)
      .setColor("Green")
      .setTimestamp()

    member.roles.add(blacklistedRole);
    msg.channel.send({ embeds: [doneembed2] })
    logschannel.send({ embeds: [logembed2] });
    return;
  }

}