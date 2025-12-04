import { areInAssendingOrder, numberString } from "./part1.js";

const numberThatAreInAsendingOrder = numberString.filter((x) =>
  areInAssendingOrder(x)
);

const doesIncludesNum = (array, num) => array.some((x) => x === num);

const frequencyTable = (numberString) => {
  return numberString.split("").reduce((freq, char) => {
    const currentFreq = freq[char] || 0;
    freq[char] = currentFreq + 1;
    return freq;
  }, {});
};

const doesMeetsCritaria = (numberString) => {
  return doesIncludesNum(Object.values(frequencyTable(numberString)), 2);
};

const passwords = numberThatAreInAsendingOrder.filter((x) =>
  doesMeetsCritaria(x)
);

console.log(passwords.length);
