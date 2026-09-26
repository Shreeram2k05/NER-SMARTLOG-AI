# NER-SMARTLOG AI
### AI-Based Smart Logistics & Accessibility Intelligence Platform for the North Eastern Region

> **PREDICT. PLAN. OPTIMIZE. TRACK. ALERT. REROUTE.**  
> *Enterprise-Grade Command-and-Control Platform for Smart India Hackathon & Government Logistics Demonstrations.*  
> **DEMO ENVIRONMENT • SIMULATED DATA**

---

## 1. Project Overview

**NER-SMARTLOG AI** is an advanced AI-powered logistics intelligence and accessibility command center designed specifically for the unique geographic, geopolitical, and meteorological challenges of India's North Eastern Region (8 States: Assam, Arunachal Pradesh, Nagaland, Manipur, Mizoram, Tripura, Meghalaya, and Sikkim).

Unlike generic delivery dashboards or simple navigation apps, NER-SMARTLOG AI addresses:
- **Severe Terrain Isolation**: Vulnerable mountain passes, steep ghat roads, and monsoonal soil slip hazards.
- **Dynamic Disruption Prediction**: Geotechnical landslide detection, river basin flood inundation forecasting, and cloudburst weather alerts.
- **Lifeline Cold-Chain & Medical Supply Assurance**: Pediatric vaccines and emergency pharmaceuticals protected via real-time telemetry and sub-second alternate routing.
- **Multimodal Synchromodality**: Seamless combination of Road, Rail (NFR Freight Express), and Air Cargo to bypass blocked corridors and reduce carbon emissions.
- **Accessibility & Connectivity Gaps**: Deep GIS analysis of underserved districts (e.g., Tamenglong, Upper Siang, Mon, Mangan) to pinpoint logistical bottlenecks and emergency medical transit deficits.

---

## 2. Key Features

| Module | Description |
| :--- | :--- |
| **Command Center GIS** | Large-scale Leaflet map displaying real geographic coordinates across the 8 NER states with toggleable layers for Fleet, Corridors, Hazard Zones, Accessibility Heatmaps, and Logistics Hubs. |
| **AI Route Optimizer** | Decision engine evaluating terrain gradient, precipitation radar, and hazard probability to output verified optimal routes with interactive waypoint checkpoints and alternative corridor comparisons. |
| **Explainable AI (XAI)** | Transparent reasoning panel detailing *why* a route was recommended (e.g., 42% lower disruption risk, avoids convective rain, preserves cold chain stability). |
| **Multimodal Planner** | Comparative route matrix across `ROAD → RAIL → ROAD`, `ROAD → AIR → ROAD`, and `ROAD → ROAD` direct transit with cost, transit time, and carbon-reduction indices. |
| **Disruption Intelligence** | Real-time hazard telemetry cards with predictive confidence meters and an interactive incident timeline (`NOW`, `+1 HOUR`, `+2 HOURS`, `+4 HOURS`). |
| **Accessibility Intelligence** | Vulnerability classification (🟢 HIGH, 🟡 MEDIUM, 🟠 LOW, 🔴 CRITICAL GAP) with district deep-dive analysis (Tamenglong, Senapati, Dima Hasao, Upper Siang, etc.). |
| **Live Vehicle Tracking** | Fleet telemetry monitoring speed, cargo, driver contact, and simulated GPS movement with vehicle detail cards and instant driver communication links. |
| **Alert Center** | Multi-tier severity alerts (`CRITICAL`, `WARNING`, `INFO`) with live corridor filters and localStorage audit acknowledgement. |
| **Field Crowdsourcing** | Driver incident reporting form with simulated offline storage, GPS coordinate capture, photo proof upload, and batch synchronization (`SYNC NOW`). |
| **Resilience Analytics** | Chart.js visualizations for corridor delay trends, monthly disruption counts, district connectivity, vehicle utilization, risk distributions, and AI vs. baseline delivery success. |

---

## 3. Technology Stack

- **Markup & Layout**: HTML5 Semantic markup with accessibility compliance (WCAG standards).
- **Styling**: Vanilla CSS3 custom dark navy command-center theme with subtle glassmorphism and responsive CSS Grid/Flexbox.
- **Interactivity**: Vanilla JavaScript (ES6+) with zero build tools, bundlers, or package installations.
- **Geospatial Mapping**: Leaflet.js (v1.9.4) with CartoDB Dark Matter / OpenStreetMap tiles.
- **Data Visualization**: Chart.js (v4.4.x).
- **Icons & Typography**: Font Awesome 6.5.1, Plus Jakarta Sans, and JetBrains Mono.
- **Storage**: Centralized reactive JavaScript state (`appState`) with HTML5 LocalStorage persistence.

