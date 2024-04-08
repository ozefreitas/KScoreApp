import styles from "./shiroscore.module.css";

export default function ShiroScore({shiroWazaari, shiroIppon}) {
  return (
    <div className={styles.pointNumberContainer}>
      <input
        type="number"
        placeholder="0"
        value={parseInt(shiroIppon) * 2 + parseInt(shiroWazaari)}
        readOnly
      />
    </div>
  );
}
