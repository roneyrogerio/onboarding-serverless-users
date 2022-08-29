import { generateSlug } from "random-word-slugs";

export function randomSentencesArray(centencesQty: number): string[] {
  const sentences: string[] = [];

  for (let centence = 0; centence < centencesQty; centence += 1) {
    // ramdom words between 2 and 10
    const sentenceWordsQty: number = Math.floor(Math.random() * 9) + 2;
    const sentence: string = generateSlug(sentenceWordsQty, {
      format: "sentence",
    });
    sentences.push(sentence);
  }

  return sentences;
}
