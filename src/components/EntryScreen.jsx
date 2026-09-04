import "./EntryScreen.css";

function EntryScreen({ onSelect }) {
  return (
    <div className="entry-screen">
      <div className="entry-container">
        <div className="entry-header">
          <span className="entry-eyebrow">POLAR PULSE</span>

          <h1>Mission Control</h1>

          <p>Select your access point to continue.</p>
        </div>

        <div className="entry-options">
          <button
            type="button"
            className="entry-option"
            onClick={() => onSelect("hq")}
          >
            <span className="entry-option-code">HQ</span>

            <div>
              <h2>Headquarters</h2>
              <p>Central command, monitoring and station oversight.</p>
            </div>

            <span className="entry-arrow">→</span>
          </button>

          <button
            type="button"
            className="entry-option"
            onClick={() => onSelect("stations")}
          >
            <span className="entry-option-code">ST</span>

            <div>
              <h2>Stations</h2>
              <p>Access Antarctic research station operations.</p>
            </div>

            <span className="entry-arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default EntryScreen;
