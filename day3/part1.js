const inputs = Deno.readTextFileSync("./data.txt");

const parseInputs = inputs.split("\n");

const firstWirePath = parseInputs.at(0).split(",").map(
  (str) => [str.slice(0, 1), parseInt(str.slice(1))],
);
const secondWirePath = parseInputs.at(1).split(",").map(
  (str) => [str.slice(0, 1), parseInt(str.slice(1))],
);

const rightMoves = ([x, y], moveCount) => {
  return Array.from({ length: moveCount }, () => 0).map((
    a,
    i,
  ) => [x + i + 1, y]);
};

const leftMoves = ([x, y], moveCount) => {
  return Array.from({ length: moveCount }, () => 0).map((
    a,
    i,
  ) => [x - (i + 1), y]);
};

const upMoves = ([x, y], moveCount) => {
  return Array.from({ length: moveCount }, () => 0).map((
    a,
    i,
  ) => [x, y + i + 1]);
};

const downMoves = ([x, y], moveCount) => {
  return Array.from({ length: moveCount }, () => 0).map((
    a,
    i,
  ) => [x, y - (i + 1)]);
};

const instructionSet = {
  L: leftMoves,
  R: rightMoves,
  U: upMoves,
  D: downMoves,
};

function path(wirePath) {
  let currentPoint = [0, 0];
  const totalPoints = [];
  for (const [instruction, moves] of wirePath) {
    totalPoints.push(instructionSet[instruction](currentPoint, moves));
    currentPoint = totalPoints[totalPoints.length - 1][
      totalPoints[totalPoints.length - 1].length - 1
    ];
  }
  return totalPoints.flat();
}

const isArrayEqual = (array1, array2) => {
  return array1[0] === array2[0] && array1[1] === array2[1];
};

const doesIncludes = (nestedArray, array) =>
  nestedArray.some((arr) => isArrayEqual(arr, array));

const intersectionPoint = (wire1, wire2) => {
  const points = [];
  for (let i = 0; i < wire2.length; i++) {
    if (doesIncludes(wire1, wire2[i])) points.push(wire2[i]);
  }
  return points;
};

const intersectionPoints = intersectionPoint(path(firstWirePath), path(secondWirePath));

const ManhattanDistance = ([x1, y1], [x2, y2]) => {
  return Math.abs(x2 - x1) + Math.abs(y2 - y1);
};

const allDistance = intersectionPoints.map(point => ManhattanDistance([0,0],point)).sort((a,b) => b - a);

console.log(path(firstWirePath))
console.log(path(secondWirePath))
console.log(intersectionPoints)
console.log(allDistance);
