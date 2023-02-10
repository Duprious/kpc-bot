import { Client, EmbedBuilder, Message, TextChannel } from "discord.js";
import { addYears, differenceInHours, differenceInDays, parse } from "date-fns"

export const BanAmount = async (msg: Message, args: string[], client: Client) => {

    const minute = 1000 * 60;
    const hour = minute * 60;
    const day2 = hour * 24;

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


                                    const bandate2= new Date(`${month}, ${day}, ${year}`)
                                    const bandate = addYears(bandate2, 1)
                                    const timetobanindays = differenceInDays(bandate, todaytime)
                                    const timetobaninhours= differenceInHours(bandate, todaytime)


                                    const embed = new EmbedBuilder()
                                        .setTitle('Done!')
                                        .setColor('Green')
                                        .setTimestamp()
                                        .addFields(
                                            { name: 'Difference in Days:', value: `${timetobanindays}` },
                                            { name: 'Difference in Hours: ', value: `${timetobaninhours}` }
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

        const noargsembed = new EmbedBuilder()
        .setTitle('Error!')
        .setDescription('Please type the date in MM/DD/YYYY format. Usage: .banamount -a MM/DD/YYYY')
        .setColor('Red')
        .setTimestamp();


        if(!dateinargs) return msg.channel.send({ embeds: [noargsembed] })
        
        const dateinddmmyyyy2 = parse(dateinargs, 'dd/MM/yyyy', new Date())

        const bandate = addYears(dateinddmmyyyy2, 1)
        const timetobanindays2 = differenceInDays(bandate, todaytime)
        const timetobaninhours2= differenceInHours(bandate, todaytime)
        
        

        const embed = new EmbedBuilder()
            .setTitle('Done!')
            .setColor('Green')
            .setTimestamp()
            .addFields(
                { name: 'Difference in Days:', value: `${timetobanindays2}` },
                { name: 'Difference in Hours: ', value: `${timetobaninhours2}` }
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