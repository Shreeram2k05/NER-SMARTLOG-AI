/**
 * NER-SMARTLOG AI - Demo Routes Dataset
 * Accurate geographic coordinate paths across North Eastern Region corridors.
 * DEMO DATA: Simulated coordinates along actual national highway corridors.
 */

window.NER_DATA = window.NER_DATA || {};

window.NER_DATA.routes = [
  {
    id: "ROUTE-GW-IMP-A",
    name: "Route A — NH-2 Primary Corridor (Direct Pass)",
    origin: "Guwahati",
    destination: "Imphal",
    mode: "Road",
    distance: "312 km",
    distanceKm: 312,
    eta: "7h 20m",
    etaMinutes: 440,
    cost: "₹18,500",
    costNum: 18500,
    risk: "LOW",
    accessibility: "91%",
    accessibilityNum: 91,
    confidence: "94%",
    terrain: "Ghat road / Highland passes (NH-2)",
    status: "RECOMMENDED",
    isAlternate: false,
    corridors: ["NH-27", "NH-29", "NH-2"],
    checkpoints: [
      { name: "Guwahati Hub", lat: 26.1445, lng: 91.7362, time: "0h 00m" },
      { name: "Nagaon Junction", lat: 26.3452, lng: 92.6840, time: "1h 50m" },
      { name: "Dimapur Checkpost", lat: 25.9068, lng: 93.7272, time: "3h 40m" },
      { name: "Kohima Transit", lat: 25.6751, lng: 94.1086, time: "4h 55m" },
      { name: "Senapati Gorge (NH-2)", lat: 25.2678, lng: 94.0185, time: "5h 50m" },
      { name: "Kangpokpi Valley", lat: 25.1480, lng: 93.9680, time: "6h 25m" },
      { name: "Imphal Valley Hub", lat: 24.8170, lng: 93.9368, time: "7h 20m" }
    ],
    // High-resolution polyline waypoints for Leaflet (Guwahati to Imphal via NH-2)
    coordinates: [
      [26.1445, 91.7362], // Guwahati
      [26.1820, 91.9540],
      [26.2150, 92.2350],
      [26.3452, 92.6840], // Nagaon
      [26.1520, 93.1800],
      [26.0120, 93.4500],
      [25.9068, 93.7272], // Dimapur
      [25.8200, 93.8500],
      [25.7420, 93.9900],
      [25.6751, 94.1086], // Kohima
      [25.4800, 94.0600],
      [25.2678, 94.0185], // Senapati (Vulnerable landslide zone)
      [25.1480, 93.9680], // Kangpokpi
      [24.9820, 93.9450],
      [24.8170, 93.9368]  // Imphal
    ],
    aiRationale: [
      "Optimal balance of gradient stability and travel time under dry conditions",
      "Direct 4-lane coverage up to Dimapur bypassing valley flood zones",
      "Cold chain temperature variance remains minimal (<1.2 °C deviation)",
      "High density of emergency breakdown staging points"
    ]
  },
  {
    id: "ROUTE-GW-IMP-B",
    name: "Route B — NH-37 Jiribam Bypass (AI Alternate Corridor)",
    origin: "Guwahati",
    destination: "Imphal",
    mode: "Road",
    distance: "328 km",
    distanceKm: 328,
    eta: "7h 42m",
    etaMinutes: 462,
    cost: "₹19,200",
    costNum: 19200,
    risk: "LOW",
    accessibility: "89%",
    accessibilityNum: 89,
    confidence: "91%",
    terrain: "Barak Valley River Corridor & Hill Bypass (NH-37)",
    status: "ALTERNATE",
    isAlternate: true,
    corridors: ["NH-27", "NH-6", "NH-37"],
    checkpoints: [
      { name: "Guwahati Hub", lat: 26.1445, lng: 91.7362, time: "0h 00m" },
      { name: "Lumding Bypass", lat: 25.7500, lng: 93.1700, time: "2h 40m" },
      { name: "Silchar Freight Terminal", lat: 24.8333, lng: 92.7789, time: "4h 30m" },
      { name: "Jiribam Border Hub", lat: 24.8020, lng: 93.1250, time: "5h 25m" },
      { name: "Noney Hill Transit", lat: 24.7890, lng: 93.5820, time: "6h 40m" },
      { name: "Imphal Valley Hub", lat: 24.8170, lng: 93.9368, time: "7h 42m" }
    ],
    // High-resolution polyline waypoints for Leaflet (Guwahati to Imphal via Silchar/Jiribam NH-37)
    coordinates: [
      [26.1445, 91.7362], // Guwahati
      [26.1820, 91.9540],
      [26.0500, 92.5100],
      [25.7500, 93.1700], // Lumding
      [25.1700, 92.9800], // Haflong approach
      [24.8333, 92.7789], // Silchar
      [24.8020, 93.1250], // Jiribam
      [24.7950, 93.3800],
      [24.7890, 93.5820], // Noney
      [24.8050, 93.7500],
      [24.8170, 93.9368]  // Imphal
    ],
    aiRationale: [
      "Completely bypasses the NH-2 Senapati/Kohima landslide sector",
      "Paved all-weather reinforced retaining walls on NH-37 modern upgrade",
      "Only +22 mins additional transit time compared to blocked corridor",
      "Maintains continuous mobile telemetry coverage across 92% of corridor"
    ]
  },
  {
    id: "ROUTE-GW-IMP-C",
    name: "Route C — South Cachar & Churachandpur Ridge",
    origin: "Guwahati",
    destination: "Imphal",
    mode: "Road",
    distance: "355 km",
    distanceKm: 355,
    eta: "8h 10m",
    etaMinutes: 490,
    cost: "₹21,400",
    costNum: 21400,
    risk: "HIGH",
    accessibility: "72%",
    accessibilityNum: 72,
    confidence: "82%",
    terrain: "Unpaved high gradient ridge passes",
    status: "HIGH RISK",
    isAlternate: false,
    corridors: ["NH-6", "SH-14"],
    checkpoints: [
      { name: "Guwahati Hub", lat: 26.1445, lng: 91.7362, time: "0h 00m" },
      { name: "Shillong Plateau", lat: 25.5788, lng: 91.8933, time: "2h 00m" },
      { name: "Jowai Transit", lat: 25.4450, lng: 92.2050, time: "3h 15m" },
      { name: "Churachandpur Approach", lat: 24.3330, lng: 93.6700, time: "6h 45m" },
      { name: "Imphal Valley Hub", lat: 24.8170, lng: 93.9368, time: "8h 10m" }
    ],
    coordinates: [
      [26.1445, 91.7362],
      [25.8200, 91.8800],
      [25.5788, 91.8933],
      [25.4450, 92.2050],
      [25.1000, 92.4500],
      [24.5800, 92.9500],
      [24.3330, 93.6700],
      [24.5500, 93.8200],
      [24.8170, 93.9368]
    ],
    aiRationale: [
      "Severe gradient on southern Meghalaya-Manipur boundary roads",
      "Restricted bridge axle weight under 10 metric tons",
      "High probability of localized monsoon flash ruts"
    ]
  },
  // Additional regional routes
  {
    id: "ROUTE-GW-SHL",
    name: "Guwahati to Shillong Expressway Corridor",
    origin: "Guwahati",
    destination: "Shillong",
    mode: "Road",
    distance: "100 km",
    distanceKm: 100,
    eta: "2h 15m",
    etaMinutes: 135,
    cost: "₹6,800",
    costNum: 6800,
    risk: "LOW",
    accessibility: "96%",
    accessibilityNum: 96,
    confidence: "98%",
    terrain: "4-lane engineered mountain expressway (NH-6)",
    checkpoints: [
      { name: "Guwahati Hub", lat: 26.1445, lng: 91.7362, time: "0h 00m" },
      { name: "Nongpoh Transit", lat: 25.9000, lng: 91.8800, time: "1h 10m" },
      { name: "Shillong Depot", lat: 25.5788, lng: 91.8933, time: "2h 15m" }
    ],
    coordinates: [
      [26.1445, 91.7362],
      [26.0200, 91.8500],
      [25.9000, 91.8800],
      [25.7300, 91.9000],
      [25.5788, 91.8933]
    ]
  },
  {
    id: "ROUTE-SIL-AIZ",
    name: "Silchar to Aizawl NH-306 Ridge Highway",
    origin: "Silchar",
    destination: "Aizawl",
    mode: "Road",
    distance: "178 km",
    distanceKm: 178,
    eta: "4h 31m",
    etaMinutes: 271,
    cost: "₹12,400",
    costNum: 12400,
    risk: "MEDIUM",
    accessibility: "79%",
    accessibilityNum: 79,
    confidence: "88%",
    terrain: "Hill ridge winding road with steep hairpin curves",
    checkpoints: [
      { name: "Silchar Depot", lat: 24.8333, lng: 92.7789, time: "0h 00m" },
      { name: "Vairengte Gate", lat: 24.5100, lng: 92.7500, time: "1h 20m" },
      { name: "Kolasib Ridge", lat: 24.2300, lng: 92.6800, time: "2h 45m" },
      { name: "Aizawl Terminal", lat: 23.7271, lng: 92.7176, time: "4h 31m" }
    ],
    coordinates: [
      [24.8333, 92.7789],
      [24.6800, 92.7600],
      [24.5100, 92.7500],
      [24.3120, 92.7450],
      [24.2300, 92.6800],
      [23.9500, 92.7100],
      [23.7271, 92.7176]
    ]
  },
  {
    id: "ROUTE-DIM-KOH",
    name: "Dimapur to Kohima 4-Lane Hill Pass",
    origin: "Dimapur",
    destination: "Kohima",
    mode: "Road",
    distance: "74 km",
    distanceKm: 74,
    eta: "1h 52m",
    etaMinutes: 112,
    cost: "₹5,200",
    costNum: 5200,
    risk: "HIGH",
    accessibility: "84%",
    accessibilityNum: 84,
    confidence: "90%",
    terrain: "Active geotechnical landslide zone (NH-29)",
    checkpoints: [
      { name: "Dimapur Hub", lat: 25.9068, lng: 93.7272, time: "0h 00m" },
      { name: "Chumukedima Pass", lat: 25.8200, lng: 93.8200, time: "0h 35m" },
      { name: "Zubza Staging", lat: 25.7500, lng: 93.8800, time: "1h 10m" },
      { name: "Kohima Depot", lat: 25.6751, lng: 94.1086, time: "1h 52m" }
    ],
    coordinates: [
      [25.9068, 93.7272],
      [25.8200, 93.8200],
      [25.7500, 93.8800],
      [25.7100, 94.0200],
      [25.6751, 94.1086]
    ]
  }
];

