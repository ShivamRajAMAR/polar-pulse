// =====================================================
// POLAR PULSE FRONTEND LIVE DEMO
// Runs directly inside the React/Vercel app.
// No Python process required.
// =====================================================

const maitriScenarios = [
  {
    name: "NORMAL",
    temperature: 2.6,
    wind: 8.8,
    fuel: 40000,
    battery: 91,
    generatorLoad: 72,
  },
  {
    name: "COLDER",
    temperature: -8,
    wind: 10,
    fuel: 37500,
    battery: 84,
    generatorLoad: 76,
  },
  {
    name: "VERY COLD",
    temperature: -20,
    wind: 15,
    fuel: 33000,
    battery: 72,
    generatorLoad: 82,
  },
  {
    name: "EXTREME",
    temperature: -35,
    wind: 20,
    fuel: 28000,
    battery: 61,
    generatorLoad: 91,
  },
  {
    name: "RECOVERY",
    temperature: 2.6,
    wind: 8.8,
    fuel: 40000,
    battery: 91,
    generatorLoad: 72,
  },
];

const bharatiScenarios = [
  {
    name: "NORMAL",
    temperature: -1.4,
    wind: 0.5,
    fuel: 45000,
    battery: 90,
    generatorLoad: 70,
  },
  {
    name: "WINDY",
    temperature: -4,
    wind: 12,
    fuel: 43000,
    battery: 83,
    generatorLoad: 75,
  },
  {
    name: "COLDER",
    temperature: -16,
    wind: 10,
    fuel: 39000,
    battery: 71,
    generatorLoad: 81,
  },
  {
    name: "STORM",
    temperature: -28,
    wind: 22,
    fuel: 34000,
    battery: 58,
    generatorLoad: 92,
  },
  {
    name: "RECOVERY",
    temperature: -1.4,
    wind: 0.5,
    fuel: 45000,
    battery: 90,
    generatorLoad: 70,
  },
];

function calculateEnergy(temperature, windSpeed) {
  const BASE_HEATING = 80;
  const TEMP_FACTOR = 3;
  const WIND_FACTOR = 0.5;

  const coldEffect =
    temperature < -10
      ? (-10 - temperature) * TEMP_FACTOR
      : 0;

  const windEffect =
    windSpeed > 5
      ? (windSpeed - 5) * WIND_FACTOR
      : 0;

  const heatingLoad =
    BASE_HEATING +
    coldEffect +
    windEffect;

  const BASE_POWER = 80;
  const totalPowerLoad =
    BASE_POWER + heatingLoad;

  const BASE_FUEL = 500;
  const FUEL_FACTOR = 4;

  const fuelConsumption =
    BASE_FUEL +
    heatingLoad * FUEL_FACTOR;

  return {
    heatingLoad,
    totalPowerLoad,
    fuelConsumption,
  };
}

function calculateRisk(
  fuelRemaining,
  fuelConsumption,
  daysToResupply
) {
  const fuelDays =
    fuelRemaining / fuelConsumption;

  if (fuelDays < daysToResupply) {
    return {
      fuelDays,
      risk: "CRITICAL",
      message:
        "Fuel is predicted to run out before the next resupply.",
    };
  }

  if (fuelDays < daysToResupply + 7) {
    return {
      fuelDays,
      risk: "WARNING",
      message:
        "Fuel margin is low. Monitor consumption closely.",
    };
  }

  return {
    fuelDays,
    risk: "SAFE",
    message:
      "Fuel is predicted to last until the next resupply.",
  };
}

export function getDemoStationData(
  stationName,
  scenarioIndex
) {
  const scenarios =
    stationName === "Maitri"
      ? maitriScenarios
      : bharatiScenarios;

  const scenario =
    scenarios[
      scenarioIndex % scenarios.length
    ];

  const {
    heatingLoad,
    totalPowerLoad,
    fuelConsumption,
  } = calculateEnergy(
    scenario.temperature,
    scenario.wind
  );

  const daysToResupply =
    stationName === "Maitri"
      ? 41
      : 46;

  const {
    fuelDays,
    risk,
    message,
  } = calculateRisk(
    scenario.fuel,
    fuelConsumption,
    daysToResupply
  );

  const pressure =
    stationName === "Maitri"
      ? 979
      : 986;

  const humidity =
    scenario.temperature > -10
      ? 49
      : 64;

  return {
    status: {
      station_name: stationName,
      updated_at: new Date().toISOString(),
      temperature_c: scenario.temperature,
      wind_speed_ms: scenario.wind,
      heating_load_kw: Number(
        heatingLoad.toFixed(2)
      ),
      fuel_consumption_lpd: Number(
        fuelConsumption.toFixed(2)
      ),
      fuel_remaining_liters:
        scenario.fuel,
      fuel_days_remaining: Number(
        fuelDays.toFixed(2)
      ),
      days_until_resupply:
        daysToResupply,
      risk_level: risk,
      risk_message: message,
      data_source: "frontend_demo_simulation",
    },

    environment: {
      station_name: stationName,
      timestamp: new Date().toISOString(),
      temperature_c: scenario.temperature,
      pressure_hpa: pressure,
      wind_speed_ms: scenario.wind,
      wind_direction_deg:
        scenario.wind > 5 ? 85 : 120,
      humidity_percent: humidity,
      data_source:
        "frontend_demo_simulation",
    },

    energy: {
      station_name: stationName,
      timestamp: new Date().toISOString(),
      generator_id: "Generator-1",
      generator_load_percent:
        scenario.generatorLoad,
      heating_load_kw: Number(
        heatingLoad.toFixed(2)
      ),
      total_power_load_kw: Number(
        totalPowerLoad.toFixed(2)
      ),
      fuel_consumption_lpd: Number(
        fuelConsumption.toFixed(2)
      ),
      battery_percent:
        scenario.battery,
      data_source:
        "frontend_demo_simulation",
    },

    inventory: [
      {
        item_name: "Diesel",
        quantity: scenario.fuel,
        unit: "L",
        daily_consumption:
          fuelConsumption,
        minimum_threshold: 15000,
        station_name: stationName,
        data_source:
          "frontend_demo_simulation",
      },
    ],

    scenario: scenario.name,
  };
}