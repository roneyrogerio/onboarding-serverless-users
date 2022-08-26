var cowsay = require("cowsay");
import { randomSentencesArray } from "../slug/slug";

console.log(
  cowsay.say({
    text: randomSentencesArray(1)[0],
  })
);
