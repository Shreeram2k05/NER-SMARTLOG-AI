/**
 * NER-SMARTLOG AI - Demo Vehicles Dataset
 * Realistic simulated fleet operating across North Eastern Region corridors.
 * DEMO DATA DISCLAIMER: Simulated for hackathon & demonstration purposes.
 */

window.NER_DATA = window.NER_DATA || {};

window.NER_DATA.vehicles = [
  {
    id: "NER-104",
    driver: "Rajiv K. Sharma",
    phone: "+91 98640 12845",
    cargo: "Medicines & Emergency Vaccines",
    category: "Medicines",
    origin: "Guwahati",
    destination: "Imphal",
    lat: 25.6800,
    lng: 93.9200, // Near Kohima/Senapati approach on NH-2
    status: "ON ROUTE",
    eta: "7h 20m",
    initialEta: "7h 20m",
    risk: "LOW",
    speed: 46,
    temp: "3.8 °C",
    fuel: "78%",
    battery: "94%",
    routeId: "ROUTE-GW-IMP-A",
    route: "NH-2 Primary Highway Corridor via Senapati",
    lastUpdated: "2 mins ago",
    checkpointsPassed: 3,
    totalCheckpoints: 6,
    currentLocationName: "Approaching Senapati Pass (NH-2)",
    alertHistory: [
      { time: "21m ago", msg: "Entering highland ghat road sector. Speed regulated to 45 km/h." },
      { time: "1h 10m ago", msg: "Cold chain temperature verified stable at 3.8 °C." }
    ]
  },
  {
    id: "NER-221",
    driver: "B. Lalthanga",
    phone: "+91 94361 77312",
    cargo: "Food Rations & Essential Grains",
    category: "Food",
    origin: "Silchar",
    destination: "Aizawl",
    lat: 24.3120,
    lng: 92.7450, // Between Vairengte and Kolasib
    status: "DELAYED",
    eta: "4h 31m",
    initialEta: "3h 45m",
    risk: "MEDIUM",
    speed: 28,
    temp: "Ambient",
    fuel: "62%",
    battery: "88%",
    routeId: "ROUTE-SIL-AIZ",
    route: "NH-306 Barak to Mizoram Ridge Highway",
    lastUpdated: "5 mins ago",
    checkpointsPassed: 2,
    totalCheckpoints: 4,
    currentLocationName: "Near Kolasib Forest Pass (NH-306)",
    alertHistory: [
      { time: "14m ago", msg: "Heavy rainfall slowdown: +46 mins delay recorded." }
    ]
  },
  {
    id: "NER-308",
    driver: "Temjen Ao",
    phone: "+91 98560 34190",
    cargo: "Bridge Construction Materials",
    category: "Construction Materials",
    origin: "Dimapur",
    destination: "Kohima",
    lat: 25.7500,
    lng: 93.8800, // Zubza hill pass
    status: "AT RISK",
    eta: "1h 52m",
    initialEta: "1h 15m",
    risk: "HIGH",
    speed: 22,
    temp: "N/A",
    fuel: "85%",
    battery: "91%",
    routeId: "ROUTE-DIM-KOH",
    route: "NH-29 Dimapur-Kohima 4-Lane Hill Pass",
    lastUpdated: "Just now",
    checkpointsPassed: 1,
    totalCheckpoints: 3,
    currentLocationName: "Zubza Valley Ascent",
    alertHistory: [
      { time: "8m ago", msg: "Loose debris reported on roadway shoulder. Caution advisory." }
    ]
  },
  {
    id: "NER-415",
    driver: "M. Sangma",
    phone: "+91 97740 65201",
    cargo: "Sub-Zero Cold Chain Vaccines",
    category: "Medicines",
    origin: "Guwahati",
    destination: "Shillong",
    lat: 25.8200,
    lng: 91.8800, // Nongpoh bypass
    status: "ON ROUTE",
    eta: "0h 48m",
    initialEta: "1h 45m",
    risk: "LOW",
    speed: 54,
    temp: "-18.2 °C",
    fuel: "91%",
    battery: "98%",
    routeId: "ROUTE-GW-SHL",
    route: "NH-6 Guwahati-Shillong Expressway",
    lastUpdated: "1 min ago",
    checkpointsPassed: 3,
    totalCheckpoints: 4,
    currentLocationName: "Nongpoh Expressway Sector",
    alertHistory: [
      { time: "40m ago", msg: "Departed Guwahati Central Cold Storage Hub." }
    ]
  },
  {
    id: "NER-502",
    driver: "Pranab Debbarma",
    phone: "+91 94365 89114",
    cargo: "Disaster Emergency Shelter Kits",
    category: "Emergency Supplies",
    origin: "Agartala",
    destination: "Udaipur",
    lat: 23.5350,
    lng: 91.4820,
    status: "DELIVERED",
    eta: "Completed",
    initialEta: "1h 20m",
    risk: "LOW",
    speed: 0,
    temp: "Ambient",
    fuel: "72%",
    battery: "100%",
    routeId: "ROUTE-AGT-UDP",
    route: "NH-8 Tripura South Trunk Corridor",
    lastUpdated: "32 mins ago",
    checkpointsPassed: 3,
    totalCheckpoints: 3,
    currentLocationName: "Gomati District Logistics Depot",
    alertHistory: [
      { time: "32m ago", msg: "Consignment successfully delivered and signed off." }
    ]
  },
  {
    id: "NER-619",
    driver: "Tashi Dorjee",
    phone: "+91 96492 48102",
    cargo: "High-Altitude Certified Solar Units",
    category: "Emergency Supplies",
    origin: "Siliguri",
    destination: "Gangtok",
    lat: 27.1800,
    lng: 88.5100, // Teesta river gorge
    status: "ON ROUTE",
    eta: "2h 10m",
    initialEta: "3h 30m",
    risk: "MEDIUM",
    speed: 34,
    temp: "Ambient",
    fuel: "80%",
    battery: "92%",
    routeId: "ROUTE-SLG-GTK",
    route: "NH-10 Teesta River Canyon Route",
    lastUpdated: "3 mins ago",
    checkpointsPassed: 2,
    totalCheckpoints: 4,
    currentLocationName: "Rangpo Border Checkpost",
    alertHistory: [
      { time: "52m ago", msg: "Teesta river water level monitored normal at Singtam." }
    ]
  },
  {
    id: "NER-730",
    driver: "Nabam Tuki Jr.",
    phone: "+91 94022 19340",
    cargo: "Fresh Agricultural Produce & Oranges",
    category: "Agricultural Produce",
    origin: "Tezpur",
    destination: "Itanagar",
    lat: 26.9600,
    lng: 93.4200,
    status: "ON ROUTE",
    eta: "1h 35m",
    initialEta: "2h 50m",
    risk: "LOW",
    speed: 48,
    temp: "12.0 °C",
    fuel: "68%",
    battery: "90%",
    routeId: "ROUTE-TEZ-ITN",
    route: "NH-415 Banderdewa Foothill Highway",
    lastUpdated: "7 mins ago",
    checkpointsPassed: 2,
    totalCheckpoints: 3,
    currentLocationName: "Holongi Border Staging Area",
    alertHistory: [
      { time: "1h ago", msg: "Agricultural transit manifest verified." }
    ]
  },
  {
    id: "NER-814",
    driver: "Imran Hussain",
    phone: "+91 98540 66299",
    cargo: "Rural Water Purification Systems",
    category: "Emergency Supplies",
    origin: "Guwahati",
    destination: "Dhubri",
    lat: 26.1100,
    lng: 90.6500,
    status: "IDLE",
    eta: "Departing in 25m",
    initialEta: "4h 10m",
    risk: "LOW",
    speed: 0,
    temp: "Ambient",
    fuel: "98%",
    battery: "100%",
    routeId: "ROUTE-GW-DHU",
    route: "NH-17 Lower Brahmaputra Highway",
    lastUpdated: "12 mins ago",
    checkpointsPassed: 0,
    totalCheckpoints: 4,
    currentLocationName: "Guwahati Inland Waterway Terminal Staging",
    alertHistory: [
      { time: "15m ago", msg: "Pre-departure checklist complete. Awaiting driver departure clearance." }
    ]
  }
];
