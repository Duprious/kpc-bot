import { Client, Embed, EmbedBuilder, GuildMember, Message, TextChannel } from "discord.js";

export const TierManager = async (msg: Message, args: string[], client: Client) => {

  const rolelogchannel = client.channels.cache.get('1078367077498359838') as TextChannel //kpc: 801549134233600031
  const tier1role = msg.guild?.roles.cache.find((role) => role.id === '1062782818725417093')
  const tier2role = msg.guild?.roles.cache.find((role) => role.id === '1062784079499632640')
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

  const member = msg.guild?.members.cache.get(player.id);

  let norole = new EmbedBuilder()
    .setTitle('Error!')
    .setDescription('Role not found.')
    .setColor('Red')
    .setTimestamp()
  let nomember = new EmbedBuilder()
    .setTitle('Error!')
    .setDescription('User not found.')
    .setColor('Red')
    .setTimestamp()

  if (!tier1role || !tier2role) return msg.channel.send({ embeds: [norole] })
  if (!member) return msg.channel.send({ embeds: [nomember] })

  


  const tier1 = async () => {
    if (member.roles.cache.has(tier1role?.id)) {
      member.roles.remove(tier1role)

      let doneembed = new EmbedBuilder()
        .setTitle('Successfully done!')
        .setDescription(`Removed **${tier1role.name}** from **${player?.user.username}**`)
        .setColor("Green")
        .setTimestamp()

      let logembed = new EmbedBuilder()
        .setTitle('Tier 1 command from Tier Manager has been ran')
        .addFields(
          { name: 'Moderator', value: `${msg.author}`, inline: true },
        )
        .setAuthor({ name: `User: ${player?.user.username}`, iconURL: player?.displayAvatarURL() })
        .setColor("Green")
        .setTimestamp()

      msg.channel.send({ embeds: [doneembed] })
      rolelogchannel.send({ embeds: [logembed] })
    } else {
      member.roles.add(tier1role)

      let doneembed2 = new EmbedBuilder()
        .setTitle('Successfully done!')
        .setDescription(`Added **${tier1role.name}** to **${player?.user.username}**`)
        .setColor("Green")
        .setTimestamp()

      let logembed2 = new EmbedBuilder()
        .setTitle('Tier 1 command from Tier Manager has been ran')
        .addFields(
          { name: 'Moderator', value: `${msg.author}`, inline: true },
        )
        .setAuthor({ name: `User: ${player?.user.username}`, iconURL: player?.displayAvatarURL() })
        .setColor("Green")
        .setTimestamp()

      msg.channel.send({ embeds: [doneembed2] })
      rolelogchannel.send({ embeds: [logembed2] })
      return
    }
  }


  const tier2 = async () => {
    if (member.roles.cache.has(tier2role?.id)) {
      member.roles.remove(tier2role)

      let doneembed = new EmbedBuilder()
        .setTitle('Successfully done!')
        .setDescription(`Removed **${tier2role.name}** from **${player?.user.username}**`)
        .setColor("Green")
        .setTimestamp()

      let logembed = new EmbedBuilder()
        .setTitle('Tier 2 command from Tier Manager has been ran')
        .addFields(
          { name: 'Moderator', value: `${msg.author}`, inline: true },
        )
        .setAuthor({ name: `User: ${player?.user.username}`, iconURL: player?.displayAvatarURL() })
        .setColor("Green")
        .setTimestamp()

      msg.channel.send({ embeds: [doneembed] })
      rolelogchannel.send({ embeds: [logembed] })
    } else {
      member.roles.add(tier2role)

      let doneembed2 = new EmbedBuilder()
        .setTitle('Successfully done!')
        .setDescription(`Removed **${tier2role.name}** from **${player?.user.username}**`)
        .setColor("Green")
        .setTimestamp()

      let logembed2 = new EmbedBuilder()
        .setTitle('Tier 2 command from Tier Manager has been ran')
        .addFields(
          { name: 'Moderator', value: `${msg.author}`, inline: true },
        )
        .setAuthor({ name: `User: ${player?.user.username}`, iconURL: player?.displayAvatarURL() })
        .setColor("Green")
        .setTimestamp()

      
      msg.channel.send({ embeds: [doneembed2] })
      rolelogchannel.send({ embeds: [logembed2] })
      return
    }
  }


  const promote = async () => {
    if (member.roles.cache.has(tier1role?.id)) {
      let alrhasroleembed = new EmbedBuilder()
        .setTitle('Error!')
        .setDescription(`**${player?.user.username}** already has **${tier1role.name}** and cannot be promoted.`)
        .setColor('Red')
        .setTimestamp()
      return msg.channel.send({ embeds: [alrhasroleembed] })
    } else if (member.roles.cache.has(tier2role?.id)) {
      member.roles.add(tier1role)
      member.roles.remove(tier2role)
      let doneembed = new EmbedBuilder()
        .setTitle('Successfully Done!')
        .setDescription(`**${player?.user.username}** has been promoted to **${tier1role.name}**`)
        .setColor('Green')
        .setTimestamp()

      let logembed = new EmbedBuilder()
        .setTitle('Promote command from Tier Manager has been ran')
        .addFields(
          { name: 'Moderator', value: `${msg.author}`, inline: true },
        )
        .setAuthor({ name: `User: ${player?.user.username}`, iconURL: player?.displayAvatarURL() })
        .setColor("Green")
        .setTimestamp()
      msg.channel.send({ embeds: [doneembed] })
      rolelogchannel.send({ embeds: [logembed] })
    }
  }

  const demote = async () => {
    if (member.roles.cache.has(tier2role?.id)) {
      let alrhasroleembed1 = new EmbedBuilder()
        .setTitle('Error!')
        .setDescription(`**${player?.user.username}** already has **  ${tier2role.name}** and cannot be demoted.`)
        .setColor('Red')
        .setTimestamp()
      return msg.channel.send({ embeds: [alrhasroleembed1] })
  } else if (member.roles.cache.has(tier1role?.id)) {

    let doneembed = new EmbedBuilder()
      .setTitle('Successfully Done!')
      .setDescription(`**${player?.user.username}** has been demoted to **${tier2role.name}**`)
      .setColor('Green')
      .setTimestamp()

      let logembed = new EmbedBuilder()
        .setTitle('Demote command from Tier Manager has been ran')
        .addFields(
          { name: 'Moderator', value: `${msg.author}`, inline: true },
        )
        .setAuthor({ name: `User: ${player?.user.username}`, iconURL: player?.displayAvatarURL() })
        .setColor("Green")
        .setTimestamp()
    member.roles.remove(tier1role)
    member.roles.add(tier2role)
    msg.channel.send({ embeds: [doneembed] })
    rolelogchannel.send({ embeds: [logembed] })
  }
}

  const whatyouwannadoembed = new EmbedBuilder()
    .setTitle('Error! What would you like to do?')
    .setDescription('Usage: .t <user> <choice>')
    .setColor('Red')
    .setTimestamp()
    .addFields(
      { name: '1', value: 'Gives or removes tier 1 from user', inline: true},
      { name: '2', value: 'Gives or removes tier 2 from user', inline: true},
      { name: '\n', value:'\n'},
      { name: 'promote', value: 'Promotes user from tier 2 to tier 1', inline: true},
      { name: 'demote', value: 'Demotes user from tier 1 to tier 2', inline: true },
    )
  
  const command = args[1]
  if (!command) return msg.channel.send({ embeds: [whatyouwannadoembed] })

  switch (command) {
    case '1':
      tier1()
      break;
    case '2':
      tier2()
      break;
    case 'promote':
      promote()
      break;
    case 'demote':
      demote()
      break;
  }
}

