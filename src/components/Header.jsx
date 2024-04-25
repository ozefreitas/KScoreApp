import styles from "./header.module.css";
import React, { useState } from "react";

export default function Header({ match, draw, setCategory }) {
  const [isDefault, setIsDefault] = useState(true);

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

  const options = [
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

  renderMatchType();

  const handleChanche = (event) => {
    if (draw === "group" || draw === "matches") {
      setCategory(event.target.value);
      if (event.target.value !== "default") {
        setIsDefault(false);
      }
    } else if (event.target.value !== "default") {
      setIsDefault(false);
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
          ></input>
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
            isDefault ? styles.valueDefault : ""
          }`}
          onChange={handleChanche}
        >
          <option value="default" disabled>
            Selecionar Categoria
          </option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </span>
    </div>
  );
}
