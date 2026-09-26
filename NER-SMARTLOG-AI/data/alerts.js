/**
 * NER-SMARTLOG AI - Demo Alerts Dataset
 * Operational command center alerts across North Eastern Region corridors.
 * DEMO DATA: Simulated operational feeds for hackathon demonstration.
 */

window.NER_DATA = window.NER_DATA || {};

window.NER_DATA.alerts = [
  {
    id: "ALT-001",
    severity: "CRITICAL",
    type: "Landslide Risk",
    title: "Landslide Risk Detected — NH-2 Corridor (Senapati Sector)",
    location: "NH-2, Senapati Pass (km 218), Manipur",
    time: "8 min ago",
    timestamp: Date.now() - 8 * 60 * 1000,
    affectedVehicles: ["NER-104", "NER-308"],
    affectedRoutes: ["ROUTE-GW-IMP-A", "ROUTE-DIM-KOH"],
    recommendedAction: "Halt heavy vehicles at Dimapur staging. Execute AI alternate routing via NH-37 Jiribam corridor.",
    acknowledged: false,
    corridor: "NH-2 Primary Highway",
    details: "Geotechnical tilt sensors and satellite radar indicate unstable overburden slip. Roadway integrity compromised."
  },
  {
    id: "ALT-002",
    severity: "WARNING",
    type: "Heavy Rainfall",
    title: "Heavy Rainfall & Surface Flooding Alert",
    location: "Haflong Sector & Barak Basin, Dima Hasao",
    time: "14 min ago",
    timestamp: Date.now() - 14 * 60 * 1000,
    affectedVehicles: ["NER-221"],
    affectedRoutes: ["ROUTE-SIL-AIZ"],
    recommendedAction: "Impose 30 km/h hill speed limits. Switch convoy tracking to high-frequency 15-second telemetry polling.",
    acknowledged: false,
    corridor: "NH-306 Hill Ridge",
    details: "Precipitation exceeding 68 mm/hour with surface mud accumulation on unpaved roadway shoulders."
  },
  {
    id: "ALT-003",
    severity: "WARNING",
    type: "Vehicle Delay",
    title: "Vehicle NER-104 Schedule Delay (+28 Minutes)",
    location: "Kohima-Senapati Approach Corridor",
    time: "21 min ago",
    timestamp: Date.now() - 21 * 60 * 1000,
    affectedVehicles: ["NER-104"],
    affectedRoutes: ["ROUTE-GW-IMP-A"],
    recommendedAction: "Monitor cold chain medicine payload temp. Prepare auxiliary thermal battery check at next staging depot.",
    acknowledged: false,
    corridor: "NH-2 Corridor",
    details: "Traffic deceleration due to slow-moving civil transport convoy and intermittent rock debris clearance."
  },
  {
    id: "ALT-004",
    severity: "CRITICAL",
    type: "Structural Clearance",
    title: "Bridge Load Rating Restriction Advisory",
    location: "Silchar-Jiribam Feeder Bridge (Bridge #44)",
    time: "45 min ago",
    timestamp: Date.now() - 45 * 60 * 1000,
    affectedVehicles: ["NER-221"],
    affectedRoutes: ["ROUTE-GW-IMP-B"],
    recommendedAction: "Heavy low-bed trailers (>18T axle weight) must hold at Jiribam staging for structural engineer convoy clearance.",
    acknowledged: false,
    corridor: "NH-37 Corridor",
    details: "Substructure scour inspection underway following overnight torrential river current."
  },
  {
    id: "ALT-005",
    severity: "INFO",
    type: "Operational Protocol",
    title: "Monsoon Hill Route Protocol Active",
    location: "All 8 North Eastern States (Region-Wide)",
    time: "1h ago",
    timestamp: Date.now() - 60 * 60 * 1000,
    affectedVehicles: ["NER-104", "NER-221", "NER-308", "NER-415", "NER-619", "NER-730"],
    affectedRoutes: ["All Regional Corridors"],
    recommendedAction: "Mandatory tire pressure checks, satellite SOS ping verification, and dual-driver hill rosters.",
    acknowledged: true,
    corridor: "Regional Highway Network",
    details: "Standard operating procedure implemented in accordance with Regional Disaster Logistics Directive."
  },
  {
    id: "ALT-006",
    severity: "WARNING",
    type: "Flash Flood Watch",
    title: "Brahmaputra Low-Bank Flash Flood Watch",
    location: "Kaziranga NH-27 Corridor, Golaghat",
    time: "2h ago",
    timestamp: Date.now() - 120 * 60 * 1000,
    affectedVehicles: ["NER-730"],
    affectedRoutes: ["ROUTE-GW-IMP-A"],
    recommendedAction: "Route commercial carriers through high-embankment bypass if river telemetry rises by another 10 cm.",
    acknowledged: true,
    corridor: "NH-27 4-Lane",
    details: "Brahmaputra river basin telemetry registers elevated flood discharge from upper Dibang catchment."
  },
  {
    id: "ALT-007",
    severity: "INFO",
    type: "Cold Chain Telemetry",
    title: "Cold Chain Temperature Threshold Verified Normal",
    location: "Vehicle NER-415 (Nongpoh Bypass)",
    time: "3h ago",
    timestamp: Date.now() - 180 * 60 * 1000,
    affectedVehicles: ["NER-415"],
    affectedRoutes: ["ROUTE-GW-SHL"],
    recommendedAction: "Standard monitoring; temperature stable at -18.2 °C for vital pediatric vaccines.",
    acknowledged: true,
    corridor: "NH-6 Expressway",
    details: "Automated IoT temperature data-logger heartbeat received via cellular mesh gateway."
  },
  {
    id: "ALT-008",
    severity: "INFO",
    type: "Delivery Milestone",
    title: "Emergency Shelter Consignment Successfully Delivered",
    location: "Gomati District Depot, Udaipur, Tripura",
    time: "4h ago",
    timestamp: Date.now() - 240 * 60 * 1000,
    affectedVehicles: ["NER-502"],
    affectedRoutes: ["ROUTE-AGT-UDP"],
    recommendedAction: "Vehicle NER-502 scheduled for return deadhead cargo loading at Agartala IC Park.",
    acknowledged: true,
    corridor: "NH-8 Tripura South",
    details: "All 450 emergency relief shelter kits signed off with digital biometric chain-of-custody verification."
  }
];

// Helper to create the dynamic landslide alert
window.NER_DATA.createLandslideAlert = function() {
  return {
    id: "ALT-SIM-LANDSLIDE",
    severity: "CRITICAL",
    type: "Landslide Catastrophe",
    title: "CRITICAL — LANDSLIDE DETECTED on NH-2 Corridor",
    location: "NH-2 Senapati-Kohima Pass (km 218), Manipur",
    time: "Just now",
    timestamp: Date.now(),
    affectedVehicles: ["NER-104", "NER-308"],
    affectedRoutes: ["ROUTE-GW-IMP-A", "ROUTE-DIM-KOH"],
    recommendedAction: "IMMEDIATE REROUTING: Divert Vehicle NER-104 to Route B (NH-37 Jiribam Bypass). NH-2 is completely impassable.",
    acknowledged: false,
    corridor: "NH-2 Primary Highway",
    details: "SIMULATION TRIGGERED: High-velocity mud & rock avalanche confirmed by BRO hill patrol. Highway shut down indefinitely for clearance operations.",
    simulated: true
  };
};
