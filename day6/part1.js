const data = Deno.readTextFileSync("./input.txt");

const orbits = data.split("\n").map((str) => str.split(")"));

const newSubOrbit = (center, orbits) => {
  let j = 0;
  while (j < orbits.length) {
    if (orbits[j][1] === center) {
      return orbits[j][0];
    }
    j++;
  }
};

const distanceFromCOM = (orbits) => {
  const distancesFromCenter = {};
  for (let i = 0; i < orbits.length; i++) {
    const currentOrbit = orbits[i];
    distancesFromCenter[currentOrbit[1]] = 1;
    let temp = currentOrbit[0];
    while (temp !== "COM") {
      temp = newSubOrbit(temp, orbits);
      distancesFromCenter[currentOrbit[1]]++;
    }
  }
  return distancesFromCenter;
};

const orbitCountCheckSums = Object.values(distanceFromCOM(orbits))
  .reduce((sum, value) => sum += value, 0);

console.log(orbitCountCheckSums);
