const { Telegraf, Markup } = require('telegraf');
require('dotenv').config()

const text = require('./const')

const bot = new Telegraf(process.env.BOT_TOKEN);



bot.start((ctx) => ctx.reply(`Шалом ${ctx.message.from.first_name ? ctx.message.from.first_name : 'dude'}!`));
bot.help((ctx) => ctx.reply(text.commands));


// buttons
bot.command('course', async (ctx) => {
    try {
        await ctx.replyWithHTML('<b>Курсы</b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Help1', 'btn_1'), Markup.button.callback('Help2', 'btn_2')],
                [Markup.button.callback('Help3', 'btn_3')]
            ]
        ))
    } catch (e) {
        console.error(e);
    }

})

// menu buttons

// bot.action('btn_3', async (ctx) => {
//     try {
//         await ctx.replyWithHTML('Обработка кнопки 3', {
//             disable_web_page_preview: true
//         })
//     } catch (e) {
//         console.log(e)
//     }
// })

function addActionBot(name, src, text) {
    bot.action(name, async (ctx) => {
        try {
            if (src !== false) {
                await ctx.replyWithPhoto({
                    source: src
                })
            }
            await ctx.replyWithHTML(text, {
                disable_web_page_preview: true
            })
        } catch (e) {
            console.log(e)
        }
    })
}

addActionBot('btn_1', './img/1.jpg', text.text1)
addActionBot('btn_2', './img/2.jpg', text.text2)
addActionBot('btn_3', false, text.text3)



bot.launch()


process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))