import styles from "./header.module.css";
import React from "react";

export default function Header({ match }) {
  let matchType;
  const renderMatchType = () => {
    if (match === "teamkata") {
      matchType = "Kata Equipa ";
    } else if (match === "kumite") {
      matchType = "Kumite ";
    } else if (match === "teamkumite") {
      matchType = "Kumite Equipa ";
    } else {
      matchType = "Kata ";
    }
    return matchType;
  };

  const options = [
    "Infantil Masculino",
    "Infantial Feminino",
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

  return (
    <div className={styles.headerSpacing}>
      <span className={styles.tatamiText}>
        Tatami{" "}
        <input
          className={styles.tatamiInput}
          type="number"
          placeholder="0"
        ></input>
      </span>
      <span className={`${styles.kataText} ${styles[match]}`}>
        {matchType}
        <select id="categoryList" name="categoryList" className={styles.categoryInput}>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        {/* <input
          type="text"
          className={styles.categoryInput}
          placeholder="Category"
        ></input> */}
      </span>
    </div>
  );
}
