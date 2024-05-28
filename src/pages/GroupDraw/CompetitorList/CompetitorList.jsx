import { useCallback, useEffect, useState } from "react";
import CompetitorItem from "../CompetitorItem/CompetitorItem";
import FileMissing from "../../../components/FileMissing/FileMissing";
import styles from "./competitorlist.module.css";

export default function CompetitorList({
  draw,
  competitors,
  teams,
  category,
  setCategory,
  modality,
  setModality,
  setCompList,
  setGroups,
  drawRef,
  topRef,
  setIsDefault,
  isMenuOpen,
  setIsMenuOpen,
  blinking,
  setBlinking,
  setShowNotification,
  setNotificationTitle,
  setNotificationBody,
  setRunDraw,
  setDeleteDraw,
}) {
  const [compToChange, setCompToChange] = useState({});
  const [teamToChange, setTeamToChange] = useState({});
  const [drawIsSet, setDrawIsSet] = useState(false);

  const ScrollDraw = useCallback(() => {
    const executeScroll = () =>
      drawRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    if (category !== "default" && competitors.length === 0) {
      setShowNotification(true);
      setNotificationTitle("Ficheiro não detetado");
      setNotificationBody("Inserir ficheiro com lista de competidores");
    } else if (category !== "default") {
      executeScroll();
    } else {
      setShowNotification(true);
      setNotificationTitle("Escalão não detetado");
      setNotificationBody("Selecionar Escalão para proceder a sorteio");
    }
  }, [
    category,
    competitors,
    drawRef,
    setNotificationBody,
    setNotificationTitle,
    setShowNotification,
  ]);

  const ScrollTop = useCallback(() => {
    const executeScroll = () =>
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    executeScroll();
  }, [topRef]);

  // update the competitors when category change
  useEffect(() => {
    const updatedCompList = {};
    competitors.forEach((competitor) => {
      if (competitor.category.includes(category)) {
        updatedCompList[`${competitor.name}|${competitor.number}`] = true;
      }
    });
    setCompList(updatedCompList);
    setGroups([]);
    setCompToChange(updatedCompList);
    setBlinking(false);
    setIsMenuOpen(false);
    if (drawIsSet) {
      setShowNotification(true);
      setNotificationTitle("Escalão alterado");
      setNotificationBody("Sorteio eliminado por mudança de escalão.");
      ScrollTop();
      setDrawIsSet(false);
      setDeleteDraw(true);
    }
  }, [
    competitors,
    category,
    setCompList,
    setGroups,
    setBlinking,
    setIsMenuOpen,
    setShowNotification,
    setNotificationTitle,
    setNotificationBody,
  ]);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  const generateUniqueRandomNumbers = useCallback((min, max) => {
    const numbers = [];
    for (let i = min; i <= max; i++) {
      numbers.push(i);
    }
    shuffleArray(numbers);
    return numbers;
  }, []);

  function generateGroups(array, groupSize) {
    let newGroup = [];
    for (let i = 0; i < array.length; i += groupSize) {
      const chunk = array.slice(i, i + groupSize);
      newGroup = [...newGroup, chunk];
    }
    return newGroup;
  }

  const handleSubmit = useCallback(
    (event, indivOrTeam) => {
      event.preventDefault();

      let keys = Object.keys(compToChange);
      let filtered = keys.filter((key) => {
        return compToChange[key];
      });

      const randomNumber = generateUniqueRandomNumbers(1, filtered.length);
      const generatedGroups = generateGroups(randomNumber, 4);
      setGroups(generatedGroups);
      setCompList(compToChange);
      ScrollDraw();
      setRunDraw(true);
      setDrawIsSet(true);
    },
    [
      ScrollDraw,
      compToChange,
      setGroups,
      setCompList,
      setRunDraw,
      setDrawIsSet,
      generateUniqueRandomNumbers,
    ]
  );

  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === "Enter") {
        handleSubmit(event);
      }
    },
    [handleSubmit]
  );

  const handleClick = () => {
    function selectElement(id, valueToSelect) {
      let element = document.getElementById(id);
      element.value = valueToSelect;
    }
    selectElement("categoryList", "default");
    if (draw === "elimination") {
      selectElement("modList", "default");
    }
    setGroups([]);
    setCategory("default");
    setIsDefault({ modality: true, category: true });
    setModality("default");
    ScrollTop();
    setDeleteDraw(true);
    setDrawIsSet(false);
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
        <FileMissing
          draw={draw}
          competitors={competitors}
          teams={teams}
          modality={modality}
          blinking={blinking}
          setBlinking={setBlinking}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        ></FileMissing>
        {modality === "Individual" || draw === "group"
          ? category !== "default"
            ? competitors
                .filter((competitor) => competitor.category.includes(category))
                .map((competitor, index) => (
                  <CompetitorItem
                    key={index}
                    modality="Individual"
                    competitor={competitor}
                    compToChange={compToChange}
                    setCompToChange={setCompToChange}
                  ></CompetitorItem>
                ))
            : competitors.map((competitor, index) => (
                <CompetitorItem
                  key={index}
                  modality="Individual"
                  competitor={competitor}
                  compToChange={compToChange}
                  setCompToChange={setCompToChange}
                ></CompetitorItem>
              ))
          : modality === "Equipa"
          ? category !== "default"
            ? teams
                .filter((team) => team.category.includes(category))
                .map((team, index) => (
                  <CompetitorItem
                    key={index}
                    modality={modality}
                    team={team}
                    teamToChange={teamToChange}
                    setTeamToChange={setTeamToChange}
                  ></CompetitorItem>
                ))
            : teams.map((team, index) => (
                <CompetitorItem
                  key={index}
                  modality={modality}
                  team={team}
                  teamToChange={teamToChange}
                  setTeamToChange={setTeamToChange}
                ></CompetitorItem>
              ))
          : ""}
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
