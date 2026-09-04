import "./EnvironmentOverview.css";

function EnvironmentOverview({ environment }) {
  if (!environment) return null;

  const isStable = environment.condition?.toLowerCase() === "stable";

  const telemetry = [
    {
      label: "TEMPERATURE",
      value: environment.temperature,
      unit: "AIR TEMP",
    },
    {
      label: "WIND SPEED",
      value: environment.wind,
      unit: "SURFACE WIND",
    },
    {
      label: "VISIBILITY",
      value: environment.visibility,
      unit: "VISUAL RANGE",
    },
    {
      label: "PRESSURE",
      value: environment.pressure,
      unit: "ATMOSPHERIC",
    },
  ];

  return (
    <div className="environment-overview">
      <div className="environment-header">
        <div>
          <span className="environment-kicker">ENVIRONMENTAL TELEMETRY</span>

          <h2>Environmental Conditions</h2>

          <p>Live atmospheric conditions around the station</p>
        </div>

        <div
          className={`environment-condition ${isStable ? "stable" : "warning"}`}
        >
          <span />
          {environment.condition?.toUpperCase()}
        </div>
      </div>

      <div className={`environment-banner ${isStable ? "stable" : "warning"}`}>
        <div className="environment-banner-icon">{isStable ? "✓" : "!"}</div>

        <div>
          <strong>
            {isStable
              ? "ENVIRONMENTAL CONDITIONS NOMINAL"
              : "WEATHER CONDITION REQUIRES ATTENTION"}
          </strong>

          <p>
            {isStable
              ? "Current atmospheric readings remain within expected operational parameters."
              : "Current weather may affect field operations, logistics and external station activity."}
          </p>
        </div>
      </div>

      <div className="environment-grid">
        {telemetry.map((item, index) => (
          <div className="environment-card" key={item.label}>
            <div className="environment-card-top">
              <span>ENV-{String(index + 1).padStart(2, "0")}</span>

              <span className="environment-live-dot">LIVE</span>
            </div>

            <div className="environment-label">{item.label}</div>

            <div className="environment-value">{item.value}</div>

            <div className="environment-unit">{item.unit}</div>
          </div>
        ))}
      </div>

      <div className="environment-footer">
        <span>TELEMETRY SOURCE: STATION WEATHER SYSTEM</span>

        <span>UPDATE MODE: REAL-TIME</span>
      </div>
    </div>
  );
}

export default EnvironmentOverview;
