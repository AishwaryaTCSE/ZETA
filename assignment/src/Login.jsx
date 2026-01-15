import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setToken("");

    try {
      const response = await fetch(
        "https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        setMessage("✅ Login successful!");
      } else {
        setMessage("❌ Invalid email or password");
      }
    } catch (error) {
      setMessage("⚠️ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>User Login</h2>

      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {message && <p>{message}</p>}

      {token && (
        <div style={styles.tokenBox}>
          <strong>Auth Token:</strong>
          <p>{token}</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    width: "300px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    textAlign: "center"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  input: {
    padding: "8px",
    fontSize: "14px"
  },
  button: {
    padding: "10px",
    cursor: "pointer"
  },
  tokenBox: {
    marginTop: "15px",
    wordBreak: "break-all",
    backgroundColor: "#f4f4f4",
    padding: "10px",
    borderRadius: "5px"
  }
};

export default Login;
