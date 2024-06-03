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
    selectElement("categoryList", category);
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
    "Juvenil Masculino -47Kg",
    "Juvenil Masculino +47Kg",
    "Juvenil Feminino -47Kg",
    "Juvenil Feminino +47Kg",
    "Cadete Masculino",
    "Cadete Feminino",
    "Cadete Masculino -57Kg",
    "Cadete Masculino +57Kg",
    "Cadete Feminino -57Kg",
    "Cadete Feminino +57Kg",
    "Júnior Masculino",
    "Júnior Feminino",
    "Júnior Masculino -65Kg",
    "Júnior Masculino +65Kg",
    "Júnior Feminino -65Kg",
    "Júnior Feminino +65Kg",
    "Sénior Masculino",
    "Sénior Feminino",
    "Sénior Masculino -75Kg",
    "Sénior Masculino +75Kg",
    "Sénior Feminino -75Kg",
    "Sénior Feminino +75Kg",
    "Veterano +35A Masculino",
    "Veterano +35A Feminino",
    "Veterano +35A Masculino -75Kg",
    "Veterano +35A Masculino +75Kg",
    "Veterano +35A Feminino -75Kg",
    "Veterano +35A Feminino +75Kg",
    "Veterano +35B Masculino",
    "Veterano +35B Feminino",
    "Veterano +35B Masculino -75Kg",
    "Veterano +35B Masculino +75Kg",
    "Veterano +35B Feminino -75Kg",
    "Veterano +35B Feminino +75Kg",
    "Veterano +50A Masculino",
    "Veterano +50A Feminino",
    "Veterano +50A Masculino -75Kg",
    "Veterano +50A Masculino +75Kg",
    "Veterano +50A Feminino -75Kg",
    "Veterano +50A Feminino +75Kg",
  ];

  const optionsTeam = [
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
    "Veterano +35A Masculino",
    "Veterano +35A Feminino",
    "Veterano +35B Masculino",
    "Veterano +35B Feminino",
    "Veterano +50A Masculino",
    "Veterano +50A Feminino",
  ];

  renderMatchType();

  const handleCategoryChanche = (event) => {
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

  const handleModChanche = (event) => {
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
            onChange={handleModChanche}
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
          onChange={handleCategoryChanche}
        >
          <option value="default">Selecionar Categoria</option>
          {modality === "Individual"
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
