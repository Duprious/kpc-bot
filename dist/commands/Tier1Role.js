"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tier1RoleCommand = void 0;
const discord_js_1 = require("discord.js");
const Tier1RoleCommand = async (msg, args) => {
    if (!msg.member?.roles.cache.has('845388176348545075'))
        return;
    let player;
    try {
        player = msg.mentions?.members?.first() || (await msg.guild?.members.fetch(args[0]));
    }
    catch (e) {
        msg.channel.send({ embeds: [new discord_js_1.EmbedBuilder().setColor("Red").setTitle("Error").setDescription("User not found.")] });
        return;
    }
    if (!player) {
        msg.channel.send('Please specify a player');
        return;
    }
    const role = msg.guild?.roles.cache.find((role) => role.id === '672897144205738005');
    const member = msg.guild?.members.cache.get(player.id);
    if (!role || !member)
        return;
    if (member.roles.cache.has(role.id)) {
        member.roles.remove(role);
        msg.channel.send(`Removed ${role.name} from ${player.user.username}`);
        return;
    }
    else {
        member.roles.add(role);
        msg.channel.send(`Gave ${role.name} to ${player.user.username}`);
        return;
    }
};
exports.Tier1RoleCommand = Tier1RoleCommand;
