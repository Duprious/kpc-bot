"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvatarCommand = void 0;
const discord_js_1 = require("discord.js");
const AvatarCommand = async (msg, args) => {
    let member;
    if (!msg.mentions?.members?.first() && !(args[0])) {
        const avatarEmbed = new discord_js_1.EmbedBuilder()
            .setColor(0x18e1ee)
            .setAuthor({
            name: `${msg.member?.user.username}#${msg.member?.user.discriminator}`,
            iconURL: msg.member?.user.displayAvatarURL(),
        })
            .setImage(msg.member?.user.displayAvatarURL({ size: 4096 }) || "")
            .setTimestamp(Date.now())
            .setFooter({
            text: `ID: ${msg.member?.user.id}`,
        });
        return msg.channel.send({ embeds: [avatarEmbed] });
    }
    try {
        member = msg.mentions?.members?.first() || (await msg.guild?.members.fetch(args[0]));
    }
    catch (e) {
        msg.channel.send({ embeds: [new discord_js_1.EmbedBuilder().setColor("Red").setTitle("Error").setDescription("User not found.")] });
        return;
    }
    if (!member) {
        msg.reply({ embeds: [new discord_js_1.EmbedBuilder().setColor("Red").setTitle("Error").setDescription("User not found.")] });
        return;
    }
    const avatarEmbed = new discord_js_1.EmbedBuilder()
        .setColor(0x18e1ee)
        .setTitle(`${member.user.username}'s Avatar`)
        .setAuthor({
        name: `${member.user.username}#${member.user.discriminator}`,
        iconURL: member.user.displayAvatarURL(),
    })
        .setImage(member.user.displayAvatarURL({ size: 4096 }))
        .setTimestamp(Date.now())
        .setFooter({
        text: `ID: ${member.user.id}`,
    });
    msg.channel.send({ embeds: [avatarEmbed] });
};
exports.AvatarCommand = AvatarCommand;
