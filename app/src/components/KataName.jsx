import styles from "./kataname.module.css";
import { useState, useEffect } from "react";

export default function KataName({ id }) {
  const [katas, setKatas] = useState([]);
  const [kataAka, setKataAka] = useState("");
  const [kataShiro, setKataShiro] = useState("");

  useEffect(() => {
    const fetchKatas = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/kataname");
        if (!response.ok) {
          throw new Error("Failed to fetch katas");
        }
        const data = await response.json();
        setKatas(data);
      } catch (error) {
        console.error("Error fetching katas:", error);
      }
    };
    fetchKatas();
  });

  const handleChange = (e) => {
    katas.map((kata) => {
      if (id === "aka") {
        if (kata.kat_id === e.target.value) {
          setKataAka(kata.kata_name);
        }
      } else {
        if (kata.kat_id === e.target.value) {
          setKataShiro(kata.kata_name);
        }
      }
    });
  };

  return (
    <div className={styles.upperLayer}>
      <input
        placeholder="Kata Name"
        className={`${styles.kataName} ${
          id === "aka" ? styles.white : styles.black
        }`}
        type="text"
        onChange={handleChange}
      />
      {console.log(kataAka)}
    </div>
  );
}
