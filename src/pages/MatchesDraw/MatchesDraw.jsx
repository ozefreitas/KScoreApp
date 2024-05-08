import styles from "./matchesdraw.module.css";

export default function MatchesDraw({
  draw,
  competitors,
  isMenuOpen,
  setIsMenuOpen,
}) {
  const ipcRenderer = window.ipcRenderer;
  const data = [];
  const matches = {};
  // var keys = Object.keys(compList);
  // var filtered = keys.filter((key) => {
  //   return compList[key];
  // });

  var filtered = ["ze", "alvaro", "bruno", "leandro", "andreia", "gaby"];
  for (let i = 0; i < filtered.length; i++) {
    if (!Object.keys(matches).includes(filtered[i])) {
      matches[filtered[i]] = [];
    }
  }

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // const possibleMatches = [];
  // for (let i = 0; i < filtered.length; i++) {
  //   for (let j = i + 1; j < filtered.length; j++) {
  //     possibleMatches.push([filtered[i], filtered[j]]);
  //   }
  // }
  // console.log(possibleMatches);
  // const shuffledMatches = shuffleArray(possibleMatches);

  const shuffledCompList = shuffleArray(filtered);

  for (let i = 0; i < shuffledCompList.length; i++) {
    const name1 = shuffledCompList[i];
    for (let j = i + 1; j < shuffledCompList.length; j++) {
      const name2 = shuffledCompList[j];
      // if both already with 3 matches
      if (matches[name1].length >= 3 || matches[name2].length >= 3) {
        continue;
        // only of both are not full
      } else if (matches[name1].length < 3 && matches[name2].length < 3) {
        matches[name1].push([name1, name2]);
        matches[name2].push([name1, name2]);
      }
    }
  }

  console.log(matches);

  const names = Object.keys(matches);
  const notMatched = [];
  names.map((nam) => {
    if (matches[nam].length === 1) {
      notMatched.push(nam);
    }
  });

  console.log(notMatched);

  const clone = structuredClone(matches);

  for (let nomatch of notMatched) {
    for (let names of filtered) {
      if (!notMatched.includes(names)) {
        clone[nomatch].push([nomatch, names]);
      }
    }
  }
  
  console.log(clone);

  return <div></div>;
}
