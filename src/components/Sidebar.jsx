import "./Sidebar.css";

function Sidebar({ activePage, onPageChange, onLogout, station, userRole }) {
  const role = userRole?.role || "manager";

  const allNavItems = [
    {
      id: "mission",
      label: "Digital Twin",
      icon: "⌂",
      roles: ["manager", "logistics", "maintenance"],
    },
    {
      id: "infrastructure",
      label: "Infrastructure",
      icon: "▦",
      roles: ["manager", "maintenance"],
    },
    {
      id: "energy",
      label: "Energy",
      icon: "◈",
      roles: ["manager", "maintenance"],
    },
    {
      id: "logistics",
      label: "Logistics",
      icon: "▤",
      roles: ["manager", "logistics"],
    },
    {
      id: "environment",
      label: "Environment",
      icon: "◌",
      roles: ["manager", "logistics", "maintenance"],
    },
    {
      id: "alerts",
      label: "Alerts",
      icon: "△",
      roles: ["manager", "maintenance"],
    },
  ];

  const navItems = allNavItems.filter((item) => item.roles.includes(role));

  const roleName =
    role === "manager"
      ? "Station Manager"
      : role === "logistics"
        ? "Logistics Officer"
        : role === "maintenance"
          ? "Maintenance Engineer"
          : "Station Operator";

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-brand-mark">PP</div>

        <div>
          <strong>POLAR PULSE</strong>
          <span>MISSION CONTROL</span>
        </div>
      </div>

      <div className="sidebar-station">
        <span>STATION STATUS</span>

        <div className="sidebar-station-row">
          <span className="sidebar-online-dot" />
          <strong>{station?.toUpperCase() || "STATION"}</strong>
        </div>

        <small>ONLINE · OPERATIONAL</small>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-nav-label">OPERATIONS</div>

        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`sidebar-nav-item ${
              activePage === item.id ? "active" : ""
            }`}
            onClick={() => onPageChange(item.id)}
          >
            <span className="sidebar-nav-icon">{item.icon}</span>

            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-alert-box">
          <span className="sidebar-alert-dot" />
          <div>
            <strong>ALERT MONITOR</strong>
            <small>System monitoring active</small>
          </div>
        </div>

        <div className="sidebar-operator">
          <div className="sidebar-avatar">{roleName.charAt(0)}</div>

          <div className="sidebar-operator-info">
            <strong>{userRole?.username || "Operator"}</strong>
            <span>{roleName}</span>
          </div>
        </div>

        <div className="sidebar-coordinates">
          <span>
            {station?.toLowerCase() === "bharati"
              ? "69° S / 76° E"
              : "70° S / 11° E"}
          </span>

          <span>ANTARCTICA</span>
        </div>

        <button type="button" className="sidebar-logout" onClick={onLogout}>
          <span>↪</span>
          LOGOUT
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
