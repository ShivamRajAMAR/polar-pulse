const roles = {
  hq: {
    id: "hq",
    name: "HQ Operator",
    permissions: [
      "view_hq",
      "view_station",
      "view_alerts",
      "view_logistics",
      "view_infrastructure",
    ],
  },

  manager: {
    id: "manager",
    name: "Station Manager",
    permissions: [
      "view_station",
      "view_alerts",
      "view_logistics",
      "view_infrastructure",
      "update_logistics",
      "manage_alerts",
      "create_maintenance",
    ],
  },

  logistics: {
    id: "logistics",
    name: "Logistics Officer",
    permissions: ["view_station", "view_logistics", "update_logistics"],
  },

  maintenance: {
    id: "maintenance",
    name: "Maintenance Engineer",
    permissions: [
      "view_station",
      "view_infrastructure",
      "view_alerts",
      "create_maintenance",
      "manage_alerts",
    ],
  },
};

export default roles;
