import { Client, EmbedBuilder, GuildMember, Message, TextChannel} from "discord.js";

export const UnTimeoutCommand = async (msg: Message, args: string[], client: Client) => {
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
  player.timeout(null)

  let logembed = new EmbedBuilder()
    .setTitle(`Untimeout command has been ran!`)
    .addFields(
      { name: 'Moderator', value: `${msg.author}`, inline: true },
    )
    .setAuthor({ name: `User: ${player?.user.username}`, iconURL: player?.displayAvatarURL() })
    .setColor('Green')
    .setTimestamp()
  
  let doneembed = new EmbedBuilder()
  .setTitle('Successfully done!')
  .setDescription(`${player?.user.username} has been untimed out`)
  .setColor("Green")
  .setTimestamp()

  msg.channel.send({ embeds: [doneembed] })
  logschannel.send({ embeds: [logembed] })
}