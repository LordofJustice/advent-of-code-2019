import { chunk } from "jsr:@std/collections";

const createScreen = (height, width) =>
  Array.from(
    { length: height },
    () => Array.from({ length: width }, () => " "),
  );

const changeScreen = (screen, layer) => {
  for (let y = 0; y < layer.length; y++) {
    for (let x = 0; x < layer[0].length; x++) {
      if (screen[y][x] === " " && parseInt(layer[y][x]) < 2) {
        screen[y][x] = parseInt(layer[y][x]);
      }
    }
  }
  return screen;
};

const main = () => {
  const data = Deno.readTextFileSync("./input.txt");

  const pixelsWide = 25;
  const pixelsTall = 6;

  const totalPixel = pixelsWide * pixelsTall;

  const layers = chunk(data, totalPixel).map((x) => chunk(x, 25));
  const screen = createScreen(pixelsTall, pixelsWide);

  const image = layers.reduce(
    (newScren, layer) => newScren = changeScreen(newScren, layer),
    screen,
  );

  console.log(
    image.map((item) => item.map((num) => num === 0 ? "⬛️" : "⬜️").join(""))
      .join("\n"),
  );
};

main();
