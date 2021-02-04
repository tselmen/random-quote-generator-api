import Quote from "./models/Quote.js";
import mongoose from "mongoose";
import fetch from "node-fetch";

mongoose.connect("mongodb://localhost:27017/quote-generator", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

fetch("https://type.fit/api/quotes")
  .then(function(response) {
    return response.json();
  })
  .then(async function(data) {
    await Quote.deleteMany({});
    for (let i = 0; i < data.length; i++) {
      const newQuote = new Quote({
        body: data[i].text,
        author: data[i].author
      })
      await newQuote.save();
    }
  })
  .then(() => {
    console.log("Complete!");
    db.close();
  });


