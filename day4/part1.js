const numbersInRange = (from, to) => {
  const numbers = [];
  for (let i = from; i <= to; i++) {
    numbers.push(i.toString());
  }
  return numbers;
};

export const numberString = numbersInRange(125730, 579381);


const sameAdjacentDigits = numberString.filter(x=> x.match(/(\d)\1/))


export const areInAssendingOrder = (numString) => {
  for (let i = 0; i < numString.length; i++) {
    if(numString[i] > numString[i + 1]) return false
  }
  return true;
}

const passwords = sameAdjacentDigits.filter(x => areInAssendingOrder(x));

const numberOfPasswordsMeetingCriteria = passwords.length;

