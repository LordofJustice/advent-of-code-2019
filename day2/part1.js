const data = Deno.readTextFileSync("./input.txt");

const parseData = () => data.split(",").map((x) => parseInt(x));

const parsedData = parseData();

let index = 0;

function dataAtIndexAfterCalculation(programData) {
  programData[1] = 12;
  programData[2] = 2;
  while (index < programData.length) {
    if (programData[index] === 1) {
      programData[programData[index + 3]] = programData[programData[index + 1]] + programData[programData[index + 2]];
      console.log(programData)
      index += 4;
    }
    if (programData[index] === 2) {
      programData[programData[index + 3]] = programData[programData[index + 1]] * programData[programData[index + 2]];
      index += 4;
    }
    if (programData[index] === 99) {
      return programData[0]
    }
  }
}

console.log(dataAtIndexAfterCalculation(parsedData))
