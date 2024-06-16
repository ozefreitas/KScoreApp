import styles from "./pontcard.module.css";

export default function PontCard({ judge, setSumScore, overline, active }) {
  const handleChange = (e) => {
    const score = parseFloat(e.target.value);
    if (e.target.value.trim() !== "") {
      setSumScore((prevSumScore) => {
        const key = judge;
        return { ...prevSumScore, [key]: score };
      });
    }
    if (isNaN(score)) {
      setSumScore((prevSumScore) => {
        const key = judge;
        const { [key]: _, ...rest } = prevSumScore;
        return rest;
      });
    }
  };

  return (
    <div className={`${styles.square} ${active ? styles.active : ""}`}>
      <input
        id={judge}
        type="number"
        className={`${styles.scores} ${overline ? styles.overline : ""}`}
        placeholder={`${active ? "" : "0.0"}`}
        onChange={handleChange}
      ></input>
    </div>
  );
}
