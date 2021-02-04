import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv"
import Quote from "./models/Quote.js";
import quoteRoutes from "./routes/quotes.js"
const app = express();
const PORT = process.env.PORT;
dotenv.config();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.get("/", async (req, res) => {
  const quotes = await Quote.find({});
  res.send(quotes);
});

app.use("/quotes", quoteRoutes);

mongoose
  .connect(`${process.env.MONGO_URL}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port: ${PORT}`)
    });
  })
  .catch((error) => console.log(error.msg));
