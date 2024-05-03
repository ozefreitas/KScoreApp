import styles from "./filemissing.module.css";

export default function FileMissing({
  match,
  competitors,
  katas,
  setBlinking,
  isMenuOpen,
  setIsMenuOpen,
}) {
  return (
    <div style={{ width: "100%" }}>
      {match !== "teamkata"
        ? competitors.length === 0 && (
            <div className={styles.compFileMIssing}>
              <p>Ficheiro com lista de competidores não detetado.</p>
              <p>
                Selecione o ficheiro no{" "}
                <span
                  className={styles.openMenu}
                  onClick={() => {
                    if (isMenuOpen) {
                      setBlinking((prevState) => ({
                        ...prevState,
                        comp: true,
                      }));
                    } else {
                      setIsMenuOpen(!isMenuOpen);
                      setBlinking((prevState) => ({
                        ...prevState,
                        comp: !prevState.comp,
                      }));
                    }
                  }}
                >
                  menu de navegação
                </span>
                .
              </p>
            </div>
          )
        : " "}
      {match === "kata" || match === "katafinal" || match === "teamkata"
        ? katas.length === 0 && (
            <div className={styles.kataFileMIssing}>
              <p>Ficheiro com lista de Katas não detetado.</p>
              <p>
                Selecione o ficheiro no{" "}
                <span
                  className={styles.openMenu}
                  onClick={() => {
                    if (isMenuOpen) {
                      setBlinking((prevState) => ({
                        ...prevState,
                        kata: true,
                      }));
                    } else {
                      setIsMenuOpen(!isMenuOpen);
                      setBlinking((prevState) => ({
                        ...prevState,
                        kata: !prevState.kata,
                      }));
                    }
                  }}
                >
                  menu de navegação
                </span>
                .
              </p>
            </div>
          )
        : ""}
    </div>
  );
}
