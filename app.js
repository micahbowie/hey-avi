require('dotenv').config();

const { App } = require("@slack/bolt");


const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

//first message function "Hey!"
app.message('hey avi', async({message, say}) => {
  await say('Hey!');
});


//Starts app
(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
})();
