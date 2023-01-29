"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KanyeCommand = void 0;
const discord_js_1 = require("discord.js");
const KanyeCommand = async (msg, args) => {
    const response = await fetch('https://api.kanye.rest/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    msg.channel.send({ embeds: [new discord_js_1.EmbedBuilder().setColor("Green").setTitle("Kanye Quote").setDescription(data.quote)] });
};
exports.KanyeCommand = KanyeCommand;
