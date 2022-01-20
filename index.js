// API to connect to discord server
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const dotenv = require('dotenv');

dotenv.config();

// API to search the image
const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch("02ba5a48e148882349dbb9e576ba71e8e837474cda80d164a4c433b6b8d9c23f");

// Bot getting ready to be used
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

// Bot reading messages sent to discord server
client.on("messageCreate", msg => {
  if (msg.author.username === "Emanuel José") {
    msg.delete
  }else{
    if (msg.content.startsWith("/img ")) {
      let query = msg.content.substring(5);
      const params = {
        engine: "google",
        q: query,
        google_domain: "google.com",
        safe: "active",
        tbm: "isch",
        gl: "br",
        hl: "pt-br"
      };

      const callback = function(data) {
        msg.reply(data['images_results'][0].thumbnail);
      };

      // Show result as JSON
      search.json(params, callback);

    }else if (msg.content.startsWith("/vid ")) {
      let query = msg.content.substring(5);


    }else if (msg.content.startsWith("/shop ")) {
      let query = msg.content.substring(6);

      const params = {
        engine: "google",
        q: query,
        google_domain: "google.com",
        safe: "active",
        tbm: "shop",
        gl: "br",
        hl: "pt-br"
      };

      const callback = function(data) {
        msg.reply(data['shopping_results'][0].title
          + " \n " + data['shopping_results'][0].price
          + " \n " + data['shopping_results'][0].link
          + " \n " + data['shopping_results'][0].thumbnail);
          
      };

      // Show result as JSON
      search.json(params, callback);
    }
  }
})

client.login(process.env.TOKEN)