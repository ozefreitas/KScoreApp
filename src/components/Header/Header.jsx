import { useEffect } from "react";
import styles from "./header.module.css";

export default function Header({
  match,
  tatami,
  setTatami,
  draw,
  category,
  setCategory,
  modality,
  setModality,
  isDefault,
  setIsDefault,
  matchType,
  setMatchType,
  kataOrKihon,
  setKataOrKihon,
}) {
  useEffect(() => {
    function selectElement(id, valueToSelect) {
      let element = document.getElementById(id);
      element.value = valueToSelect;
    }
    if (draw === "group" || draw === "elimination" || draw === "matches") {
      selectElement("categoryList", category);
    }
  }, [category]);

  let matchTypeSpan;
  const matchTypesSpan = ["kata", "teamkata", "kumite", "teamkumite", "kihon"];
  const renderMatchTypeSpan = () => {
    if (match === matchTypesSpan[0]) {
      matchTypeSpan = "Kata ";
    } else if (match === matchTypesSpan[1]) {
      matchTypeSpan = "Kata Equipa / Kihon ";
    } else if (match === matchTypesSpan[2]) {
      matchTypeSpan = "Kumite ";
    } else if (match === matchTypesSpan[3]) {
      matchTypeSpan = "Kumite Equipa ";
    } else if (match === matchTypesSpan[4]) {
      matchTypeSpan = "Kihon ";
    } else {
      matchTypeSpan = "Escalão ";
    }
    return matchTypeSpan;
  };

  const options = {
    indivkata: [
      "Infantil Masculino",
      "Infantil Feminino",
      "Iniciado Masculino",
      "Iniciado Feminino",
      "Juvenil Masculino",
      "Juvenil Feminino",
      "Cadete Masculino",
      "Cadete Feminino",
      "Júnior Masculino",
      "Júnior Feminino",
      "Sénior Masculino",
      "Sénior Feminino",
      "Veterano +40 Masculino",
      "Veterano +40 Feminino",
      "Veterano +50 Masculino",
      "Veterano +50 Feminino",
    ],
    indivkumite: [
      "Juvenil Masculino -50Kg",
      "Juvenil Masculino +50Kg",
      "Juvenil Feminino",
      "Cadete Masculino -60Kg",
      "Cadete Masculino +60Kg",
      "Cadete Feminino",
      "Júnior Masculino -65Kg",
      "Júnior Masculino +65Kg",
      "Júnior Feminino",
      "Sénior Masculino -70Kg",
      "Sénior Masculino +70Kg",
      "Sénior Feminino",
      "Veterano +40 Masculino",
      "Veterano +40 Feminino",
      "Veterano +50 Masculino",
      "Veterano +50 Feminino",
    ],
    teamkata: [
      "Infantil Misto",
      "Iniciado Misto",
      "Juvenil Misto",
      "Cadete Masculino",
      "Cadete Feminino",
      "Júnior Masculino",
      "Júnior Feminino",
      "Sénior Masculino",
      "Sénior Feminino",
      "Veterano +40A Misto",
      "Veterano +50A Misto",
    ],
    teamkumite: [
      "Infantil Misto",
      "Iniciado Misto",
      "Juvenil Masculino",
      "Juvenil Feminino",
      "Cadete Masculino",
      "Cadete Feminino",
      "Júnior Masculino",
      "Júnior Feminino",
      "Sénior Masculino",
      "Sénior Feminino",
      "Veterano +40A Misto",
      "Veterano +50A Misto",
    ],
  };

  renderMatchTypeSpan();

  const handleCategoryChange = (event) => {
    if (draw === "group" || draw === "matches" || draw === "elimination") {
      setCategory(event.target.value);
      if (event.target.value !== "default") {
        setIsDefault((prevState) => ({ ...prevState, category: false }));
      } else {
        setIsDefault((prevState) => ({ ...prevState, category: true }));
      }
    } else if (event.target.value !== "default") {
      setIsDefault((prevState) => ({ ...prevState, category: false }));
    } else if (event.target.value === "default") {
      setIsDefault((prevState) => ({ ...prevState, category: true }));
    }
  };

  const handleModChange = (event) => {
    setCategory("default");
    setIsDefault((prevState) => ({ ...prevState, category: true }));
    setModality(event.target.value);
    if (event.target.value !== "default") {
      setIsDefault((prevState) => ({ ...prevState, modality: false }));
    } else {
      setIsDefault((prevState) => ({ ...prevState, modality: true }));
    }
  };

  const handleTypeChange = (event) => {
    setCategory("default");
    setIsDefault((prevState) => ({ ...prevState, category: true }));
    setMatchType(event.target.value);
    if (event.target.value !== "default") {
      setIsDefault((prevState) => ({ ...prevState, matchtype: false }));
    } else {
      setIsDefault((prevState) => ({ ...prevState, matchtype: true }));
    }
  };

  return (
    <div className={`${styles.headerSpacing} ${styles[draw]}`}>
      {matchTypeSpan !== "Escalão " ? (
        <span className={styles.tatamiText}>
          Tatami{" "}
          <input
            className={styles.tatamiInput}
            type="number"
            placeholder="0"
            min="0"
            max="3"
            value={tatami}
            onChange={(event) => setTatami(event.target.value)}
          ></input>
        </span>
      ) : (
        ""
      )}
      {matchTypeSpan === "Escalão " && draw === "elimination" ? (
        <span className={styles.modText}>
          Modalidade{" "}
          <select
            id="modList"
            name="modList"
            defaultValue="default"
            className={`${styles.modInput} ${
              isDefault.modality ? styles.valueDefault : ""
            }`}
            onChange={handleModChange}
          >
            <option value="default">Selecionar</option>
            <option value="Individual">Individual</option>
            <option value="Equipa">Equipa</option>
          </select>
        </span>
      ) : (
        ""
      )}
      <span className={`${styles.kataText} ${styles[match]}`}>
        <span
          style={{ cursor: "pointer" }}
          onClick={() =>
            match === "teamkata"
              ? setKataOrKihon((prevKataOrKihon) =>
                  prevKataOrKihon === "Kihon Finais "
                    ? "Kata Equipa "
                    : "Kihon Finais "
                )
              : ""
          }
        >
          {match === "teamkata" ? kataOrKihon : matchTypeSpan}
        </span>
        <select
          id="categoryList"
          name="categoryList"
          defaultValue="default"
          className={`${styles.categoryInput} ${
            isDefault.category ? styles.valueDefault : ""
          }`}
          onChange={handleCategoryChange}
        >
          <option value="default">Selecionar Categoria</option>
          {modality === "Individual" || modality === undefined
            ? matchType === "Kata"
              ? options.indivkata.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))
              : options.indivkumite.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))
            : modality === "Equipa" &&
              (match === "teamkata" ||
                match === "kihon" ||
                matchType === "Kata")
            ? options.teamkata.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))
            : modality === "Equipa" &&
              (match === "teamkumite" || matchType === "Kumite")
            ? options.teamkumite.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))
            : options.teamkata.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
        </select>
      </span>
      {matchTypeSpan === "Escalão " &&
      (draw === "elimination" || draw === "group") ? (
        <span
          className={`${styles.matchTypeText} ${
            draw === "group" ? styles.noTopMargin : ""
          }`}
        >
          Tipo{" "}
          <select
            id="typeList"
            name="typeList"
            defaultValue="default"
            className={`${styles.typeInput} ${
              isDefault.matchtype ? styles.valueDefault : ""
            }`}
            onChange={handleTypeChange}
          >
            <option value="default">Selecionar</option>
            <option value="Kata">Kata</option>
            <option value="Kumite">Kumite</option>
          </select>
        </span>
      ) : (
        ""
      )}
    </div>
  );
}
