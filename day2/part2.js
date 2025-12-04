const data = Deno.readTextFileSync("./input.txt");

const parseData = () => data.split(",").map((x) => parseInt(x));

const parsedData = parseData();

const add = (data, index) => {
  data[data[index + 3]] = data[data[index + 1]] +
    data[data[index + 2]];
  return;
};

const mul = (data, index) => {
  data[data[index + 3]] = data[data[index + 1]] *
    data[data[index + 2]];
  return;
};

const doOpration = {
  1: add,
  2: mul,
};

const oprateComputer = (programData, noun, verb) => {
  programData[1] = noun;
  programData[2] = verb;
  for (let index = 0; index < programData.length; index += 4) {
    if (programData[index] === 99) {
      index = 0;
      return programData[0];
    }
    doOpration[programData[index]](programData, index);
  }
};

function dataAtIndexAfterCalculation(programData) {
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      const newData = programData.slice();
      if (oprateComputer(newData, i, j) === 19690720) {
        return 100 * i + j;
      }
    }
  }
}

console.log(dataAtIndexAfterCalculation(parsedData));