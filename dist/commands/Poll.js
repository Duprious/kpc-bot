"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PollCommand = void 0;
const discord_js_1 = require("discord.js");
const PollCommand = async (msg, args, client) => {
    if (!msg.member?.roles.cache.has('672899608787288075'))
        return;
    if (args.length < 2)
        return msg.channel.send({ embeds: [new discord_js_1.EmbedBuilder().setColor("Red").setTitle("Error").setDescription("Usage: .poll <channel> <amount of options (2/3)>")] });
    if (Number.isNaN(parseInt(args[1])))
        return msg.channel.send({ embeds: [new discord_js_1.EmbedBuilder().setColor("Red").setTitle("Error").setDescription("Usage: .poll <channel> <amount of options (2/3)>")] });
    let channel;
    try {
        channel = msg.mentions?.channels?.first() || (await msg.guild?.channels.fetch(args[0]));
    }
    catch (e) {
        msg.channel.send({ embeds: [new discord_js_1.EmbedBuilder().setColor("Red").setTitle("Error").setDescription("Channel not found.")] });
        return;
    }
    if (!channel) {
        msg.channel.send('No Channel found');
        return;
    }
    let question = "";
    let options = [];
    let reactions = [];
    let pingStaff = false;
    const amountOfOptions = parseInt(args[1]);
    const filter = (m) => m.author.id === msg.author.id;
    if (amountOfOptions === 2) {
        reactions.push("1️⃣", "2️⃣");
        msg.channel.send(`*Question: *`).then(msg => {
            msg.channel.awaitMessages({ filter: filter, max: 1, time: 25000, errors: ["time"] }).then(messages => {
                question = messages.first()?.content;
                msg.channel.send(`*Option 1*`).then(msg => {
                    msg.channel.awaitMessages({ filter: filter, max: 1, time: 25000, errors: ["time"] }).then(messages => {
                        options?.push(messages.first()?.content);
                        msg.channel.send(`*Option 2*`).then(msg => {
                            msg.channel.awaitMessages({ filter: filter, max: 1, time: 25000, errors: ["time"] }).then(async (messages) => {
                                options?.push(messages.first()?.content);
                                msg.channel.send(`*Do you want to ping Staff (Y/N)*`).then(msg => {
                                    msg.channel.awaitMessages({ filter: filter, max: 1, time: 25000, errors: ["time"] }).then(async (messages) => {
                                        if (messages.first()?.content.toLowerCase() === "y") {
                                            pingStaff = true;
                                        }
                                        else {
                                            pingStaff = false;
                                        }
                                        const embed = new discord_js_1.EmbedBuilder()
                                            .setColor('Blurple')
                                            .setTitle(question)
                                            .setTimestamp()
                                            .setDescription("------------------------------");
                                        for (let i = 0; i < options.length; i++) {
                                            embed.addFields({
                                                name: `${options[i]}  ${reactions[i]}`,
                                                value: "------------------------------",
                                                inline: false
                                            });
                                        }
                                        msg.channel.send({ embeds: [new discord_js_1.EmbedBuilder().setColor("Green").setTitle("Success").setDescription(`Successfully sent this poll in ${channel?.name}`)] });
                                        const sentMessage = await channel?.send({ content: pingStaff ? "<@&845388176348545075>" : "", embeds: [embed] });
                                        for (let i = 0; i < reactions.length; i++) {
                                            sentMessage?.react(reactions[i]);
                                        }
                                        sentMessage?.react('🔴');
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    }
    else if (amountOfOptions === 3) {
        reactions.push("1️⃣", "2️⃣", "3️⃣");
        msg.channel.send(`*Question: *`).then(msg => {
            msg.channel.awaitMessages({ filter: filter, max: 1, time: 25000, errors: ["time"] }).then(messages => {
                question = messages.first()?.content;
                msg.channel.send(`*Option 1*`).then(msg => {
                    msg.channel.awaitMessages({ filter: filter, max: 1, time: 25000, errors: ["time"] }).then(messages => {
                        options?.push(messages.first()?.content);
                        msg.channel.send(`*Option 2*`).then(msg => {
                            msg.channel.awaitMessages({ filter: filter, max: 1, time: 25000, errors: ["time"] }).then(async (messages) => {
                                options?.push(messages.first()?.content);
                                msg.channel.send(`*Option 3*`).then(msg => {
                                    msg.channel.awaitMessages({ filter: filter, max: 1, time: 25000, errors: ["time"] }).then(async (messages) => {
                                        options?.push(messages.first()?.content);
                                        msg.channel.send(`*Do you want to ping Staff (Y/N)*`).then(msg => {
                                            msg.channel.awaitMessages({ filter: filter, max: 1, time: 25000, errors: ["time"] }).then(async (messages) => {
                                                if (messages.first()?.content.toLowerCase() === "y") {
                                                    pingStaff = true;
                                                }
                                                else {
                                                    pingStaff = false;
                                                }
                                                const embed = new discord_js_1.EmbedBuilder()
                                                    .setColor('Blurple')
                                                    .setTitle(question)
                                                    .setTimestamp()
                                                    .setDescription("------------------------------");
                                                for (let i = 0; i < options.length; i++) {
                                                    embed.addFields({
                                                        name: `${options[i]}  ${reactions[i]}`,
                                                        value: "------------------------------",
                                                        inline: false
                                                    });
                                                }
                                                msg.channel.send({ embeds: [new discord_js_1.EmbedBuilder().setColor("Green").setTitle("Success").setDescription(`Successfully sent this poll in ${channel?.name}`)] });
                                                const sentMessage = await channel?.send({ content: pingStaff ? "<@&845388176348545075>" : "", embeds: [embed] });
                                                for (let i = 0; i < reactions.length; i++) {
                                                    sentMessage?.react(reactions[i]);
                                                }
                                                sentMessage?.react('🔴');
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    }
    else {
        msg.channel.send({ embeds: [new discord_js_1.EmbedBuilder().setColor("Red").setTitle("Error").setDescription("Only 2 or 3 options are supported at the moment.")] });
    }
};
exports.PollCommand = PollCommand;
