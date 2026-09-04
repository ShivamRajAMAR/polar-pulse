import "./ResourceOverview.css";

function ResourceOverview({ resources = [], percentages = [] }) {
  const normalizedResources =
    percentages.length > 0
      ? percentages.map((item) => ({
          name: item.name,
          percent: Number(item.percent) || 0,
        }))
      : resources.map((item) => ({
          name: item.label || item.name,
          percent:
            parseInt(String(item.value || "0").replace("%", ""), 10) || 0,
        }));

  const getState = (percent) => {
    if (percent < 40) return "critical";
    if (percent < 70) return "warn";
    return "ok";
  };

  const average =
    normalizedResources.length > 0
      ? Math.round(
          normalizedResources.reduce((sum, item) => sum + item.percent, 0) /
            normalizedResources.length,
        )
      : 0;

  return (
    <div className="resource-overview">
      <div className="resource-header">
        <div>
          <span className="resource-kicker">LOGISTICS MONITOR</span>

          <h2>Resource Overview</h2>

          <p>Current availability of essential station supplies</p>
        </div>

        <div className={`resource-health ${getState(average)}`}>
          <span />
          {average}% AVAILABLE
        </div>
      </div>

      <div className="resource-grid">
        {normalizedResources.map((resource, index) => {
          const state = getState(resource.percent);

          const stateLabel =
            state === "critical"
              ? "CRITICAL"
              : state === "warn"
                ? "ATTENTION"
                : "NORMAL";

          return (
            <div
              className={`resource-card ${state}`}
              key={`${resource.name}-${index}`}
            >
              <div className="resource-card-top">
                <span className="resource-index">
                  RES-{String(index + 1).padStart(2, "0")}
                </span>

                <span className="resource-state">
                  <span />
                  {stateLabel}
                </span>
              </div>

              <div className="resource-name">{resource.name}</div>

              <div className="resource-value-row">
                <strong>{resource.percent}%</strong>
                <span>AVAILABLE</span>
              </div>

              <div className="resource-progress">
                <span
                  style={{
                    width: `${Math.min(Math.max(resource.percent, 0), 100)}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="resource-footer">
        <span>{normalizedResources.length} RESOURCE CATEGORIES MONITORED</span>

        <span>
          INVENTORY STATUS:{" "}
          {average >= 70
            ? "STABLE"
            : average >= 40
              ? "MONITOR"
              : "ACTION REQUIRED"}
        </span>
      </div>
    </div>
  );
}

export default ResourceOverview;
