import "./PersonnelStatus.css";

function PersonnelStatus({ personnel = {} }) {
  const { total = 0, onStation = 0, field = 0, offDuty = 0 } = personnel;

  return (
    <section
      className="personnel-status"
      aria-label="Personnel and crew status"
    >
      {/* ============================================
          HEADER
      ============================================ */}

      <div className="personnel-header">
        <div>
          <h2 className="section-title">Personnel & Crew Status</h2>

          <p className="personnel-subtitle">
            Current station personnel distribution
          </p>
        </div>

        <div className="personnel-badge">
          <span className="personnel-badge-dot"></span>
          ALL ACCOUNTED
        </div>
      </div>

      {/* ============================================
          PERSONNEL GRID
      ============================================ */}

      <div className="personnel-grid">
        {/* TOTAL CREW */}

        <article className="personnel-card">
          <span className="personnel-card-label">TOTAL CREW</span>

          <strong className="personnel-card-value">{total}</strong>

          <small>Assigned personnel</small>
        </article>

        {/* ON STATION */}

        <article className="personnel-card">
          <span className="personnel-card-label">ON STATION</span>

          <strong className="personnel-card-value">{onStation}</strong>

          <small>Currently present</small>
        </article>

        {/* FIELD / EVA */}

        <article className="personnel-card">
          <span className="personnel-card-label">FIELD / EVA</span>

          <strong className="personnel-card-value">{field}</strong>

          <small>Outside station</small>
        </article>

        {/* OFF DUTY */}

        <article className="personnel-card">
          <span className="personnel-card-label">OFF DUTY</span>

          <strong className="personnel-card-value">{offDuty}</strong>

          <small>Inactive crew</small>
        </article>
      </div>

      {/* ============================================
          CREW SUMMARY
      ============================================ */}

      <div className="personnel-summary">
        <div className="personnel-summary-item">
          <span className="personnel-summary-dot station"></span>

          <span>On Station</span>

          <strong>{onStation}</strong>
        </div>

        <div className="personnel-summary-item">
          <span className="personnel-summary-dot field"></span>

          <span>Field / EVA</span>

          <strong>{field}</strong>
        </div>

        <div className="personnel-summary-item">
          <span className="personnel-summary-dot duty"></span>

          <span>Off Duty</span>

          <strong>{offDuty}</strong>
        </div>
      </div>
    </section>
  );
}

export default PersonnelStatus;
