import { getDemoStationData } from "./lib/demoSimulation";
import { useState, useEffect } from "react";
import "./App.css";
import { supabase } from "./lib/supabase";
import { getStationLiveData } from "./lib/stationDataApi";

import Sidebar from "./components/Sidebar";
import PageHeader from "./components/PageHeader";

import StatusCard from "./components/StatusCard";
import MissionOverview from "./components/MissionOverview";
import RecentAlerts from "./components/RecentAlerts";
import InfrastructureStatus from "./components/InfrastructureStatus";
import ResourceOverview from "./components/ResourceOverview";
import EnvironmentalTelemetry from "./components/EnvironmentalTelemetry";
import PersonnelStatus from "./components/PersonnelStatus";
import StationHealth from "./components/StationHealth";
import LogisticsOverview from "./components/LogisticsOverview";
import AlertCenter from "./components/AlertCenter";
import StationBuildingModel from "./components/StationBuildingModel";

import EntryScreen from "./components/EntryScreen";
import StationSelect from "./components/StationSelect";
import LoginScreen from "./components/LoginScreen";

import HQDashboard from "./components/HQDashboard";

import stationData from "./data/stationData";
import hqData from "./data/hqData";
import EnergyOverview from "./components/EnergyOverview";
import EnvironmentOverview from "./components/EnvironmentOverview";
import DigitalTwinMissionView from "./components/DigitalTwinMissionView";
import DigitalTwinStatus from "./components/DigitalTwinStatus";

