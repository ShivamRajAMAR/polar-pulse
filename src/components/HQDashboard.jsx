import "./HQDashboard.css";
import HQStationComparison from "./HQStationComparison";

function getStatusClass(status) {
  if (status === "critical") return "critical";
  if (status === "warn") return "warn";
  return "ok";
}


  
    function HQDashboard({ data, onViewStation, onLogout }) {
  const { missionStatus, stations, alerts, timeline } = data;

  return (
    <div className="hq-dashboard">
    

      <button
        type="button"
        className="hq-logout-button"
        onClick={onLogout}
      >
        ↪ LOGOUT
      </button>
      {/* =========================
          MISSION SUMMARY
      ========================= */}

      <section className="hq-summary-grid">
        <article className="hq-summary-card">
          <span className="hq-summary-label">MISSION STATUS</span>

          <strong className="hq-summary-value status-ok-text">
            {missionStatus.overall}
          </strong>

          <small>All command systems operational</small>
        </article>

        <article className="hq-summary-card">
          <span className="hq-summary-label">STATIONS ONLINE</span>

          <strong className="hq-summary-value">
            {missionStatus.stationsOnline}
          </strong>

          <small>Antarctic research stations</small>
        </article>

        <article className="hq-summary-card">
          <span className="hq-summary-label">ACTIVE PERSONNEL</span>

          <strong className="hq-summary-value">
            {missionStatus.activePersonnel}
          </strong>

          <small>Across all stations</small>
        </article>

        <article className="hq-summary-card">
          <span className="hq-summary-label">ACTIVE ALERTS</span>

          <strong className="hq-summary-value status-warn-text">
            {missionStatus.activeAlerts}
          </strong>

          <small>Requires monitoring</small>
        </article>
      </section>

      {/* =========================
          STATION OVERVIEW
      ========================= */}

      <section className="hq-section">
        <div className="hq-section-header">
          <div>
            <h2 className="section-title">Twin Compare</h2>

            <p className="hq-section-description">
              Live operational status across Antarctic research stations
            </p>
          </div>

          <span className="hq-live-badge">
            <span></span>
            LIVE NETWORK
          </span>
        </div>

        <div className="hq-station-grid">
          {stations.map((station) => (
            <article
              key={station.id}
              className={`hq-station-card station-${station.status}`}
            >
              <div className="hq-station-top">
                <div>
                  <span className="hq-station-code">
                    {station.id === "maitri" ? "IND-01" : "IND-02"}
                  </span>

                  <h3>{station.name}</h3>

                  <p>{station.location}</p>
                </div>

                <div
                  className={`hq-station-status ${getStatusClass(
                    station.status,
                  )}`}
                >
                  <span></span>

                  {station.statusLabel}
                </div>
              </div>

              <div className="hq-station-metrics">
                <div className="hq-metric">
                  <span>Infrastructure</span>

                  <strong>{station.infrastructure}%</strong>

                  <div className="hq-progress">
                    <div
                      style={{
                        width: `${station.infrastructure}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="hq-metric">
                  <span>Logistics</span>

                  <strong>{station.logistics}%</strong>

                  <div className="hq-progress">
                    <div
                      style={{
                        width: `${station.logistics}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="hq-station-footer">
                <div>
                  <span>PERSONNEL</span>

                  <strong>{station.personnel}</strong>
                </div>

                <div>
                  <span>ALERTS</span>

                  <strong
                    className={station.alerts > 0 ? "status-warn-text" : ""}
                  >
                    {station.alerts}
                  </strong>
                </div>

                <div>
                  <span>GENERATOR</span>

                  <strong>{station.energy.generator}</strong>
                </div>
              </div>
              <button
                type="button"
                className="hq-view-station"
                onClick={() => onViewStation(station.id)}
              >
                VIEW STATION
                <span>→</span>
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* =========================
          STATION COMPARISON
      ========================= */}

      <HQStationComparison stations={stations} />

      {/* =========================
          STATION HEALTH MONITOR
      ========================= */}

      <section className="hq-section hq-health-section">
        <div className="hq-section-header">
          <div>
            <span className="hq-alert-eyebrow">SYSTEM HEALTH</span>

            <h2 className="section-title">Polar Pulse</h2>

            <p className="hq-section-description">
              Real-time operational health across all research stations
            </p>
          </div>

          <div className="hq-health-network-status">
            <span></span>
            NETWORK HEALTH
          </div>
        </div>

        <div className="hq-health-grid">
          {stations.map((station) => {
            const health = station.health;

            const healthClass =
              health.overall >= 90
                ? "ok"
                : health.overall >= 70
                  ? "warn"
                  : "critical";

            const healthLabel =
              health.overall >= 90
                ? "HEALTHY"
                : health.overall >= 70
                  ? "ATTENTION"
                  : "CRITICAL";

            return (
              <article
                key={station.id}
                className={`hq-health-card ${healthClass}`}
              >
                <div className="hq-health-card-top">
                  <div>
                    <span className="hq-health-station-code">
                      {station.id === "maitri" ? "IND-01" : "IND-02"}
                    </span>

                    <h3>{station.name}</h3>

                    <p>{station.location}</p>
                  </div>

                  <div className="hq-health-score">
                    <strong>{health.overall}%</strong>

                    <span>{healthLabel}</span>
                  </div>
                </div>

                <div className="hq-health-overall">
                  <div className="hq-health-track">
                    <div
                      style={{
                        width: `${health.overall}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="hq-health-metrics">
                  <div className="hq-health-metric">
                    <div>
                      <span>Infrastructure</span>

                      <strong>{health.infrastructure}%</strong>
                    </div>

                    <div className="hq-mini-track">
                      <div
                        style={{
                          width: `${health.infrastructure}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="hq-health-metric">
                    <div>
                      <span>Logistics</span>

                      <strong>{health.logistics}%</strong>
                    </div>

                    <div className="hq-mini-track">
                      <div
                        style={{
                          width: `${health.logistics}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="hq-health-metric">
                    <div>
                      <span>Energy</span>

                      <strong>{health.energy}%</strong>
                    </div>

                    <div className="hq-mini-track">
                      <div
                        style={{
                          width: `${health.energy}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="hq-health-metric">
                    <div>
                      <span>Environment</span>

                      <strong>{health.environment}%</strong>
                    </div>

                    <div className="hq-mini-track">
                      <div
                        style={{
                          width: `${health.environment}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="hq-health-footer">
                  <span>
                    Personnel
                    <strong>{station.personnel}</strong>
                  </span>

                  <span>
                    Active Alerts
                    <strong>{station.alerts}</strong>
                  </span>

                  <span>
                    Generator
                    <strong>{station.energy.generator}</strong>
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* =========================
          ALERTS + TIMELINE
      ========================= */}

      <section className="hq-bottom-grid">
        {/* =========================
            COMMAND ALERTS
        ========================= */}

        <div className="hq-section hq-alert-panel">
          <div className="hq-section-header">
            <div>
              <span className="hq-alert-eyebrow">PRIORITY MONITORING</span>

              <h2 className="section-title">Command Alerts</h2>

              <p className="hq-section-description">
                Combined operational alerts from all stations
              </p>
            </div>

            <div className="hq-alert-summary">
              <span className="hq-alert-summary-dot"></span>

              <strong>{alerts.length}</strong>

              <span>ACTIVE EVENTS</span>
            </div>
          </div>

          <div className="hq-alert-priority">
            <div className="priority-item critical">
              <span></span>

              <strong>
                {alerts.filter((alert) => alert.severity === "critical").length}
              </strong>

              <small>CRITICAL</small>
            </div>

            <div className="priority-item warn">
              <span></span>

              <strong>
                {alerts.filter((alert) => alert.severity === "warn").length}
              </strong>

              <small>ATTENTION</small>
            </div>

            <div className="priority-item ok">
              <span></span>

              <strong>
                {alerts.filter((alert) => alert.severity === "ok").length}
              </strong>

              <small>MONITORING</small>
            </div>
          </div>

          <div className="hq-alert-list">
            {alerts.map((alert) => (
              <article
                key={alert.id}
                className={`hq-alert-item ${getStatusClass(alert.severity)}`}
              >
                <div className="hq-alert-severity">
                  <span className="hq-alert-dot"></span>

                  <strong>
                    {alert.severity === "critical"
                      ? "CRITICAL"
                      : alert.severity === "warn"
                        ? "ATTENTION"
                        : "MONITORING"}
                  </strong>
                </div>

                <div className="hq-alert-content">
                  <div className="hq-alert-title-row">
                    <strong>{alert.title}</strong>

                    <span className="hq-alert-station">{alert.station}</span>
                  </div>

                  <p>
                    {alert.category} · {alert.status}
                  </p>
                </div>

                <time>{alert.time}</time>
              </article>
            ))}
          </div>

          {alerts.length === 0 && (
            <div className="hq-alert-empty">No active command alerts.</div>
          )}
        </div>

        {/* =========================
            OPERATIONS TIMELINE
        ========================= */}

        <div className="hq-section hq-timeline-panel">
          <div className="hq-section-header">
            <div>
              <h2 className="section-title">Operations Timeline</h2>

              <p className="hq-section-description">Recent station events</p>
            </div>
          </div>

          <div className="hq-timeline">
            {timeline.map((item) => (
              <article
                key={item.id}
                className={`hq-timeline-item ${getStatusClass(item.type)}`}
              >
                <div className="hq-timeline-time">{item.time}</div>

                <div className="hq-timeline-marker">
                  <span></span>
                </div>

                <div className="hq-timeline-content">
                  <div className="hq-timeline-event-row">
                    <strong>{item.event}</strong>

                    <span className="hq-timeline-station">{item.station}</span>
                  </div>

                  <span className="hq-timeline-detail">{item.detail}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================
          HQ COMMAND FOOTER
      ========================= */}

      <section className="hq-command-footer">
        <div>
          <span className="hq-command-footer-dot"></span>

          <strong>HQ COMMAND NETWORK CONNECTED</strong>
        </div>

        <span>
          Monitoring {missionStatus.stationsOnline} Antarctic stations
        </span>
      </section>
    </div>
  );
}

export default HQDashboard;
