const stationData = {
  // =====================================================
  // MAITRI
  // =====================================================

  maitri: {
    id: "maitri",
    name: "Maitri",

    // -----------------------------
    // TOP MISSION STATUS CARDS
    // -----------------------------

    statusCards: [
      {
        title: "Infrastructure",
        value: "Stable",
        status: "warn",
        note: "Operational",
      },
      {
        title: "Logistics",
        value: "Normal",
        status: "warn",
        note: "On Schedule",
      },
      {
        title: "Personnel",
        value: "24",
        status: "warn",
        note: "All Teams Active",
      },
      {
        title: "Active Alerts",
        value: "1",
        status: "warn",
        note: "Monitor Closely",
      },
    ],

    // -----------------------------
    // ENERGY
    // -----------------------------

    energy: [
      {
        label: "Solar",
        value: "58%",
        note: "Current output",
      },
      {
        label: "Battery",
        value: "92%",
        note: "Stored charge",
      },
      {
        label: "Generator",
        value: "OFF",
        note: "Backup power on standby",
      },
      {
        label: "Power Load",
        value: "Normal",
        note: "Consumption level",
      },
    ],

    // -----------------------------
    // LOGISTICS
    // -----------------------------

    resources: [
      {
        label: "Fuel",
        value: "74%",
        note: "Available stock",
      },
      {
        label: "Food",
        value: "85%",
        note: "Available stock",
      },
      {
        label: "Medicines",
        value: "90%",
        note: "Available stock",
      },
      {
        label: "Spare Parts",
        value: "60%",
        note: "Available stock",
      },
    ],

    resourcesPercent: [
      {
        name: "Fuel",
        percent: 74,
      },
      {
        name: "Food",
        percent: 85,
      },
      {
        name: "Medicines",
        percent: 90,
      },
      {
        name: "Spare Parts",
        percent: 60,
      },
    ],

    // -----------------------------
    // DIGITAL TWIN ROOMS
    // -----------------------------

    rooms: [
      {
        id: "power-room",
        name: "Power Room",
        status: "ok",

        details: [
          {
            label: "Generator",
            value: "OFF",
          },
          {
            label: "Battery",
            value: "92%",
          },
          {
            label: "Solar",
            value: "58%",
          },
        ],

        note: "Running normally on solar",
      },

      {
        id: "fuel-storage",
        name: "Fuel Storage",
        status: "ok",

        details: [
          {
            label: "Fuel Level",
            value: "74%",
          },
          {
            label: "Reserve",
            value: "51 days",
          },
        ],

        note: "Sufficient for planned operations",
      },

      {
        id: "water-tank",
        name: "Water Tank",
        status: "ok",

        details: [
          {
            label: "Tank Level",
            value: "98%",
          },
          {
            label: "System",
            value: "Healthy",
          },
        ],

        note: "Running normally",
      },

      {
        id: "living-block",
        name: "Living Block",
        status: "ok",

        details: [
          {
            label: "Crew Present",
            value: "22",
          },
          {
            label: "Life Support",
            value: "99%",
          },
        ],

        note: "All quarters operational",
      },
    ],

    // -----------------------------
    // INFRASTRUCTURE
    // -----------------------------

    infraSystems: [
      {
        name: "Power Room",
        status: "ok",
        note: "Healthy",
      },
      {
        name: "Water Tank",
        status: "ok",
        note: "Healthy",
      },
      {
        name: "Heating",
        status: "ok",
        note: "Running",
      },
      {
        name: "Communication",
        status: "ok",
        note: "Connected",
      },
    ],

    // -----------------------------
    // ENVIRONMENT
    // -----------------------------

    environment: {
      temperature: "-24.6 °C",
      wind: "38 km/h",
      visibility: "8.4 km",
      pressure: "986 hPa",
      condition: "Stable",
    },

    // -----------------------------
    // PERSONNEL
    // -----------------------------

    personnel: {
      total: 24,
      onStation: 22,
      field: 2,
      offDuty: 0,
    },

    // -----------------------------
    // STATION HEALTH
    // -----------------------------

    health: {
      overall: 92,
      power: 96,
      heating: 91,
      communication: 98,
      lifeSupport: 99,
    },
  },

  // =====================================================
  // BHARATI
  // =====================================================

  bharati: {
    id: "bharati",
    name: "Bharati",

    // -----------------------------
    // TOP MISSION STATUS CARDS
    // -----------------------------

    statusCards: [
      {
        title: "Infrastructure",
        value: "Attention",
        status: "warn",
        note: "Power Room Flagged",
      },
      {
        title: "Logistics",
        value: "Attention",
        status: "warn",
        note: "3 Active Deliveries",
      },
      {
        title: "Personnel",
        value: "18",
        status: "ok",
        note: "All Teams Active",
      },
      {
        title: "Active Alerts",
        value: "3",
        status: "critical",
        note: "Requires Attention",
      },
    ],

    // -----------------------------
    // ENERGY
    // -----------------------------

    energy: [
      {
        label: "Solar",
        value: "42%",
        note: "Current output",
      },
      {
        label: "Battery",
        value: "81%",
        note: "Stored charge",
      },
      {
        label: "Generator",
        value: "ON",
        note: "Backup power active",
      },
      {
        label: "Power Load",
        value: "Elevated",
        note: "Consumption level",
      },
    ],

    // -----------------------------
    // LOGISTICS
    // -----------------------------

    resources: [
      {
        label: "Fuel",
        value: "68%",
        note: "Available stock",
      },
      {
        label: "Food",
        value: "80%",
        note: "Available stock",
      },
      {
        label: "Medicines",
        value: "90%",
        note: "Available stock",
      },
      {
        label: "Spare Parts",
        value: "55%",
        note: "Available stock",
      },
    ],

    resourcesPercent: [
      {
        name: "Fuel",
        percent: 68,
      },
      {
        name: "Food",
        percent: 80,
      },
      {
        name: "Medicines",
        percent: 90,
      },
      {
        name: "Spare Parts",
        percent: 55,
      },
    ],

    // -----------------------------
    // DIGITAL TWIN ROOMS
    // -----------------------------

    rooms: [
      {
        id: "power-room",
        name: "Power Room",
        status: "warn",

        details: [
          {
            label: "Generator",
            value: "ON",
          },
          {
            label: "Battery",
            value: "81%",
          },
          {
            label: "Solar",
            value: "42%",
          },
        ],

        note: "Needs attention — check power load",
      },

      {
        id: "fuel-storage",
        name: "Fuel Storage",
        status: "ok",

        details: [
          {
            label: "Fuel Level",
            value: "68%",
          },
          {
            label: "Reserve",
            value: "42 days",
          },
        ],

        note: "Sufficient for planned operations",
      },

      {
        id: "water-tank",
        name: "Water Tank",
        status: "ok",

        details: [
          {
            label: "Tank Level",
            value: "96%",
          },
          {
            label: "System",
            value: "Healthy",
          },
        ],

        note: "Running normally",
      },

      {
        id: "living-block",
        name: "Living Block",
        status: "ok",

        details: [
          {
            label: "Crew Present",
            value: "16",
          },
          {
            label: "Life Support",
            value: "97%",
          },
        ],

        note: "All quarters operational",
      },
    ],

    // -----------------------------
    // INFRASTRUCTURE
    // -----------------------------

    infraSystems: [
      {
        name: "Power Room",
        status: "warn",
        note: "Needs attention",
      },
      {
        name: "Water Tank",
        status: "ok",
        note: "Healthy",
      },
      {
        name: "Heating",
        status: "ok",
        note: "Running",
      },
      {
        name: "Communication",
        status: "ok",
        note: "Connected",
      },
    ],

    // -----------------------------
    // ENVIRONMENT
    // -----------------------------

    environment: {
      temperature: "-28.4 °C",
      wind: "52 km/h",
      visibility: "5.1 km",
      pressure: "978 hPa",
      condition: "Blizzard Warning",
    },

    // -----------------------------
    // PERSONNEL
    // -----------------------------

    personnel: {
      total: 18,
      onStation: 16,
      field: 1,
      offDuty: 1,
    },

    // -----------------------------
    // STATION HEALTH
    // -----------------------------

    health: {
      overall: 86,
      power: 82,
      heating: 89,
      communication: 95,
      lifeSupport: 97,
    },
  },
};

export default stationData;
