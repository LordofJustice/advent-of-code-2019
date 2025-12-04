const parseData = Deno.readTextFileSync("./input.txt").split("\n").map((x) =>
  parseInt(x)
);

const requiredFuel = (mass) => Math.floor(mass / 3) - 2;

const calculateAllFuel = (moduleMasses) =>
  moduleMasses.reduce((totalFuel, mass) => totalFuel += requiredFuel(mass), 0);

const fuelRequiredForModules = calculateAllFuel(parseData);

console.log(fuelRequiredForModules)

// part 2

function fuelRequired (fuelMass) {
  if (fuelMass <= 0) return 0;
  return fuelMass + fuelRequired(requiredFuel(fuelMass));
}

const allFuelRequiredIncludingFuelMass = parseData.reduce((total,mass) => total += fuelRequired(requiredFuel(mass)),0)

console.log(allFuelRequiredIncludingFuelMass)