// Multimodal logistics configurations for Guwahati -> Imphal
window.NER_DATA.multimodalRoutes = [
  {
    id: "MM-ROAD-RAIL-ROAD",
    title: "ROAD → RAIL → ROAD",
    origin: "Guwahati Hub",
    destination: "Imphal Valley",
    distance: "440 km",
    eta: "10h 15m",
    cost: "₹14,200",
    risk: "LOW",
    riskBadge: "success",
    transfers: 2,
    carbonSavings: "38% less CO2",
    segments: [
      { mode: "road", from: "Guwahati Hub", to: "Lumding Jn", distance: "175 km", eta: "3h 30m", icon: "fa-truck" },
      { mode: "rail", from: "Lumding NFR Depot", to: "Silchar Freight Terminal", distance: "125 km", eta: "4h 15m", icon: "fa-train" },
      { mode: "road", from: "Silchar Depot", to: "Imphal Central", distance: "140 km", eta: "2h 30m", icon: "fa-truck" }
    ],
    coordinates: [
      [26.1445, 91.7362], // Guwahati
      [26.3452, 92.6840], // Nagaon
      [25.7500, 93.1700], // Lumding (Rail transfer)
      [25.1700, 92.9800], // Haflong Hill Section
      [24.8333, 92.7789], // Silchar (Rail transfer)
      [24.8020, 93.1250], // Jiribam
      [24.7890, 93.5820], // Noney
      [24.8170, 93.9368]  // Imphal
    ]
  },
  {
    id: "MM-ROAD-AIR-ROAD",
    title: "ROAD → AIR → ROAD",
    origin: "Guwahati Hub",
    destination: "Imphal Valley",
    distance: "296 km",
    eta: "3h 10m",
    cost: "₹38,500",
    risk: "LOW",
    riskBadge: "info",
    transfers: 2,
    carbonSavings: "Express Priority Speed",
    segments: [
      { mode: "road", from: "Guwahati Cold Store", to: "LGBI Airport Cargo Gate", distance: "22 km", eta: "0h 45m", icon: "fa-truck" },
      { mode: "air", from: "LGBI Airport (GAU)", to: "Bir Tikendrajit Airport (IMF)", distance: "260 km", eta: "0h 55m", icon: "fa-plane" },
      { mode: "road", from: "Imphal Airport Apron", to: "RIMS Regional Hospital", distance: "14 km", eta: "0h 30m", icon: "fa-truck-medical" }
    ],
    coordinates: [
      [26.1445, 91.7362], // Guwahati Hub
      [26.1060, 91.5859], // LGBI Airport
      [24.7600, 93.8967], // Imphal Airport
      [24.8170, 93.9368]  // Imphal Hospital / Valley
    ]
  },
  {
    id: "MM-ROAD-ROAD",
    title: "ROAD → ROAD (Direct Highway)",
    origin: "Guwahati Hub",
    destination: "Imphal Valley",
    distance: "312 km",
    eta: "7h 20m",
    cost: "₹18,500",
    risk: "LOW", // Switches to HIGH in Landslide mode
    riskBadge: "warning",
    transfers: 0,
    carbonSavings: "Standard Freight Baseline",
    segments: [
      { mode: "road", from: "Guwahati Hub", to: "Dimapur Checkpost", distance: "240 km", eta: "4h 00m", icon: "fa-truck" },
      { mode: "road", from: "Dimapur Checkpost", to: "Imphal Valley", distance: "72 km", eta: "3h 20m", icon: "fa-truck" }
    ],
    coordinates: [
      [26.1445, 91.7362],
      [26.3452, 92.6840],
      [25.9068, 93.7272],
      [25.6751, 94.1086],
      [25.2678, 94.0185],
      [24.8170, 93.9368]
    ]
  }
];

