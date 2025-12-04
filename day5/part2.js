const programData = Deno.readTextFileSync("./input.txt");

const parseData = () => programData.split(",").map((x) => parseInt(x));

const parsedData = parseData();

const add = ([in1, in2, assign], data, index) => {
  data[assign] = data[in1] + data[in2];
  return index + 4;
};

const mul = ([in1, in2, assign], data, index) => {
  data[assign] = data[in1] * data[in2];
  return index + 4;
};

const assign = ([in1], data, index) => {
  data[in1] = 5;
  return index + 2;
};

const print = ([in1], data, index) => {
  console.log(data[in1]);
  return index + 2;
};

const jumpIfTrue = ([in1, in2], data, index) => {
  return data[in1] !== 0 ? data[in2] : index + 3;
};

const jumpIfFalse = ([in1, in2], data, index) => {
  return data[in1] === 0 ? data[in2] : index + 3;
};

const isLessThan = ([in1, in2, assign], data, index) => {
  const value = parseInt(data[in1]) < parseInt(data[in2]) ? 1 : 0;
  data[assign] = value;
  return index + 4;
};

const isEqual = ([in1, in2, assign], data, index) => {
  const value = parseInt(data[in1]) === parseInt(data[in2]) ? 1 : 0;
  data[assign] = value;
  return index + 4;
};

const doOpration = {
  "01": add,
  "02": mul,
  "03": assign,
  "04": print,
  "05": jumpIfTrue,
  "06": jumpIfFalse,
  "07": isLessThan,
  "08": isEqual,
};

const parseInstruction = (num) => {
  const instruction = num.toString().padStart(5, "0");
  return [
    instruction.at(0),
    instruction.at(1),
    instruction.at(2),
    instruction.slice(-2),
  ];
};

const adresses = (data, instruction, index) => {
  const in1Adress = instruction.at(2) === "1" ? index + 1 : data[index + 1];
  const in2Adress = instruction.at(1) === "1" ? index + 2 : data[index + 2];
  const in3Adress = instruction.at(0) === "1" ? index + 3 : data[index + 3];
  return [in1Adress, in2Adress, in3Adress];
};

const oprateComputer = (programData) => {
  let index = 0;
  while (index < programData.length) {
    const parsedInstruction = parseInstruction(programData[index]); //[mode3,mode2,mode1,opcode]
    if (parsedInstruction[3] === "99") {
      return;
    }
    const allAdress = adresses(programData, parsedInstruction, index);
    index = doOpration[parsedInstruction[3]](allAdress, programData, index);
  }
};

console.log(oprateComputer(parsedData));