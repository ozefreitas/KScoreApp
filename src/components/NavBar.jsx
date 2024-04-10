import styles from "./navBar.module.css";
import { Link } from "react-router-dom";

export default function NavBar({
  isMenuOpen,
  setIsMenuOpen,
  setCompetitors,
  setKatas,
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
    handleFileChosen(inputFile, where);
  };

  const handleKataFile = (e) => {
    const inputFile = e.target.files[0];
    where = e.target.id;
    handleFileChosen(inputFile, where);
  };

  let fileReader;

  const handleFileChosen = (file, where) => {
    fileReader = new FileReader();
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
                Home
              </Link>
            </li>
            <li>
              <span onClick={handleClickCompetitor}>
                Upload Competitor List
              </span>
              <input
                id="Competitor_Picker"
                type="file"
                onChange={handleCompFile}
                className={styles.inputFile}
              ></input>
            </li>
            <li>
              <span onClick={handleClickKata}>Upload Kata List</span>
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
                Kata Elimination
              </Link>
            </li>
            <li>
              <Link
                to="/katafinal"
                onClick={handleBarClose}
                style={{ textDecoration: "none", color: "white" }}
              >
                Kata Finals
              </Link>
            </li>
            <li>
              <Link
                to="/teamkata"
                onClick={handleBarClose}
                style={{ textDecoration: "none", color: "white" }}
              >
                Team Kata
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
                Team Kumite
              </Link>
            </li>
            <li>
              <Link
                to="/credits"
                onClick={handleBarClose}
                style={{ textDecoration: "none", color: "white" }}
              >
                Credits
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
