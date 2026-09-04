import { useEffect, useState } from "react";
import "./PageHeader.css";

const pageNames = {
  mission: "Polar Pulse",
  infrastructure: "Infrastructure",
  energy: "Energy Operations",
  logistics: "Logistics Operations",
  environment: "Environmental Telemetry",
  alerts: "Alert Center",
};

function PageHeader({ station, location, activePage, onLogout }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const pageTitle = pageNames[activePage] || "Mission View";

  const formattedTime = currentTime.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const formattedDate = currentTime.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <header className="page-header">
      <div className="page-header-left">
        <div className="page-breadcrumb">
          <span>POLAR PULSE</span>
          <span className="breadcrumb-separator">/</span>
          <span>STATION OPERATIONS</span>
        </div>

        <div className="page-header-title-row">
          <div>
            <h1>{pageTitle}</h1>

            <div className="station-context">
              <strong>{station?.toUpperCase() || "STATION"}</strong>

              <span>•</span>

              <span>{location || "Antarctic Research Base"}</span>
            </div>
          </div>

          <div className="station-online-badge">
            <span></span>
            ONLINE
          </div>
        </div>
      </div>

      <div className="page-header-right">
        <div className="header-clock">
          <span className="header-date">{formattedDate}</span>

          <strong>{formattedTime}</strong>

          <small>LOCAL STATION TIME</small>
        </div>

        <div className="operator-profile">
          <div className="operator-avatar">M</div>

          <div className="operator-info">
            <strong>Mission Operator</strong>
            <span>Administrator</span>
          </div>
        </div>

        <button
          type="button"
          className="header-logout"
          onClick={onLogout}
          aria-label="Logout"
        >
          ↪
        </button>
      </div>
    </header>
  );
}

export default PageHeader;
