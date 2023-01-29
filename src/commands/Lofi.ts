import { ChannelType, Client, EmbedBuilder, GuildTextBasedChannel, Message } from "discord.js";
import { DisTube, Queue } from "distube";

export const LofiCommand = async (msg: Message, args: string[], client: Client) => {

  if (!msg.member?.roles.cache.has('845388176348545075')) return;

  const distube = new DisTube(client, {
    leaveOnStop: false,
    leaveOnFinish: false,
    leaveOnEmpty: false,
    emitNewSongOnly: false,
  })

  if (args.length < 1) {
    if (!msg.member?.roles.cache.has('845388176348545075') && !msg.author.bot) return;
  
    const voiceChannel = client?.guilds.cache.get('672146248182136863')?.channels.cache?.find((channel) => channel.id === '1060581592029987027')?.type === ChannelType.GuildVoice ? client?.guilds.cache.get('672146248182136863')?.channels.cache?.find((channel) => channel.id === '1060581592029987027') : undefined;
  
    if (!voiceChannel) return;
  
    if (voiceChannel.type !== ChannelType.GuildVoice) return;
  
    distube.play(voiceChannel, 'https://www.youtube.com/watch?v=jfKfPfyJRdk', {
      member: msg.member,
      textChannel: msg.channel.type === ChannelType.GuildText ? msg.channel : undefined,
      message: msg,
    })
  } else if (args[0] === 'stop') {
    distube.voices.leave(msg)
  }

}
