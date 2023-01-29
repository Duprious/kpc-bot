"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const builders_1 = require("@discordjs/builders");
const discord_js_1 = require("discord.js");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const Commands_1 = require("./commands/Commands");
dotenv_1.default.config();
process.on('uncaughtException', (err) => {
    console.error(err);
});
process.on('unhandledRejection', (err) => {
    console.error(err);
});
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent,
        discord_js_1.GatewayIntentBits.GuildMembers,
        discord_js_1.GatewayIntentBits.GuildBans,
        discord_js_1.GatewayIntentBits.GuildMessageReactions,
        discord_js_1.GatewayIntentBits.GuildVoiceStates,
        discord_js_1.GatewayIntentBits.GuildPresences,
    ],
});
const prefix = '.';
client.on('ready', () => {
    console.log('Bot is ready!');
    client.user?.setPresence({
        status: "online",
        activities: [
            {
                name: "Lofi",
                type: discord_js_1.ActivityType.Listening
            }
        ]
    });
});
client.on('messageCreate', (msg) => {
    if (!msg.content.startsWith(prefix))
        return;
    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift()?.toLowerCase();
    switch (command) {
        case 't1':
            (0, Commands_1.Tier1RoleCommand)(msg, args);
            break;
        case 't2':
            (0, Commands_1.Tier2RoleCommand)(msg, args);
            break;
        case 'altcheck':
            (0, Commands_1.AltCheckCommand)(msg, args, client);
            break;
        case 'info':
            (0, Commands_1.InfoCommand)(msg, args);
            break;
        case 'lofi':
            (0, Commands_1.LofiCommand)(msg, args, client);
            break;
        case 'bl':
            (0, Commands_1.BlacklistCommand)(msg, args);
            break;
        case 'vbl':
            (0, Commands_1.ValidationBlacklistCommand)(msg, args);
            break;
        case 'av':
            (0, Commands_1.AvatarCommand)(msg, args);
            break;
        case 'noaddcheck':
            (0, Commands_1.NoaddCheckCommand)(msg, args, client);
            break;
        case 't':
        case 'timeout': {
            (0, Commands_1.TimeoutCommand)(msg, args);
            break;
        }
        case 'ut':
        case 'untimeout': {
            (0, Commands_1.UnTimeoutCommand)(msg, args);
            break;
        }
        case 'poll':
            (0, Commands_1.PollCommand)(msg, args, client);
            break;
    }
});
client.on('messageReactionAdd', (reaction, user) => {
    const member = client.guilds.cache.get("672146248182136863")?.members.cache.find(user2 => user2.id === user.id);
    if (reaction.message.author?.id !== client.user?.id)
        return;
    if (!member?.roles.cache.has(client.guilds.cache.get("672146248182136863")?.roles.cache.get('672899608787288075')?.id))
        return;
    if (reaction.emoji.name !== "🔴")
        return;
    const embed = new builders_1.EmbedBuilder()
        .setTitle("Poll Ended")
        .setTimestamp();
    reaction.message.reactions.cache.forEach((reaction) => {
        if (reaction.emoji.name === "🔴")
            return;
        embed.addFields({
            name: `${reaction.emoji.name}`,
            value: `${reaction.count.toString()} vote(s)`
        });
    });
    reaction.message.reply({ embeds: [embed] });
});
client.login(process.env.BOT_TOKEN);
