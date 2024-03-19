import styles from "./navBar.module.css";

export default function NavBar({ isMenuOpen, setCompetitors, setKatas }) {
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
    console.log(where);
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
          </ul>
        </div>
      </nav>
    </div>
  );
}
