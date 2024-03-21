import styles from "./home.module.css";

export default function Home() {
  return (
    <div>
      <h1 className={styles.appName}>Karate Score App SKI-Portugal</h1>
      <div className={styles.centerLogo}>
        <img src="/Karatescore_nobg500.png" alt="KScoreApp Logo" />
      </div>
    </div>
  );
}
