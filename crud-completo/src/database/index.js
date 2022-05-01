import mongoose from "mongoose";

import config from "../config/database";

// make a connection with class
class Database {
  constructor() {
    this.connection = mongoose.connect(config.url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado ao mongodb")
  }
}

export default new Database();
