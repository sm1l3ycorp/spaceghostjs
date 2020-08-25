const fs = require("fs");
const url = require("url");
const https = require("https");
const SocksProxyAgent = require("socks-proxy-agent");

const agents = fs.readFileSync("http-user-agents.csv");
const agentList = agents.toString().split("\n");

// const proxies = fs.readFileSync('socks-proxies.csv');

generateRandomIP = () => {
  const maxIPs = 1;

  if (maxIPs > 0) {
    const startRange = "0.0.0.0";

    const endRange = "255.255.255.255";

    randRange = (low, high) => {
      return parseInt(
        parseInt(low, 10) +
          Math.random() * (parseInt(high, 10) - parseInt(low, 10) + 1),
        10
      ).toString();
    };

    let result = "";

    for (let i = 0; i < maxIPs; i++) {
      const r1 = randRange(startRange.split(".")[0], endRange.split(".")[0]);
      const r2 = randRange(startRange.split(".")[1], endRange.split(".")[1]);
      const r3 = randRange(startRange.split(".")[2], endRange.split(".")[2]);
      const r4 = randRange(startRange.split(".")[3], endRange.split(".")[3]);
      result += r1 + "." + r2 + "." + r3 + "." + r4;
      if (i != maxIPs - 1) result += "\n";
    }

    return result;
  }
};

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
    referer: generateRandomIP(),
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
