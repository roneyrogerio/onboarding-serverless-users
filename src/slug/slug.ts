import { generateSlug } from "random-word-slugs";

export function randomSentencesArray(centencesQty: number): string[] {
  let sentences: string[] = [];

  for (let centence = 0; centence < centencesQty; centence++) {
    //ramdom words between 2 and 10
    const sentenceWordsQty: number = Math.floor(Math.random() * 9) + 2;
    let sentence: string = generateSlug(sentenceWordsQty, {
      format: "sentence",
    });
    sentences.push(sentence);
  }

  return sentences;
}
