/**
 * NER-SMARTLOG AI - Disruptions & Threat Intelligence Dataset
 * DEMO DATA DISCLAIMER: Predictive disruption metrics are simulated for demonstration.
 */

window.NER_DATA = window.NER_DATA || {};

window.NER_DATA.disruptions = [
  {
    id: "DIS-001",
    type: "Landslide",
    title: "Geotechnical Slope Failure & Landslide Hazard",
    location: "NH-2 Corridor, Senapati-Kohima Sector",
    district: "Senapati",
    state: "Manipur",
    lat: 25.2678,
    lng: 94.0185,
    severity: "CRITICAL",
    probability: "88%",
    confidence: "92%",
    predictedTime: "Immediate (Next 45 mins)",
    status: "ACTIVE",
    impactRadiusMeters: 4500,
    impact: "Complete blockage for heavy vehicles on NH-2. Average detour delay +1h 45m.",
    affectedVehicles: ["NER-104", "NER-308"],
    affectedRoutes: ["ROUTE-GW-IMP-A", "ROUTE-DIM-KOH"],
    recommendedAction: "Divert all Class-IV and heavy freight via NH-37 Jiribam-Silchar corridor immediately.",
    isSimulatedLandslide: true
  },
  {
    id: "DIS-002",
    type: "Heavy Rainfall",
    title: "Extreme Precipitation (>75mm/h) Cloudburst Warning",
    location: "Haflong Hill Section & Barak Basin",
    district: "Dima Hasao",
    state: "Assam",
    lat: 25.1700,
    lng: 92.9800,
    severity: "WARNING",
    probability: "91%",
    confidence: "95%",
    predictedTime: "In 1 Hour",
    status: "ACTIVE",
    impactRadiusMeters: 12000,
    impact: "Severe surface runoff, reduced tire traction, and visibility under 25 meters.",
    affectedVehicles: ["NER-221"],
    affectedRoutes: ["ROUTE-SIL-AIZ"],
    recommendedAction: "Impose mandatory 30 km/h speed governor limit and switch vehicles to low-beam fog matrix.",
    isSimulatedLandslide: false
  },
  {
    id: "DIS-003",
    type: "Traffic Congestion",
    title: "Border Checkpoint Commercial Truck Queue Bottleneck",
    location: "Chumukedima Inter-State Toll Gate",
    district: "Dimapur",
    state: "Nagaland",
    lat: 25.8200,
    lng: 93.8200,
    severity: "INFO",
    probability: "65%",
    confidence: "81%",
    predictedTime: "In 2 Hours",
    status: "MONITORING",
    impactRadiusMeters: 3000,
    impact: "Freight clearance backlog reaching 3.2 km; estimated dwell time 45 minutes.",
    affectedVehicles: ["NER-308"],
    affectedRoutes: ["ROUTE-DIM-KOH", "ROUTE-GW-IMP-A"],
    recommendedAction: "Activate automated e-way RFID fast lane clearance at Dimapur staging.",
    isSimulatedLandslide: false
  },
  {
    id: "DIS-004",
    type: "Flood Risk",
    title: "Low-bank River Overflow Inundation Alert",
    location: "Kaziranga NH-27 Lowland Culvert Segment",
    district: "Golaghat",
    state: "Assam",
    lat: 26.5800,
    lng: 93.4100,
    severity: "WARNING",
    probability: "62%",
    confidence: "84%",
    predictedTime: "In 4 Hours",
    status: "MONITORING",
    impactRadiusMeters: 8000,
    impact: "Brahmaputra backwaters rising within 15 cm of asphalt deck level.",
    affectedVehicles: ["NER-104", "NER-730"],
    affectedRoutes: ["ROUTE-GW-IMP-A"],
    recommendedAction: "Monitor National Highway telemetry gauges every 15 minutes; prepare diversion via Golaghat town bypass.",
    isSimulatedLandslide: false
  },
  {
    id: "DIS-005",
    type: "Road Blockage",
    title: "Emergency Culvert & Retaining Wall Scour Repair",
    location: "Silchar-Jiribam Border Bridge approach",
    district: "Cachar",
    state: "Assam",
    lat: 24.8150,
    lng: 93.0500,
    severity: "WARNING",
    probability: "75%",
    confidence: "88%",
    predictedTime: "Active repair",
    status: "ACTIVE",
    impactRadiusMeters: 2500,
    impact: "Single-lane alternating convoy movement; expected delay 25-35 minutes.",
    affectedVehicles: ["NER-221"],
    affectedRoutes: ["ROUTE-GW-IMP-B"],
    recommendedAction: "Coordinate with Border Roads Organisation (BRO) project team for prioritized medical freight slots.",
    isSimulatedLandslide: false
  }
];

// Predictive disruption cards overview metrics
window.NER_DATA.disruptionMetrics = {
  landslide: { risk: 78, confidence: 89, trend: "+14%", badge: "CRITICAL" },
  flood: { risk: 62, confidence: 84, trend: "+6%", badge: "WARNING" },
  rainfall: { risk: 91, confidence: 95, trend: "+22%", badge: "HIGH" },
  congestion: { risk: 43, confidence: 81, trend: "-4%", badge: "MODERATE" }
};

// Timeline view events
window.NER_DATA.disruptionTimeline = [
  {
    timeLabel: "NOW",
    eventTitle: "Landslide Risk on NH-2 Corridor",
    district: "Senapati, Manipur",
    severity: "critical",
    icon: "fa-hill-rockslide",
    description: "Geotechnical sensors detect slope soil creep on NH-2 pass near km marker 218.",
    impact: "Affects Guwahati ➔ Imphal primary corridor. High risk of debris flow."
  },
  {
    timeLabel: "+1 HOUR",
    eventTitle: "Heavy Rainfall Front Influx",
    district: "Haflong & Barak Basin",
    severity: "warning",
    icon: "fa-cloud-showers-heavy",
    description: "Doppler radar indicates severe convective rainfall cell moving East-Northeast.",
    impact: "Speed reduction along hill roads by 35-45% due to reduced visibility."
  },
  {
    timeLabel: "+2 HOURS",
    eventTitle: "Traffic Congestion Backlog",
    district: "Chumukedima, Dimapur",
    severity: "info",
    icon: "fa-car-tunnel",
    description: "Inter-state border document check bottleneck compounding freight queues.",
    impact: "Dwell time expected to increase by 45 minutes for non-RFID trucks."
  },
  {
    timeLabel: "+4 HOURS",
    eventTitle: "Riverbed Flash Flood Vulnerability",
    district: "Kaziranga - Golaghat lowlands",
    severity: "warning",
    icon: "fa-water",
    description: "Tributary water crest forecast to hit riverbed culverts along NH-27.",
    impact: "Light commercial vehicles will require high-clearance escort."
  }
];
