import styles from "./navBar.module.css";
import { Link } from "react-router-dom";

export default function NavBar({
  isMenuOpen,
  setIsMenuOpen,
  setCompetitors,
  setKatas,
  blinking,
}) {
  const handleClickCompetitor = () => {
    document.getElementById("Competitor_Picker").click();
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
    } else {
      fileReader.onloadend = handleKataRead;
      fileReader.readAsText(file);
    }
  };

  const handleCompRead = () => {
    const content = fileReader.result;
    setCompetitors(JSON.parse(content));
  };

  const handleKataRead = () => {
    const content = fileReader.result;
    setKatas(JSON.parse(content));
  };

  const handleBarClose = () => {
    setIsMenuOpen(false);
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
            <li>
              <Link
                to="/home"
                onClick={handleBarClose}
                style={{ textDecoration: "none", color: "white" }}
              >
                Início
              </Link>
            </li>
            <li className={`${blinking.comp ? styles.blinker : ""}`}>
              <span onClick={handleClickCompetitor}>
                Inserir Lista de Competidores
              </span>
              <input
                id="Competitor_Picker"
                type="file"
                onChange={handleCompFile}
                className={styles.inputFile}
              ></input>
            </li>
            <li>
              <Link
                to="/eliminationdraw"
                onClick={handleBarClose}
                style={{ textDecoration: "none", color: "white" }}
              >
                Fazer Novo Sorteio (Eliminatórias)
              </Link>
            </li>
            <li>
              <Link
                to="/groupdraw"
                onClick={handleBarClose}
                style={{ textDecoration: "none", color: "white" }}
              >
                Fazer Novo Sorteio (por Escalão)
              </Link>
            </li>
            <li>
              <Link
                to="/matchesdraw"
                onClick={handleBarClose}
                style={{ textDecoration: "none", color: "white" }}
              >
                Fazer Novo Sorteio (dentro de Grupo)
              </Link>
            </li>
            <li className={`${blinking.kata ? styles.blinker : ""}`}>
              <span onClick={handleClickKata}>Inserir Lista de Katas</span>
              <input
                id="Kata_Picker"
                type="file"
                onChange={handleKataFile}
                className={styles.inputFile}
              ></input>
            </li>
            <li>
              <Link
                to="/kataelim"
                onClick={handleBarClose}
                style={{ textDecoration: "none", color: "white" }}
              >
                Kata Eliminação
              </Link>
            </li>
            <li>
              <Link
                to="/katafinal"
                onClick={handleBarClose}
                style={{ textDecoration: "none", color: "white" }}
              >
                Kata Finais
              </Link>
            </li>
            <li>
              <Link
                to="/teamkata"
                onClick={handleBarClose}
                style={{ textDecoration: "none", color: "white" }}
              >
                Kata Equipa
              </Link>
            </li>
            <li>
              <Link
                to="/kumite"
                onClick={handleBarClose}
                style={{ textDecoration: "none", color: "white" }}
              >
                Kumite
              </Link>
            </li>
            <li>
              <Link
                to="/teamkumite"
                onClick={handleBarClose}
                style={{ textDecoration: "none", color: "white" }}
              >
                Kumite Equipa
              </Link>
            </li>
            <li>
              <Link
                to="/credits"
                onClick={handleBarClose}
                style={{ textDecoration: "none", color: "white" }}
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
