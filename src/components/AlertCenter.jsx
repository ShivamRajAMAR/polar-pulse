import { useState } from "react";
import "./AlertCenter.css";

function AlertCenter({ station, userRole, fuelForecast }) {
  console.log("ALERT FUEL FORECAST:", fuelForecast);
  const role = userRole?.role || "manager";

  const canAcknowledge = role === "manager" || role === "maintenance";

  const buildAlerts = () => {
    const generated = [];
        if (
      fuelForecast?.riskLevel === "CRITICAL" ||
      fuelForecast?.riskLevel === "WARNING"
    ) {
      generated.push({
        id: "fuel-risk",
        title:
          fuelForecast.riskLevel === "CRITICAL"
            ? "Fuel Resupply Risk"
            : "Fuel Margin Low",
        description: fuelForecast.riskMessage,
        system: "Logistics / Digital Twin",
        time: "Active",
        level:
          fuelForecast.riskLevel === "CRITICAL"
            ? "critical"
            : "warn",
        status: "Active",
      });
    }

    const powerRoom = station?.infraSystems?.find(
      (system) => system.name === "Power Room",
    );

    const spareParts = station?.resourcesPercent?.find(
      (resource) => resource.name === "Spare Parts",
    );

    if (powerRoom?.status === "warn") {
      generated.push({
        id: "power-room",
        title: "Power Room Requires Attention",
        description:
          "Power room requires operational review. Current power conditions may affect station systems.",
        system: "Infrastructure",
        time: "Active",
        level: "critical",
        status: "Active",
      });
    }

    if (
      station?.environment?.condition &&
      station.environment.condition.toLowerCase() !== "stable"
    ) {
      generated.push({
        id: "weather",
        title: station.environment.condition,
        description:
          "Current environmental conditions may affect field operations, logistics and external station activity.",
        system: "Environment",
        time: "Active",
        level: "critical",
        status: "Active",
      });
    }

    if (spareParts && spareParts.percent < 70) {
      generated.push({
        id: "spare-parts",
        title: "Spare Parts Stock Low",
        description:
          "Spare parts inventory has fallen below the recommended operational reserve.",
        system: "Logistics",
        time: "Active",
        level: "warn",
        status: "Active",
      });
    }

    if (
      station?.energy?.some(
        (item) => item.label === "Generator" && item.value === "ON",
      )
    ) {
      generated.push({
        id: "generator",
        title: "Backup Generator Active",
        description:
          "Backup generator is currently supplying power to support station operations.",
        system: "Energy",
        time: "Active",
        level: "warn",
        status: "Active",
      });
    }

    return generated;
  };

  const [alerts, setAlerts] = useState(buildAlerts);

  const activeAlerts = alerts.filter((alert) => alert.status === "Active");

  const resolvedAlerts = alerts.filter((alert) => alert.status === "Resolved");

  const criticalCount = activeAlerts.filter(
    (alert) => alert.level === "critical",
  ).length;

  const warningCount = activeAlerts.filter(
    (alert) => alert.level === "warn",
  ).length;

  const acknowledgeAlert = (id) => {
    setAlerts((currentAlerts) =>
      currentAlerts.map((alert) =>
        alert.id === id
          ? {
              ...alert,
              status: "Resolved",
              time: "Just now",
              acknowledgedBy: userRole?.username || "Station Manager",
            }
          : alert,
      ),
    );
  };

  return (
    <div className="alert-center">
      <div className="alert-summary">
        <div className="alert-summary-card critical">
          <span>CRITICAL</span>
          <strong>{criticalCount}</strong>
          <small>Requires immediate attention</small>
        </div>

        <div className="alert-summary-card warning">
          <span>WARNING</span>
          <strong>{warningCount}</strong>
          <small>Operational attention required</small>
        </div>

        <div className="alert-summary-card resolved">
          <span>RESOLVED</span>
          <strong>{resolvedAlerts.length}</strong>
          <small>Recently cleared</small>
        </div>
      </div>

      <div className="alert-center-header">
        <div>
          <span className="alert-kicker">ALERT MONITOR</span>
          <h3>Operational Alerts</h3>
          <p>Recent station events and required operational actions</p>
        </div>

        <span className="alert-count">{alerts.length} EVENTS</span>
      </div>

      {alerts.length === 0 ? (
        <div className="alert-empty">
          <div className="alert-empty-icon">✓</div>
          <strong>NO ACTIVE ALERTS</strong>
          <span>All monitored station systems are operating normally.</span>
        </div>
      ) : (
        <div className="alert-center-list">
          {alerts.map((alert) => (
            <article
              className={`alert-center-item level-${alert.level} ${
                alert.status === "Resolved" ? "resolved-item" : ""
              }`}
              key={alert.id}
            >
              <div className="alert-indicator"></div>

              <div className="alert-main">
                <div className="alert-main-top">
                  <div>
                    <h4>{alert.title}</h4>

                    <span className="alert-system">{alert.system}</span>
                  </div>

                  <span
                    className={`alert-status ${alert.level} ${
                      alert.status === "Resolved" ? "resolved" : ""
                    }`}
                  >
                    {alert.status}
                  </span>
                </div>

                <p>{alert.description}</p>

                <div className="alert-footer">
                  <div className="alert-meta">
                    <span>{alert.time}</span>

                    {alert.acknowledgedBy && (
                      <span>
                        ACKNOWLEDGED BY {alert.acknowledgedBy.toUpperCase()}
                      </span>
                    )}
                  </div>

                  {alert.status === "Active" ? (
                    canAcknowledge ? (
                      <button
                        type="button"
                        className="alert-acknowledge"
                        onClick={() => acknowledgeAlert(alert.id)}
                      >
                        ✓ ACKNOWLEDGE
                      </button>
                    ) : (
                      <span className="alert-restricted">
                        ACKNOWLEDGEMENT RESTRICTED
                      </span>
                    )
                  ) : (
                    <span className="alert-cleared">✓ SYSTEM NORMAL</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <div className="alert-audit">
        <div>
          <span className="alert-audit-kicker">AUDIT TRAIL</span>
          <strong>Alert actions are recorded locally</strong>
        </div>

        <span>OPERATOR: {(userRole?.username || "SYSTEM").toUpperCase()}</span>
      </div>
    </div>
  );
}

export default AlertCenter;
