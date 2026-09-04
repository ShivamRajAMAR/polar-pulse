import "./StatusCard.css";

function StatusCard({ title, value, status, note }) {
  const statusLabel =
    status === "critical"
      ? "CRITICAL"
      : status === "warn"
        ? "ATTENTION"
        : "NOMINAL";

  return (
    <div className={`status-card ${status || "ok"}`}>
      <div className="status-card-top">
        <span className="status-card-title">{title}</span>

        <span className="status-card-indicator">
          <span className="status-card-dot" />
          {statusLabel}
        </span>
      </div>

      <div className="status-card-value">{value}</div>

      {note && <div className="status-card-note">{note}</div>}
    </div>
  );
}

export default StatusCard;
