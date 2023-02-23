import { Client, EmbedBuilder, GuildMember, Message, TextChannel } from "discord.js";

export const ValidationBlacklistCommand = async (msg: Message, args: string[], client: Client) => {
  // if (!msg.member?.roles.cache.has('845388176348545075')) return;
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

  const validationBlacklistRole = msg.guild?.roles.cache.find((role) => role.id === '1062782583622074498'); //kpc: 823597873731469383
  const member = msg.guild?.members.cache.get(player.id);

  if (!validationBlacklistRole || !member) return;

  if (member.roles.cache.has(validationBlacklistRole.id)) {

    let logembed = new EmbedBuilder()
      .setTitle(`Validation blacklist command has been ran!`)
      .setDescription(`Moderator: ${msg.author}`)
      .setAuthor({ name: `User: ${player?.user.username}`, iconURL: player?.displayAvatarURL() })
      .setColor('Green')
      .setTimestamp()
    
    
    let doneembed = new EmbedBuilder()
      .setTitle('Successfully done!')
      .setDescription(`${player?.user.username} has been unvalidation blacklisted`)
      .setColor("Green")
      .setTimestamp()
    
    member.roles.remove(validationBlacklistRole)
    msg.channel.send({ embeds: [doneembed] })
    logschannel.send({ embeds: [logembed] });
    return;
  } else {

    let logembed2 = new EmbedBuilder()
      .setTitle(`Validation blacklist command has been ran!`)
      .setDescription(`Moderator: ${msg.author}`)
      .setAuthor({ name: `User: ${player?.user.username}`, iconURL: player?.displayAvatarURL() })
      .setColor('Green')
      .setTimestamp()

    let doneembed2 = new EmbedBuilder()
      .setTitle('Successfully done!')
      .setDescription(`${player?.user.username} has been validation blacklisted`)
      .setColor("Green")
      .setTimestamp()
    
    member.roles.add(validationBlacklistRole);
    msg.channel.send({ embeds: [doneembed2] })
    logschannel.send({ embeds: [logembed2] });
    return;
  }

}