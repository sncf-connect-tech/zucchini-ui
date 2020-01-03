import Client from "./Client";

class Config {
  constructor() {
    this.client = new Client("/assets/config.js");
  }

  getConfig() {
    return this.client.get();
  }
}

const config = new Config();

export default config;
