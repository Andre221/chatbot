var RiveScript = require('rivescript');
var bot = new RiveScript()


console.log('Loading directory!')
bot.loadDirectory("brain", loading_done, loading_error);

console.log('Loading rl interface.')
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var chalk = require('chalk')

function loading_done(batch_num) {
    console.log(chalk.yellow("Batch #" + batch_num + " has finished loading!"));
    bot.sortReplies();
    function ask() {
        rl.question(chalk.green('Human: '), (input) => {
            if (input === 'close') process.exit(0)
            var output = bot.reply('local-user', input)
            console.log(chalk.yellow('Bot: ') + output);
            ask()
        });
    }
    ask()
}

function loading_error(err) {
    console.log(err)
}