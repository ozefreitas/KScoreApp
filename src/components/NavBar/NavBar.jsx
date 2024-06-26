import styles from "./navBar.module.css";
import { Link } from "react-router-dom";

export default function NavBar({
  isMenuOpen,
  setIsMenuOpen,
  setCompetitors,
  theme,
  setTeams,
  setKatas,
  blinking,
  currentPage,
  setCurrentPage,
  setShowNotification,
  setNotificationTitle,
  setNotificationBody,
  compRef,
  teamRef,
  kataRef,
}) {
  // const ScrollTop = () => {
  //   executeScroll(topRef);
  // };

  const handleClickCompetitor = () => {
    document.getElementById("Competitor_Picker").click();
  };
  const handleClickTeam = () => {
    document.getElementById("Team_Picker").click();
  };
  const handleClickKata = () => {
    document.getElementById("Kata_Picker").click();
  };

  let where;

  const handleCompFile = (e) => {
    const inputFile = e.target.files[0];
    where = e.target.id;
    if (inputFile instanceof Blob) {
      handleFileChosen(inputFile, where);
    } else {
      console.error("Invalid file selected/No file selected");
      alert("No file select/Invalid file selected");
    }
  };

  const handleTeamFile = (e) => {
    const inputFile = e.target.files[0];
    where = e.target.id;
    if (inputFile instanceof Blob) {
      handleFileChosen(inputFile, where);
    } else {
      console.error("Invalid file selected/No file selected");
      alert("No file select/Invalid file selected");
    }
  };

  const handleKataFile = (e) => {
    const inputFile = e.target.files[0];
    where = e.target.id;
    handleFileChosen(inputFile, where);
  };

  let fileReader;

  const handleFileChosen = (file, where) => {
    try {
      fileReader = new FileReader();
    } catch {}
    if (where === "Competitor_Picker") {
      fileReader.onloadend = handleCompRead;
      fileReader.readAsText(file);
    } else if (where === "Team_Picker") {
      fileReader.onloadend = handleTeamRead;
      fileReader.readAsText(file);
    } else {
      fileReader.onloadend = handleKataRead;
      fileReader.readAsText(file);
    }
  };

  const handleCompRead = () => {
    const content = fileReader.result;
    const jsonResources = JSON.parse(content);
    const groupedCompetitors = {};
    const neededKeys = [
      "number",
      "name",
      "team",
      "category",
      "type",
      "favorite",
    ];
    jsonResources.forEach((resource, index) => {
      if (neededKeys.every((key) => Object.keys(resource).includes(key))) {
        const key = `${resource.number}-${resource.name}-${resource.team}-${resource.type}`;
        groupedCompetitors[key] = {
          ...resource,
        };
      } else {
        setShowNotification(true);
        setNotificationTitle("ERRO - ficheiro não suportado");
        setNotificationBody(
          "Certifique-se que o ficheiro fornecido é da lista dos competidores."
        );
        jsonResources.length = index + 1; // break
      }
    });
    const mergedCompetitors = Object.values(groupedCompetitors);
    setCompetitors(mergedCompetitors);
  };

  const handleTeamRead = () => {
    const content = fileReader.result;
    const jsonResources = JSON.parse(content);
    const groupedTeams = {};
    const neededKeys = [
      "name",
      "number",
      "category",
      "type",
      "team_number",
      "team",
    ];
    jsonResources.forEach((resource, index) => {
      if (neededKeys.every((key) => Object.keys(resource).includes(key))) {
        const key = `${resource.team}-${resource.team_number}-${resource.type}-${resource.category}`;
        if (groupedTeams[key]) {
          groupedTeams[key].name.push(resource.name);
          groupedTeams[key].number.push(resource.number);
        } else {
          groupedTeams[key] = {
            ...resource,
            name: [resource.name],
            number: [resource.number],
            category: `${resource.category} - ${resource.type}`,
          };
        }
      } else {
        setShowNotification(true);
        setNotificationTitle("ERRO - ficheiro não suportado");
        setNotificationBody(
          "Certifique-se que o ficheiro fornecido é da lista de equipas."
        );
        jsonResources.length = index + 1;
      }
    });
    const mergedTeams = Object.values(groupedTeams);
    setTeams(mergedTeams);
  };

  const handleKataRead = () => {
    const content = fileReader.result;
    const jsonResources = JSON.parse(content);
    const kataList = {};
    const neededKeys = ["kata_number", "kata_name"];
    jsonResources.forEach((resource, index) => {
      if (neededKeys.every((key) => Object.keys(resource).includes(key))) {
        const key = resource.kata_number;
        kataList[key] = {
          ...resource,
        };
      } else {
        setShowNotification(true);
        setNotificationTitle("ERRO - ficheiro não suportado");
        setNotificationBody(
          "Certifique-se que o ficheiro fornecido é da lista de Katas."
        );
        jsonResources.length = index + 1;
      }
    });
    const katas = Object.values(kataList);
    setKatas(katas);
  };

  const handleBarClose = () => {
    setIsMenuOpen(false);
  };

  const handleCurrentPage = (pageName) => {
    const resetPages = () => {
      setCurrentPage({
        home: false,
        elimDraw: false,
        groupDraw: false,
        matchesDraw: false,
        kataElim: false,
        kataFinal: false,
        teamKata: false,
        kihon: false,
        kumite: false,
        teamKumite: false,
        credits: false,
      });
    };
    resetPages();
    setCurrentPage((prevState) => ({
      ...prevState,
      [pageName]: true,
    }));
  };

  const handleClick = (pageName) => {
    handleBarClose();
    handleCurrentPage(pageName);
  };

  return (
    <div className={styles.navContainer}>
      <nav
        className={`${styles.navBar} ${
          isMenuOpen ? styles.open : styles.close
        }`}
      >
        <div className={styles.listContainer}>
          <ul>
            <li className={currentPage.home ? styles.currentPage : ""}>
              <Link
                to="/home"
                onClick={() => handleClick("home")}
                className={styles.liStyling}
              >
                Início
              </Link>
            </li>
            <li
              ref={compRef}
              className={`${
                blinking.comp
                  ? theme === "dark"
                    ? styles.blinker_dark_theme
                    : styles.blinker_light_theme
                  : ""
              }`}
            >
              <span onClick={handleClickCompetitor}>
                Inserir Lista de Competidores
              </span>
              <input
                id="Competitor_Picker"
                type="file"
                onChange={handleCompFile}
                className={`${styles.inputFile} ${styles.liStyling}`}
              ></input>
            </li>
            <li
              ref={teamRef}
              className={`${
                blinking.team
                  ? theme === "dark"
                    ? styles.blinker_dark_theme
                    : styles.blinker_light_theme
                  : ""
              }`}
            >
              <span onClick={handleClickTeam}>Inserir Lista de Equipas</span>
              <input
                id="Team_Picker"
                type="file"
                onChange={handleTeamFile}
                className={`${styles.inputFile} ${styles.liStyling}`}
              ></input>
            </li>
            <li className={currentPage.elimDraw ? styles.currentPage : ""}>
              <Link
                to="/eliminationdraw"
                onClick={() => handleClick("elimDraw")}
                className={styles.liStyling}
              >
                Fazer Novo Sorteio (Eliminatórias)
              </Link>
            </li>
            <li className={currentPage.groupDraw ? styles.currentPage : ""}>
              <Link
                to="/groupdraw"
                onClick={() => handleClick("groupDraw")}
                className={styles.liStyling}
              >
                Fazer Novo Sorteio (por Escalão)
              </Link>
            </li>
            <li className={currentPage.matchesDraw ? styles.currentPage : ""}>
              <Link
                to="/matchesdraw"
                onClick={() => handleClick("matchesDraw")}
                className={styles.liStyling}
              >
                Fazer Novo Sorteio (dentro de Grupo)
              </Link>
            </li>
            <li
              ref={kataRef}
              className={`${
                blinking.kata
                  ? theme === "dark"
                    ? styles.blinker_dark_theme
                    : styles.blinker_light_theme
                  : ""
              }`}
            >
              <span onClick={handleClickKata}>Inserir Lista de Katas</span>
              <input
                id="Kata_Picker"
                type="file"
                onChange={handleKataFile}
                className={`${styles.inputFile} ${styles.liStyling}`}
              ></input>
            </li>
            <li className={currentPage.kataElim ? styles.currentPage : ""}>
              <Link
                to="/kataelim"
                onClick={() => handleClick("kataElim")}
                className={styles.liStyling}
              >
                Kata Eliminação
              </Link>
            </li>
            <li className={currentPage.kataFinal ? styles.currentPage : ""}>
              <Link
                to="/katafinal"
                onClick={() => handleClick("kataFinal")}
                className={styles.liStyling}
              >
                Kata Finais
              </Link>
            </li>
            <li className={currentPage.teamKata ? styles.currentPage : ""}>
              <Link
                to="/teamkata"
                onClick={() => handleClick("teamKata")}
                className={styles.liStyling}
              >
                Kata Equipa / Kihon Finais
              </Link>
            </li>
            <li className={currentPage.kihon ? styles.currentPage : ""}>
              <Link
                to="/kihon"
                onClick={() => handleClick("kihon")}
                className={styles.liStyling}
              >
                Kihon
              </Link>
            </li>
            <li className={currentPage.kumite ? styles.currentPage : ""}>
              <Link
                to="/kumite"
                onClick={() => handleClick("kumite")}
                className={styles.liStyling}
              >
                Kumite
              </Link>
            </li>
            <li className={currentPage.teamKumite ? styles.currentPage : ""}>
              <Link
                to="/teamkumite"
                onClick={() => handleClick("teamKumite")}
                className={styles.liStyling}
              >
                Kumite Equipa
              </Link>
            </li>
            <li className={currentPage.credits ? styles.currentPage : ""}>
              <Link
                to="/credits"
                onClick={() => handleClick("credits")}
                className={styles.liStyling}
              >
                Créditos
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
