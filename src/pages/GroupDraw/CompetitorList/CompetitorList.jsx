import { useCallback, useEffect, useState } from "react";
import CompetitorItem from "../CompetitorItem/CompetitorItem";
import FileMissing from "../../../components/FileMissing/FileMissing";
import styles from "./competitorlist.module.css";
import { executeScroll, shuffleArray } from "../../../utils";

export default function CompetitorList({
  draw,
  competitors,
  teams,
  category,
  setCategory,
  modality,
  setModality,
  matchType,
  setMatchType,
  setCompList,
  setTeamList,
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
  compRef,
  teamRef,
}) {
  const [compToChange, setCompToChange] = useState({});
  const [teamToChange, setTeamToChange] = useState({});
  const [drawIsSet, setDrawIsSet] = useState(false);
  const [currentNumber, setCurrentNumber] = useState(0);

  const ScrollDraw = useCallback(
    (ref) => {
      if (modality === "default" && category === "default") {
        setShowNotification(true);
        setNotificationTitle("Modalidade e categoria não encontradas");
        setNotificationBody(
          "Selecionar primeiro uma modalidade e a seguir uma categoria."
        );
        return false;
      } else if (modality === "default" && category !== "default") {
        setShowNotification(true);
        setNotificationTitle("Modalidade não selecionada");
        setNotificationBody("Selecionar Modalidade para proceder a sorteio.");
        return false;
      } else if (modality !== "default" && category === "default") {
        if (modality === "Individual") {
          if (competitors.length === 0) {
            setShowNotification(true);
            setNotificationTitle("Ficheiro não detetado");
            setNotificationBody("Inserir ficheiro com lista de competidores.");
          } else {
            setShowNotification(true);
            setNotificationTitle("Escalão não selecionado");
            setNotificationBody("Selecionar Escalão para proceder a sorteio.");
          }
        } else if (teams.length === 0) {
          setShowNotification(true);
          setNotificationTitle("Ficheiro não detetado");
          setNotificationBody("Inserir ficheiro com lista das equipas.");
        } else {
          setShowNotification(true);
          setNotificationTitle("Escalão não selecionado");
          setNotificationBody("Selecionar Escalão para proceder a sorteio.");
        }
        return false;
      } else if (modality !== "default" && category !== "default") {
        if (modality === "Individual" && competitors.length === 0) {
          setShowNotification(true);
          setNotificationTitle("Ficheiro não detetado");
          setNotificationBody("Inserir ficheiro com lista de competidores.");
        } else if (modality === "Equipa" && teams.length === 0) {
          setShowNotification(true);
          setNotificationTitle("Ficheiro não detetado");
          setNotificationBody("Inserir ficheiro com lista das equipas.");
        } else {
          executeScroll(ref);
          return true;
        }
        return false;
      }
    },
    [
      category,
      modality,
      competitors,
      teams,
      setNotificationBody,
      setNotificationTitle,
      setShowNotification,
    ]
  );

  const ScrollTop = useCallback((ref) => {
    executeScroll(ref);
  }, []);

  // update the competitors when category change
  useEffect(() => {
    if (modality === "Individual") {
      const updatedCompList = {};
      competitors.forEach((competitor) => {
        if (competitor.category.includes(category)) {
          updatedCompList[
            `${competitor.name}|${competitor.number}|${competitor.team}`
          ] = true;
        }
      });
      setCompList(updatedCompList);
      setCurrentNumber(Object.keys(updatedCompList).length);
      setGroups([]);
      setCompToChange(updatedCompList);
      setBlinking(false);
      setIsMenuOpen(false);
      if (drawIsSet) {
        setShowNotification(true);
        setNotificationTitle("Escalão alterado");
        setNotificationBody("Sorteio eliminado por mudança de escalão.");
        ScrollTop(topRef);
        setDrawIsSet(false);
        setDeleteDraw(true);
      }
    } else if (modality === "Equipa") {
      const updatedTeamList = {};
      teams.forEach((team) => {
        if (team.category.includes(category)) {
          updatedTeamList[`${team.name}`] = true;
        }
      });
      setTeamList(updatedTeamList);
      setCurrentNumber(Object.keys(updatedTeamList).length);
      setGroups([]);
      setTeamToChange(updatedTeamList);
      setBlinking(false);
      setIsMenuOpen(false);
      if (drawIsSet) {
        setShowNotification(true);
        setNotificationTitle("Escalão alterado");
        setNotificationBody("Sorteio eliminado por mudança de escalão.");
        ScrollTop(topRef);
        setDrawIsSet(false);
        setDeleteDraw(true);
      }
    }
  }, [
    competitors,
    teams,
    category,
    setCompList,
    setTeamList,
    setGroups,
    setBlinking,
    setIsMenuOpen,
    setShowNotification,
    setNotificationTitle,
    setNotificationBody,
  ]);

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
      let filtered;
      if (indivOrTeam === "Individual") {
        let keys = Object.keys(compToChange);
        filtered = keys.filter((key) => {
          return compToChange[key];
        });
      } else {
        let keys = Object.keys(teamToChange);
        filtered = keys.filter((key) => {
          return teamToChange[key];
        });
      }

      const randomNumber = generateUniqueRandomNumbers(1, filtered.length);
      const generatedGroups = generateGroups(randomNumber, 4);
      setGroups(generatedGroups);
      if (indivOrTeam === "Individual") {
        setCompList(compToChange);
      } else {
        setCompList(teamToChange);
      }
      if (ScrollDraw(drawRef)) {
        setRunDraw(true);
        setDrawIsSet(true);
      }
    },
    [
      ScrollDraw,
      compToChange,
      teamToChange,
      setGroups,
      drawRef,
      setCompList,
      setRunDraw,
      setDrawIsSet,
      generateUniqueRandomNumbers,
    ]
  );

  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === "Enter") {
        handleSubmit(event, modality);
      }
    },
    [handleSubmit, modality]
  );

  const handleClick = () => {
    function selectElement(id, valueToSelect) {
      let element = document.getElementById(id);
      element.value = valueToSelect;
    }
    selectElement("categoryList", "default");
    if (draw === "elimination") {
      selectElement("modList", "default");
      selectElement("typeList", "default");
    }
    setGroups([]);
    setCategory("default");
    setIsDefault({ modality: true, category: true, matchtype: true });
    setModality("default");
    setMatchType("default");
    ScrollTop(topRef);
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
    <div
      className={`${styles.centerForm} ${
        draw === "elimination" ? styles.extendTopMargin : ""
      }`}
    >
      <form
        id="group_form"
        onSubmit={(event) => handleSubmit(event, modality)}
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
          compRef={compRef}
          teamRef={teamRef}
        ></FileMissing>
        {modality === "Individual" || draw === "group"
          ? category !== "default"
            ? competitors
                .filter(
                  (competitor) =>
                    competitor.category.includes(category) &&
                    competitor.type === matchType
                )
                .map((competitor, index) => (
                  <CompetitorItem
                    key={index}
                    modality="Individual"
                    competitor={competitor}
                    compToChange={compToChange}
                    setCompToChange={setCompToChange}
                    setCurrentNumber={setCurrentNumber}
                  ></CompetitorItem>
                ))
            : competitors.map((competitor, index) => (
                <CompetitorItem
                  key={index}
                  modality="Individual"
                  competitor={competitor}
                  compToChange={compToChange}
                  setCompToChange={setCompToChange}
                  setCurrentNumber={setCurrentNumber}
                ></CompetitorItem>
              ))
          : modality === "Equipa"
          ? category !== "default"
            ? teams
                .filter(
                  (team) =>
                    team.category.includes(category) && team.type === matchType
                )
                .map((team, index) => (
                  <CompetitorItem
                    key={index}
                    modality={modality}
                    team={team}
                    teamToChange={teamToChange}
                    setTeamToChange={setTeamToChange}
                    setCurrentNumber={setCurrentNumber}
                  ></CompetitorItem>
                ))
            : teams.map((team, index) => (
                <CompetitorItem
                  key={index}
                  modality={modality}
                  team={team}
                  teamToChange={teamToChange}
                  setTeamToChange={setTeamToChange}
                  setCurrentNumber={setCurrentNumber}
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
          Iniciar Sorteio com {currentNumber} participantes
        </button>
        <button onClick={handleClick} className={styles.clearButton}>
          Limpar
        </button>
      </div>
    </div>
  );
}
