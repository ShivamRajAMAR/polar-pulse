import "./StationSelect.css";

function StationSelect({ onSelect, onBack }) {
  return (
    <div className="station-select-screen">
      <div className="station-select-container">
        <div className="station-select-header">
          <span>POLAR PULSE</span>

          <h1>Select Station</h1>

          <p>Choose the Antarctic research station you want to access.</p>
        </div>

        <div className="station-options">
          <button
            type="button"
            className="station-option"
            onClick={() => onSelect("Maitri")}
          >
            <div className="station-code">01</div>

            <div className="station-info">
              <h2>Maitri</h2>
              <p>Indian Antarctic Research Station</p>
            </div>

            <span className="station-arrow">→</span>
          </button>

          <button
            type="button"
            className="station-option"
            onClick={() => onSelect("Bharati")}
          >
            <div className="station-code">02</div>

            <div className="station-info">
              <h2>Bharati</h2>
              <p>Indian Antarctic Research Station</p>
            </div>

            <span className="station-arrow">→</span>
          </button>
        </div>

        <button type="button" className="station-back" onClick={onBack}>
          ← Back to access selection
        </button>
      </div>
    </div>
  );
}

export default StationSelect;
