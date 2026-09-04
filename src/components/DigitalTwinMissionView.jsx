import "./DigitalTwinMissionView.css";

function DigitalTwinMissionView() {
  return (
    <section className="dtmv-section">
      <div className="dtmv-header">
        <div>
          <span className="dtmv-kicker">POLAR PULSE SYSTEM ARCHITECTURE</span>

          <h2>Digital Twin & Mission View</h2>

          <p>
            Intelligence layer and visual inspection interface working together
            for station operations.
          </p>
        </div>

        <div className="dtmv-status">
          <span />
          CONNECTED
        </div>
      </div>

      <div className="dtmv-grid">
        {/* DIGITAL TWIN */}

        <div className="dtmv-card digital-twin-card">
          <div className="dtmv-card-top">
            <div className="dtmv-card-number">01</div>

            <span className="dtmv-card-badge">INTELLIGENCE</span>
          </div>

          <h3>Digital Twin</h3>

          <p className="dtmv-card-description">
            The complete intelligent operational system that connects station
            data and identifies relationships between systems.
          </p>

          <div className="dtmv-features">
            <div>
              <span>01</span>
              Infrastructure
            </div>

            <div>
              <span>02</span>
              Energy
            </div>

            <div>
              <span>03</span>
              Logistics
            </div>

            <div>
              <span>04</span>
              Environment
            </div>

            <div>
              <span>05</span>
              Risk Detection
            </div>

            <div>
              <span>06</span>
              Decision Support
            </div>
          </div>

          <div className="dtmv-card-footer">
            <span>ROLE</span>
            <strong>THINKS · ANALYZES · PREDICTS</strong>
          </div>
        </div>

        {/* MISSION VIEW */}

        <div className="dtmv-card mission-view-card">
          <div className="dtmv-card-top">
            <div className="dtmv-card-number">02</div>

            <span className="dtmv-card-badge">VISUAL INTERFACE</span>
          </div>

          <h3>Mission View</h3>

          <p className="dtmv-card-description">
            The visual inspection interface where operators explore the station
            and inspect individual facilities.
          </p>

          <div className="dtmv-features">
            <div>
              <span>01</span>
              Station Model
            </div>

            <div>
              <span>02</span>
              Clickable Buildings
            </div>

            <div>
              <span>03</span>
              Facility Status
            </div>

            <div>
              <span>04</span>
              System Details
            </div>

            <div>
              <span>05</span>
              Visual Inspection
            </div>

            <div>
              <span>06</span>
              Live Status
            </div>
          </div>

          <div className="dtmv-card-footer">
            <span>ROLE</span>
            <strong>SHOWS · EXPLORES · INSPECTS</strong>
          </div>
        </div>
      </div>

      <div className="dtmv-bottom-line">
        <span>DIGITAL TWIN = COMPLETE POLAR PULSE BRAIN</span>

        <span className="dtmv-arrow">→</span>

        <span>MISSION VIEW = VISUAL STATION INTERFACE</span>
      </div>
    </section>
  );
}

export default DigitalTwinMissionView;
