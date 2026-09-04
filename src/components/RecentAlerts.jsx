import "./RecentAlerts.css";
function RecentAlerts({ station }) {
  const alerts = [];

  if (!station) return null;

  // Power room alert
  const powerRoom = station.rooms?.find((room) => room.id === "power-room");

  if (powerRoom?.status === "warn") {
    alerts.push({
      id: "power",
      type: "critical",
      title: "Power Room Requires Attention",
      message: powerRoom.note || "Power system needs inspection.",
      time: "Active",
    });
  }

  // Weather alert
  if (
    station.environment?.condition &&
    station.environment.condition.toLowerCase() !== "stable"
  ) {
    alerts.push({
      id: "weather",
      type: "critical",
      title: "Weather Condition Alert",
      message: station.environment.condition,
      time: "Active",
    });
  }

  // Spare parts alert
  const spareParts = station.resourcesPercent?.find(
    (item) => item.name === "Spare Parts",
  );

  if (spareParts && spareParts.percent < 70) {
    alerts.push({
      id: "spares",
      type: "warning",
      title: "Spare Parts Stock Low",
      message: `Current availability ${spareParts.percent}%`,
      time: "Monitoring",
    });
  }

  // Fuel alert
  const fuel = station.resourcesPercent?.find((item) => item.name === "Fuel");

  if (fuel && fuel.percent < 50) {
    alerts.push({
      id: "fuel",
      type: "critical",
      title: "Fuel Reserve Low",
      message: `Current reserve ${fuel.percent}%`,
      time: "Attention",
    });
  }

  // Generator alert
  const generator = station.energy?.find((item) => item.label === "Generator");

  if (generator?.value === "ON") {
    alerts.push({
      id: "generator",
      type: "warning",
      title: "Backup Generator Active",
      message: generator.note || "Generator is currently running.",
      time: "Active",
    });
  }

  // Battery alert
  const battery = station.energy?.find((item) => item.label === "Battery");

  if (battery) {
    const batteryValue = parseInt(battery.value);

    if (!Number.isNaN(batteryValue) && batteryValue < 40) {
      alerts.push({
        id: "battery",
        type: "critical",
        title: "Battery Reserve Low",
        message: `Battery level ${battery.value}`,
        time: "Attention",
      });
    }
  }

  const visibleAlerts = alerts.slice(0, 4);

  return (
    <div className="recent-alerts">
      <div className="section-heading">
        <div>
          <span className="section-kicker">SYSTEM MONITOR</span>
          <h2>Recent Alerts</h2>
        </div>

        <span className="alert-count">{alerts.length} ACTIVE</span>
      </div>

      {visibleAlerts.length > 0 ? (
        <div className="recent-alert-list">
          {visibleAlerts.map((alert) => (
            <div key={alert.id} className={`recent-alert-item ${alert.type}`}>
              <div className="recent-alert-indicator">
                <span />
              </div>

              <div className="recent-alert-content">
                <div className="recent-alert-top">
                  <h3>{alert.title}</h3>
                  <span>{alert.time}</span>
                </div>

                <p>{alert.message}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="recent-alert-empty">
          <div className="empty-status-dot" />
          <div>
            <strong>NO ACTIVE ALERTS</strong>
            <p>All monitored systems are operating normally.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecentAlerts;
