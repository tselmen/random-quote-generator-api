import Quote from "../models/Quote.js";

export const getRandomQuote = async (req, res) => {
  await Quote.findOneRandom(function (err, result) {
    if(!err){
      res.status(200).json(result);
    }
  });
}