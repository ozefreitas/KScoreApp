import Header from "../../components/Header";
import AkaInfo from "./AkaInfo/AkaInfo";
import KumiteCompCard from "./KumiteCompCard/KumiteCompCard";
import ShiroInfo from "./ShiroInfo/ShiroInfo";
import Time from "./Time/Time";
import styles from "./kumite.module.css";

export default function Kumite({ competitors }) {
  return (
    <div>
      <Header match="kumite"></Header>
      <KumiteCompCard competitors={competitors}></KumiteCompCard>
      <div className={styles.kumiteInfoMainContainer}>
        <AkaInfo></AkaInfo>
        <Time></Time>
        <ShiroInfo></ShiroInfo>
      </div>
    </div>
  );
}
