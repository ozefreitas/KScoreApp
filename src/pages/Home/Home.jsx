import styles from "./home.module.css";
import ReactSwitch from "react-switch";
import { ReactComponent as Sun } from "../../assets/images/Sun.svg";
import { ReactComponent as Moon } from "../../assets/images/Moon.svg";

export default function Home({ theme, setTheme, toggleTheme }) {
  return (
    <div>
      <div className={styles.flexDiv}></div>
      <div className={styles.absoluteDiv}>
        <div onClick={() => setTheme("light")}>
          <label htmlFor="themeButton" className={styles.toogleButton}>
            <Moon className={styles.moon}></Moon>
          </label>
        </div>
        <ReactSwitch
          id="themeButton"
          onChange={toggleTheme}
          checked={theme === "light"}
          className={styles.themeButton}
          uncheckedIcon={false}
          checkedIcon={false}
          onHandleColor="#272727"
          onColor="#bf0303"
        ></ReactSwitch>
        <div onClick={() => setTheme("dark")}>
          <label htmlFor="themeButton" className={styles.toogleButton}>
            <Sun className={styles.sun}></Sun>
          </label>
        </div>
      </div>
      <div className={styles.centerLogo}>
        <img
          width={600}
          height={600}
          src={
            process.env.PUBLIC_URL + "/FightTecVision-font-white-removebg.png"
          }
          alt="KScoreApp Logo"
        />
        <img
          width={200}
          height={200}
          src={process.env.PUBLIC_URL + "/skip-logo.png"}
          alt="SKI-Portugal Logo"
        />
      </div>
    </div>
  );
}
