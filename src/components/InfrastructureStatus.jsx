import { useState } from "react";
import "./InfrastructureStatus.css";

function InfrastructureStatus({ station, userRole }) {
  const [selectedSystem, setSelectedSystem] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const systems = station?.infraSystems || [];

  const role = userRole?.role || "manager";

  const canCreateMaintenance = role === "maintenance" || role === "manager";

  if (!station) return null;

  const getState = (status) => {
    if (status === "critical") return "CRITICAL";
    if (status === "warn") return "ATTENTION";
    return "OPERATIONAL";
  };

  const handleCreateMaintenance = (system) => {
    setSelectedSystem(system);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedSystem(null);
  };

  return (
    <div className="infrastructure-status">
      {/* HEADER */}
      <div className="infrastructure-header">
        <div>
          <span className="infrastructure-kicker">INFRASTRUCTURE MONITOR</span>

          <h2>Station Infrastructure</h2>

          <p>Core station systems and facility status</p>
        </div>

        <div className="infrastructure-live">
          <span />
          LIVE
        </div>
      </div>

      {/* SYSTEM CARDS */}
      <div className="infrastructure-grid">
        {systems.map((system, index) => {
          const isCritical = system.status === "critical";
          const isWarning = system.status === "warn";

          const state = getState(system.status);

          return (
            <div
              className={`infra-system-card ${system.status || "ok"}`}
              key={`${system.name}-${index}`}
            >
              <div className="infra-system-top">
                <span className="infra-system-index">
                  SYS-{String(index + 1).padStart(2, "0")}
                </span>

                <span className="infra-system-state">
                  <span className="infra-state-dot" />
                  {state}
                </span>
              </div>

              <div className="infra-system-name">{system.name}</div>

              <div className="infra-system-divider" />

              <div className="infra-system-bottom">
                <span>STATUS</span>

                <strong>{system.note}</strong>
              </div>

              {/* MAINTENANCE ACTION */}
              {canCreateMaintenance && (
                <button
                  type="button"
                  className="infra-maintenance-button"
                  onClick={() => handleCreateMaintenance(system)}
                >
                  <span>+</span>
                  CREATE MAINTENANCE
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* FOOTER */}
      <div className="infrastructure-footer">
        <span>{systems.length} CORE SYSTEMS MONITORED</span>

        <span>STATION: {station.name.toUpperCase()}</span>
      </div>

      {/* MAINTENANCE MODAL */}
      {showForm && selectedSystem && (
        <div className="maintenance-overlay" onClick={handleCloseForm}>
          <div
            className="maintenance-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="maintenance-modal-header">
              <div>
                <span>MAINTENANCE WORKFLOW</span>

                <h3>Create Maintenance Task</h3>
              </div>

              <button
                type="button"
                className="maintenance-close"
                onClick={handleCloseForm}
              >
                ×
              </button>
            </div>

            <div className="maintenance-system">
              <span>SYSTEM</span>

              <strong>{selectedSystem.name}</strong>

              <small>Current state: {getState(selectedSystem.status)}</small>
            </div>

            <form
              className="maintenance-form"
              onSubmit={(e) => {
                e.preventDefault();

                alert(`Maintenance task created for ${selectedSystem.name}`);

                handleCloseForm();
              }}
            >
              <label>
                PRIORITY
                <select defaultValue="normal">
                  <option value="normal">Normal</option>

                  <option value="high">High</option>

                  <option value="critical">Critical</option>
                </select>
              </label>

              <label>
                ISSUE / MAINTENANCE NOTE
                <textarea
                  placeholder="Describe the issue or required maintenance..."
                  rows="4"
                  required
                />
              </label>

              <label>
                SCHEDULE
                <input type="datetime-local" required />
              </label>

              <div className="maintenance-form-actions">
                <button
                  type="button"
                  className="maintenance-cancel"
                  onClick={handleCloseForm}
                >
                  CANCEL
                </button>

                <button type="submit" className="maintenance-submit">
                  CREATE TASK
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default InfrastructureStatus;
