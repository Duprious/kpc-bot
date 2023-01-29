import { Client, EmbedBuilder, Emoji, GuildMember, Message, TextChannel } from "discord.js";

export const PollCommand = async (msg: Message, args: string[], client: Client) => {
  if (!msg.member?.roles.cache.has('672899608787288075')) return;

  if (args.length < 2) return msg.channel.send({embeds: [new EmbedBuilder().setColor("Red").setTitle("Error").setDescription("Usage: .poll <channel> <amount of options (2/3)>")]});
  if (Number.isNaN(parseInt(args[1]))) return msg.channel.send({embeds: [new EmbedBuilder().setColor("Red").setTitle("Error").setDescription("Usage: .poll <channel> <amount of options (2/3)>")]});


  let channel: TextChannel | undefined;

  try {
    channel = msg.mentions?.channels?.first() as TextChannel || (await msg.guild?.channels.fetch(args[0])) as TextChannel;
  } catch (e) {
    msg.channel.send({embeds: [new EmbedBuilder().setColor("Red").setTitle("Error").setDescription("Channel not found.")]});
    return;
  }

  if (!channel) {
    msg.channel.send('No Channel found');
    return;
  }

  let question: string = "";
  let options: string[] = [];
  let reactions: string[] = [];
  let pingStaff = false;
  const amountOfOptions = parseInt(args[1])
  
  const filter = (m: Message) => m.author.id === msg.author.id;

  if (amountOfOptions === 2) {
    reactions.push("1️⃣", "2️⃣")
    msg.channel.send(`*Question: *`).then(msg => {
      msg.channel.awaitMessages({filter: filter, max: 1, time: 25000, errors: ["time"]}).then(messages => {
        question = messages.first()?.content as string
        msg.channel.send(`*Option 1*`).then(msg => {
          msg.channel.awaitMessages({filter: filter, max: 1, time: 25000, errors: ["time"]}).then(messages => {
            options?.push(messages.first()?.content as string)
            msg.channel.send(`*Option 2*`).then(msg => {
              msg.channel.awaitMessages({filter: filter, max: 1, time: 25000, errors: ["time"]}).then(async messages => {
                options?.push(messages.first()?.content as string)
                msg.channel.send(`*Do you want to ping Staff (Y/N)*`).then(msg => {
                  msg.channel.awaitMessages({filter: filter, max: 1, time: 25000, errors: ["time"]}).then(async messages => {
                    if (messages.first()?.content.toLowerCase() === "y") {
                      pingStaff = true
                    } else {
                      pingStaff = false
                    }
                    
                    const embed = new EmbedBuilder()
                    .setColor('Blurple')
                    .setTitle(question)
                    .setTimestamp()
                    .setDescription("------------------------------")
                    
                    for (let i = 0; i < options.length; i++) {
                    embed.addFields(
                      {
                        name: `${options[i]}  ${reactions[i]}`,
                        value: "------------------------------",
                        inline: false
                      }
                      )
                    }
                    
                    msg.channel.send({embeds: [new EmbedBuilder().setColor("Green").setTitle("Success").setDescription(`Successfully sent this poll in ${channel?.name}`)]});
                    const sentMessage = await channel?.send({content: pingStaff ? "<@&845388176348545075>" : "", embeds: [embed]})
                    for (let i = 0; i < reactions.length; i++) {
                      sentMessage?.react(reactions[i])
                    }
                    sentMessage?.react('🔴')
                  })
                })
              })
            })
          })
        })
      })
    })
  } else if(amountOfOptions === 3) {
    reactions.push("1️⃣", "2️⃣", "3️⃣")
    msg.channel.send(`*Question: *`).then(msg => {
      msg.channel.awaitMessages({filter: filter, max: 1, time: 25000, errors: ["time"]}).then(messages => {
        question = messages.first()?.content as string
        msg.channel.send(`*Option 1*`).then(msg => {
          msg.channel.awaitMessages({filter: filter, max: 1, time: 25000, errors: ["time"]}).then(messages => {
            options?.push(messages.first()?.content as string)
            msg.channel.send(`*Option 2*`).then(msg => {
              msg.channel.awaitMessages({filter: filter, max: 1, time: 25000, errors: ["time"]}).then(async messages => {
                options?.push(messages.first()?.content as string)
                msg.channel.send(`*Option 3*`).then(msg => {
                  msg.channel.awaitMessages({filter: filter, max: 1, time: 25000, errors: ["time"]}).then(async messages => {
                    options?.push(messages.first()?.content as string)
                    msg.channel.send(`*Do you want to ping Staff (Y/N)*`).then(msg => {
                      msg.channel.awaitMessages({filter: filter, max: 1, time: 25000, errors: ["time"]}).then(async messages => {
                        if (messages.first()?.content.toLowerCase() === "y") {
                          pingStaff = true
                        } else {
                          pingStaff = false
                        }

                        const embed = new EmbedBuilder()
                          .setColor('Blurple')
                          .setTitle(question)
                          .setTimestamp()
                          .setDescription("------------------------------")

                        for (let i = 0; i < options.length; i++) {
                          embed.addFields(
                            {
                              name: `${options[i]}  ${reactions[i]}`,
                              value: "------------------------------",
                              inline: false
                            }
                          )
                        }

                        msg.channel.send({embeds: [new EmbedBuilder().setColor("Green").setTitle("Success").setDescription(`Successfully sent this poll in ${channel?.name}`)]});
                        const sentMessage = await channel?.send({content: pingStaff ? "<@&845388176348545075>" : "", embeds: [embed]})
                        for (let i = 0; i < reactions.length; i++) {
                          sentMessage?.react(reactions[i])
                        }
                        sentMessage?.react('🔴')
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
  } else {
    msg.channel.send({embeds: [new EmbedBuilder().setColor("Red").setTitle("Error").setDescription("Only 2 or 3 options are supported at the moment.")]});
  }
}