import { useEffect } from "react";
import CompetitorItem from "../CompetitorItem/CompetitorItem";
import styles from "./competitorlist.module.css";

export default function CompetitorList({
  competitors,
  category,
  setCategory,
  compList,
  setCompList,
  setGroups,
  drawRef,
  topRef,
  setIsDefault,
  isMenuOpen,
  setIsMenuOpen,
  setBlinking,
  blinking,
}) {
  const ScrollDraw = () => {
    const executeScroll = () =>
      drawRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    if (category !== "default") {
      executeScroll();
    } else {
      alert("Selecionar Escalão para proceder a sorteio");
    }
  };

  const ScrollTop = () => {
    const executeScroll = () =>
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    executeScroll();
  };

  useEffect(() => {
    const updatedCompList = {};
    competitors.forEach((competitor) => {
      if (competitor.category.includes(category)) {
        updatedCompList[`${competitor.name}|${competitor.number}`] = true;
      }
    });
    setCompList(updatedCompList);
    setBlinking(false);
    setIsMenuOpen(false);
  }, [competitors, category, setCompList, setBlinking, setIsMenuOpen]);

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
    ScrollDraw();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  const handleClick = () => {
    function selectElement(id, valueToSelect) {
      let element = document.getElementById(id);
      element.value = valueToSelect;
    }
    selectElement("categoryList", "default");
    setGroups([]);
    setCategory("default");
    setIsDefault(true);
    ScrollTop();
  };

  useEffect(() => {
    // attach the event listener
    document.addEventListener("keydown", handleKeyPress);

    // remove the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className={styles.centerForm}>
      <form
        id="group_form"
        onSubmit={handleSubmit}
        className={styles.notHidden}
      >
        {competitors.length === 0 ? (
          <div className={styles.compFileMIssing}>
            <p>Ficheiro com lista de competidores não detetado.</p>
            <p>
              Selecione o ficheiro no{" "}
              <span
                className={styles.openMenu}
                onClick={() => {
                  if (isMenuOpen) {
                    setBlinking(true);
                  } else {
                    setIsMenuOpen(!isMenuOpen);
                    setBlinking(!blinking);
                  }
                }}
              >
                menu de navegação
              </span>
              .
            </p>
          </div>
        ) : (
          ""
        )}
        {category !== "default"
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
      <div id="buttonsDiv">
        <button
          type="submit"
          form="group_form"
          onKeyDown={handleKeyPress}
          className={styles.drawButton}
        >
          Iniciar Sorteio
        </button>
        <button onClick={handleClick} className={styles.clearButton}>
          Limpar
        </button>
      </div>
    </div>
  );
}
