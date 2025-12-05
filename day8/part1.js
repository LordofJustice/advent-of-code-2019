import { chunk } from "jsr:@std/collections";

const data = Deno.readTextFileSync("./input.txt");

const layers = chunk(data, 150);

const frequencyOf = (numArr) => {
  return numArr.reduce((freq, char) => {
    const currentFreq = freq[char] || 0;
    freq[char] = currentFreq + 1;
    return freq;
  }, {});
};

const numFreqOflayers = layers.map(x => frequencyOf(x));

const lowestZeroLayer = numFreqOflayers.sort((a,b) => a[0] - b[0]).at(0);

const mulOf1digitAnd2digit = lowestZeroLayer[1] * lowestZeroLayer[2];

console.log(lowestZeroLayer);
console.log(mulOf1digitAnd2digit);