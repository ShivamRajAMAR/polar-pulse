import "./StationHealth.css";

function StationHealth({ health, station }) {
  if (!health) return null;

  const overall = health.overall ?? 0;

  const getState = (value) => {
    if (value < 60) return "critical";
    if (value < 80) return "warn";
    return "ok";
  };

  const systems = [
    {
      label: "Power",
      value: health.power ?? 0,
    },
    {
      label: "Heating",
      value: health.heating ?? 0,
    },
    {
      label: "Communication",
      value: health.communication ?? 0,
    },
    {
      label: "Life Support",
      value: health.lifeSupport ?? 0,
    },
  ];

  const overallState =
    overall < 60 ? "CRITICAL" : overall < 80 ? "ATTENTION" : "NOMINAL";

  return (
    <div className="station-health">
      <div className="station-health-header">
        <div>
          <span className="station-health-kicker">SYSTEM INTEGRITY</span>

          <h2>Station Health</h2>

          <p>Operational health across critical station systems</p>
        </div>

        <div className={`health-state ${getState(overall)}`}>
          <span />
          {overallState}
        </div>
      </div>

      <div className="health-main">
        <div className="overall-health">
          <div
            className="health-ring"
            style={{
              "--health-progress": `${overall}%`,
            }}
          >
            <div className="health-ring-inner">
              <strong>{overall}</strong>
              <span>%</span>
            </div>
          </div>

          <div className="overall-health-text">
            <span>OVERALL STATION HEALTH</span>

            <p>
              {overall >= 90
                ? "All critical systems operating within nominal parameters."
                : overall >= 75
                  ? "Station is operational with systems requiring monitoring."
                  : "Station requires immediate operational attention."}
            </p>
          </div>
        </div>

        <div className="health-systems">
          {systems.map((system) => {
            const state = getState(system.value);

            return (
              <div className={`health-system ${state}`} key={system.label}>
                <div className="health-system-top">
                  <span>{system.label}</span>

                  <strong>{system.value}%</strong>
                </div>

                <div className="health-progress">
                  <span
                    style={{
                      width: `${Math.min(Math.max(system.value, 0), 100)}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="station-health-footer">
        <span>MONITORING: {systems.length} CRITICAL SYSTEMS</span>

        <span>STATION: {station?.name?.toUpperCase() || "UNKNOWN"}</span>
      </div>
    </div>
  );
}

export default StationHealth;
