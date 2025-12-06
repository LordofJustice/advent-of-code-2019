const programData = Deno.readTextFileSync("./input.txt");

const parseData = () => programData.split(",").map((x) => parseInt(x));

const parsedData = parseData();

const add = ([in1, in2, assign], data, index, relativeBase) => {
  data[assign] = data[in1] + data[in2];
  return [index + 4, relativeBase];
};

const mul = ([in1, in2, assign], data, index, relativeBase) => {
  data[assign] = data[in1] * data[in2];
  return [index + 4, relativeBase];
};

const assign = ([in1], data, index, relativeBase) => {
  data[in1] = 2;
  return [index + 2, relativeBase];
};

const print = ([in1], data, index, relativeBase) => {
  console.log("prin", data[in1]);
  return [index + 2, relativeBase];
};

const jumpIfTrue = ([in1, in2], data, index, relativeBase) => {
  return data[in1] !== 0
    ? [data[in2], relativeBase]
    : [index + 3, relativeBase];
};

const jumpIfFalse = ([in1, in2], data, index, relativeBase) => {
  return data[in1] === 0
    ? [data[in2], relativeBase]
    : [index + 3, relativeBase];
};

const isLessThan = ([in1, in2, assign], data, index, relativeBase) => {
  const value = parseInt(data[in1]) < parseInt(data[in2]) ? 1 : 0;
  data[assign] = value;
  return [index + 4, relativeBase];
};

const isEqual = ([in1, in2, assign], data, index, relativeBase) => {
  const value = parseInt(data[in1]) === parseInt(data[in2]) ? 1 : 0;
  data[assign] = value;
  return [index + 4, relativeBase];
};

const adjustRelativeBase = ([in1], data, index, relativeBase) => {
  if (data[in1] === undefined) data[in1] = 0;
  relativeBase += data[in1];
  return [index + 2, relativeBase];
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
  "09": adjustRelativeBase,
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

const newAdress = (mode, offset, index, data, relativeBase) => {
  if (mode === "2") {
    return data[index + offset] + relativeBase;
  } else if (mode === "1") {
    return index + offset;
  } else if (mode === "0") {
    return data[index + offset];
  }
};

const correctData = (data, address) => {
  if (data[address] === undefined && data[address] >= 0) {
    data[address] = 0;
  }
  return address;
};

const adresses = (data, instruction, index, base) => {
  const in1Adress = newAdress(instruction.at(2), 1, index, data, base);
  const in2Adress = newAdress(instruction.at(1), 2, index, data, base);
  const in3Adress = newAdress(instruction.at(0), 3, index, data, base);
  return [in1Adress, in2Adress, in3Adress].map((adress) =>
    correctData(data, adress)
  );
};

const oprateComputer = (program) => {
  let index = 0;
  let relativeBase = 0;
  while (index < program.length) {
    const instruction = parseInstruction(program[index]);
    if (instruction[3] === "99") return;
    const allAdress = adresses(program, instruction, index, relativeBase);
    const instructionOutput = doOpration[instruction[3]](
      allAdress,
      program,
      index,
      relativeBase,
    );
    index = instructionOutput[0];
    relativeBase = instructionOutput[1];
  }
};

console.log(oprateComputer(parsedData));