function App() {
  const [screen, setScreen] = useState("entry");
  const [selectedStation, setSelectedStation] = useState(null);
  const [userMode, setUserMode] = useState(null);
  const [activePage, setActivePage] = useState("mission");
  const [liveStationData, setLiveStationData] = useState(null);
  const [demoIndex, setDemoIndex] = useState(0);
useEffect(() => {
  async function testSupabase() {
    const { data, error } = await supabase
      .from("station_status")
      .select("*");

    console.log("SUPABASE DATA:", JSON.stringify(data, null, 2));
    console.log("SUPABASE ERROR:", error);
  }

  testSupabase();
}, []);
 useEffect(() => {
  if (!selectedStation) return;

  // Show first scenario immediately
  setLiveStationData(
    getDemoStationData(selectedStation, 0)
  );

  setDemoIndex(0);

  // Change scenario every 8 seconds
  const interval = setInterval(() => {
    setDemoIndex((currentIndex) => {
      const nextIndex = currentIndex + 1;

      setLiveStationData(
        getDemoStationData(
          selectedStation,
          nextIndex
        )
      );

      return nextIndex;
    });
  }, 8000);

  return () => clearInterval(interval);
}, [selectedStation]);
  // =====================================================
  // CURRENT STATION
  // =====================================================

  const staticStation = selectedStation
  ? stationData[selectedStation.toLowerCase()]
  : null;

const currentStation = staticStation
  ? {
      ...staticStation,

      // -----------------------------
      // ENVIRONMENT
      // -----------------------------
      environment: liveStationData
        ? {
            temperature: `${liveStationData.status.temperature_c ?? "--"} °C`,
            wind: `${(
              (liveStationData.status.wind_speed_ms ?? 0) * 3.6
            ).toFixed(1)} km/h`,
            visibility: "--",
            pressure: `${liveStationData.environment.pressure_hpa ?? "--"} hPa`,
            condition: "Stable",
          }
        : staticStation.environment,

      // -----------------------------
      // ENERGY
      // -----------------------------
      energy: liveStationData?.energy
        ? [
            {
              label: "Solar",
              value:
                staticStation.energy?.find(
                  (item) => item.label === "Solar"
                )?.value || "--",
              note: "Current solar power contribution",
            },
            {
              label: "Battery",
              value: `${liveStationData.energy.battery_percent ?? "--"}%`,
              note: "Stored station energy reserve",
            },
            {
              label: "Generator",
              value:
                (liveStationData.energy.generator_load_percent ?? 0) > 0
                  ? "ON"
                  : "OFF",
              note: "Backup power system status",
            },
            {
              label: "Power Load",
              value:
                liveStationData.energy.total_power_load_kw != null
                  ? `${liveStationData.energy.total_power_load_kw.toFixed(1)} kW`
                  : "--",
              note: "Current station power demand",
            },
          ]
        : staticStation.energy,

      // -----------------------------
      // LOGISTICS / INVENTORY
      // -----------------------------
      resourcesPercent: liveStationData?.inventory
        ? staticStation.resourcesPercent.map((item) => {
            if (item.name !== "Fuel") {
              return item;
            }

            const fuel = liveStationData.inventory.find(
              (inventoryItem) =>
                inventoryItem.item_name?.toLowerCase() === "diesel"
            );

            if (!fuel) {
              return item;
            }

            const maxFuel =
              selectedStation === "Maitri"
                ? 40000
                : 45000;

            const fuelPercent = Math.round(
              (fuel.quantity / maxFuel) * 100
            );

            return {
              ...item,
              percent: Math.min(100, Math.max(0, fuelPercent)),
            };
          })
        : staticStation.resourcesPercent,
              fuelForecast: liveStationData?.status
        ? {
            available: liveStationData.status.fuel_remaining_liters,
            dailyConsumption:
              liveStationData.status.fuel_consumption_lpd,
            daysRemaining:
              liveStationData.status.fuel_days_remaining,
            daysUntilResupply:
              liveStationData.status.days_until_resupply,
            riskLevel:
              liveStationData.status.risk_level,
            riskMessage:
              liveStationData.status.risk_message,
          }
        : null,
    }
  : null;
  // =====================================================
  // ENTRY
  // =====================================================

  const handleEntrySelect = (type) => {
    if (type === "hq") {
      setUserMode("hq");
      setSelectedStation(null);
      setScreen("hqLogin");
      return;
    }

    if (type === "stations") {
      setUserMode("station");
      setScreen("stationSelect");
    }
  };

  // =====================================================
  // HQ LOGIN
  // =====================================================

  const handleHQLogin = (loginData) => {
  setUserMode({
    role: "hq",
    username: loginData.username,
    portal: "hq",
    station: null,
    userId: loginData.userId,
  });

  setSelectedStation(null);
  setActivePage("hq");
  setScreen("dashboard");
};

  // =====================================================
  // STATION SELECT
  // =====================================================

  const handleStationSelect = (stationName) => {
    setSelectedStation(stationName);
    setUserMode("station");
    setScreen("stationLogin");
  };

  // =====================================================
  // STATION LOGIN
  // =====================================================

  const handleStationLogin = ({ username, role, station, userId }) => {
  if (!currentStation) {
    console.error("Station data not found:", selectedStation);
    return;
  }

  setUserMode({
    type: "station",
    portal: "station",
    username,
    role,
    station,
    userId,
  });

  setActivePage("mission");
  setScreen("dashboard");
};

  // =====================================================
  // HQ → VIEW STATION
  // =====================================================

  const handleViewStation = (stationId) => {
  const stationName =
    stationId === "bharati" ? "Bharati" : "Maitri";

  // HQ is allowed to view either station
  if (userMode?.portal === "hq") {
    setSelectedStation(stationName);

    setUserMode((current) => ({
      ...current,
      portal: "hq",
      station: stationName,
    }));

    setActivePage("mission");
    setScreen("dashboard");
    return;
  }

  // Station users can only access their own station
  if (
    userMode?.station &&
    userMode.station.toLowerCase() !== stationName.toLowerCase()
  ) {
    return;
  }

  setSelectedStation(stationName);
  setActivePage("mission");
  setScreen("dashboard");
};
  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    setScreen("entry");
    setSelectedStation(null);
    setUserMode(null);
    setActivePage("mission");
  };

  // =====================================================
  // ENTRY SCREEN
  // =====================================================

  if (screen === "entry") {
    return <EntryScreen onSelect={handleEntrySelect} />;
  }

  // =====================================================
  // HQ LOGIN
  // =====================================================

  if (screen === "hqLogin") {
    return (
      <LoginScreen
        title="HEADQUARTERS LOGIN"
        subtitle="POLAR PULSE COMMAND CENTER"
        onLogin={handleHQLogin}
        onBack={() => {
          setScreen("entry");
          setUserMode(null);
        }}
        showRole={false}
      />
    );
  }

  // =====================================================
  // STATION SELECT
  // =====================================================

  if (screen === "stationSelect") {
    return (
      <StationSelect
        onSelect={handleStationSelect}
        onBack={() => {
          setScreen("entry");
          setUserMode(null);
        }}
      />
    );
  }

  // =====================================================
  // STATION LOGIN
  // =====================================================

  if (screen === "stationLogin") {
    if (!currentStation) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#050b12",
            color: "#ffffff",
            fontFamily: "Arial, sans-serif",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <h2>Station data unavailable</h2>

          <p style={{ color: "#8a9aaa" }}>
            Selected station: {selectedStation || "None"}
          </p>

          <button
            type="button"
            onClick={() => setScreen("stationSelect")}
            style={{
              padding: "10px 18px",
              background: "transparent",
              color: "#4cc9f0",
              border: "1px solid #4cc9f0",
              cursor: "pointer",
            }}
          >
            ← Back to Stations
          </button>
        </div>
      );
    }

    const stationLocation =
      currentStation.location ||
      (currentStation.id === "bharati"
        ? "Larsemann Hills"
        : "Schirmacher Oasis");

    return (
      <LoginScreen
        station={currentStation.name}
        title={`${currentStation.name.toUpperCase()} STATION LOGIN`}
        subtitle={`${stationLocation.toUpperCase()} · POLAR RESEARCH BASE`}
        onLogin={handleStationLogin}
        onBack={() => {
          setScreen("stationSelect");
        }}
        showRole={true}
      />
    );
  }

  // =====================================================
  // DASHBOARD
  // =====================================================

  if (screen === "dashboard") {
    // ---------------------------------------------------
    // HQ DASHBOARD
    // ---------------------------------------------------

    if (userMode?.portal === "hq" && !selectedStation) {
  return (
    <div className="app-shell">
      <Sidebar
        activePage={activePage}
        onPageChange={setActivePage}
        onLogout={handleLogout}
        station="HQ"
        userRole={userMode}
      />

      <main className="main-content">
        <PageHeader
          station="HQ COMMAND"
          location="NCPOR HEADQUARTERS"
          activePage={activePage}
          onLogout={handleLogout}
        />

        <HQDashboard
  data={hqData}
  onViewStation={handleViewStation}
  onLogout={handleLogout}
/>
      </main>
    </div>
  );
}

    // ---------------------------------------------------
    // SAFETY CHECK
    // ---------------------------------------------------

    if (!currentStation) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#050b12",
            color: "#ffffff",
            fontFamily: "Arial, sans-serif",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <h2>Station data unavailable</h2>

          <button
            type="button"
            onClick={() => setScreen("stationSelect")}
            style={{
              padding: "10px 18px",
              background: "transparent",
              color: "#4cc9f0",
              border: "1px solid #4cc9f0",
              cursor: "pointer",
            }}
          >
            ← Select Station
          </button>
        </div>
      );
    }

    // ---------------------------------------------------
    // STATION DASHBOARD
    // ---------------------------------------------------

    const stationLocation =
      currentStation.location ||
      (currentStation.id === "bharati"
        ? "Larsemann Hills"
        : "Schirmacher Oasis");

    return (
      <div className="app-shell">
        <Sidebar
          activePage={activePage}
          onPageChange={setActivePage}
          onLogout={handleLogout}
          station={currentStation.name}
          userRole={userMode}
        />

        <main className="main-content">
          <PageHeader
            station={currentStation.name}
            location={stationLocation}
            activePage={activePage}
            onLogout={handleLogout}
          />

          {/* =================================================
              MISSION
          ================================================= */}

         {activePage === "mission" && (
  <section className="page-section">
    <div className="mission-view-heading">
      <div>
        <span className="mission-view-kicker">POLAR PULSE</span>

<h2>Station Digital Twin</h2>

        <p>
          Interactive digital representation of station infrastructure
          for remote inspection and operational awareness.
        </p>
      </div>

      <div className="mission-view-badge">
        <span>◉</span>
        INTERACTIVE
      </div>
    </div>

    <StationBuildingModel station={currentStation} />
  </section>
)}

          {/* =================================================
              INFRASTRUCTURE
          ================================================= */}

          {activePage === "infrastructure" && (
            <>
              <section className="page-section">
                <InfrastructureStatus station={currentStation} />
              </section>

              <section className="dashboard-grid">
                

                <StationHealth health={currentStation.health} />
              </section>
            </>
          )}
          {/* =================================================
    ENERGY
================================================= */}

          {activePage === "energy" && (
            <section className="page-section">
              <EnergyOverview energy={currentStation.energy} />
            </section>
          )}
          {activePage === "environment" && (
            <section className="page-section">
              <EnvironmentOverview environment={currentStation.environment} />
            </section>
          )}

          {/* =================================================
              LOGISTICS
          ================================================= */}

          {activePage === "logistics" && (
            <section className="page-section">
              <LogisticsOverview
  station={currentStation}
  fuelForecast={currentStation.fuelForecast}
  canEdit={
                  userMode?.role === "logistics" || userMode?.role === "manager"
                }
              />
            </section>
          )}

          {/* =================================================
              ALERTS
          ================================================= */}

          {activePage === "alerts" && (
            <section className="page-section">
              <AlertCenter
  station={currentStation}
  fuelForecast={currentStation.fuelForecast}
/>
            </section>
          )}
        </main>
      </div>
    );
  }

  // =====================================================
  // FALLBACK
  // =====================================================

  return <EntryScreen onSelect={handleEntrySelect} />;
}

export default App;
