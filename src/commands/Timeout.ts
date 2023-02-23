import { Client, Embed, EmbedBuilder, GuildMember, Message, TextChannel } from "discord.js";
import ms from 'ms'

export const TimeoutCommand = async (msg: Message, args: string[], client: Client) => {
  // if (!msg.member?.roles.cache.has('845388176348545075')) return;
  const logschannel = client.channels.cache.get('1078362719431970926') as TextChannel //kpc: 801552076726730752


  let player: GuildMember | undefined;

  try {
    player = msg.mentions?.members?.first() || (await msg.guild?.members.fetch(args[0]));
  } catch (e) {
    msg.channel.send({ embeds: [new EmbedBuilder().setColor("Red").setTitle("Error").setDescription("User not found.")] });
    return;
  }

  if (!player) {
    msg.channel.send('Please specify a player');
    return;
  }
  try {

    const timeToTimeout = ms(args[1])
    if (!timeToTimeout) {
      let notime = new EmbedBuilder()
        .setTitle('Error!')
        .setDescription("Please specify how long you would like to timeout this user for. Example: .timeout @user 1h")
        .setColor("Red")
        .setTimestamp()

      return msg.channel.send({ embeds: [notime] })
    }
    player.timeout(timeToTimeout)
    let logembed = new EmbedBuilder()
      .setTitle(`Time out command has been ran!`)
      .addFields(
        { name: 'Moderator', value: `${msg.author}`, inline: true },
        { name: 'Time', value: `${args[1]}`, inline: true }
      )
      .setAuthor({ name: `User: ${player?.user.username}`, iconURL: player?.displayAvatarURL() })
      .setColor('Green')
      .setTimestamp()

    let doneembed = new EmbedBuilder()
      .setTitle('Successfully done!')
      .setDescription(`${player?.user.username} has been timed out`)
      .setColor("Green")
      .setTimestamp()

    msg.channel.send({ embeds: [doneembed] })
    logschannel.send({ embeds: [logembed] })


  } catch (e) {
    msg.channel.send({ embeds: [new EmbedBuilder().setColor("Red").setTitle("Error").setDescription("Missing permissions or bad usage")] });
  }
  
}