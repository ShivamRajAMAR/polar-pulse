const hqData = {
  missionStatus: {
    overall: "OPERATIONAL",
    stationsOnline: 2,
    activePersonnel: 42,
    activeAlerts: 4,
  },

  stations: [
    {
      id: "maitri",
      name: "Maitri",
      location: "Schirmacher Oasis",
      status: "ok",
      statusLabel: "Operational",

      infrastructure: 92,
      logistics: 84,
      personnel: 24,
      alerts: 1,

      health: {
        overall: 92,
        infrastructure: 92,
        logistics: 84,
        energy: 96,
        environment: 94,
      },

      energy: {
        solar: 58,
        battery: 92,
        generator: "OFF",
        load: "Normal",
      },

      resources: {
        fuel: 74,
        food: 85,
        medicines: 90,
        spareParts: 60,
      },

      environment: {
        temperature: "-24.6 °C",
        wind: "38 km/h",
        visibility: "8.4 km",
        condition: "Stable",
      },
    },

    {
      id: "bharati",
      name: "Bharati",
      location: "Larsemann Hills",
      status: "warn",
      statusLabel: "Attention Required",

      infrastructure: 86,
      logistics: 78,
      personnel: 18,
      alerts: 3,

      health: {
        overall: 86,
        infrastructure: 82,
        logistics: 78,
        energy: 81,
        environment: 72,
      },

      energy: {
        solar: 42,
        battery: 81,
        generator: "ON",
        load: "Elevated",
      },

      resources: {
        fuel: 68,
        food: 80,
        medicines: 90,
        spareParts: 55,
      },

      environment: {
        temperature: "-28.4 °C",
        wind: "52 km/h",
        visibility: "5.1 km",
        condition: "Blizzard Warning",
      },
    },
  ],

  alerts: [
    {
      id: 1,
      station: "Bharati",
      title: "Power Room Requires Attention",
      category: "Infrastructure",
      severity: "critical",
      time: "12 min ago",
      status: "Active",
    },

    {
      id: 2,
      station: "Bharati",
      title: "Blizzard Warning",
      category: "Environment",
      severity: "warn",
      time: "24 min ago",
      status: "Active",
    },

    {
      id: 3,
      station: "Maitri",
      title: "Spare Parts Reserve Declining",
      category: "Logistics",
      severity: "warn",
      time: "38 min ago",
      status: "Monitoring",
    },

    {
      id: 4,
      station: "Bharati",
      title: "Generator Running on Backup Power",
      category: "Energy",
      severity: "warn",
      time: "51 min ago",
      status: "Monitoring",
    },
  ],

  timeline: [
    {
      id: 1,
      time: "08:14",
      station: "Bharati",
      event: "Power room inspection flagged",
      detail: "Power load elevated and requires engineering review",
      type: "critical",
    },

    {
      id: 2,
      time: "07:52",
      station: "Bharati",
      event: "Generator switched to backup mode",
      detail: "Station operating with generator support",
      type: "warn",
    },

    {
      id: 3,
      time: "07:28",
      station: "Maitri",
      event: "Daily logistics status synchronized",
      detail: "Fuel, food and medical inventory confirmed",
      type: "ok",
    },

    {
      id: 4,
      time: "06:45",
      station: "Maitri",
      event: "Personnel accountability confirmed",
      detail: "24 assigned personnel accounted for",
      type: "ok",
    },

    {
      id: 5,
      time: "06:20",
      station: "Bharati",
      event: "Weather conditions updated",
      detail: "Blizzard warning remains active",
      type: "warn",
    },

    {
      id: 6,
      time: "05:58",
      station: "Maitri",
      event: "Communication link synchronized",
      detail: "Station telemetry connection stable",
      type: "ok",
    },
  ],
};

export default hqData;
