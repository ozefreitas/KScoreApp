import styles from "./akascore.module.css";

export default function AkaScore({ akaWazaari, akaIppon }) {
  return (
    <div className={styles.pointNumberContainer}>
      <input
        type="number"
        placeholder="0"
        value={parseInt(akaIppon) * 2 + parseInt(akaWazaari)}
        readOnly
      />
    </div>
  );
}
