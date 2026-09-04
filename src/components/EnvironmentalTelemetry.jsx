import "./EnvironmentalTelemetry.css";

function EnvironmentalTelemetry({ environment = {} }) {
  const {
    temperature = "--",
    wind = "--",
    visibility = "--",
    pressure = "--",
    condition = "Unknown",
  } = environment;

  const conditionClass = condition.toLowerCase().includes("blizzard")
    ? "warn"
    : "ok";

  return (
    <section
      className="environment-telemetry"
      aria-label="Environmental telemetry"
    >
      {/* ============================================
          HEADER
      ============================================ */}

      <div className="environment-header">
        <div>
          <h2 className="section-title">Environmental Telemetry</h2>

          <p className="environment-subtitle">
            Live atmospheric conditions around the station
          </p>
        </div>

        <div className="environment-live">
          <span></span>
          LIVE TELEMETRY
        </div>
      </div>

      {/* ============================================
          TELEMETRY CARDS
      ============================================ */}

      <div className="environment-grid">
        {/* TEMPERATURE */}

        <article className="environment-card">
          <span className="environment-label">TEMPERATURE</span>

          <strong className="environment-value">{temperature}</strong>

          <span className="environment-note">Ambient station temperature</span>
        </article>

        {/* WIND */}

        <article className="environment-card">
          <span className="environment-label">WIND SPEED</span>

          <strong className="environment-value">{wind}</strong>

          <span className="environment-note">Current surface wind</span>
        </article>

        {/* VISIBILITY */}

        <article className="environment-card">
          <span className="environment-label">VISIBILITY</span>

          <strong className="environment-value">{visibility}</strong>

          <span className="environment-note">Horizontal visibility</span>
        </article>

        {/* PRESSURE */}

        <article className="environment-card">
          <span className="environment-label">PRESSURE</span>

          <strong className="environment-value">{pressure}</strong>

          <span className="environment-note">Atmospheric pressure</span>
        </article>
      </div>

      {/* ============================================
          CURRENT CONDITION
      ============================================ */}

      <div className={`environment-condition ${conditionClass}`}>
        <div className="environment-condition-left">
          <span className="environment-condition-dot"></span>

          <div>
            <span className="environment-condition-label">
              CURRENT CONDITION
            </span>

            <strong>{condition}</strong>
          </div>
        </div>

        <span className="environment-condition-status">
          {conditionClass === "warn" ? "ATTENTION" : "STABLE"}
        </span>
      </div>
    </section>
  );
}

export default EnvironmentalTelemetry;
