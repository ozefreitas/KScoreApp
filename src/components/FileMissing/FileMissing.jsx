import styles from "./filemissing.module.css";
import { useNavigate } from "react-router-dom";
import { executeScroll } from "../../utils";

export default function FileMissing({
  match,
  draw,
  competitors,
  teams,
  katas,
  groupByComp,
  setBlinking,
  isMenuOpen,
  setIsMenuOpen,
  setCurrentPage,
  modality,
  compRef,
  teamRef,
  kataRef,
}) {
  // console.log("modality:", modality);
  // console.log("draw:", draw);
  // console.log("teams:", teams.length);
  // console.log("competitors:", competitors.length);
  // console.log("katas:", katas)
  const navigate = useNavigate();
  return (
    <div style={{ width: "100%" }}>
      {modality === "default" &&
      draw === "elimination" &&
      (competitors.length === 0 ||
        competitors.length !== 0 ||
        teams.length === 0 ||
        teams.length !== 0) ? (
        <div className={styles.kataFileMIssing}>
          <p>Selecionar Modalidade.</p>
        </div>
      ) : (
        ""
      )}
      {draw === "elimination" &&
      modality === "Individual" &&
      competitors.length === 0 ? (
        <div className={styles.compFileMIssing}>
          <p>
            Ficheiro com lista de <strong>competidores</strong> não detetado.
          </p>
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
                executeScroll(compRef);
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
      {draw === "elimination" && modality === "Equipa" && teams.length === 0 ? (
        <div className={styles.compFileMIssing}>
          <p>
            Ficheiro com lista de <strong>equipas</strong> não detetado.
          </p>
          <p>
            Selecione o ficheiro no{" "}
            <span
              className={styles.openMenu}
              onClick={() => {
                if (isMenuOpen) {
                  setBlinking((prevState) => ({
                    ...prevState,
                    team: true,
                  }));
                } else {
                  setIsMenuOpen(!isMenuOpen);
                  setBlinking((prevState) => ({
                    ...prevState,
                    team: !prevState.team,
                  }));
                }
                executeScroll(teamRef);
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
      {match !== "teamkata" && (draw === undefined || draw === "group")
        ? competitors.length === 0 && (
            <div className={styles.compFileMIssing}>
              <p>
                Ficheiro com lista de <strong>competidores</strong> não
                detetado.
              </p>
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
                    executeScroll(compRef);
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
              <p>
                Ficheiro com lista de <strong>Katas</strong> não detetado.
              </p>
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
                    executeScroll(kataRef);
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
                    });
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
