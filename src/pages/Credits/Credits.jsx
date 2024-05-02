import styles from "./credits.module.css";

export default function Credits() {
  return (
    <div className={styles.creditsContainer}>
      <h1>Design</h1>
      <p>Andreia Rodrigues</p>
      <h1>Desenvolvimento</h1>
      <p>José Freitas</p>
      <h1>Ideia e apoio</h1>
      <p>Sensei Sónia Marinho</p>
    </div>
  );
}
