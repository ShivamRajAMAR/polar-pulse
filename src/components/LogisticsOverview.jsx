import { useEffect, useState } from "react";
import "./LogisticsOverview.css";

function LogisticsOverview({
  station,
  fuelForecast,
  canEdit = false,
}) {
  const resources = station?.resourcesPercent || [];

  const [inventory, setInventory] = useState(resources);
  const [editing, setEditing] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [selectedResource, setSelectedResource] = useState(null);

  useEffect(() => {
    setInventory(station?.resourcesPercent || []);
  }, [station]);

  if (!station) return null;

  const getState = (percent) => {
    if (percent < 40) return "critical";
    if (percent < 70) return "warn";
    return "ok";
  };

  const getLabel = (name) => {
    if (name === "Medicines") return "Medical Supplies";
    return name;
  };

  const startEdit = (item, event) => {
    event?.stopPropagation();
    setEditing(item.name);
    setEditValue(String(item.percent));
  };

  const cancelEdit = (event) => {
    event?.stopPropagation();
    setEditing(null);
    setEditValue("");
  };

  const saveEdit = (name, event) => {
    event?.stopPropagation();

    const value = Number(editValue);

    if (Number.isNaN(value) || value < 0 || value > 100) {
      return;
    }

    setInventory((current) =>
      current.map((item) =>
        item.name === name ? { ...item, percent: value } : item,
      ),
    );

    setEditing(null);
    setEditValue("");
  };

  const average =
    inventory.length > 0
      ? Math.round(
          inventory.reduce((sum, item) => sum + item.percent, 0) /
            inventory.length,
        )
      : 0;

  const overallState = getState(average);

  const fuelRiskClass =
    fuelForecast?.riskLevel?.toLowerCase() || "safe";

  const fuelAvailable =
    fuelForecast?.available != null
      ? fuelForecast.available.toLocaleString()
      : "--";

  const fuelConsumption =
    fuelForecast?.dailyConsumption != null
      ? fuelForecast.dailyConsumption.toFixed(2)
      : "--";

  const fuelDays =
    fuelForecast?.daysRemaining != null
      ? fuelForecast.daysRemaining.toFixed(1)
      : "--";

  const resupplyDays =
    fuelForecast?.daysUntilResupply != null
      ? fuelForecast.daysUntilResupply
      : "--";

  return (
    <div className="logistics-overview">

      {/* =================================================
          HEADER
      ================================================= */}
      <div className="logistics-command-header">
        <div>
          <span className="logistics-kicker">
            POLAR PULSE // LOGISTICS CONTROL
          </span>

          <h2>Logistics & Inventory</h2>

          <p>
            Resource availability, fuel autonomy and resupply readiness
          </p>
        </div>

        <div className={`logistics-state ${overallState}`}>
          <span className="state-pulse" />
          {overallState === "ok"
            ? "SUPPLY NOMINAL"
            : overallState === "warn"
              ? "SUPPLY ATTENTION"
              : "SUPPLY CRITICAL"}
        </div>
      </div>

      {/* =================================================
          KPI STRIP
      ================================================= */}
      <div className="logistics-summary">

        <div className="logistics-summary-card">
          <span>STATION</span>
          <strong>{station.name}</strong>
          <small>REMOTE SECTOR</small>
        </div>

        <div className={`logistics-summary-card accent-${overallState}`}>
          <span>INVENTORY HEALTH</span>
          <strong>{average}%</strong>
          <small>RESOURCE READINESS</small>
        </div>

        <div className="logistics-summary-card">
          <span>RESOURCE TYPES</span>
          <strong>{inventory.length}</strong>
          <small>TRACKED CLASSES</small>
        </div>

        <div className="logistics-summary-card">
          <span>ACCESS MODE</span>
          <strong>{canEdit ? "EDIT" : "READ ONLY"}</strong>
          <small>{canEdit ? "AUTHORIZED" : "MONITORING"}</small>
        </div>

      </div>

      {/* =================================================
          RESOURCE MATRIX
      ================================================= */}
      <div className="logistics-section-heading">
        <div>
          <span>RESOURCE MATRIX</span>
          <small>SELECT A RESOURCE FOR DETAIL VIEW</small>
        </div>

        <div className="matrix-line" />
      </div>

      <div className="logistics-grid">

        {inventory.map((item, index) => {
          const state = getState(item.percent);
          const isEditing = editing === item.name;
          const isSelected = selectedResource === item.name;

          return (
            <div
              className={`logistics-card ${state} ${
                isSelected ? "selected" : ""
              }`}
              key={item.name}
              onClick={() =>
                !isEditing && setSelectedResource(
                  isSelected ? null : item.name,
                )
              }
            >

              <div className="card-scanline" />

              <div className="logistics-card-top">
                <span className="logistics-resource-code">
                  RES-{String(index + 1).padStart(2, "0")}
                </span>

                <span className="logistics-resource-status">
                  <span />
                  {state === "ok"
                    ? "NOMINAL"
                    : state === "warn"
                      ? "ATTENTION"
                      : "CRITICAL"}
                </span>
              </div>

              <div className="resource-main-row">

                <div>
                  <div className="resource-icon">
                    {item.name === "Fuel"
                      ? "◈"
                      : item.name === "Food"
                        ? "⌁"
                        : item.name === "Medicines"
                          ? "+"
                          : "◇"}
                  </div>

                  <div className="logistics-resource-name">
                    {getLabel(item.name)}
                  </div>

                  <span className="resource-subtitle">
                    INVENTORY NODE {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Circular Gauge */}
                <div
                  className={`resource-gauge ${state}`}
                  style={{
                    "--percent": `${item.percent * 3.6}deg`,
                  }}
                >
                  <div className="resource-gauge-inner">
                    <strong>{item.percent}</strong>
                    <span>%</span>
                  </div>
                </div>

              </div>

              {isEditing ? (
                <div className="logistics-edit-area">
                  <div className="logistics-edit-label">
                    UPDATE STOCK LEVEL
                  </div>

                  <div className="logistics-edit-row">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                    />

                    <span>%</span>
                  </div>

                  <div className="logistics-edit-actions">
                    <button
                      type="button"
                      onClick={(e) => saveEdit(item.name, e)}
                    >
                      APPLY
                    </button>

                    <button
                      type="button"
                      onClick={cancelEdit}
                    >
                      CANCEL
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="logistics-progress">
                    <span
                      style={{
                        width: `${item.percent}%`,
                      }}
                    />
                  </div>

                  <div className="logistics-resource-footer">
                    <span>
                      STOCK CAPACITY
                      <strong>{item.percent}%</strong>
                    </span>

                    {canEdit && (
                      <button
                        type="button"
                        onClick={(e) => startEdit(item, e)}
                      >
                        UPDATE
                      </button>
                    )}
                  </div>
                </>
              )}

              {/* Expandable detail */}
              {isSelected && !isEditing && (
                <div className="resource-detail-panel">
                  <div>
                    <span>STATUS</span>
                    <strong>
                      {state === "ok"
                        ? "Operational"
                        : state === "warn"
                          ? "Monitor"
                          : "Immediate Review"}
                    </strong>
                  </div>

                  <div>
                    <span>LEVEL</span>
                    <strong>{item.percent}%</strong>
                  </div>

                  <div>
                    <span>SIGNAL</span>
                    <strong>STABLE</strong>
                  </div>
                </div>
              )}

            </div>
          );
        })}

      </div>

      {/* =================================================
          FUEL DIGITAL TWIN
      ================================================= */}
      {fuelForecast && (
        <div className={`fuel-forecast ${fuelRiskClass}`}>

          <div className="fuel-orbit orbit-one" />
          <div className="fuel-orbit orbit-two" />

          <div className="fuel-forecast-header">

            <div>
              <span className="logistics-kicker">
                DIGITAL TWIN // RESOURCE FORECAST
              </span>

              <h3>Fuel Autonomy Monitor</h3>

              <p>
                Predicted fuel endurance versus scheduled resupply window
              </p>
            </div>

            <div className={`fuel-risk-badge ${fuelRiskClass}`}>
              <span />
              {fuelForecast.riskLevel}
            </div>

          </div>

          <div className="fuel-main-grid">

            {/* Fuel Gauge */}
            <div className="fuel-hero-gauge">

              <div className="fuel-gauge-ring">
                <div className="fuel-gauge-core">
                  <span>AVAILABLE</span>
                  <strong>{fuelAvailable}</strong>
                  <small>LITRES</small>
                </div>
              </div>

              <div className="fuel-gauge-caption">
                CURRENT FUEL RESERVE
              </div>

            </div>

            {/* Forecast Metrics */}
            <div className="fuel-metrics">

              <div className="fuel-metric">
                <span>DAILY CONSUMPTION</span>
                <strong>{fuelConsumption}</strong>
                <small>L / DAY</small>
              </div>

              <div className="fuel-metric highlight">
                <span>FUEL AUTONOMY</span>
                <strong>{fuelDays}</strong>
                <small>DAYS REMAINING</small>
              </div>

              <div className="fuel-metric">
                <span>NEXT RESUPPLY</span>
                <strong>{resupplyDays}</strong>
                <small>DAYS TO ARRIVAL</small>
              </div>

            </div>

          </div>

          {/* Forecast comparison */}
          <div className="forecast-timeline">

            <div className="timeline-labels">
              <span>NOW</span>
              <span>FUEL EXHAUSTION</span>
              <span>RESUPPLY</span>
            </div>

            <div className="timeline-track">

              <div
                className="timeline-fuel-point"
                style={{
                  left:
                    fuelForecast.daysUntilResupply > 0
                      ? `${Math.min(
                          100,
                          (fuelForecast.daysRemaining /
                            fuelForecast.daysUntilResupply) *
                            100,
                        )}%`
                      : "100%",
                }}
              >
                <span />
              </div>

              <div className="timeline-now" />

              <div className="timeline-resupply" />

            </div>

            <div className="timeline-status">
              <span>
                {fuelForecast.riskMessage}
              </span>

              <strong>
                {fuelForecast.daysRemaining >=
                fuelForecast.daysUntilResupply
                  ? "RESUPPLY WINDOW SECURED"
                  : "RESUPPLY WINDOW AT RISK"}
              </strong>
            </div>

          </div>

        </div>
      )}

      {/* =================================================
          OPERATIONAL NOTICE
      ================================================= */}
      <div className={`logistics-notice ${overallState}`}>

        <div className="logistics-notice-icon">
          {overallState === "ok" ? "✓" : "!"}
        </div>

        <div>
          <strong>
            {overallState === "ok"
              ? "SUPPLY CHAIN OPERATING NORMALLY"
              : "SUPPLY LEVELS REQUIRE MONITORING"}
          </strong>

          <p>
            Inventory levels are monitored through the station logistics
            workflow. Operational updates should reflect verified station
            records.
          </p>
        </div>

        <div className="notice-signal">
          <span />
          SYSTEM MONITORING
        </div>

      </div>

      {/* =================================================
          FOOTER
      ================================================= */}
      <div className="logistics-footer">
        <span>
          INVENTORY SOURCE // STATION LOGISTICS SYSTEM
        </span>

        <span>
          UPDATE MODE // {canEdit ? "AUTHORIZED" : "READ ONLY"}
        </span>
      </div>

    </div>
  );
}

export default LogisticsOverview;