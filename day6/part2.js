const data = Deno.readTextFileSync("./input.txt");

const orbits = data.split("\n").map((str) => str.split(")"));

const find = (loc, orbits) => orbits.filter((orbit) => orbit[1] === loc)[0][0];

const newSubOrbit = (center, orbits) => {
  let j = 0;
  while (j < orbits.length) {
    if (orbits[j][1] === center) {
      return orbits[j][0];
    }
    j++;
  }
};

const pathToCOM = (orbits, location) => {
  const path = [];
  let temp = find(location, orbits);
  while (temp !== "COM") {
    temp = newSubOrbit(temp, orbits);
    path.push(temp);
  }
  return path;
};

const distance = (path1, path2) => {
  for (let i = 0; i < path1.length; i++) {
    for (let j = 0; j < path2.length; j++) {
      if(path2[j] === path1[i]) {
        return i + j + 2;
      }
    }
  }
};

const sanPath = pathToCOM(orbits, "SAN");
const youPath = pathToCOM(orbits, "YOU");

console.log(distance(sanPath,youPath));