// Logistics hubs with precise geographic coordinates
window.NER_DATA.hubs = [
  { id: "HUB-GAU", name: "Guwahati Gateway Logistics Hub", state: "Assam", lat: 26.1445, lng: 91.7362, capacity: "12,000 MT", activeVehicles: 48, status: "OPERATIONAL", type: "Multimodal Gateway" },
  { id: "HUB-SIL", name: "Silchar Southern Barak Depot", state: "Assam", lat: 24.8333, lng: 92.7789, capacity: "4,500 MT", activeVehicles: 19, status: "OPERATIONAL", type: "Rail & Road Hub" },
  { id: "HUB-DIM", name: "Dimapur Railhead Logistics Terminal", state: "Nagaland", lat: 25.9068, lng: 93.7272, capacity: "5,800 MT", activeVehicles: 23, status: "OPERATIONAL", type: "Rail Freight Terminal" },
  { id: "HUB-IMP", name: "Imphal Valley Cargo Terminal", state: "Manipur", lat: 24.8170, lng: 93.9368, capacity: "3,200 MT", activeVehicles: 15, status: "OPERATIONAL", type: "Hill Distribution Hub" },
  { id: "HUB-SHL", name: "Shillong Plateau Depot", state: "Meghalaya", lat: 25.5788, lng: 91.8933, capacity: "2,800 MT", activeVehicles: 12, status: "OPERATIONAL", type: "Express Corridor Hub" },
  { id: "HUB-KOH", name: "Kohima Transit & Staging Park", state: "Nagaland", lat: 25.6751, lng: 94.1086, capacity: "2,100 MT", activeVehicles: 9, status: "OPERATIONAL", type: "Ghat Staging Depot" },
  { id: "HUB-AIZ", name: "Aizawl Ridge Logistics Base", state: "Mizoram", lat: 23.7271, lng: 92.7176, capacity: "2,400 MT", activeVehicles: 8, status: "OPERATIONAL", type: "Hill Distribution Hub" },
  { id: "HUB-AGT", name: "Agartala Integrated Checkpost Park", state: "Tripura", lat: 23.8315, lng: 91.2868, capacity: "3,900 MT", activeVehicles: 14, status: "OPERATIONAL", type: "Cross-Border Terminal" },
  { id: "HUB-ITN", name: "Itanagar Foothills Staging Depot", state: "Arunachal Pradesh", lat: 27.0844, lng: 93.6053, capacity: "1,800 MT", activeVehicles: 7, status: "OPERATIONAL", type: "Foothill Staging" },
  { id: "HUB-GTK", name: "Gangtok High Altitude Logistics Station", state: "Sikkim", lat: 27.3389, lng: 88.6065, capacity: "1,200 MT", activeVehicles: 6, status: "OPERATIONAL", type: "High-Altitude Depot" }
];
