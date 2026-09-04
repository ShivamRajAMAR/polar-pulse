function calculateDigitalTwin(station) {
  if (!station) {
    return {
      overallState: "UNKNOWN",
      riskScore: 0,
      risks: [],
    };
  }

  const risks = [];

  const health = station.health || {};
  const resources = station.resourcesPercent || [];
  const energy = station.energy || [];
  const environment = station.environment || {};
  const rooms = station.rooms || [];

  // =====================================================
  // 1. POWER RISK
  // =====================================================

  const battery = energy.find((item) => item.label === "Battery");
  const solar = energy.find((item) => item.label === "Solar");
  const generator = energy.find((item) => item.label === "Generator");

  const batteryValue = parseInt(battery?.value);
  const solarValue = parseInt(solar?.value);

  if (!Number.isNaN(batteryValue) && batteryValue < 40) {
    risks.push({
      id: "low-battery",
      severity: "critical",
      title: "Battery Reserve Low",
      message: `Battery reserve has fallen to ${battery.value}.`,
      action: "Inspect power storage and reduce non-essential load.",
    });
  }

  if (
    !Number.isNaN(solarValue) &&
    solarValue < 50 &&
    generator?.value === "ON"
  ) {
    risks.push({
      id: "power-dependency",
      severity: "warning",
      title: "Backup Power Dependency",
      message: "Solar output is reduced while backup generation is active.",
      action: "Monitor generator runtime and battery recovery.",
    });
  }

  // =====================================================
  // 2. RESOURCE RISK
  // =====================================================

  resources.forEach((resource) => {
    if (resource.percent < 40) {
      risks.push({
        id: `resource-${resource.name}`,
        severity: "critical",
        title: `${resource.name} Reserve Critical`,
        message: `${resource.name} availability is ${resource.percent}%.`,
        action: `Initiate ${resource.name.toLowerCase()} resupply planning.`,
      });
    } else if (resource.percent < 60) {
      risks.push({
        id: `resource-${resource.name}`,
        severity: "warning",
        title: `${resource.name} Reserve Declining`,
        message: `${resource.name} availability is ${resource.percent}%.`,
        action: `Monitor consumption and plan replenishment.`,
      });
    }
  });

  // =====================================================
  // 3. ENVIRONMENT RISK
  // =====================================================

  const condition = environment.condition?.toLowerCase() || "";

  if (condition.includes("blizzard") || condition.includes("storm")) {
    risks.push({
      id: "weather",
      severity: "critical",
      title: "Severe Weather Risk",
      message: environment.condition,
      action: "Restrict external operations and monitor station access.",
    });
  }

  const windValue = parseInt(environment.wind);

  if (!Number.isNaN(windValue) && windValue >= 50) {
    risks.push({
      id: "high-wind",
      severity: "warning",
      title: "High Surface Wind",
      message: `Surface wind is ${environment.wind}.`,
      action: "Review field activity and external maintenance operations.",
    });
  }

  // =====================================================
  // 4. INFRASTRUCTURE RISK
  // =====================================================

  rooms.forEach((room) => {
    if (room.status === "critical") {
      risks.push({
        id: `room-${room.id}`,
        severity: "critical",
        title: `${room.name} Critical`,
        message: room.note || "Critical facility condition detected.",
        action: "Dispatch maintenance inspection immediately.",
      });
    }

    if (room.status === "warn") {
      risks.push({
        id: `room-${room.id}`,
        severity: "warning",
        title: `${room.name} Requires Attention`,
        message: room.note || "Facility requires operational review.",
        action: "Schedule facility inspection.",
      });
    }
  });

  // =====================================================
  // 5. SYSTEM HEALTH RISK
  // =====================================================

  Object.entries(health).forEach(([system, value]) => {
    if (system === "overall") return;

    if (value < 60) {
      risks.push({
        id: `health-${system}`,
        severity: "critical",
        title: `${system} System Critical`,
        message: `${system} health is ${value}%.`,
        action: `Immediate inspection of ${system.toLowerCase()} system required.`,
      });
    } else if (value < 80) {
      risks.push({
        id: `health-${system}`,
        severity: "warning",
        title: `${system} System Degraded`,
        message: `${system} health is ${value}%.`,
        action: `Monitor ${system.toLowerCase()} system closely.`,
      });
    }
  });

  // =====================================================
  // RISK SCORE
  // =====================================================

  let riskScore = 0;

  risks.forEach((risk) => {
    if (risk.severity === "critical") {
      riskScore += 25;
    } else if (risk.severity === "warning") {
      riskScore += 10;
    }
  });

  riskScore = Math.min(riskScore, 100);

  const overallState =
    riskScore >= 60 ? "CRITICAL" : riskScore >= 30 ? "ATTENTION" : "NOMINAL";

  return {
    overallState,
    riskScore,
    risks,
    criticalCount: risks.filter((risk) => risk.severity === "critical").length,
    warningCount: risks.filter((risk) => risk.severity === "warning").length,
  };
}

export default calculateDigitalTwin;
