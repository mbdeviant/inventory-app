const cron = require("cron");
const https = require("https");

const url = "https://inventory-app-47ig.onrender.com";
const job = new cron.CronJob("*/14 * * * *", function () {
  console.log("pinging");

  https
    .get(url, (res) => {
      if (res.statusCode === 200) console.log("pinged");
      else console.error(`ping failed with status code: ${res.statusCode}`);
    })
    .on("error", (e) => {
      console.error(e);
    });
});

module.exports = job;
