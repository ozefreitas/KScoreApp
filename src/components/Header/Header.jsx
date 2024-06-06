import { useEffect } from "react";
import styles from "./header.module.css";

export default function Header({
  match,
  draw,
  category,
  setCategory,
  modality,
  setModality,
  isDefault,
  setIsDefault,
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

  let matchType;
  const matchTypes = ["kata", "teamkata", "kumite", "teamkumite"];
  const renderMatchType = () => {
    if (match === matchTypes[0]) {
      matchType = "Kata ";
    } else if (match === matchTypes[1]) {
      matchType = "Kata Equipa ";
    } else if (match === matchTypes[2]) {
      matchType = "Kumite ";
    } else if (match === matchTypes[3]) {
      matchType = "Kumite Equipa ";
    } else {
      matchType = "Escalão ";
    }
    return matchType;
  };

  const optionsIndiv = [
    "Infantil Masculino",
    "Infantil Feminino",
    "Iniciado Masculino",
    "Iniciado Feminino",
    "Juvenil Masculino",
    "Juvenil Feminino",
    "Juvenil Masculino -50Kg",
    "Juvenil Masculino +50Kg",
    "Juvenil Feminino -Kumite",
    "Cadete Masculino",
    "Cadete Feminino",
    "Cadete Masculino -60Kg",
    "Cadete Masculino +60Kg",
    "Cadete Feminino -Kumite",
    "Júnior Masculino",
    "Júnior Feminino",
    "Júnior Masculino -65Kg",
    "Júnior Masculino +65Kg",
    "Júnior Feminino -Kumite",
    "Sénior Masculino",
    "Sénior Feminino",
    "Sénior Masculino -70Kg",
    "Sénior Masculino +70Kg",
    "Sénior Feminino -Kumite",
    "Veterano +40A Masculino",
    "Veterano +40A Feminino",
    "Veterano +40A Masculino -Kumite",
    "Veterano +40A Feminino -Kumite",
    "Veterano +50A Masculino",
    "Veterano +50A Feminino",
    "Veterano +50A Masculino -Kumite",
    "Veterano +50A Feminino -Kumite",
  ];

  const optionsTeam = [
    "Infantil Masculino - Kata",
    "Infantil Masculino - Kumite",
    "Infantil Feminino - Kata",
    "Infantil Feminino - Kumite",
    "Iniciado Masculino - Kata",
    "Iniciado Masculino - Kumite",
    "Iniciado Feminino - Kata",
    "Iniciado Feminino - Kumite",
    "Juvenil Masculino - Kata",
    "Juvenil Masculino - Kumite",
    "Juvenil Feminino - Kata",
    "Juvenil Feminino - Kumite",
    "Cadete Masculino - Kata",
    "Cadete Masculino - Kumite",
    "Cadete Feminino - Kata",
    "Cadete Feminino - Kumite",
    "Júnior Masculino - Kata",
    "Júnior Masculino - Kumite",
    "Júnior Feminino - Kata",
    "Júnior Feminino - Kumite",
    "Sénior Masculino - Kata",
    "Sénior Masculino - Kumite",
    "Sénior Feminino - Kata",
    "Sénior Feminino - Kumite",
    "Veterano +40A Misto - Kata",
    "Veterano +40A Misto - Kumite",
    "Veterano +50A Misto - Kata",
    "Veterano +50A Misto - Kumite",
  ];

  renderMatchType();

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
    setModality(event.target.value);
    if (event.target.value !== "default") {
      setIsDefault((prevState) => ({ ...prevState, modality: false }));
    } else {
      setIsDefault((prevState) => ({ ...prevState, modality: true }));
    }
  };

  return (
    <div className={`${styles.headerSpacing} ${styles[draw]}`}>
      {matchType !== "Escalão " ? (
        <span className={styles.tatamiText}>
          Tatami{" "}
          <input
            className={styles.tatamiInput}
            type="number"
            placeholder="0"
            min="0"
            max="3"
          ></input>
        </span>
      ) : (
        ""
      )}
      {matchType === "Escalão " && draw === "elimination" ? (
        <span className={styles.tatamiText}>
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
        {matchType}
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
            ? optionsIndiv.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))
            : optionsTeam.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
        </select>
      </span>
    </div>
  );
}
