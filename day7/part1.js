import { permutations } from "jsr:@std/collections";

const programData = Deno.readTextFileSync("./input.txt");

const parseData = () => programData.split(",").map((x) => parseInt(x));

const parsedData = parseData();

const add = ([in1, in2, assign], data, index) => {
  data[assign] = data[in1] + data[in2];
  return [index + 4];
};

const mul = ([in1, in2, assign], data, index) => {
  data[assign] = data[in1] * data[in2];
  return [index + 4];
};

const assign = ([in1], data, index, phaseSequence, input) => {
  data[in1] = index !== 0 ? input : phaseSequence;
  return [index + 2];
};

const print = ([in1], data, index) => {
  //console.log(data[in1]);
  return [index + 2, data[in1]];
};

const jumpIfTrue = ([in1, in2], data, index) => {
  const newIndex = data[in1] !== 0 ? data[in2] : index + 3;
  return [newIndex];
};

const jumpIfFalse = ([in1, in2], data, index) => {
  const newIndex = data[in1] === 0 ? data[in2] : index + 3;
  return [newIndex];
};

const isLessThan = ([in1, in2, assign], data, index) => {
  const value = parseInt(data[in1]) < parseInt(data[in2]) ? 1 : 0;
  data[assign] = value;
  return [index + 4];
};

const isEqual = ([in1, in2, assign], data, index) => {
  const value = parseInt(data[in1]) === parseInt(data[in2]) ? 1 : 0;
  data[assign] = value;
  return [index + 4];
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

const oprateComputer = (programData, phaseSequence, input) => {
  let index = 0;
  let output;
  while (index < programData.length) {
    const parsedInstruction = parseInstruction(programData[index]); //[mode3,mode2,mode1,opcode]
    if (parsedInstruction[3] === "99") {
      return [programData, output];
    }
    const allAdress = adresses(programData, parsedInstruction, index);
    [index, output] = doOpration[parsedInstruction[3]](
      allAdress,
      programData,
      index,
      phaseSequence,
      input,
    );
  }
};

const amplifireOutput = (data, phaseSequence) => {
  let newData = data;
  let input = 0;
  for (let i = 0; i < phaseSequence.length; i++) {
    const currPhaseSeq = phaseSequence[i];
    const computerOutput = oprateComputer(newData, currPhaseSeq, input);
    newData = computerOutput[0];
    input = computerOutput[1];
  }
  return input;
};

const allPossiblePhaseSeq = permutations([0, 1, 2, 3, 4]);

const allPossibleSignalForThrusters = allPossiblePhaseSeq.map((phSeq) =>
  amplifireOutput(parsedData, phSeq)
);

const highestPossibleSignal = allPossibleSignalForThrusters.sort((a, b) =>
  b - a
).at(0);

console.log(highestPossibleSignal);
