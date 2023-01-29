import { format } from "date-fns";
import { EmbedBuilder, GuildMember, Message } from "discord.js";

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const InfoCommand = async (msg: Message, args: string[]) => {
  
  if (!msg.mentions?.members?.first() && !(args[0])) {

    let rolesArr = msg.member?.roles.cache.map((role) => role.id).filter((role) => role !== '672146248182136863');

    let roles = rolesArr?.map(i => `<@&${i}>`).join(' ') || "None"

    let joinedAt = msg.member?.joinedAt ? format(msg.member.joinedAt, 'iii, MMM d, yyyy, h:mm a') : 'Unknown';
    let createdAt = msg.author.createdAt ? format(msg.author.createdAt, 'iii, MMM d, yyyy, h:mm a') : 'Unknown';

    const activity = msg.member?.presence?.activities[0];
    const status = msg.member?.presence?.status || "None";

    const embed = new EmbedBuilder()
    .setDescription(`<@!${msg.author.id}>`)
    .setThumbnail(msg.author.displayAvatarURL())
    .setColor(0x18e1ee)
    .setAuthor({
      name: `${msg.author.username}#${msg.author.discriminator}`,
      iconURL: msg.author.displayAvatarURL(),
    })
    .setTimestamp(Date.now())
    .setFooter({
      text: `ID: ${msg.author.id}`,
      
    })
    .addFields([
      {
        name: 'Joined',
        value: joinedAt,
        inline: true,
      },
      {
        name: 'Created',
        value: createdAt,
        inline: true,
      },
      {
        name: 'Nickname',
        value: msg.member?.nickname || 'None',
        inline: false,
      },
      {
        name: 'Activity',
        value: activity?.url || 'None',
        inline: true,
      },
      {
        name: 'Status',
        value: capitalizeFirstLetter(status),
        inline: true,
      },
      {
        name: 'Roles',
        value: roles,
        inline: false,
      },
    ]);
    msg.channel.send({embeds: [embed]});
    return
  }
  let member: GuildMember | undefined;

  try {
    member = msg.mentions?.members?.first() || (await msg.guild?.members.fetch(args[0]));
  } catch (e) {
    msg.channel.send({embeds: [new EmbedBuilder().setColor("Red").setTitle("Error").setDescription("User not found.")]});
    return;
  }

  if (!member) {
    msg.reply({embeds: [new EmbedBuilder().setColor("Red").setTitle("Error").setDescription("User not found.")]});
    return;
  }

  let rolesArr = member.roles.cache.map((role) => role.id).filter((role) => role !== '672146248182136863');

  let roles = rolesArr.map(i => `<@&${i}>`).join(' ')

  let joinedAt = member.joinedAt ? format(member.joinedAt, 'iii, MMM d, yyyy, h:mm a') : 'Unknown';
  let createdAt = member.user.createdAt ? format(member.user.createdAt, 'iii, MMM d, yyyy, h:mm a') : 'Unknown';

  const activity = member.presence?.activities[0];
  const status = member.presence?.status || "None";

  const embed = new EmbedBuilder()
    .setDescription(`<@!${member.user.id}>`)
    .setThumbnail(member.user.displayAvatarURL())
    .setColor(0x18e1ee)
    .setAuthor({
      name: `${member.user.username}#${member.user.discriminator}`,
      iconURL: member.user.displayAvatarURL(),
    })
    .setTimestamp(Date.now())
    .setFooter({
      text: `ID: ${member.user.id}`,
      
    })
    .addFields([
      {
        name: 'Joined',
        value: joinedAt,
        inline: true,
      },
      {
        name: 'Created',
        value: createdAt,
        inline: true,
      },
      {
        name: 'Nickname',
        value: member.nickname || 'None',
        inline: false,
      },
      {
        name: 'Activity',
        value: activity?.name || 'None',
        inline: true,
      },
      {
        name: 'Status',
        value: capitalizeFirstLetter(status),
        inline: true,
      },
      {
        name: 'Roles',
        value: roles,
        inline: false,
      },
    ]);

    msg.channel.send({embeds: [embed]});
    return



}