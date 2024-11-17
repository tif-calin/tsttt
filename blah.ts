

const MINIFIGS = [
  'c', // classic
  'f', // farmer
  's', // skeleton
];
const HATS = [
  'b', // blonde hair
  'h', // helmet
  'l', // long hair
  'n', // bandana
];

const total = MINIFIGS.length + HATS.length;
const currMinifigs: string[] = [];
const currHats: string[] = [];
for (let i = 0; i <= total; i++) {
  const newFigOrHat = (i + 1) % 2;
  const toAdd = newFigOrHat ? currMinifigs : currHats;
  const toAddFrom = newFigOrHat ? MINIFIGS : HATS;
  if (!toAddFrom[toAdd.length]) break;
  toAdd.push(toAddFrom[toAdd.length]);

  // const perms = permutations(currMinifigs);
  // let groupings = [currMinifigs];
  // currHats.forEach

  console.log(currMinifigs, currHats);
}

// const main = (sets: string[][]) => {
//   const numSets = sets.filter(a => a.length).length;
//   const totalAtoms = sets.reduce((acc, cur) => acc + cur.length, 0);
// };
