import "./MissionOverview.css";

function MissionOverview({ station }) {
  if (!station) return null;

  const overallHealth = station.health?.overall ?? 0;

  const systemState =
    overallHealth >= 90
      ? "NOMINAL"
      : overallHealth >= 75
        ? "ATTENTION"
        : "CRITICAL";

  return (
    <div className="mission-overview">
      <div className="mission-overview-header">
        <div>
          <span className="mission-kicker">STATION COMMAND</span>
          <h2>Mission Overview</h2>
          <p>Live operational status of {station.name} Research Station.</p>
        </div>

        <div className={`mission-state ${systemState.toLowerCase()}`}>
          <span className="mission-state-dot" />
          {systemState}
        </div>
      </div>

      <div className="mission-overview-grid">
        <div className="mission-summary">
          <span className="summary-label">STATION HEALTH</span>

          <div className="health-score">
            <strong>{overallHealth}</strong>
            <span>%</span>
          </div>

          <div className="health-bar">
            <span style={{ width: `${overallHealth}%` }} />
          </div>

          <p>Overall infrastructure and operational health</p>
        </div>

        <div className="mission-info">
          <div className="mission-info-row">
            <span>PERSONNEL</span>
            <strong>
              {station.personnel?.onStation ?? 0}/
              {station.personnel?.total ?? 0}
            </strong>
          </div>

          <div className="mission-info-row">
            <span>FIELD TEAMS</span>
            <strong>{station.personnel?.field ?? 0}</strong>
          </div>

          <div className="mission-info-row">
            <span>OFF DUTY</span>
            <strong>{station.personnel?.offDuty ?? 0}</strong>
          </div>

          <div className="mission-info-row">
            <span>ENVIRONMENT</span>
            <strong>{station.environment?.condition ?? "Unknown"}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MissionOverview;
