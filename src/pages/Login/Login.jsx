import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";

export default function Login({ isPinRight, setIsPinRight }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [numberAttempts, setNumberAttempts] = useState(0);

  const navigate = useNavigate();
  const login_pin = "1234";
  const handleChange = (event) => {
    setPin(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (pin === login_pin) {
      console.log("Login Successful");
      setIsPinRight(true);
      setError("");
      navigate("/home");
    } else {
      setNumberAttempts(numberAttempts + 1);
      if (numberAttempts < 3) {
        setError(`PIN Incorreto. ${3 - numberAttempts} tentativas restantes.`);
        document.getElementById("login_form").reset();
      } else {
				setError('Número máximo de tentativas alcançado. \nAplicação está agora BLOQUEADA!\n Chamar administrador.');
      }

    }
  };
  return (
    <div className={styles.flexDiv}>
      {isPinRight ? (
        ""
      ) : (
        <div className={styles.loginDiv}>
          <h2>Login Page</h2>
          <form id="login_form" className={styles.loginForm} onSubmit={handleSubmit}>
            <label className={styles.labelPin}>Enter PIN:</label>
            <input
              type="password"
							className={styles.inputPin}
              value={pin}
              onChange={handleChange}
              maxLength={4} // Limit the input to 4 characters
            />
            <button className={styles.loginButton} type="submit">Login</button>
            {error && <p style={{ color: "red", fontSize: "1.5vw", whiteSpace: 'pre-line' }}>{error}</p>}
          </form>
        </div>
      )}
    </div>
  );
}
