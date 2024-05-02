import styles from "./filemissing.module.css";

export default function FileMissing({
  match,
  blinking,
  setBlinking,
  isMenuOpen,
  setIsMenuOpen,
}) {
  return (
    <div style={{ width: "100%" }}>
      {match !== "teamkata" && (
        <div className={styles.compFileMIssing}>
          <p>Ficheiro com lista de competidores não detetado.</p>
          <p>
            Selecione o ficheiro no{" "}
            <span
              className={styles.openMenu}
              onClick={() => {
                if (isMenuOpen) {
                  // setBlinking(true)
                  setBlinking((prevState) => ({ ...prevState, comp: true }));
                } else {
                  setIsMenuOpen(!isMenuOpen);
                  // setBlinking(!blinking);
                  setBlinking((prevState) => ({ ...prevState, comp: !prevState.comp }));
                }
              }}
            >
              menu de navegação
            </span>
            .
          </p>
        </div>
      )}
      {(match === "kata" || match === "katafinal" || match === "teamkata") && (
        <div className={styles.kataFileMIssing}>
          <p>Ficheiro com lista de Katas não detetado.</p>
          <p>
            Selecione o ficheiro no{" "}
            <span
              className={styles.openMenu}
              onClick={() => {
                if (isMenuOpen) {
                  setBlinking((prevState) => ({ ...prevState, kata: true }));
                } else {
                  setIsMenuOpen(!isMenuOpen);
                  setBlinking((prevState) => ({ ...prevState, kata: !prevState.kata }));
                }
              }}
            >
              menu de navegação
            </span>
            .
          </p>
        </div>
      )}
    </div>
  );
}
