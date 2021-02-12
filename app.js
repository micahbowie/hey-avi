require('dotenv').config();

const { App } = require("@slack/bolt");
const fetch = require("node-fetch");
const jokeApi =  'https://official-joke-api.appspot.com/jokes/programming/random'

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

//first message function "Hey!"
app.message('hey avi', async({message, say}) => {
  const greetingArray = ["Hey! Avi speaking.", "Did somebody call me?", "Yo", 'Hi, there'];
  const random = Math.floor(Math.random() * greetingArray.length);
  await say(greetingArray[random]);
});

//Fun custom responses
app.message('tell me about yourself', async({message, say}) => {
  await say('Well....I\'m just a bot but, here are some facts about the real Avi Flombaum: \n -He created Flatiron and a lot of other cool things. \n-He loves New York. \n-And Bitcoin to the moon!');
});

app.message('who is your dad', async({message, say}) => {
  await say('I was made by Micah Bowie! \n Twitter: https://twitter.com/MicahBowie1 \n Github: https://www.github.com/micahbowie');
});

app.message('what are your thoughts about life', async({message, say}) => {
  await say('"Life should be a wonderful adventure. Experience everything this world has to offer. I love you." \n -Avi Flombaum');
});

//tell me a joke function
app.message('tell me a joke', async({message, say}) => {
  fetch(jokeApi, {
    method: 'GET',
    headers: {"Accepts": "application/json", "Content-Type": "application/json"}
  })
  .then(response => response.json())
  .then(joke => {
      say(`${joke[0].setup} \n ${joke[0].punchline}`);
   });
});





//Starts app
(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
})();
