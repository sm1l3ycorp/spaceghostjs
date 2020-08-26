const fs = require("fs");
const url = require("url");
const https = require("https");
const SocksProxyAgent = require("socks-proxy-agent");

const agents = fs.readFileSync("http-user-agents.csv");
const agentList = agents.toString().split("\n");

// const proxies = fs.readFileSync('socks-proxies.csv');
// const referers = fs.readFileSync('referers.csv');

console.log(`<------------Space Ghost JS------------>`);

(async () => {
  const endpoint = process.argv[2];
  const opts = url.parse(endpoint);

  const proxy = process.argv[3];

  console.log(`Using Proxy Server: ${proxy}`);

  console.log(`Sending GET Request To: ${endpoint}`);

  const agent = new SocksProxyAgent(proxy);
  opts.agent = agent;

  opts.headers = {
    "user-agent": agentList[Math.floor(Math.random() * agentList.length)],
    "referer": "http://your-referer.com",
  };

  https
    .get(opts, (res) => {
      res.on("data", (d) => {
        process.stdout.write(d);
      });
    })
    .on("error", (e) => {
      console.error(e);
    });
})();
