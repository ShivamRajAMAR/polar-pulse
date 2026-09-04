import calculateDigitalTwin from "../data/digitalTwinLogic";
import "./DigitalTwinStatus.css";

function DigitalTwinStatus({ station }) {
  const twin = calculateDigitalTwin(station);

  const stateClass =
    twin.overallState === "CRITICAL"
      ? "critical"
      : twin.overallState === "ATTENTION"
        ? "warn"
        : "ok";

  return (
    <section className="digital-twin-status">
      <div className="digital-twin-header">
        <div>
          <span className="digital-twin-kicker">DIGITAL TWIN INTELLIGENCE</span>

          <h2>Operational Risk Analysis</h2>

          <p>
            Automated analysis of station telemetry, infrastructure, resources
            and environmental conditions.
          </p>
        </div>

        <div className={`digital-twin-state ${stateClass}`}>
          <span />
          {twin.overallState}
        </div>
      </div>

      <div className="digital-twin-summary">
        <div className="twin-score">
          <span>RISK SCORE</span>

          <strong>{twin.riskScore}</strong>

          <small>/ 100</small>
        </div>

        <div className="twin-summary-item">
          <span>CRITICAL RISKS</span>
          <strong>{twin.criticalCount}</strong>
        </div>

        <div className="twin-summary-item">
          <span>WARNINGS</span>
          <strong>{twin.warningCount}</strong>
        </div>

        <div className="twin-summary-item">
          <span>ANALYSIS MODE</span>
          <strong>LIVE</strong>
        </div>
      </div>

      {twin.risks.length === 0 ? (
        <div className="twin-no-risk">
          <span>✓</span>

          <div>
            <strong>NO SIGNIFICANT RISKS DETECTED</strong>
            <p>
              Current station telemetry remains within expected operational
              parameters.
            </p>
          </div>
        </div>
      ) : (
        <div className="twin-risk-list">
          {twin.risks.slice(0, 5).map((risk) => (
            <div className={`twin-risk ${risk.severity}`} key={risk.id}>
              <div className="twin-risk-indicator">
                {risk.severity === "critical" ? "!" : "△"}
              </div>

              <div className="twin-risk-content">
                <div className="twin-risk-top">
                  <strong>{risk.title}</strong>

                  <span>{risk.severity.toUpperCase()}</span>
                </div>

                <p>{risk.message}</p>

                <small>RECOMMENDED ACTION: {risk.action}</small>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="digital-twin-footer">
        <span>ANALYSIS: MULTI-SYSTEM TELEMETRY CORRELATION</span>

        <span>STATION: {station?.name?.toUpperCase() || "UNKNOWN"}</span>
      </div>
    </section>
  );
}

export default DigitalTwinStatus;
