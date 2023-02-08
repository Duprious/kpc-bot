import { Client, EmbedBuilder, GuildTextBasedChannel, Message, TextChannel } from "discord.js";

export const BanAmount = async (msg: Message, args: string[], client: Client) => {

    const filter = (m: Message) => m.author.id === msg.author.id && !Number.isNaN(parseInt(m.content));
    const todaytime = Date.now()


    const questions = async (msg: Message, args: string[], client: Client) => {
        msg.channel.send('Month?').then(msg => {
            msg.channel.awaitMessages({ filter: filter, max: 1, time: 25000, errors: ["time"] }).then(messages => {
                let month = parseInt(messages.first()?.content || '')
                msg.channel.send('Day?').then(msg => {
                    msg.channel.awaitMessages({ filter: filter, max: 1, time: 25000, errors: ["time"] }).then(messages => {
                        let day = parseInt(messages.first()?.content || '')
                        msg.channel.send('Year?').then(msg => {
                            msg.channel.awaitMessages({ filter: filter, max: 1, time: 25000, errors: ["time"] }).then(messages => {
                                let year = parseInt(messages.first()?.content || '')

                                const minute = 1000 * 60;
                                const hour = minute * 60;
                                const day2 = hour * 24;
                                const bandate = new Date(`${month}/${day}/${year}`).getTime()
                                const differenceintime = todaytime - bandate;

                                const differenceinhours = Math.round(differenceintime / hour)
                                const differenceindays = Math.round(differenceintime / day2)

                                const embed = new EmbedBuilder()
                                    .setTitle('Done!')
                                    .setColor('Green')
                                    .setTimestamp()
                                    .addFields(
                                        { name: 'Difference in Days:', value: `${differenceindays}` },
                                        { name: 'Difference in Hours: ', value: `${differenceinhours}` }
                                    )

                                    
                                msg.channel.send({ embeds: [embed] })

                            })


                        })
                    })
                })
            })

        })
    }



    const normal = async (msg: Message, args: string[], client: Client) => {

        const dateinargs = args.join(" ")
        if(!dateinargs) return
        
        const minute3 = 1000 * 60;
        const hour3 = minute3 * 60;
        const day3 = hour3 * 24;

        const dateinddmmyyyy2 = new Date(dateinargs).getTime()
        
        const differenceintime2 = todaytime - dateinddmmyyyy2
        
        const differenceinhours2 = Math.round(differenceintime2 / hour3)
        
        const differenceindays = Math.round(differenceintime2 / day3)
        

        const embed = new EmbedBuilder()
            .setTitle('Done!')
            .setColor('Green')
            .setTimestamp()
            .addFields(
                { name: 'Difference in Days:', value: `${differenceindays}` },
                { name: 'Difference in Hours: ', value: `${differenceinhours2}` }
            )


        msg.channel.send({ embeds: [embed] })
    }






    const command = args.shift()?.toLowerCase();
    const nocommandembed = new EmbedBuilder()
    .setTitle('What would you like to do?')
    .setColor("Red")
    .setTimestamp()
    .addFields(
        { name: '-q', value: `Asks for date using questions. Usage: .banamount -q `},
        { name: '-a', value: `Asks for date in one message. Usage: .banamount -a MM/DD/YYYY` },
    )
    if(!command) msg.channel.send({ embeds: [nocommandembed] })

    switch(command) {
        case '-q':
            questions(msg, args, client)
            break;
        case '-a':
            normal(msg, args, client)
            break;
    }

}
