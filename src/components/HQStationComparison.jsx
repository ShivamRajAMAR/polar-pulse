import "./HQStationComparison.css";

function getBarClass(value) {
  if (value < 60) return "critical";
  if (value < 75) return "warn";
  return "ok";
}

function ComparisonBar({ value }) {
  return (
    <div className="comparison-bar">
      <div
        className={`comparison-bar-fill ${getBarClass(value)}`}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
}

function HQStationComparison({ stations = [] }) {
  if (stations.length < 2) {
    return (
      <section className="hq-comparison-panel">
        <div className="comparison-empty">
          Station comparison data unavailable.
        </div>
      </section>
    );
  }

  const [first, second] = stations;

  const metrics = [
    {
      label: "Infrastructure",
      type: "percent",
      first: first.infrastructure,
      second: second.infrastructure,
    },
    {
      label: "Logistics",
      type: "percent",
      first: first.logistics,
      second: second.logistics,
    },
    {
      label: "Solar Output",
      type: "percent",
      first: first.energy.solar,
      second: second.energy.solar,
    },
    {
      label: "Battery",
      type: "percent",
      first: first.energy.battery,
      second: second.energy.battery,
    },
    {
      label: "Fuel",
      type: "percent",
      first: first.resources.fuel,
      second: second.resources.fuel,
    },
    {
      label: "Spare Parts",
      type: "percent",
      first: first.resources.spareParts,
      second: second.resources.spareParts,
    },
    {
      label: "Personnel",
      type: "number",
      first: first.personnel,
      second: second.personnel,
    },
    {
      label: "Active Alerts",
      type: "alerts",
      first: first.alerts,
      second: second.alerts,
    },
  ];

  return (
    <section className="hq-comparison-panel" aria-label="Station comparison">
      <div className="comparison-header">
        <div>
          <span className="comparison-eyebrow">COMMAND ANALYTICS</span>

          <h2 className="section-title">Station Performance Comparison</h2>

          <p className="comparison-subtitle">
            Cross-station operational indicators for command review
          </p>
        </div>

        <div className="comparison-station-labels">
          <div>
            <span className="station-label-dot maitri"></span>
            <strong>{first.name}</strong>
          </div>

          <div>
            <span className="station-label-dot bharati"></span>
            <strong>{second.name}</strong>
          </div>
        </div>
      </div>

      <div className="comparison-table">
        <div className="comparison-table-head">
          <span>INDICATOR</span>
          <span>{first.name.toUpperCase()}</span>
          <span>COMPARISON</span>
          <span>{second.name.toUpperCase()}</span>
        </div>

        {metrics.map((metric) => {
          const firstValue = metric.first;
          const secondValue = metric.second;

          const firstBetter =
            metric.type === "alerts"
              ? firstValue < secondValue
              : firstValue > secondValue;

          const secondBetter =
            metric.type === "alerts"
              ? secondValue < firstValue
              : secondValue > firstValue;

          return (
            <div className="comparison-table-row" key={metric.label}>
              <div className="comparison-metric-name">
                <span>{metric.label}</span>
              </div>

              <div
                className={`comparison-value ${firstBetter ? "better" : ""}`}
              >
                <strong>
                  {firstValue}
                  {metric.type === "percent" ? "%" : ""}
                </strong>

                {metric.type === "percent" && (
                  <ComparisonBar value={firstValue} />
                )}
              </div>

              <div className="comparison-middle">
                <span className="comparison-vs">VS</span>
              </div>

              <div
                className={`comparison-value ${secondBetter ? "better" : ""}`}
              >
                <strong>
                  {secondValue}
                  {metric.type === "percent" ? "%" : ""}
                </strong>

                {metric.type === "percent" && (
                  <ComparisonBar value={secondValue} />
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="comparison-footer">
        <div className="comparison-insight">
          <span className="insight-icon">◆</span>

          <div>
            <strong>Command Assessment</strong>

            <p>
              {first.name} currently shows stronger overall operational
              reserves, while {second.name} requires closer monitoring of power
              and environmental conditions.
            </p>
          </div>
        </div>

        <div className="comparison-status">
          <span className="comparison-status-dot"></span>
          LIVE DATA
        </div>
      </div>
    </section>
  );
}

export default HQStationComparison;
