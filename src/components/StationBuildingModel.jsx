import { useState } from "react";
import "./StationBuildingModel.css";

function StationBuildingModel({ station }) {
  const rooms = station?.rooms || [];

  const [selectedRoom, setSelectedRoom] = useState(
    rooms[0]?.id || null
  );

  const getRoom = (id) =>
    rooms.find((room) => room.id === id);

  const selectedRoomData = getRoom(selectedRoom);

  const getStatusClass = (status) => {
    if (status === "critical") return "critical";
    if (status === "warn") return "warn";
    return "ok";
  };

  const roomPositions = {
    "power-room": { left: "27%", top: "28%" },
    "fuel-storage": { left: "63%", top: "27%" },
    "water-tank": { left: "29%", top: "69%" },
    "living-block": { left: "64%", top: "69%" },
  };

  const RoomMarker = ({ room }) => {
    if (!room) return null;

    const position = roomPositions[room.id];

    const isSelected =
      selectedRoom === room.id;

    return (
      <button
        type="button"
        className={`map-room-marker ${getStatusClass(
          room.status
        )} ${isSelected ? "selected" : ""}`}
        style={position}
        onClick={() => setSelectedRoom(room.id)}
      >
        <span className="map-room-dot" />

        <span className="map-room-label">
          {room.name}
        </span>

        <span className="map-room-status">
          {room.status === "critical"
            ? "CRITICAL"
            : room.status === "warn"
              ? "ATTENTION"
              : "OPERATIONAL"}
        </span>
      </button>
    );
  };

  return (
    <section className="station-building-model">

      <div className="building-header">
        <div>
          <span className="building-eyebrow">
            DIGITAL TWIN · SPATIAL MODEL
          </span>

          <h2 className="section-title">
            {station?.name || "Station"} Digital Twin
          </h2>

          <p className="building-subtitle">
            Interactive spatial representation of station
            infrastructure and operational systems.
          </p>
        </div>

        <div className="building-live">
          <span />
          LIVE DIGITAL TWIN
        </div>
      </div>

      <div className="digital-map-layout">

        <div className="digital-map">

          <div className="map-terrain" />
          <div className="map-grid" />

          <div className="terrain-patch patch-one" />
          <div className="terrain-patch patch-two" />
          <div className="terrain-patch patch-three" />

          <div className="map-road road-main" />
          <div className="map-road road-horizontal" />
          <div className="map-road road-vertical" />

          <div className="data-route route-one" />
          <div className="data-route route-two" />
          <div className="data-route route-three" />

          {/* POWER ROOM */}
          <div className="map-building power-building">
            <div className="building-roof" />

            <div className="generator-row">
              <span />
              <span />
              <span />
            </div>

            <div className="building-light light-one" />
            <div className="building-light light-two" />
            <div className="building-light light-three" />
          </div>

          {/* FUEL STORAGE */}
          <div className="map-building fuel-building">
            <div className="fuel-tank tank-one" />
            <div className="fuel-tank tank-two" />
            <div className="fuel-tank tank-three" />

            <div className="tank-light" />
          </div>

          {/* WATER TANK */}
          <div className="map-building water-building">
            <div className="water-tank">
              <div className="water-surface" />
              <div className="water-ripple ripple-one" />
              <div className="water-ripple ripple-two" />
            </div>

            <div className="water-pipe pipe-one" />
            <div className="water-pipe pipe-two" />
          </div>

          {/* LIVING BLOCK */}
          <div className="map-building living-building">
            <div className="window-row">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>

            <div className="living-inner" />

            <div className="building-light light-one" />
            <div className="building-light light-two" />
          </div>

          {/* ANTENNA */}
          <div className="station-antenna">
            <div className="antenna-pole" />
            <div className="antenna-dish" />
            <div className="antenna-glow" />
          </div>

          {/* VEHICLE */}
          <div className="station-vehicle">
            <span />
          </div>

          {/* STATION TITLE */}
          <div className="station-map-title">
            <span>
              {station?.name?.toUpperCase() || "STATION"}
            </span>

            <small>
              ANTARCTIC RESEARCH FACILITY
            </small>
          </div>

          {/* ROOM MARKERS */}
          {rooms.map((room) => (
            <RoomMarker
              key={room.id}
              room={room}
            />
          ))}

          {/* NORTH */}
          <div className="map-compass">
            <span>N</span>
            <strong>↑</strong>
          </div>

          {/* SCALE */}
          <div className="map-scale">
            <span />
            <small>50 m</small>
          </div>

          {/* MAP INFO */}
          <div className="map-coordinates">
            <span>SPATIAL MODEL</span>

            <strong>
              {station?.name?.toUpperCase() || "STATION"} BASE
            </strong>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <aside className="map-side-panel">

          <div className="map-panel-section">
            <span className="map-panel-title">
              FACILITY STATUS
            </span>

            <div className="map-status-row">
              <span className="status-dot ok" />

              <div>
                <strong>OPERATIONAL</strong>
                <small>
                  Systems functioning normally
                </small>
              </div>
            </div>

            <div className="map-status-row">
              <span className="status-dot warn" />

              <div>
                <strong>ATTENTION</strong>
                <small>
                  Requires operational review
                </small>
              </div>
            </div>

            <div className="map-status-row">
              <span className="status-dot critical" />

              <div>
                <strong>CRITICAL</strong>
                <small>
                  Immediate attention required
                </small>
              </div>
            </div>
          </div>

          {/* SELECTED FACILITY */}

          {selectedRoomData && (
            <div className="map-panel-section selected-facility">

              <span className="map-panel-title">
                SELECTED FACILITY
              </span>

              <div className="selected-facility-heading">
                <strong>
                  {selectedRoomData.name}
                </strong>

                <span
                  className={`facility-pill ${getStatusClass(
                    selectedRoomData.status
                  )}`}
                >
                  {selectedRoomData.status === "critical"
                    ? "CRITICAL"
                    : selectedRoomData.status === "warn"
                      ? "ATTENTION"
                      : "OPERATIONAL"}
                </span>
              </div>

              <div className="facility-data">
                {selectedRoomData.details?.map(
                  (detail) => (
                    <div key={detail.label}>
                      <span>{detail.label}</span>
                      <strong>{detail.value}</strong>
                    </div>
                  )
                )}
              </div>

              {selectedRoomData.note && (
                <p className="facility-note">
                  {selectedRoomData.note}
                </p>
              )}
            </div>
          )}

          {/* STATION HEALTH */}

          <div className="map-panel-section station-health">

            <span className="map-panel-title">
              STATION STATE
            </span>

            <strong className="station-health-value">
              {station?.health?.overall >= 90
                ? "OPERATIONAL"
                : "ATTENTION REQUIRED"}
            </strong>

            <div className="health-bar">
              <span
                style={{
                  width: `${station?.health?.overall || 0}%`,
                }}
              />
            </div>

            <small>
              Overall health:{" "}
              {station?.health?.overall ?? "--"}%
            </small>
          </div>

        </aside>
      </div>
    </section>
  );
}

export default StationBuildingModel;