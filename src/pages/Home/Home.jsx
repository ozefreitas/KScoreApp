import styles from "./home.module.css";
import ReactSwitch from "react-switch";

export default function Home({ theme, toggleTheme }) {
  return (
    <div>
      <div className={styles.flexDiv}>
        <h1 className={styles.appName}>Karate Score App SKI-Portugal</h1>
        <ReactSwitch
          onChange={toggleTheme}
          checked={theme === "light"}
          className={styles.themeButton}
        ></ReactSwitch>
      </div>
      <div className={styles.centerLogo}>
        <img
          src={process.env.PUBLIC_URL + "/Karatescore_nobg500.png"}
          alt="KScoreApp Logo"
        />
        <img
          src={process.env.PUBLIC_URL + "/skip-logo.png"}
          alt="SKI-Portugal Logo"
        />
      </div>
    </div>
  );
}
