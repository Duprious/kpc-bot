import {Client, EmbedBuilder, GuildMember, Message, TextChannel } from "discord.js";

export const NoaddCheckCommand = async (msg: Message, args: string[], client: Client) => {

  if (!msg.member?.roles.cache.has('845388176348545075')) return;

  const adminCommandChatsIDs = ["817030916235984936", "816806455054172171", "1059991932480270537"]

  if (!adminCommandChatsIDs.includes(msg.channel.id)) return;

  let player: GuildMember | undefined;

  try {
    player = msg.mentions?.members?.first() || (await msg.guild?.members.fetch(args[0]));
  } catch (e) {
    msg.channel.send({embeds: [new EmbedBuilder().setColor("Red").setTitle("Error").setDescription("User not found.")]});
    return;
  }

  
  const chatChannelTier1 = client.channels.cache.get('735126005349482558') as TextChannel;
  const chatChannelTier2 = client.channels.cache.get('785143121662705664') as TextChannel;
  const filter = (m: Message) => m.author.id === msg.author.id && !Number.isNaN(parseInt(m.content));

  msg.channel.send('Objective amount of the suspected person: ').then(msg => {
      msg.channel.awaitMessages({ filter: filter,  max: 1, time: 25000, errors: ["time"] })
      .then(messages => {
          let suspectedobj = parseInt(messages.first()?.content || '0')
          msg.channel.send('Objective amount of TeamMate 1: ').then(msg => {
              msg.channel.awaitMessages({ filter: filter,  max: 1, time: 25000, errors: ["time"] })
              .then(messages => {
                  let mateobj1 = parseInt(messages.first()?.content || '0')
                  msg.channel.send('Objective amount of TeamMate 2: ').then(msg => {
                      msg.channel.awaitMessages({ filter: filter,  max: 1, time: 25000, errors: ["time"] })
                      .then(messages => {
                          let mateobj2 = parseInt(messages.first()?.content || '0')
                          msg.channel.send('Objective amount of TeamMate 3:   ').then(msg => {
                              msg.channel.awaitMessages({ filter: filter,  max: 1, time: 25000, errors: ["time"] })
                              .then(messages => {
                                  let mateobj3 = parseInt(messages.first()?.content || '0')
                                  msg.channel.send('Tier 1 or Tier 2? (1 or 2)').then(msg => {
                                    msg.channel.awaitMessages(/*filter name here*/ { max: 1, time: 15000, errors: ["time"] }).then(messages => {
                                        let whichtier = parseInt(messages.first()?.content || '')
                                        msg.channel.send('Calculating....').then(msg => {
                                            msg.channel.awaitMessages({ filter: filter,   time: 10 })
                                            .then(messages => {

                                            let total = suspectedobj + mateobj1 + mateobj2 + mateobj3
                                            let tenp = (total/100) * 10
                                            let fifteenp = (total/100) * 15
                                        
                                            const lessthantenp = new EmbedBuilder()
                                              .setTitle('Done!')
                                              .setDescription('User is less than 10% and has been NoAdded!')
                                              .setColor('Red')
                                              .setTimestamp()

                                            const lessthanfifteenp = new EmbedBuilder()
                                                .setTitle('Done!')
                                                .setDescription('User is less than 15% and has been NoAdded!')
                                                .setColor('Red')
                                                .setTimestamp()

                                            const lessthanfifteenpbutwin = new EmbedBuilder()
                                                .setTitle('Done!')
                                                .setDescription('User is less than 15% but won the game so not NoAdded!')
                                                .setColor('Green')
                                                .setTimestamp()

                                            const usergood = new EmbedBuilder()
                                                .setTitle('Done!')
                                                .setDescription('User is not less than 15% and is good to go!')
                                                .setColor('Green')
                                                .setTimestamp()

                                            const Calculationsembed = new EmbedBuilder()
                                                .setTitle('Calculations Done!')
                                                .addFields(
                                                    { name: 'Total Objective:', value: `${total}`, inline: true },
                                                    { name: '10% Objective:', value: `${tenp}`, inline: true },
                                                    { name: '15% Objective:', value: `${fifteenp}`, inline: true }
                                                )
                                                .setColor('Green')
                                                .setTimestamp()

                                              let chatChannel: TextChannel;
                                              if (whichtier == 1) {
                                                  chatChannel = chatChannelTier1
                                              } else if (whichtier == 2) {
                                                  chatChannel = chatChannelTier2
                                              } else {
                                                  return
                                              }

                                            msg.channel.send({ embeds: [Calculationsembed] })

                                            if ((suspectedobj < fifteenp) && (suspectedobj > tenp)) {
                                              msg.channel.send({ embeds: [lessthanfifteenp] })
                                              chatChannel.send(`!noadd <@${player?.id}> 6h TDM (<15%)`)
                                              return
                                            } else if (suspectedobj < tenp) {
                                                msg.channel.send({ embeds: [lessthantenp] })
                                                chatChannel.send(`!noadd <@${player?.id}> 12h TDM (<10%)`)
                                                return
                                            } else {
                                                msg.channel.send({ embeds: [usergood] })
                                                return
                                            }
                                          
                                      })
                                  })
                              })
                            })                             
                          })
                        })
                      })
                  })
              })

          })
      })
  })
}