> **Zero Dependencies / No Installation**: No React, Vue, Angular, Node.js, Next.js, Bootstrap, Tailwind, Webpack, Vite, npm, or TypeScript. Runs directly by double-clicking `index.html`.

---

## 4. Project Folder Structure

```
NER-SMARTLOG-AI/
│
├── index.html                  # Single-Page Application (SPA) entrypoint
├── style.css                   # Enterprise Command Center styling
├── script.js                   # Master Controller, AI Decision Engine & State
│
├── assets/
│   ├── logo/
│   │   ├── logo.svg            # Vector branding emblem
│   │   └── favicon.svg         # Favicon icon
│   ├── icons/
│   └── images/
│
├── data/                       # Decoupled mock datasets (API-ready)
│   ├── vehicles.js             # Fleet telemetry & driver records
│   ├── routes.js               # Geographic highway coordinates & checkpoints
│   ├── disruptions.js          # Geotechnical hazard records & timeline
│   ├── districts.js            # Accessibility indices for 8 NER states
│   ├── alerts.js               # Multi-severity operational alert feed
│   └── analytics.js            # Multi-timeframe Chart.js metric datasets
│
└── README.md                   # Technical documentation and presentation guide
```

---

## 5. How to Run the Application

1. **Option 1: Direct File Launch (No Server Needed)**
   - Navigate to the `NER-SMARTLOG-AI/` directory.
   - Double-click **`index.html`** or right-click and choose any modern browser (Chrome, Edge, Firefox, Safari).
   - The application will immediately boot into the live command center.

2. **Option 2: Local Static Web Server (Optional)**
   - You can also serve it with any static web server:
     ```bash
     # Python 3
     python -m http.server 8080
     
     # Node/npx (if installed)
     npx serve .
     ```
   - Open `http://localhost:8080` in your browser.

---

## 6. Important Data Disclaimer

> **DEMO DATA NOTICE**:  
> NER-SMARTLOG AI is a demonstration platform using simulated logistics, meteorological, geotechnical disruption, and vehicle GPS telemetry data. It is not currently connected to live government production systems.

---

## 7. Transitioning from Demo to Production (API-Ready Architecture)

The frontend does not hardcode data directly inside the UI components. Instead, all operations communicate through a clean service abstraction layer (`window.api` inside `script.js`).

### Service Layer Migration Example:

```javascript
// In script.js: Currently simulated with Promises
window.api = {
  async getVehicles() {
    // Current demo code:
    // return Promise.resolve([...appState.vehicles]);

    // To connect to a real backend, replace with:
    const response = await fetch('/api/v1/vehicles', {
      headers: { 'Authorization': `Bearer ${userToken}` }
    });
    return await response.json();
  },

  async optimizeRoute(dispatchParams) {
    // To connect to an actual OR-Tools / Python ML route optimizer:
    const response = await fetch('/api/v1/routes/optimize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dispatchParams)
    });
    return await response.json();
  }
};
```

### Recommended Production Backend Architecture:
1. **API Gateway / Ingestion**: FastAPI / Go microservices for sub-second GPS telemetry ingestion.
2. **AI & Optimization Microservice**: Google OR-Tools / NetworkX / GraphHopper with custom slope and elevation cost penalty matrices for mountain corridors.
3. **Earth Observation & Weather GIS**: GeoServer / PostGIS storing automated satellite feeds from ISRO Bhuvan, IMD Doppler Radar, and Geological Survey of India (GSI) landslide hazard mappings.
4. **Telemetry Ingestion**: MQTT / Apache Kafka broker streaming real-time vehicle on-board diagnostics (OBD-II) and IoT cold chain temperature logs.

---

## 8. Deployment Instructions

This project can be deployed instantly to any static hosting provider without configuring build steps or package managers:

- **Netlify**: Drag and drop the `NER-SMARTLOG-AI/` directory into Netlify Drop.
- **GitHub Pages**: Push this repository to GitHub and enable Pages under repository Settings -> Pages -> Source: `main` branch.
- **Vercel**: Import the repository and select *Other* framework preset (Zero Configuration).
- **Cloudflare Pages**: Connect git repository and leave build command empty, output directory as `.`.

---

## 9. License & Credits

Developed for the Smart India Hackathon and logistics accessibility intelligence initiatives in the North Eastern Region of India.
- Map Data &copy; [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors, Tiles by [CartoDB](https://carto.com/).
- Visual Icons by Font Awesome.
- Data Visualizations powered by Chart.js.
