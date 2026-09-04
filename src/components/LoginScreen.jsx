import { useState } from "react";
import { supabase } from "../lib/supabase";
import "./LoginScreen.css";

function LoginScreen({
  station,
  title,
  subtitle,
  onLogin,
  onBack,
  showRole = false,
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("manager");
  const [error, setError] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  const enteredId = username
    .trim()
    .replace(/\s+/g, "")
    .toUpperCase();

  if (!enteredId || !password.trim()) {
    setError("Operator ID and password are required.");
    return;
  }

  const accountMap = {
    HQ001: {
      email: "hq@polarpulse.demo",
      portal: "hq",
      station: null,
      role: "hq",
    },

    MAITRI001: {
      email: "maitri@polarpulse.demo",
      portal: "station",
      station: "Maitri",
      role: "manager",
    },

    BHARATI001: {
      email: "bharati@polarpulse.demo",
      portal: "station",
      station: "Bharati",
      role: "manager",
    },
  };

  const account = accountMap[enteredId];

  if (!account) {
    setError("Unauthorized operator ID.");
    return;
  }

  setError("");

  const { data, error: authError } =
    await supabase.auth.signInWithPassword({
      email: account.email,
      password: password,
    });

  if (authError || !data?.user) {
    setError(
      "Authentication failed. Check your operator ID and password.",
    );
    return;
  }

  onLogin({
    username: enteredId,
    role: account.role,
    portal: account.portal,
    station: account.station,
    userId: data.user.id,
  });
};

  return (
    <div className="login-screen">
      <div className="login-panel">
        <div className="login-brand">
          <span className="login-kicker">POLAR PULSE</span>

          <h1>{title || "Station Access"}</h1>

          <p>
            {subtitle ||
              "Secure operational access to Antarctic station systems."}
          </p>
        </div>

        {station && (
          <div className="login-station">
            <span>STATION</span>
            <strong>{station}</strong>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <label>
            OPERATOR ID
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter operator ID"
            />
          </label>

          <label>
            PASSWORD
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </label>

          {showRole && (
            <label>
              OPERATIONAL ROLE
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="manager">Station Manager</option>
                <option value="logistics">Logistics Officer</option>
                <option value="maintenance">Maintenance Engineer</option>
              </select>
            </label>
          )}

          {error && <div className="login-error">{error}</div>}

          <button type="submit" className="login-button">
            AUTHENTICATE
          </button>

          <button type="button" className="login-back-button" onClick={onBack}>
            ← BACK
          </button>
        </form>

        <div className="login-footer">AUTHORIZED PERSONNEL ONLY</div>
      </div>
    </div>
  );
}

export default LoginScreen;
