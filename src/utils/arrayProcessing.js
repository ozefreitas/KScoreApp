export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function spaceTeams(array) {}

export function zerosArray(zerosPerArray) {
  let numberArrays = 4;
  const array = [];
  while (numberArrays > 0) {
    const subArray = [];
    for (let i = 0; i < zerosPerArray; i++) {
      subArray.push(0);
    }
    array.push(subArray);
    numberArrays--;
  }
  return array;
}
