import { useEffect } from "react";
import CompetitorItem from "../CompetitorItem/CompetitorItem";
import styles from "./competitorlist.module.css";

export default function CompetitorList({
  competitors,
  category,
  compList,
  setCompList,
  setGroups,
  refProp,
}) {
  const ScrollDemo = () => {
    const executeScroll = () =>
      refProp.current.scrollIntoView({ behavior: "smooth", block: "start" });
    if (category !== null) {
      executeScroll();
    }
  };

  useEffect(() => {
    const updatedCompList = {};
    competitors.forEach((competitor) => {
      // console.log(competitor.category.includes(category))
      // if (competitor.category === category) {
      if (competitor.category.includes(category)) {
        updatedCompList[competitor.name] = true;
      }
    });
    console.log(updatedCompList);
    setCompList(updatedCompList);
  }, [competitors, category, setCompList]);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function generateUniqueRandomNumbers(min, max) {
    const numbers = [];
    for (let i = min; i <= max; i++) {
      numbers.push(i);
    }
    shuffleArray(numbers);
    return numbers;
  }

  function generateGroups(array, groupSize) {
    let newGroup = [];
    for (let i = 0; i < array.length; i += groupSize) {
      const chunk = array.slice(i, i + groupSize);
      newGroup = [...newGroup, chunk];
    }
    return newGroup;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    var keys = Object.keys(compList);
    var filtered = keys.filter((key) => {
      return compList[key];
    });

    const randomNumber = generateUniqueRandomNumbers(1, filtered.length);
    const generatedGroups = generateGroups(randomNumber, 4);
    setGroups(generatedGroups);
    ScrollDemo();
  };

  return (
    <div className={styles.centerForm}>
      <form
        id="group_form"
        onSubmit={handleSubmit}
        className={styles.notHidden}
      >
        {category !== null
          ? competitors
              .filter((competitor) => competitor.category.includes(category))
              .map((competitor, index) => (
                <CompetitorItem
                  key={index}
                  competitor={competitor}
                  compList={compList}
                  setCompList={setCompList}
                ></CompetitorItem>
              ))
          : competitors.map((competitor, index) => (
              <CompetitorItem
                key={index}
                competitor={competitor}
                compList={compList}
                setCompList={setCompList}
              ></CompetitorItem>
            ))}
      </form>
      <button type="submit" form="group_form" className={styles.drawButton}>
        Iniciar Sorteio
      </button>
    </div>
  );
}
