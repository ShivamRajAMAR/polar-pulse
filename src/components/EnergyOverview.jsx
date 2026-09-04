import "./EnergyOverview.css";

function EnergyOverview({ energy = [] }) {
  const getValue = (label) => {
    const item = energy.find(
      (entry) => entry.label?.toLowerCase() === label.toLowerCase(),
    );

    return item?.value || "--";
  };

  const solar = getValue("Solar");
  const battery = getValue("Battery");
  const generator = getValue("Generator");
  const powerLoad = getValue("Power Load");

  const batteryNumber = parseInt(battery, 10) || 0;
  const solarNumber = parseInt(solar, 10) || 0;

  return (
    <section className="energy-overview">
      <div className="energy-header">
        <div>
          <span className="energy-eyebrow">POWER SYSTEMS</span>

          <h2 className="section-title">Energy Operations</h2>

          <p className="energy-subtitle">
            Live station power generation, storage and load status
          </p>
        </div>

        <div className="energy-live">
          <span></span>
          LIVE TELEMETRY
        </div>
      </div>

      <div className="energy-grid">
        {/* SOLAR */}

        <article className="energy-card">
          <div className="energy-card-top">
            <div>
              <span className="energy-label">SOLAR GENERATION</span>

              <h3>{solar}</h3>
            </div>

            <span className="energy-icon">☀</span>
          </div>

          <div className="energy-meter">
            <div
              className="energy-meter-fill"
              style={{
                width: `${solarNumber}%`,
              }}
            ></div>
          </div>

          <p>Current solar power contribution</p>
        </article>

        {/* BATTERY */}

        <article className="energy-card">
          <div className="energy-card-top">
            <div>
              <span className="energy-label">BATTERY STORAGE</span>

              <h3>{battery}</h3>
            </div>

            <span className="energy-icon">▰</span>
          </div>

          <div className="energy-meter">
            <div
              className="energy-meter-fill"
              style={{
                width: `${batteryNumber}%`,
              }}
            ></div>
          </div>

          <p>Stored station energy reserve</p>
        </article>

        {/* GENERATOR */}

        <article
          className={`energy-card ${
            generator === "ON" ? "energy-warning" : ""
          }`}
        >
          <div className="energy-card-top">
            <div>
              <span className="energy-label">BACKUP GENERATOR</span>

              <h3>{generator}</h3>
            </div>

            <span className="energy-status-dot"></span>
          </div>

          <div className="energy-status-line">
            <span
              className={
                generator === "ON" ? "status-warning" : "status-normal"
              }
            >
              {generator === "ON" ? "BACKUP POWER ACTIVE" : "STANDBY"}
            </span>
          </div>

          <p>Emergency generation system</p>
        </article>

        {/* POWER LOAD */}

        <article className="energy-card">
          <div className="energy-card-top">
            <div>
              <span className="energy-label">POWER LOAD</span>

              <h3>{powerLoad}</h3>
            </div>

            <span className="energy-icon">⚡</span>
          </div>

          <div className="energy-load-bars">
            <span className="load-bar active"></span>
            <span className="load-bar active"></span>
            <span className="load-bar active"></span>
            <span
              className={
                powerLoad === "Elevated" ? "load-bar active" : "load-bar"
              }
            ></span>
            <span className="load-bar"></span>
          </div>

          <p>Current station consumption level</p>
        </article>
      </div>

      {/* SYSTEM SUMMARY */}

      <div className="energy-summary">
        <div>
          <span>SYSTEM STATE</span>
          <strong>
            {generator === "ON" ? "BACKUP SUPPORTED" : "SOLAR PRIMARY"}
          </strong>
        </div>

        <div>
          <span>BATTERY RESERVE</span>
          <strong>{battery}</strong>
        </div>

        <div>
          <span>GENERATOR</span>
          <strong>{generator}</strong>
        </div>

        <div>
          <span>LOAD CONDITION</span>
          <strong>{powerLoad}</strong>
        </div>
      </div>
    </section>
  );
}

export default EnergyOverview;
