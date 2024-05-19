import styles from "./filemissing.module.css";
import { useNavigate } from "react-router-dom";

export default function FileMissing({
  match,
  draw,
  competitors,
  katas,
  groupByComp,
  setBlinking,
  isMenuOpen,
  setIsMenuOpen,
  setCurrentPage,
}) {
  const navigate = useNavigate();
  return (
    <div style={{ width: "100%" }}>
      {match !== "teamkata" && draw === undefined
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
      {(match === "kata" || match === "katafinal" || match === "teamkata") &&
      draw === undefined
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
      {match === "matchesDraw" && draw === true
        ? groupByComp.length === 0 && (
            <div className={styles.compFileMIssing}>
              <p>Grupos não detetados.</p>
              <p>
                Faça o sorteio dos grupos em{" "}
                <span
                  className={styles.openMenu}
                  onClick={() => {
                    navigate("/groupdraw");
                    setCurrentPage({
                      home: false,
                      elimDraw: false,
                      groupDraw: true,
                      matchesDraw: false,
                      kataElim: false,
                      kataFinal: false,
                      teamKata: false,
                      kumite: false,
                      teamKummite: false,
                      credits: false,
                    });;
                  }}
                >
                  Fazer novo Sorteio (por Escalão)
                </span>
                .
              </p>
            </div>
          )
        : " "}
    </div>
  );
}
