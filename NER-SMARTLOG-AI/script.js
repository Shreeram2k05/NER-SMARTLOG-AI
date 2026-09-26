/**
 * NER-SMARTLOG AI - Master Application Controller & AI Decision Engine
 * Enterprise-grade Logistics & Accessibility Intelligence Platform for the North Eastern Region
 * Production-ready Vanilla JavaScript (ES6+) with zero build system dependencies.
 */

// ============================================================================
// 1. CENTRALIZED APPLICATION STATE
// ============================================================================
const appState = {
  activeView: 'dashboard',
  simulationMode: null, // null | 'Landslide' | 'Rainfall' | 'Blockage' | 'Traffic'
  offlineMode: false,
  timeframe: '7d',
  
  // Data entities (loaded from window.NER_DATA)
  vehicles: [],
  routes: [],
  disruptions: [],
  districts: [],
  alerts: [],
  fieldReports: [],
  pendingReports: [],
  notifications: [],
  
  // Selection references
  selectedVehicle: null,
  selectedRoute: null,
  selectedDistrict: null,
  selectedMultimodalRoute: null,
  
  // Map references
  maps: {
    command: null,
    optimizer: null,
    multimodal: null,
    accessibility: null,
    fleet: null
  },
  
  // Layer references for Command Map
  layers: {
    vehicles: null,
    routes: null,
    risk: null,
    accessibility: null,
    disruptions: null,
    hubs: null
  },

  // Chart instances
  charts: {
    delay: null,
    disruptions: null,
    accessibility: null,
    utilization: null,
    risk: null,
    success: null
  }
};

// ============================================================================
// 2. API SERVICE ABSTRACTION LAYER (API-READY ARCHITECTURE)
// ============================================================================
window.api = {
  // Simulates asynchronous network fetch; easily swappable with real fetch('/api/...')
  async getVehicles() {
    return Promise.resolve([...appState.vehicles]);
  },
  async getVehicleById(id) {
    const v = appState.vehicles.find(item => item.id === id);
    return Promise.resolve(v ? { ...v } : null);
  },
  async getRoutes() {
    return Promise.resolve([...appState.routes]);
  },
  async getRouteById(id) {
    const r = appState.routes.find(item => item.id === id);
    return Promise.resolve(r ? { ...r } : null);
  },
  async getDisruptions() {
    return Promise.resolve([...appState.disruptions]);
  },
  async getDistricts() {
    return Promise.resolve([...appState.districts]);
  },
  async getAlerts() {
    return Promise.resolve([...appState.alerts]);
  },
  async getAnalytics(timeframe = '7d') {
    const data = window.NER_DATA.analytics.timeframes[timeframe] || window.NER_DATA.analytics.timeframes['7d'];
    return Promise.resolve(JSON.parse(JSON.stringify(data)));
  },
  async optimizeRoute(params) {
    // Simulated weighted AI Decision Engine calculation
    return new Promise(resolve => {
      setTimeout(() => {
        let route = appState.routes.find(r => r.id === 'ROUTE-GW-IMP-A');
        if (appState.simulationMode === 'Landslide') {
          // If landslide simulation is active, recommend the alternate bypass
          route = appState.routes.find(r => r.id === 'ROUTE-GW-IMP-B');
        }
        resolve(route);
      }, 1800);
    });
  },
  async rerouteVehicle(vehicleId, routeId) {
    return new Promise(resolve => {
      setTimeout(() => {
        const vehicle = appState.vehicles.find(v => v.id === vehicleId);
        const route = appState.routes.find(r => r.id === routeId);
        if (vehicle && route) {
          vehicle.routeId = route.id;
          vehicle.route = route.name;
          vehicle.status = 'ON ROUTE';
          vehicle.risk = 'LOW';
          vehicle.eta = route.eta;
          vehicle.currentLocationName = 'Diverted onto NH-37 Jiribam Bypass';
          saveLocalState();
          resolve({ success: true, vehicle, route });
        } else {
          resolve({ success: false, error: 'Vehicle or route not found' });
        }
      }, 500);
    });
  },
  async acknowledgeAlert(alertId) {
    const alert = appState.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.acknowledged = true;
      saveLocalState();
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  },
  async submitFieldReport(reportData) {
    return new Promise(resolve => {
      setTimeout(() => {
        if (appState.offlineMode) {
          appState.pendingReports.push(reportData);
          saveLocalState();
          resolve({ offline: true, report: reportData });
        } else {
          appState.fieldReports.unshift(reportData);
          saveLocalState();
          resolve({ offline: false, report: reportData });
        }
      }, 400);
    });
  }
};

// ============================================================================
// 3. APPLICATION INITIALIZATION
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  console.log('NER-SMARTLOG AI initializing in standalone browser mode...');
  initDataState();
  initNavigation();
  initGlobalSearch();
  initNotifications();
  initModals();
  initDashboard();
  initMaps();
  initOptimizer();
  initMultimodal();
  initDisruptions();
  initAccessibility();
  initLiveTracking();
  initAlertCenter();
  initFieldReporting();
  initAnalytics();
  initLiveTelemetrySimulation();
});

/**
 * Initializes state from window.NER_DATA and restores localStorage overrides.
 */
function initDataState() {
  const data = window.NER_DATA || {};
  appState.vehicles = JSON.parse(JSON.stringify(data.vehicles || []));
  appState.routes = JSON.parse(JSON.stringify(data.routes || []));
  appState.disruptions = JSON.parse(JSON.stringify(data.disruptions || []));
  appState.districts = JSON.parse(JSON.stringify(data.districts || []));
  appState.alerts = JSON.parse(JSON.stringify(data.alerts || []));
  
  // Initial default selections
  appState.selectedRoute = appState.routes[0] || null;
  appState.selectedDistrict = appState.districts.find(d => d.name === 'Tamenglong') || appState.districts[0];
  appState.selectedMultimodalRoute = (data.multimodalRoutes && data.multimodalRoutes[0]) || null;
  
  // Initial field reports
  appState.fieldReports = [
    {
      id: "REP-101",
      type: "Road Damage",
      location: "NH-2 Senapati Pass, km marker 224",
      severity: "WARNING",
      description: "Shoulder erosion observed following heavy overnight seepage. Heavy trucks guided single-lane.",
      gps: "25.2678, 94.0185",
      time: "25m ago",
      verified: true
    },
    {
      id: "REP-102",
      type: "Flash Flood",
      location: "Kaziranga Culvert NH-27, Assam",
      severity: "INFO",
      description: "Water level receding back to safe green threshold. Roadway dry and high-speed transit resumed.",
      gps: "26.5800, 93.4100",
      time: "1h 10m ago",
      verified: true
    }
  ];

  // Notifications list
  appState.notifications = [
    { id: "NOTIF-1", title: "Landslide Risk Detected", text: "Sensor threshold exceeded on NH-2 Senapati sector.", time: "5 min ago", severity: "critical", view: "alerts" },
    { id: "NOTIF-2", title: "Vehicle NER-104 Delayed", text: "Slowdown recorded near Kohima approach (+28m).", time: "12 min ago", severity: "warning", view: "live-tracking" },
    { id: "NOTIF-3", title: "Weather Warning: Heavy Rain", text: "Convective rain band over Haflong & Barak Basin.", time: "18 min ago", severity: "info", view: "disruptions" }
  ];

  // Restore cached state from localStorage if available
  try {
    const savedState = localStorage.getItem('ner_smartlog_state');
    if (savedState) {
      const parsed = JSON.parse(savedState);
      if (parsed.acknowledgedAlertIds) {
        appState.alerts.forEach(a => {
          if (parsed.acknowledgedAlertIds.includes(a.id)) a.acknowledged = true;
        });
      }
      if (parsed.pendingReports) appState.pendingReports = parsed.pendingReports;
      if (parsed.fieldReports) appState.fieldReports = parsed.fieldReports;
      if (parsed.simulationMode) appState.simulationMode = parsed.simulationMode;
    }
  } catch (err) {
    console.warn('Could not read localStorage:', err);
  }

  updateAlertBadges();
}

function saveLocalState() {
  try {
    const stateToSave = {
      acknowledgedAlertIds: appState.alerts.filter(a => a.acknowledged).map(a => a.id),
      pendingReports: appState.pendingReports,
      fieldReports: appState.fieldReports,
      simulationMode: appState.simulationMode
    };
    localStorage.setItem('ner_smartlog_state', JSON.stringify(stateToSave));
  } catch (err) {
    console.warn('Could not write to localStorage:', err);
  }
}

// ============================================================================
// 4. NAVIGATION & VIEW SWITCHING (SPA)
// ============================================================================
function initNavigation() {
  const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetView = link.getAttribute('data-view');
      if (targetView) switchView(targetView);
    });
  });

  // Sidebar collapse toggle
  const collapseBtn = document.getElementById('sidebarCollapseBtn');
  if (collapseBtn) {
    collapseBtn.addEventListener('click', () => {
      document.body.classList.toggle('sidebar-collapsed');
      setTimeout(invalidateMapSizes, 300);
    });
  }

  // Mobile drawer toggle
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const sidebar = document.getElementById('sidebar');
  if (mobileBtn && sidebar) {
    mobileBtn.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
    });
  }

  // Close mobile sidebar on navigation
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && sidebar && sidebar.classList.contains('mobile-open')) {
      if (!sidebar.contains(e.target) && !mobileBtn.contains(e.target)) {
        sidebar.classList.remove('mobile-open');
      }
    }
  });

  // Handle URL hash navigation
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash) switchView(hash);
  });

  if (window.location.hash) {
    switchView(window.location.hash.replace('#', ''));
  }
}

function switchView(viewId) {
  // Validate view exists
  const targetSection = document.getElementById(`view-${viewId}`);
  if (!targetSection) return;

  appState.activeView = viewId;
  window.location.hash = viewId;

  // Toggle active class on sections
  document.querySelectorAll('.view-content').forEach(sec => sec.classList.remove('active-view'));
  targetSection.classList.add('active-view');

  // Toggle active class on nav links
  document.querySelectorAll('.sidebar-nav .nav-link').forEach(link => {
    if (link.getAttribute('data-view') === viewId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Close mobile sidebar if open
  const sidebar = document.getElementById('sidebar');
  if (sidebar && sidebar.classList.contains('mobile-open')) {
    sidebar.classList.remove('mobile-open');
  }

  // Invalidate maps on view change to prevent gray tiles
  setTimeout(invalidateMapSizes, 150);

  // Hook view specific renders
  if (viewId === 'analytics') {
    renderAnalyticsCharts();
  }
}

function invalidateMapSizes() {
  Object.values(appState.maps).forEach(map => {
    if (map && typeof map.invalidateSize === 'function') {
      map.invalidateSize();
    }
  });
}

// ============================================================================
// 5. GLOBAL SEARCH ENGINE
// ============================================================================
function initGlobalSearch() {
  const searchInput = document.getElementById('globalSearchInput');
  const dropdown = document.getElementById('searchResultsDropdown');
  if (!searchInput || !dropdown) return;

  // Keyboard shortcut Ctrl+K / Cmd+K
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      searchInput.focus();
    }
    if (e.key === 'Escape') {
      dropdown.classList.remove('active');
    }
  });

  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    if (!q) {
      dropdown.classList.remove('active');
      dropdown.innerHTML = '';
      return;
    }
    executeGlobalSearch(q, dropdown);
  });

  searchInput.addEventListener('focus', () => {
    if (searchInput.value.trim()) dropdown.classList.add('active');
  });

  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove('active');
    }
  });
}

function executeGlobalSearch(query, dropdown) {
  const results = {
    vehicles: appState.vehicles.filter(v => v.id.toLowerCase().includes(query) || v.cargo.toLowerCase().includes(query) || v.driver.toLowerCase().includes(query)),
    districts: appState.districts.filter(d => d.name.toLowerCase().includes(query) || d.state.toLowerCase().includes(query)),
    routes: appState.routes.filter(r => r.name.toLowerCase().includes(query) || r.origin.toLowerCase().includes(query) || r.destination.toLowerCase().includes(query)),
    alerts: appState.alerts.filter(a => a.title.toLowerCase().includes(query) || a.location.toLowerCase().includes(query)),
    disruptions: appState.disruptions.filter(dis => dis.title.toLowerCase().includes(query) || dis.type.toLowerCase().includes(query))
  };

  const totalResults = results.vehicles.length + results.districts.length + results.routes.length + results.alerts.length + results.disruptions.length;

  if (totalResults === 0) {
    dropdown.innerHTML = `<div class="p-3 text-center text-muted" style="font-size: 0.8rem;">No matching logistics entities found for "<strong>${escapeHtml(query)}</strong>"</div>`;
    dropdown.classList.add('active');
    return;
  }

  let html = '';

  if (results.vehicles.length > 0) {
    html += `<div class="search-group-title"><i class="fa-solid fa-truck"></i> Vehicles (${results.vehicles.length})</div>`;
    results.vehicles.forEach(v => {
      html += `
        <div class="search-result-item" onclick="onSearchResultClick('vehicle', '${v.id}')">
          <div class="search-result-icon"><i class="fa-solid fa-truck"></i></div>
          <div class="search-result-info">
            <span class="search-result-title">${v.id} • ${v.cargo}</span>
            <span class="search-result-sub">${v.origin} ➔ ${v.destination} | Status: ${v.status}</span>
          </div>
        </div>
      `;
    });
  }

  if (results.districts.length > 0) {
    html += `<div class="search-group-title"><i class="fa-solid fa-mountain-city"></i> Districts (${results.districts.length})</div>`;
    results.districts.forEach(d => {
      html += `
        <div class="search-result-item" onclick="onSearchResultClick('district', '${d.id}')">
          <div class="search-result-icon"><i class="fa-solid fa-mountain"></i></div>
          <div class="search-result-info">
            <span class="search-result-title">${d.name} (${d.state})</span>
            <span class="search-result-sub">Accessibility: ${d.accessibilityLevel} (${d.connectivityScore}%) • Supply ETA: ${d.avgSupplyETA}</span>
          </div>
        </div>
      `;
    });
  }

  if (results.alerts.length > 0) {
    html += `<div class="search-group-title"><i class="fa-solid fa-triangle-exclamation"></i> Alerts (${results.alerts.length})</div>`;
    results.alerts.forEach(a => {
      html += `
        <div class="search-result-item" onclick="onSearchResultClick('alert', '${a.id}')">
          <div class="search-result-icon" style="color: #f87171;"><i class="fa-solid fa-bell"></i></div>
          <div class="search-result-info">
            <span class="search-result-title">${a.title}</span>
            <span class="search-result-sub">${a.location} • Severity: ${a.severity}</span>
          </div>
        </div>
      `;
    });
  }

  if (results.routes.length > 0) {
    html += `<div class="search-group-title"><i class="fa-solid fa-route"></i> Corridors & Routes (${results.routes.length})</div>`;
    results.routes.forEach(r => {
      html += `
        <div class="search-result-item" onclick="onSearchResultClick('route', '${r.id}')">
          <div class="search-result-icon"><i class="fa-solid fa-road"></i></div>
          <div class="search-result-info">
            <span class="search-result-title">${r.name}</span>
            <span class="search-result-sub">${r.distance} • ETA: ${r.eta} • Risk: ${r.risk}</span>
          </div>
        </div>
      `;
    });
  }

  dropdown.innerHTML = html;
  dropdown.classList.add('active');
}

function onSearchResultClick(type, id) {
  const dropdown = document.getElementById('searchResultsDropdown');
  if (dropdown) dropdown.classList.remove('active');

  if (type === 'vehicle') {
    switchView('live-tracking');
    openVehicleDetail(id);
  } else if (type === 'district') {
    switchView('accessibility');
    const select = document.getElementById('districtSelector');
    if (select) {
      select.value = id;
      onDistrictSelect(id);
    }
  } else if (type === 'alert') {
    switchView('alerts');
  } else if (type === 'route') {
    switchView('route-optimizer');
  }
}

// ============================================================================
// 6. NOTIFICATIONS SYSTEM
// ============================================================================
function initNotifications() {
  const bellBtn = document.getElementById('notifBellBtn');
  const dropdown = document.getElementById('notifDropdown');
  const clearBtn = document.getElementById('markAllReadBtn');

  if (bellBtn && dropdown) {
    bellBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('active');
      renderNotifications();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      appState.notifications = [];
      updateNotifBadge();
      renderNotifications();
      showToast('info', 'Notifications cleared.');
    });
  }

  document.addEventListener('click', (e) => {
    if (dropdown && !dropdown.contains(e.target) && !bellBtn.contains(e.target)) {
      dropdown.classList.remove('active');
    }
  });

  renderNotifications();
  updateNotifBadge();
}

function renderNotifications() {
  const container = document.getElementById('notifListContainer');
  if (!container) return;

  if (appState.notifications.length === 0) {
    container.innerHTML = '<div class="p-4 text-center text-muted" style="font-size: 0.8rem;">No unread notifications</div>';
    return;
  }

  let html = '';
  appState.notifications.forEach(n => {
    html += `
      <div class="notif-item unread" onclick="onNotifClick('${n.view}')">
        <span class="notif-dot ${n.severity}"></span>
        <div class="notif-content">
          <div class="notif-text"><strong>${escapeHtml(n.title)}</strong>: ${escapeHtml(n.text)}</div>
          <div class="notif-meta">${n.time}</div>
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
}

function updateNotifBadge() {
  const badge = document.getElementById('notifBadgeCount');
  if (badge) {
    badge.innerText = appState.notifications.length;
    badge.style.display = appState.notifications.length > 0 ? 'flex' : 'none';
  }
}

function onNotifClick(view) {
  const dropdown = document.getElementById('notifDropdown');
  if (dropdown) dropdown.classList.remove('active');
  if (view) switchView(view);
}

// ============================================================================
// 7. TOAST NOTIFICATION SYSTEM
// ============================================================================
function showToast(type, message, duration = 4000) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let icon = 'fa-circle-info';
  if (type === 'success') icon = 'fa-circle-check text-emerald';
  else if (type === 'warning') icon = 'fa-triangle-exclamation text-amber';
  else if (type === 'danger') icon = 'fa-circle-exclamation text-crimson';
  else if (type === 'info') icon = 'fa-circle-info text-cyan';

  toast.innerHTML = `
    <i class="fa-solid ${icon}" style="font-size: 1.1rem; margin-top: 2px;"></i>
    <div style="flex: 1; line-height: 1.35;">${escapeHtml(message)}</div>
    <button onclick="this.parentElement.remove()" style="background:none; border:none; color:var(--text-muted); cursor:pointer; font-size: 0.85rem;"><i class="fa-solid fa-xmark"></i></button>
    <div class="toast-progress"></div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    if (toast.parentElement) toast.remove();
  }, duration);
}

function showDemoToast(type, msg) {
  showToast(type, msg);
}

// ============================================================================
// 8. MODALS ENGINE
// ============================================================================
function initModals() {
  // ESC key closes all active modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(modal => {
        modal.classList.remove('active');
      });
    }
  });

  // Clicking backdrop closes modal
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });
  });

  // User profile dropdown toggle
  const userProfileBtn = document.getElementById('userProfileBtn');
  const profileDropdown = document.getElementById('profileDropdown');
  if (userProfileBtn && profileDropdown) {
    userProfileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      profileDropdown.classList.toggle('active');
    });
  }

  document.addEventListener('click', (e) => {
    if (profileDropdown && !profileDropdown.contains(e.target) && !userProfileBtn.contains(e.target)) {
      profileDropdown.classList.remove('active');
    }
  });

  // Wire topbar Demo Simulation button
  const openDemoBtn = document.getElementById('openDemoSimBtn');
  if (openDemoBtn) {
    openDemoBtn.addEventListener('click', () => openDemoSimulatorModal());
  }
}

function openDemoSimulatorModal() {
  const modal = document.getElementById('demoSimModal');
  if (modal) modal.classList.add('active');
}

function closeDemoSimulatorModal() {
  const modal = document.getElementById('demoSimModal');
  if (modal) modal.classList.remove('active');
}

function openSystemStatusModal() {
  const modal = document.getElementById('systemStatusModal');
  if (modal) modal.classList.add('active');
  const profileDropdown = document.getElementById('profileDropdown');
  if (profileDropdown) profileDropdown.classList.remove('active');
}

function closeSystemStatusModal() {
  const modal = document.getElementById('systemStatusModal');
  if (modal) modal.classList.remove('active');
}

function openAboutModal() {
  const modal = document.getElementById('aboutModal');
  if (modal) modal.classList.add('active');
  const profileDropdown = document.getElementById('profileDropdown');
  if (profileDropdown) profileDropdown.classList.remove('active');
}

function closeAboutModal() {
  const modal = document.getElementById('aboutModal');
  if (modal) modal.classList.remove('active');
}

function openPreferencesModal() {
  showToast('info', 'Platform configured to Dark Command Center profile (Standard).');
  const profileDropdown = document.getElementById('profileDropdown');
  if (profileDropdown) profileDropdown.classList.remove('active');
}

function closeVehicleModal() {
  const modal = document.getElementById('vehicleDetailModal');
  if (modal) modal.classList.remove('active');
}

// ============================================================================
// 9. DASHBOARD & COMMAND CENTER MAP
// ============================================================================
function initDashboard() {
  renderLiveIntelligenceFeed();
  animateCounterNumbers();
}

function renderLiveIntelligenceFeed() {
  const feed = document.getElementById('liveIntelligenceFeed');
  if (!feed) return;

  const events = [
    {
      type: "critical",
      tag: "CRITICAL",
      title: "Landslide Risk Detected",
      loc: "NH-2 Corridor (Senapati-Kohima)",
      time: "8 min ago",
      icon: "fa-hill-rockslide",
      onClick: "switchView('disruptions')"
    },
    {
      type: "warning",
      tag: "WARNING",
      title: "Heavy Rainfall Front Active",
      loc: "Barak Valley & Haflong Sector",
      time: "14 min ago",
      icon: "fa-cloud-showers-heavy",
      onClick: "switchView('disruptions')"
    },
    {
      type: "warning",
      tag: "VEHICLE DELAY",
      title: "Vehicle NER-104 Delayed (+28 min)",
      loc: "Kohima-Senapati Approach",
      time: "21 min ago",
      icon: "fa-truck-clock",
      onClick: "openVehicleDetail('NER-104')"
    },
    {
      type: "success",
      tag: "SUCCESS",
      title: "Consignment Delivered & Verified",
      loc: "Guwahati Central Depot",
      time: "32 min ago",
      icon: "fa-box-check",
      onClick: "openVehicleDetail('NER-502')"
    },
    {
      type: "info",
      tag: "INFO",
      title: "Monsoon Safety Protocol Enabled",
      loc: "All 8 North Eastern States",
      time: "1h ago",
      icon: "fa-shield-halved",
      onClick: "switchView('alerts')"
    }
  ];

  let html = '';
  events.forEach(e => {
    html += `
      <div class="feed-item ${e.type}" onclick="${e.onClick}">
        <div class="feed-meta-row">
          <span class="feed-tag">${e.tag}</span>
          <span class="feed-time">${e.time}</span>
        </div>
        <div class="feed-title">${e.title}</div>
        <div class="feed-loc"><i class="fa-solid fa-location-dot"></i> ${e.loc}</div>
      </div>
    `;
  });

  feed.innerHTML = html;
}

function animateCounterNumbers() {
  document.querySelectorAll('.counter-value').forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target') || counter.innerText, 10);
    let count = 0;
    const speed = Math.max(1, Math.floor(target / 25));
    const timer = setInterval(() => {
      count += speed;
      if (count >= target) {
        counter.innerText = target < 10 && target > 0 ? `0${target}` : target;
        clearInterval(timer);
      } else {
        counter.innerText = count < 10 ? `0${count}` : count;
      }
    }, 25);
  });
}

function refreshDashboard() {
  showToast('info', 'Refreshing satellite radar and vehicle telemetry feeds...');
  animateCounterNumbers();
  renderLiveIntelligenceFeed();
  setTimeout(() => {
    showToast('success', 'Command center telemetry synchronized.');
  }, 600);
}

// ============================================================================
// 10. LEAFLET MAPS ENGINE & LAYERS
// ============================================================================
function initMaps() {
  if (typeof L === 'undefined') {
    console.error('Leaflet library not loaded. Falling back to CSS vector fallback.');
    return;
  }

  // Base map tiles: CartoDB Dark Matter with OpenStreetMap fallback
  const tileUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
  const tileOptions = {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
  };

  // 1. Main Command Center Map
  const mapCenterNER = [25.8, 93.4]; // Centered on Assam/Manipur/Nagaland border region
  const commandMapEl = document.getElementById('commandCenterMap');
  if (commandMapEl) {
    appState.maps.command = L.map('commandCenterMap', {
      center: mapCenterNER,
      zoom: 7,
      zoomControl: true
    });
    L.tileLayer(tileUrl, tileOptions).addTo(appState.maps.command);

    // Initialize FeatureGroups for layer toggling
    appState.layers.vehicles = L.featureGroup().addTo(appState.maps.command);
    appState.layers.routes = L.featureGroup().addTo(appState.maps.command);
    appState.layers.risk = L.featureGroup().addTo(appState.maps.command);
    appState.layers.accessibility = L.featureGroup().addTo(appState.maps.command);
    appState.layers.disruptions = L.featureGroup().addTo(appState.maps.command);
    appState.layers.hubs = L.featureGroup(); // Initially off

    // Render layers onto Command Map
    renderCommandMapLayers();
    setupMapLayerToggleListeners();
  }

  // 2. Route Optimizer Map
  const optMapEl = document.getElementById('optimizerRouteMap');
  if (optMapEl) {
    appState.maps.optimizer = L.map('optimizerRouteMap', {
      center: [25.5, 92.8],
      zoom: 7
    });
    L.tileLayer(tileUrl, tileOptions).addTo(appState.maps.optimizer);
    renderOptimizerRouteOnMap(appState.selectedRoute);
  }

  // 3. Multimodal Map
  const multiMapEl = document.getElementById('multimodalMap');
  if (multiMapEl) {
    appState.maps.multimodal = L.map('multimodalMap', {
      center: [25.5, 92.8],
      zoom: 7
    });
    L.tileLayer(tileUrl, tileOptions).addTo(appState.maps.multimodal);
    renderMultimodalMap(appState.selectedMultimodalRoute);
  }

  // 4. Accessibility Map
  const accessMapEl = document.getElementById('accessibilityMap');
  if (accessMapEl) {
    appState.maps.accessibility = L.map('accessibilityMap', {
      center: [25.8, 93.2],
      zoom: 7
    });
    L.tileLayer(tileUrl, tileOptions).addTo(appState.maps.accessibility);
    renderAccessibilityHeatmap();
  }

  // 5. Fleet Tracking Map
  const fleetMapEl = document.getElementById('fleetTrackingMap');
  if (fleetMapEl) {
    appState.maps.fleet = L.map('fleetTrackingMap', {
      center: [25.5, 93.0],
      zoom: 7
    });
    L.tileLayer(tileUrl, tileOptions).addTo(appState.maps.fleet);
    renderFleetMap();
  }
}

function renderCommandMapLayers() {
  const map = appState.maps.command;
  if (!map) return;

  // Clear existing
  appState.layers.vehicles.clearLayers();
  appState.layers.routes.clearLayers();
  appState.layers.risk.clearLayers();
  appState.layers.accessibility.clearLayers();
  appState.layers.disruptions.clearLayers();
  appState.layers.hubs.clearLayers();

  // 1. Draw Routes
  appState.routes.forEach(r => {
    const isRecommended = r.status === 'RECOMMENDED';
    const isHighRisk = r.risk === 'HIGH';
    const color = isHighRisk ? '#ef4444' : (isRecommended ? '#00f2fe' : '#38bdf8');
    const weight = isRecommended ? 4.5 : 2.5;
    const dashArray = isHighRisk ? '6, 8' : null;

    const poly = L.polyline(r.coordinates, {
      color: color,
      weight: weight,
      opacity: 0.85,
      dashArray: dashArray
    });

    poly.bindPopup(`
      <div style="font-size:0.8rem; line-height: 1.4;">
        <strong style="color: ${color};">${escapeHtml(r.name)}</strong><br>
        <strong>Distance:</strong> ${r.distance} | <strong>ETA:</strong> ${r.eta}<br>
        <strong>Risk Index:</strong> ${r.risk} | <strong>Accessibility:</strong> ${r.accessibility}<br>
        <button class="btn btn-primary btn-sm mt-2" onclick="selectRouteFromMap('${r.id}')">Analyze in Optimizer</button>
      </div>
    `);

    appState.layers.routes.addLayer(poly);
  });

  // 2. Draw Disruptions & Hazard Circles
  appState.disruptions.forEach(dis => {
    const isCritical = dis.severity === 'CRITICAL';
    const color = isCritical ? '#ef4444' : '#f59e0b';
    
    // Circle indicator
    const circle = L.circle([dis.lat, dis.lng], {
      color: color,
      fillColor: color,
      fillOpacity: 0.25,
      radius: dis.impactRadiusMeters || 5000
    });

    // Custom Icon Marker
    const iconHtml = `<div style="background:${color}; color:#fff; width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 0 12px ${color}; font-size:12px; border:2px solid #fff;"><i class="fa-solid fa-triangle-exclamation"></i></div>`;
    const markerIcon = L.divIcon({ html: iconHtml, className: 'hazard-marker', iconSize: [28, 28] });
    const marker = L.marker([dis.lat, dis.lng], { icon: markerIcon });

    marker.bindPopup(`
      <div style="font-size:0.8rem;">
        <strong style="color:${color};"><i class="fa-solid fa-triangle-exclamation"></i> ${escapeHtml(dis.title)}</strong><br>
        <strong>Location:</strong> ${escapeHtml(dis.location)}<br>
        <strong>Probability:</strong> ${dis.probability} | <strong>Confidence:</strong> ${dis.confidence}<br>
        <p style="margin-top:4px; font-size:0.75rem; color:#cbd5e1;">${escapeHtml(dis.impact)}</p>
      </div>
    `);

    appState.layers.disruptions.addLayer(circle);
    appState.layers.disruptions.addLayer(marker);
  });

  // 3. Draw Vehicles
  appState.vehicles.forEach(v => {
    let color = '#10b981';
    if (v.status === 'AT RISK') color = '#ef4444';
    else if (v.status === 'DELAYED') color = '#f59e0b';
    else if (v.status === 'DELIVERED') color = '#38bdf8';

    const iconHtml = `
      <div style="background:#0b132b; border:2px solid ${color}; color:${color}; width:32px; height:32px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:13px; box-shadow:0 0 10px ${color};">
        <i class="fa-solid fa-truck"></i>
      </div>
    `;
    const truckIcon = L.divIcon({ html: iconHtml, className: 'truck-marker', iconSize: [32, 32] });
    const vMarker = L.marker([v.lat, v.lng], { icon: truckIcon });

    vMarker.bindPopup(`
      <div style="font-size:0.8rem; line-height:1.4;">
        <strong style="color:${color};">${v.id} • ${v.cargo}</strong><br>
        <strong>Driver:</strong> ${v.driver} (${v.phone})<br>
        <strong>Route:</strong> ${v.origin} ➔ ${v.destination}<br>
        <strong>Status:</strong> <span class="badge badge-on-route" style="border-color:${color}; color:${color};">${v.status}</span><br>
        <strong>Speed:</strong> ${v.speed} km/h | <strong>ETA:</strong> ${v.eta}<br>
        <button class="btn btn-primary btn-sm mt-2" onclick="openVehicleDetail('${v.id}')">View Telemetry</button>
      </div>
    `);

    appState.layers.vehicles.addLayer(vMarker);
  });

  // 4. Draw Logistics Hubs
  (window.NER_DATA.hubs || []).forEach(hub => {
    const hubHtml = `
      <div style="background:#0f172a; border:1.5px solid #00f2fe; color:#00f2fe; width:24px; height:24px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:10px;">
        <i class="fa-solid fa-warehouse"></i>
      </div>
    `;
    const hubIcon = L.divIcon({ html: hubHtml, className: 'hub-marker', iconSize: [24, 24] });
    const hMarker = L.marker([hub.lat, hub.lng], { icon: hubIcon });

    hMarker.bindPopup(`
      <div style="font-size:0.8rem;">
        <strong class="text-cyan">${escapeHtml(hub.name)}</strong><br>
        <strong>Capacity:</strong> ${hub.capacity} | <strong>Active Fleet:</strong> ${hub.activeVehicles} trucks<br>
        <strong>Type:</strong> ${hub.type}
      </div>
    `);

    appState.layers.hubs.addLayer(hMarker);
  });

  // 5. Accessibility Zone circles
  appState.districts.forEach(d => {
    let color = '#10b981';
    if (d.accessibilityLevel === 'CRITICAL GAP') color = '#ef4444';
    else if (d.accessibilityLevel === 'LOW') color = '#f97316';
    else if (d.accessibilityLevel === 'MEDIUM') color = '#f59e0b';

    const accessCircle = L.circle([d.lat, d.lng], {
      color: color,
      fillColor: color,
      fillOpacity: 0.18,
      radius: 14000
    });

    accessCircle.bindPopup(`
      <div style="font-size:0.8rem;">
        <strong style="color:${color};">${d.name} (${d.state})</strong><br>
        <strong>Connectivity Score:</strong> ${d.connectivityScore}% (${d.accessibilityLevel})<br>
        <strong>Supply ETA:</strong> ${d.avgSupplyETA} | <strong>Risk:</strong> ${d.risk}<br>
        <button class="btn btn-outline btn-sm mt-2" onclick="onDistrictSelect('${d.id}')">View Full Vulnerability</button>
      </div>
    `);

    appState.layers.accessibility.addLayer(accessCircle);
  });
}

function setupMapLayerToggleListeners() {
  const map = appState.maps.command;
  if (!map) return;

  document.querySelectorAll('.map-layer-controls .layer-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const layerName = btn.getAttribute('data-layer');
      const layerGroup = appState.layers[layerName];
      if (!layerGroup) return;

      if (btn.classList.contains('active')) {
        map.removeLayer(layerGroup);
        btn.classList.remove('active');
      } else {
        map.addLayer(layerGroup);
        btn.classList.add('active');
      }
    });
  });
}

function selectRouteFromMap(routeId) {
  switchView('route-optimizer');
  const route = appState.routes.find(r => r.id === routeId);
  if (route) {
    appState.selectedRoute = route;
    renderOptimizerRouteOnMap(route);
  }
}

// ============================================================================
// 11. AI ROUTE OPTIMIZER & SIMULATION SEQUENCE
// ============================================================================
function initOptimizer() {
  const explainBtn = document.getElementById('explainToggleBtn');
  const explainBody = document.getElementById('explainBody');
  const explainArrow = document.getElementById('explainArrow');

  if (explainBtn && explainBody) {
    explainBtn.addEventListener('click', () => {
      explainBody.classList.toggle('open');
      if (explainArrow) {
        explainArrow.classList.toggle('fa-chevron-down');
        explainArrow.classList.toggle('fa-chevron-up');
      }
    });
  }

  renderRouteAlternativesGrid();
}

function runAiOptimizer() {
  const processingBox = document.getElementById('aiProcessingBox');
  const resultsHero = document.getElementById('routeResultsHero');
  const progressBar = document.getElementById('aiProgressBar');
  const btnRun = document.getElementById('btnRunOptimizer');

  if (!processingBox || !resultsHero) return;

  // Disable button, show processing animation sequence
  if (btnRun) btnRun.disabled = true;
  processingBox.classList.add('active');
  resultsHero.style.opacity = '0.4';

  const steps = [
    { id: 'step-1', pct: 15 },
    { id: 'step-2', pct: 30 },
    { id: 'step-3', pct: 45 },
    { id: 'step-4', pct: 60 },
    { id: 'step-5', pct: 75 },
    { id: 'step-6', pct: 90 },
    { id: 'step-7', pct: 100 }
  ];

  let currentStep = 0;

  function advanceStep() {
    if (currentStep < steps.length) {
      const s = steps[currentStep];
      if (progressBar) progressBar.style.width = `${s.pct}%`;
      
      const el = document.getElementById(s.id);
      if (el) {
        el.classList.add('active');
        const icon = el.querySelector('i');
        if (icon) {
          icon.className = 'fa-solid fa-spinner fa-spin text-cyan';
        }
      }

      if (currentStep > 0) {
        const prevEl = document.getElementById(steps[currentStep - 1].id);
        if (prevEl) {
          prevEl.classList.remove('active');
          prevEl.classList.add('completed');
          const pIcon = prevEl.querySelector('i');
          if (pIcon) pIcon.className = 'fa-solid fa-circle-check text-emerald';
        }
      }

      currentStep++;
      setTimeout(advanceStep, 240);
    } else {
      // Completed sequence
      const lastEl = document.getElementById('step-7');
      if (lastEl) {
        lastEl.classList.remove('active');
        lastEl.classList.add('completed');
        const lastIcon = lastEl.querySelector('i');
        if (lastIcon) lastIcon.className = 'fa-solid fa-circle-check text-emerald';
      }

      setTimeout(() => {
        processingBox.classList.remove('active');
        resultsHero.style.opacity = '1';
        if (btnRun) btnRun.disabled = false;

        // Choose route based on state
        let targetRoute = appState.routes[0];
        if (appState.simulationMode === 'Landslide') {
          targetRoute = appState.routes[1]; // Route B (Bypass)
        }
        appState.selectedRoute = targetRoute;

        updateRouteResultsHero(targetRoute);
        renderOptimizerRouteOnMap(targetRoute);
        showToast('success', 'AI optimal multimodal route generated successfully!');
      }, 350);
    }
  }

  advanceStep();
}

function updateRouteResultsHero(route) {
  if (!route) return;

  const title = document.getElementById('routeHeroTitle');
  const sub = document.getElementById('routeHeroSub');
  const dist = document.getElementById('routeHeroDistance');
  const eta = document.getElementById('routeHeroEta');
  const cost = document.getElementById('routeHeroCost');
  const risk = document.getElementById('routeHeroRisk');
  const access = document.getElementById('routeHeroAccess');
  const conf = document.getElementById('routeHeroConfidence');

  if (title) title.innerText = route.name;
  if (sub) sub.innerText = `${route.origin} ➔ ${route.destination} via ${route.terrain}`;
  if (dist) dist.innerText = route.distance;
  if (eta) eta.innerText = route.eta;
  if (cost) cost.innerText = route.cost;
  if (risk) {
    risk.innerText = route.risk;
    risk.style.color = route.risk === 'HIGH' ? '#f87171' : (route.risk === 'MEDIUM' ? '#fbbf24' : '#34d399');
  }
  if (access) access.innerText = route.accessibility;
  if (conf) conf.innerText = route.confidence;

  // Render rationale items
  const ratList = document.getElementById('rationaleList');
  if (ratList && route.aiRationale) {
    ratList.innerHTML = route.aiRationale.map(r => `
      <div class="rationale-item">
        <i class="fa-solid fa-circle-check"></i>
        <span>${escapeHtml(r)}</span>
      </div>
    `).join('');
  }

  // Update alternative card selection states
  document.querySelectorAll('.alt-route-card').forEach(c => {
    if (c.getAttribute('data-route-id') === route.id) {
      c.classList.add('selected');
    } else {
      c.classList.remove('selected');
    }
  });
}

function renderRouteAlternativesGrid() {
  const container = document.getElementById('routeAlternativesGrid');
  if (!container) return;

  const routes = appState.routes.slice(0, 3);
  let html = '';

  routes.forEach((r, idx) => {
    const isSel = idx === 0 ? 'selected' : '';
    const riskBadge = r.risk === 'HIGH' ? 'danger' : (r.risk === 'MEDIUM' ? 'warning' : 'success');
    html += `
      <div class="alt-route-card ${isSel}" data-route-id="${r.id}" onclick="selectAlternativeRoute('${r.id}')">
        <div class="d-flex align-items-center justify-content-between mb-1">
          <strong style="font-size:0.85rem; color:#fff;">Route ${String.fromCharCode(65 + idx)}</strong>
          <span class="badge badge-${riskBadge}" style="font-size:0.68rem;">${r.risk} RISK</span>
        </div>
        <div class="text-muted" style="font-size:0.75rem; margin-bottom: 0.5rem;">${r.corridors ? r.corridors.join(' ➔ ') : r.terrain}</div>
        <div class="d-flex justify-content-between font-mono" style="font-size:0.82rem;">
          <span class="text-white">${r.distance}</span>
          <span class="text-cyan font-weight-bold">${r.eta}</span>
          <span class="text-emerald">${r.cost}</span>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function selectAlternativeRoute(routeId) {
  const route = appState.routes.find(r => r.id === routeId);
  if (route) {
    appState.selectedRoute = route;
    updateRouteResultsHero(route);
    renderOptimizerRouteOnMap(route);
  }
}

function renderOptimizerRouteOnMap(route) {
  const map = appState.maps.optimizer;
  if (!map || !route) return;

  // Clear previous route layers
  map.eachLayer(layer => {
    if (layer instanceof L.Polyline || (layer instanceof L.Marker && !layer.isBase)) {
      map.removeLayer(layer);
    }
  });

  const isHighRisk = route.risk === 'HIGH';
  const color = isHighRisk ? '#ef4444' : '#00f2fe';

  const poly = L.polyline(route.coordinates, {
    color: color,
    weight: 5,
    opacity: 0.9,
    dashArray: isHighRisk ? '6, 8' : null
  }).addTo(map);

  map.fitBounds(poly.getBounds(), { padding: [40, 40] });

  // Add origin and destination markers
  const startCoord = route.coordinates[0];
  const endCoord = route.coordinates[route.coordinates.length - 1];

  L.marker(startCoord, {
    icon: L.divIcon({
      html: `<div style="background:#10b981; color:#fff; border-radius:50%; width:24px; height:24px; display:flex; align-items:center; justify-content:center; font-size:10px; border:2px solid #fff;"><i class="fa-solid fa-play"></i></div>`,
      className: 'start-marker',
      iconSize: [24, 24]
    })
  }).bindPopup(`<strong>Origin: ${route.origin}</strong>`).addTo(map);

  L.marker(endCoord, {
    icon: L.divIcon({
      html: `<div style="background:#0ea5e9; color:#fff; border-radius:50%; width:24px; height:24px; display:flex; align-items:center; justify-content:center; font-size:10px; border:2px solid #fff;"><i class="fa-solid fa-flag-checkered"></i></div>`,
      className: 'end-marker',
      iconSize: [24, 24]
    })
  }).bindPopup(`<strong>Destination: ${route.destination}</strong>`).addTo(map);
}

// ============================================================================
// 12. MULTIMODAL PLANNER
// ============================================================================
function initMultimodal() {
  const container = document.getElementById('multimodalCardsGrid');
  if (!container) return;

  const mmRoutes = window.NER_DATA.multimodalRoutes || [];
  let html = '';

  mmRoutes.forEach((mm, idx) => {
    const isAct = idx === 0 ? 'active' : '';
    html += `
      <div class="multimodal-card ${isAct}" data-mm-id="${mm.id}" onclick="selectMultimodalCard('${mm.id}')">
        <div class="d-flex align-items-center justify-content-between">
          <h4 style="font-size:0.95rem; color:#fff;">${mm.title}</h4>
          <span class="badge badge-${mm.riskBadge}">${mm.risk} RISK</span>
        </div>

        <div class="transfer-chain">
          ${mm.segments.map((seg, sIdx) => `
            <div class="transfer-node">
              <i class="fa-solid ${seg.icon} text-cyan"></i>
              <span>${seg.mode.toUpperCase()}</span>
            </div>
            ${sIdx < mm.segments.length - 1 ? '<i class="fa-solid fa-arrow-right text-muted" style="font-size:0.7rem;"></i>' : ''}
          `).join('')}
        </div>

        <div class="d-flex justify-content-between font-mono" style="font-size:0.85rem; margin-bottom:0.4rem;">
          <span class="text-white">${mm.distance}</span>
          <span class="text-cyan font-weight-bold">${mm.eta}</span>
          <span class="text-emerald">${mm.cost}</span>
        </div>
        <div class="d-flex justify-content-between text-muted" style="font-size:0.72rem;">
          <span>Transfers: ${mm.transfers}</span>
          <span class="text-cyan">${mm.carbonSavings}</span>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function selectMultimodalCard(id) {
  document.querySelectorAll('.multimodal-card').forEach(c => {
    if (c.getAttribute('data-mm-id') === id) c.classList.add('active');
    else c.classList.remove('active');
  });

  const mm = (window.NER_DATA.multimodalRoutes || []).find(item => item.id === id);
  if (mm) {
    appState.selectedMultimodalRoute = mm;
    const titleEl = document.getElementById('multimodalMapTitle');
    if (titleEl) titleEl.innerText = `Multimodal Corridor: ${mm.title} (${mm.origin} ➔ ${mm.destination})`;
    renderMultimodalMap(mm);
  }
}

function renderMultimodalMap(mm) {
  const map = appState.maps.multimodal;
  if (!map || !mm) return;

  map.eachLayer(layer => {
    if (layer instanceof L.Polyline || layer instanceof L.Marker) map.removeLayer(layer);
  });

  const poly = L.polyline(mm.coordinates, {
    color: '#38bdf8',
    weight: 4,
    opacity: 0.9
  }).addTo(map);

  map.fitBounds(poly.getBounds(), { padding: [40, 40] });

  // Add transfer markers
  mm.coordinates.forEach((pt, idx) => {
    if (idx === 0 || idx === mm.coordinates.length - 1 || idx === 2 || idx === 4) {
      L.circleMarker(pt, {
        radius: 6,
        color: '#00f2fe',
        fillColor: '#0b132b',
        fillOpacity: 1,
        weight: 2
      }).addTo(map);
    }
  });
}

// ============================================================================
// 13. DISRUPTION INTELLIGENCE & TIMELINE
// ============================================================================
function initDisruptions() {
  const container = document.getElementById('disruptionTimelineContainer');
  if (!container) return;

  const events = window.NER_DATA.disruptionTimeline || [];
  let html = '';

  events.forEach(ev => {
    html += `
      <div class="timeline-entry ${ev.severity}" onclick="showToast('info', '${escapeHtml(ev.eventTitle)}: ${escapeHtml(ev.impact)}')">
        <div class="timeline-dot"></div>
        <div class="d-flex align-items-center justify-content-between">
          <span class="font-mono text-cyan" style="font-size:0.75rem; font-weight:700;">${ev.timeLabel}</span>
          <span class="badge badge-${ev.severity === 'critical' ? 'danger' : 'warning'}" style="font-size:0.65rem;">${ev.severity.toUpperCase()}</span>
        </div>
        <h4 style="font-size:0.9rem; color:#fff; margin-top:3px;"><i class="fa-solid ${ev.icon} mr-1"></i> ${ev.eventTitle}</h4>
        <p class="text-secondary" style="font-size:0.78rem; margin:3px 0;">${ev.description}</p>
        <span class="text-muted" style="font-size:0.72rem;"><i class="fa-solid fa-location-dot"></i> ${ev.district} • ${ev.impact}</span>
      </div>
    `;
  });

  container.innerHTML = html;
}

// ============================================================================
// 14. ACCESSIBILITY INTELLIGENCE & DISTRICT DEEP-DIVE
// ============================================================================
function initAccessibility() {
  const selector = document.getElementById('districtSelector');
  if (!selector) return;

  let opts = '';
  appState.districts.forEach(d => {
    const sel = d.name === 'Tamenglong' ? 'selected' : '';
    opts += `<option value="${d.id}" ${sel}>${d.name} (${d.state}) — Score: ${d.connectivityScore}%</option>`;
  });
  selector.innerHTML = opts;

  // Render initial district
  renderDistrictAnalysis(appState.selectedDistrict);
}

function onDistrictSelect(districtId) {
  const district = appState.districts.find(d => d.id === districtId);
  if (!district) return;
  appState.selectedDistrict = district;
  renderDistrictAnalysis(district);

  // Pan map if open
  const map = appState.maps.accessibility;
  if (map) {
    map.setView([district.lat, district.lng], 9);
  }
}

function renderDistrictAnalysis(d) {
  const container = document.getElementById('districtDetailContent');
  if (!container || !d) return;

  const scoreColor = d.connectivityScore >= 75 ? '#34d399' : (d.connectivityScore >= 50 ? '#fbbf24' : (d.connectivityScore >= 35 ? '#f97316' : '#f87171'));

  container.innerHTML = `
    <div class="d-flex align-items-center justify-content-between mb-3">
      <div>
        <h3 class="text-white" style="font-size:1.15rem;">${escapeHtml(d.name)}</h3>
        <span class="text-muted" style="font-size:0.78rem;">${d.state} • Population: ${d.population}</span>
      </div>
      <div class="text-right">
        <div style="font-size:0.7rem; color:var(--text-muted);">CONNECTIVITY SCORE</div>
        <div class="font-mono font-weight-bold" style="font-size:1.6rem; color:${scoreColor};">${d.connectivityScore}%</div>
      </div>
    </div>

    <div class="district-metrics-grid">
      <div class="district-metric">
        <span class="text-muted" style="font-size:0.7rem; text-transform:uppercase;">Nearest Hub</span>
        <div class="text-white font-weight-bold" style="font-size:0.8rem; margin-top:2px;">${d.nearestHub}</div>
      </div>
      <div class="district-metric">
        <span class="text-muted" style="font-size:0.7rem; text-transform:uppercase;">Nearest Hospital</span>
        <div class="text-white font-weight-bold" style="font-size:0.8rem; margin-top:2px;">${d.nearestHospital}</div>
      </div>
      <div class="district-metric">
        <span class="text-muted" style="font-size:0.7rem; text-transform:uppercase;">Avg Supply ETA</span>
        <div class="text-cyan font-mono font-weight-bold" style="font-size:0.85rem; margin-top:2px;">${d.avgSupplyETA}</div>
      </div>
      <div class="district-metric">
        <span class="text-muted" style="font-size:0.7rem; text-transform:uppercase;">Isolation Risk</span>
        <div class="font-weight-bold" style="font-size:0.85rem; color:${d.risk === 'HIGH' ? '#f87171' : '#34d399'}; margin-top:2px;">${d.risk}</div>
      </div>
    </div>

    <div class="mb-3">
      <h4 style="font-size:0.82rem; text-transform:uppercase; color:var(--text-muted); margin-bottom:0.4rem;">Terrain & Road Bottleneck</h4>
      <p style="font-size:0.78rem; color:var(--text-secondary); line-height:1.4;">${escapeHtml(d.terrain)}. <strong>Bottleneck:</strong> ${escapeHtml(d.logisticsBottlenecks)}</p>
    </div>

    <div class="mb-3">
      <h4 style="font-size:0.82rem; text-transform:uppercase; color:var(--text-muted); margin-bottom:0.4rem;">Identified Connectivity Gaps</h4>
      <div class="d-flex flex-column gap-2" style="font-size:0.78rem; color:#fca5a5;">
        ${d.connectivityGaps.map(gap => `
          <div style="display:flex; align-items:flex-start; gap:0.4rem;">
            <i class="fa-solid fa-triangle-exclamation text-crimson" style="margin-top:3px;"></i>
            <span>${escapeHtml(gap)}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <div>
      <h4 style="font-size:0.82rem; text-transform:uppercase; color:var(--text-muted); margin-bottom:0.4rem;">Priority Relief Supplies Needed</h4>
      <div class="d-flex flex-wrap gap-1">
        ${d.primarySuppliesNeeded.map(sup => `<span class="badge badge-on-route" style="font-size:0.7rem;">${escapeHtml(sup)}</span>`).join('')}
      </div>
    </div>
  `;
}

function renderAccessibilityHeatmap() {
  const map = appState.maps.accessibility;
  if (!map) return;

  appState.districts.forEach(d => {
    let color = '#10b981';
    if (d.accessibilityLevel === 'CRITICAL GAP') color = '#ef4444';
    else if (d.accessibilityLevel === 'LOW') color = '#f97316';
    else if (d.accessibilityLevel === 'MEDIUM') color = '#f59e0b';

    const circle = L.circle([d.lat, d.lng], {
      color: color,
      fillColor: color,
      fillOpacity: 0.35,
      radius: 18000
    }).addTo(map);

    circle.bindPopup(`
      <div style="font-size:0.8rem;">
        <strong style="color:${color};">${d.name} (${d.state})</strong><br>
        <strong>Score:</strong> ${d.connectivityScore}% (${d.accessibilityLevel})<br>
        <strong>Supply ETA:</strong> ${d.avgSupplyETA}<br>
        <button class="btn btn-primary btn-sm mt-2" onclick="onDistrictSelect('${d.id}')">Analyze District</button>
      </div>
    `);
  });
}

// ============================================================================
// 15. LIVE FLEET & VEHICLE TRACKING
// ============================================================================
function initLiveTracking() {
  renderFleetTable('ALL');
}

function renderFleetTable(statusFilter = 'ALL') {
  const tbody = document.getElementById('fleetTableBody');
  if (!tbody) return;

  let filtered = appState.vehicles;
  if (statusFilter !== 'ALL') {
    filtered = appState.vehicles.filter(v => v.status === statusFilter);
  }

  let html = '';
  filtered.forEach(v => {
    let statusClass = 'badge-on-route';
    if (v.status === 'DELAYED') statusClass = 'badge-delayed';
    else if (v.status === 'AT RISK') statusClass = 'badge-at-risk';
    else if (v.status === 'DELIVERED') statusClass = 'badge-delivered';
    else if (v.status === 'IDLE') statusClass = 'badge-idle';

    let riskColor = v.risk === 'HIGH' ? '#f87171' : (v.risk === 'MEDIUM' ? '#fbbf24' : '#34d399');

    html += `
      <tr onclick="openVehicleDetail('${v.id}')">
        <td class="font-mono font-weight-bold text-cyan">${v.id}</td>
        <td>
          <div style="font-weight:600;">${v.cargo}</div>
          <small class="text-muted">Driver: ${v.driver}</small>
        </td>
        <td>${v.origin}</td>
        <td>${v.destination}</td>
        <td><span class="badge-status ${statusClass}">${v.status}</span></td>
        <td class="font-mono">${v.speed} km/h</td>
        <td class="font-mono text-cyan">${v.eta}</td>
        <td class="font-mono font-weight-bold" style="color:${riskColor};">${v.risk}</td>
        <td>
          <button class="btn btn-outline btn-sm" onclick="event.stopPropagation(); openVehicleDetail('${v.id}')">
            <i class="fa-solid fa-satellite-dish"></i> Details
          </button>
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}

function filterFleet(status) {
  document.querySelectorAll('.fleet-filter-bar .filter-chip').forEach(chip => {
    if (chip.getAttribute('data-filter') === status) chip.classList.add('active');
    else chip.classList.remove('active');
  });
  renderFleetTable(status);
}

function renderFleetMap() {
  const map = appState.maps.fleet;
  if (!map) return;

  appState.vehicles.forEach(v => {
    let color = '#10b981';
    if (v.status === 'AT RISK') color = '#ef4444';
    else if (v.status === 'DELAYED') color = '#f59e0b';
    else if (v.status === 'DELIVERED') color = '#38bdf8';

    const iconHtml = `
      <div style="background:#0b132b; border:2px solid ${color}; color:${color}; width:30px; height:30px; border-radius:6px; display:flex; align-items:center; justify-content:center; font-size:12px; box-shadow:0 0 10px ${color};">
        <i class="fa-solid fa-truck"></i>
      </div>
    `;
    const marker = L.marker([v.lat, v.lng], {
      icon: L.divIcon({ html: iconHtml, className: 'fleet-marker', iconSize: [30, 30] })
    }).addTo(map);

    marker.bindPopup(`
      <div style="font-size:0.8rem;">
        <strong style="color:${color};">${v.id} • ${v.cargo}</strong><br>
        <strong>Current Sector:</strong> ${v.currentLocationName}<br>
        <strong>Speed:</strong> ${v.speed} km/h | <strong>ETA:</strong> ${v.eta}<br>
        <button class="btn btn-primary btn-sm mt-2" onclick="openVehicleDetail('${v.id}')">Inspect Telemetry</button>
      </div>
    `);
  });
}

function openVehicleDetail(vehicleId) {
  const vehicle = appState.vehicles.find(v => v.id === vehicleId);
  if (!vehicle) return;

  appState.selectedVehicle = vehicle;
  const modal = document.getElementById('vehicleDetailModal');
  const title = document.getElementById('vehicleModalTitle');
  const body = document.getElementById('vehicleModalBody');

  if (!modal || !body) return;

  if (title) title.innerText = `${vehicle.id} — Fleet Telematics Detail`;

  let riskColor = vehicle.risk === 'HIGH' ? '#f87171' : (vehicle.risk === 'MEDIUM' ? '#fbbf24' : '#34d399');

  body.innerHTML = `
    <div class="d-flex align-items-center justify-content-between mb-3">
      <div>
        <h3 class="text-white" style="font-size:1.1rem;">${vehicle.cargo}</h3>
        <p class="text-muted" style="font-size:0.78rem;">Route: ${vehicle.origin} ➔ ${vehicle.destination}</p>
      </div>
      <span class="badge badge-on-route" style="border-color:${riskColor}; color:${riskColor};">${vehicle.status}</span>
    </div>

    <div class="district-metrics-grid mb-3">
      <div class="district-metric">
        <span class="text-muted" style="font-size:0.7rem;">ASSIGNED DRIVER</span>
        <div class="text-white font-weight-bold" style="font-size:0.85rem;">${vehicle.driver}</div>
        <small class="text-secondary">${vehicle.phone}</small>
      </div>
      <div class="district-metric">
        <span class="text-muted" style="font-size:0.7rem;">CURRENT SPEED</span>
        <div class="text-cyan font-mono font-weight-bold" style="font-size:0.95rem;">${vehicle.speed} km/h</div>
      </div>
      <div class="district-metric">
        <span class="text-muted" style="font-size:0.7rem;">ESTIMATED ARRIVAL</span>
        <div class="text-emerald font-mono font-weight-bold" style="font-size:0.95rem;">${vehicle.eta}</div>
      </div>
      <div class="district-metric">
        <span class="text-muted" style="font-size:0.7rem;">COLD CHAIN TEMP</span>
        <div class="text-white font-mono font-weight-bold" style="font-size:0.95rem;">${vehicle.temp || 'N/A'}</div>
      </div>
    </div>

    <div class="mb-3 p-2" style="background:rgba(255,255,255,0.03); border-radius:6px; font-size:0.78rem;">
      <div><strong>Current Location:</strong> ${vehicle.currentLocationName} (${vehicle.lat.toFixed(4)}, ${vehicle.lng.toFixed(4)})</div>
      <div class="text-muted mt-1">Active Corridor: ${vehicle.route}</div>
    </div>

    <div class="mb-3">
      <h4 style="font-size:0.8rem; text-transform:uppercase; color:var(--text-muted); margin-bottom:0.35rem;">Telemetry Incident Log</h4>
      <div class="d-flex flex-column gap-1" style="font-size:0.75rem;">
        ${vehicle.alertHistory.map(h => `
          <div class="d-flex justify-content-between p-1" style="background:rgba(255,255,255,0.02); border-radius:4px;">
            <span class="text-secondary">${escapeHtml(h.msg)}</span>
            <span class="text-muted font-mono">${h.time}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="d-flex gap-2 pt-2" style="border-top: 1px solid var(--border-subtle);">
      <button class="btn btn-outline" style="flex:1;" onclick="viewVehicleRoute('${vehicle.id}')"><i class="fa-solid fa-route"></i> VIEW ROUTE</button>
      <button class="btn btn-primary" style="flex:1;" onclick="executeRerouteForVehicle('${vehicle.id}')"><i class="fa-solid fa-shuffle"></i> REROUTE</button>
      <button class="btn btn-outline" onclick="contactDriverDemo('${vehicle.driver}')"><i class="fa-solid fa-phone"></i> CONTACT DRIVER</button>
    </div>
  `;

  modal.classList.add('active');
}

function viewVehicleRoute(vehicleId) {
  closeVehicleModal();
  switchView('route-optimizer');
}

function executeRerouteForVehicle(vehicleId) {
  closeVehicleModal();
  executeReroute();
}

function contactDriverDemo(driverName) {
  showToast('info', `Connecting to ${driverName} via encrypted satellite link... (Demo Simulated Response: "Acknowledged, holding at safe pullout")`);
}

// Live vehicle simulated gentle movement along corridors
function initLiveTelemetrySimulation() {
  setInterval(() => {
    appState.vehicles.forEach(v => {
      if (v.status === 'ON ROUTE') {
        // Slight coordinate jitter simulating actual GPS tracking
        v.lat += (Math.random() - 0.5) * 0.003;
        v.lng += (Math.random() - 0.5) * 0.003;
      }
    });
  }, 10000);
}

// ============================================================================
// 16. ALERT CENTER & ACKNOWLEDGEMENT
// ============================================================================
function initAlertCenter() {
  renderAlertsList('ALL');
}

function renderAlertsList(filter = 'ALL') {
  const container = document.getElementById('alertsListContainer');
  if (!container) return;

  let filtered = appState.alerts;
  if (filter !== 'ALL') {
    filtered = appState.alerts.filter(a => a.severity === filter);
  }

  if (filtered.length === 0) {
    container.innerHTML = `<div class="p-4 text-center text-muted" style="font-size:0.85rem;">No ${filter} alerts recorded at this time.</div>`;
    return;
  }

  let html = '';
  filtered.forEach(a => {
    const sevClass = a.severity.toLowerCase();
    const ackedClass = a.acknowledged ? 'acknowledged' : '';

    html += `
      <div class="alert-card ${sevClass} ${ackedClass}" id="card-alert-${a.id}">
        <div class="alert-card-top">
          <div>
            <div class="d-flex align-items-center gap-2 mb-1">
              <span class="badge badge-${a.severity === 'CRITICAL' ? 'danger' : (a.severity === 'WARNING' ? 'warning' : 'info')}">${a.severity}</span>
              <strong style="color:#fff; font-size:0.95rem;">${escapeHtml(a.title)}</strong>
            </div>
            <div class="text-secondary" style="font-size:0.8rem;"><i class="fa-solid fa-location-dot"></i> ${escapeHtml(a.location)} • <span class="text-muted font-mono">${a.time}</span></div>
          </div>
          <div>
            ${a.acknowledged ? '<span class="badge badge-on-route" style="font-size:0.68rem;"><i class="fa-solid fa-check"></i> ACKNOWLEDGED</span>' : '<span class="badge badge-at-risk" style="font-size:0.68rem;">UNREAD</span>'}
          </div>
        </div>

        <div style="font-size:0.78rem; color:var(--text-secondary); line-height:1.4;">
          <strong>Recommended Action:</strong> ${escapeHtml(a.recommendedAction)}
        </div>

        <div class="d-flex justify-content-between align-items-center mt-2 pt-2" style="border-top:1px solid rgba(255,255,255,0.05);">
          <div class="text-muted" style="font-size:0.72rem;">
            Affected: <strong>${a.affectedVehicles.join(', ')}</strong> on <strong>${a.affectedRoutes.join(', ')}</strong>
          </div>
          <div class="alert-actions-row">
            <button class="btn btn-outline btn-sm" onclick="switchView('route-optimizer')"><i class="fa-solid fa-route"></i> VIEW ROUTE</button>
            <button class="btn btn-primary btn-sm" onclick="executeReroute()"><i class="fa-solid fa-shuffle"></i> REROUTE</button>
            ${!a.acknowledged ? `<button class="btn btn-outline btn-sm" onclick="acknowledgeAlertItem('${a.id}')"><i class="fa-solid fa-check"></i> ACKNOWLEDGE</button>` : ''}
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function filterAlertsTab(filter) {
  document.querySelectorAll('.alert-tabs .alert-tab-btn').forEach(btn => {
    if (btn.getAttribute('data-alert-filter') === filter) btn.classList.add('active');
    else btn.classList.remove('active');
  });
  renderAlertsList(filter);
}

function acknowledgeAlertItem(alertId) {
  window.api.acknowledgeAlert(alertId).then(() => {
    updateAlertBadges();
    renderAlertsList();
    showToast('success', `Alert acknowledged and recorded in audit log.`);
  });
}

function acknowledgeAllAlerts() {
  appState.alerts.forEach(a => a.acknowledged = true);
  saveLocalState();
  updateAlertBadges();
  renderAlertsList();
  showToast('success', 'All regional alerts marked as acknowledged.');
}

function updateAlertBadges() {
  const unacked = appState.alerts.filter(a => !a.acknowledged).length;
  const navBadge = document.getElementById('sidebarAlertCount');
  if (navBadge) {
    navBadge.innerText = unacked;
    navBadge.style.display = unacked > 0 ? 'inline-block' : 'none';
  }
}

// ============================================================================
// 17. FIELD INTELLIGENCE & OFFLINE REPORTING SIMULATION
// ============================================================================
function initFieldReporting() {
  renderFieldReportsList();
}

function toggleOfflineMode(isOffline) {
  appState.offlineMode = isOffline;
  const statusText = document.getElementById('networkStatusText');
  const subText = document.getElementById('networkSubText');
  const icon = document.getElementById('networkIcon');
  const syncCard = document.getElementById('offlineSyncCard');

  if (isOffline) {
    if (statusText) statusText.innerText = 'Network Mode: OFFLINE SIMULATION';
    if (subText) subText.innerText = 'Network connection disabled. Reports will be cached in browser localStorage.';
    if (icon) {
      icon.className = 'fa-solid fa-plane-slash';
      icon.style.color = 'var(--amber-warning)';
    }
    if (syncCard) syncCard.style.display = 'block';
    showToast('warning', 'Offline mode simulated. Local IndexedDB caching active.');
  } else {
    if (statusText) statusText.innerText = 'Network Mode: ONLINE';
    if (subText) subText.innerText = 'Connected to regional staging gateway. Instant report transmission.';
    if (icon) {
      icon.className = 'fa-solid fa-wifi';
      icon.style.color = 'var(--emerald-success)';
    }
    showToast('success', 'Reconnected to command center gateway.');
  }
}

function autoDetectGps() {
  const gpsInput = document.getElementById('reportGps');
  if (!gpsInput) return;
  gpsInput.value = '25.2678, 94.0185';
  showToast('info', 'GPS acquired from mobile telemetry: 25.2678° N, 94.0185° E');
}

function previewReportPhoto(input) {
  const container = document.getElementById('photoPreviewContainer');
  const img = document.getElementById('photoPreviewImg');
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target.result;
      container.style.display = 'block';
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function submitFieldReport() {
  const type = document.getElementById('reportType').value;
  const location = document.getElementById('reportLocation').value.trim();
  const severity = document.getElementById('reportSeverity').value;
  const desc = document.getElementById('reportDesc').value.trim();
  const gps = document.getElementById('reportGps').value || '25.2678, 94.0185';

  if (!type || !location || !desc) {
    showToast('danger', 'Please complete all required fields.');
    return;
  }

  const newReport = {
    id: `REP-${Math.floor(100 + Math.random() * 900)}`,
    type: type,
    location: location,
    severity: severity,
    description: desc,
    gps: gps,
    time: "Just now",
    verified: true
  };

  window.api.submitFieldReport(newReport).then(res => {
    // Reset form
    document.getElementById('fieldReportForm').reset();
    const prev = document.getElementById('photoPreviewContainer');
    if (prev) prev.style.display = 'none';

    if (res.offline) {
      updatePendingSyncUI();
      showToast('warning', '✓ Report saved locally. Will synchronize automatically when connection returns.');
    } else {
      renderFieldReportsList();
      showToast('success', '✓ Incident report submitted & broadcast to command fleet.');
    }
  });
}

function updatePendingSyncUI() {
  const syncCard = document.getElementById('offlineSyncCard');
  const syncText = document.getElementById('pendingSyncText');
  const count = appState.pendingReports.length;

  if (syncCard) {
    syncCard.style.display = count > 0 || appState.offlineMode ? 'block' : 'none';
  }
  if (syncText) {
    syncText.innerText = `Pending Sync: ${count} Reports saved in local cache.`;
  }
}

function syncPendingReports() {
  if (appState.pendingReports.length === 0) {
    showToast('info', 'No pending reports to synchronize.');
    return;
  }

  showToast('info', 'Synchronizing cached reports with regional command center...');
  setTimeout(() => {
    appState.fieldReports.unshift(...appState.pendingReports);
    appState.pendingReports = [];
    saveLocalState();
    updatePendingSyncUI();
    renderFieldReportsList();
    showToast('success', '✓ Batch synchronization complete. All reports verified.');
  }, 1000);
}

function renderFieldReportsList() {
  const container = document.getElementById('fieldReportsList');
  const countBadge = document.getElementById('fieldReportsCount');
  if (!container) return;

  if (countBadge) countBadge.innerText = `${appState.fieldReports.length} REPORTS`;

  let html = '';
  appState.fieldReports.forEach(r => {
    const sevBadge = r.severity === 'CRITICAL' ? 'danger' : (r.severity === 'WARNING' ? 'warning' : 'info');
    html += `
      <div class="alert-card ${r.severity.toLowerCase()}">
        <div class="d-flex align-items-center justify-content-between mb-1">
          <div class="d-flex align-items-center gap-2">
            <span class="badge badge-${sevBadge}">${r.severity}</span>
            <strong class="text-white" style="font-size:0.9rem;">${escapeHtml(r.type)}</strong>
          </div>
          <span class="text-muted font-mono" style="font-size:0.72rem;">${r.time}</span>
        </div>
        <div class="text-secondary" style="font-size:0.78rem; margin:2px 0;">
          <i class="fa-solid fa-location-dot"></i> ${escapeHtml(r.location)} (${r.gps})
        </div>
        <p style="font-size:0.78rem; color:#cbd5e1; margin-top:4px;">${escapeHtml(r.description)}</p>
      </div>
    `;
  });

  container.innerHTML = html;
}

// ============================================================================
// 18. LOGISTICS ANALYTICS (CHART.JS)
// ============================================================================
function initAnalytics() {
  // Setup Chart.js dark command center theme defaults
  if (typeof Chart === 'undefined') {
    console.warn('Chart.js not loaded. Skipping chart rendering.');
    return;
  }

  Chart.defaults.color = '#94a3b8';
  Chart.defaults.font.family = "'Plus Jakarta Sans', system-ui, sans-serif";
  Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.06)';

  renderAnalyticsCharts('7d');
}

function changeAnalyticsTimeframe(tf) {
  appState.timeframe = tf;
  document.querySelectorAll('.timeframe-btn-group .timeframe-btn').forEach(btn => {
    if (btn.getAttribute('data-timeframe') === tf) btn.classList.add('active');
    else btn.classList.remove('active');
  });

  renderAnalyticsCharts(tf);
  showToast('info', `Analytics filtered to ${tf.toUpperCase()} historical window.`);
}

function renderAnalyticsCharts(tf = appState.timeframe) {
  if (typeof Chart === 'undefined') return;

  const tfData = window.NER_DATA.analytics.timeframes[tf] || window.NER_DATA.analytics.timeframes['7d'];
  if (!tfData) return;

  // Update summary counts
  const totDel = document.getElementById('statTotalDeliveries');
  const onTime = document.getElementById('statOnTimeRate');
  const fuel = document.getElementById('statFuelSavings');
  if (totDel) totDel.innerText = tfData.summary.totalDeliveries;
  if (onTime) onTime.innerText = tfData.summary.onTimeRate;
  if (fuel) fuel.innerText = tfData.summary.fuelSavingsPct;

  // 1. Chart: Delay by Corridor (Bar)
  const ctxDelay = document.getElementById('chartCorridorDelay');
  if (ctxDelay) {
    if (appState.charts.delay) appState.charts.delay.destroy();
    appState.charts.delay = new Chart(ctxDelay, {
      type: 'bar',
      data: tfData.delayByCorridor,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' } },
          x: { grid: { display: false } }
        }
      }
    });
  }

  // 2. Chart: Disruptions by Month (Line)
  const ctxDisruptions = document.getElementById('chartDisruptionsMonth');
  if (ctxDisruptions) {
    if (appState.charts.disruptions) appState.charts.disruptions.destroy();
    appState.charts.disruptions = new Chart(ctxDisruptions, {
      type: 'line',
      data: tfData.disruptionsByMonth,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'top', labels: { boxWidth: 12 } } },
        scales: {
          y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' } },
          x: { grid: { color: 'rgba(255,255,255,0.03)' } }
        }
      }
    });
  }

  // 3. Chart: District Accessibility (Bar)
  const ctxAccess = document.getElementById('chartStateAccessibility');
  if (ctxAccess) {
    if (appState.charts.accessibility) appState.charts.accessibility.destroy();
    appState.charts.accessibility = new Chart(ctxAccess, {
      type: 'bar',
      data: tfData.districtAccessibility,
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { min: 0, max: 100, grid: { color: 'rgba(255,255,255,0.05)' } },
          y: { grid: { display: false } }
        }
      }
    });
  }

  // 4. Chart: Vehicle Utilization (Doughnut)
  const ctxUtil = document.getElementById('chartVehicleUtilization');
  if (ctxUtil) {
    if (appState.charts.utilization) appState.charts.utilization.destroy();
    appState.charts.utilization = new Chart(ctxUtil, {
      type: 'doughnut',
      data: tfData.vehicleUtilization,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'right', labels: { boxWidth: 12 } } },
        cutout: '68%'
      }
    });
  }

  // 5. Chart: Route Risk Distribution (Doughnut)
  const ctxRisk = document.getElementById('chartRouteRisk');
  if (ctxRisk) {
    if (appState.charts.risk) appState.charts.risk.destroy();
    appState.charts.risk = new Chart(ctxRisk, {
      type: 'doughnut',
      data: tfData.routeRiskDistribution,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'right', labels: { boxWidth: 12 } } },
        cutout: '68%'
      }
    });
  }

  // 6. Chart: Delivery Success Rate (Line)
  const ctxSuccess = document.getElementById('chartDeliverySuccess');
  if (ctxSuccess) {
    if (appState.charts.success) appState.charts.success.destroy();
    appState.charts.success = new Chart(ctxSuccess, {
      type: 'line',
      data: tfData.deliverySuccessTrend,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'top', labels: { boxWidth: 12 } } },
        scales: {
          y: { min: 70, max: 100, grid: { color: 'rgba(255,255,255,0.05)' } },
          x: { grid: { color: 'rgba(255,255,255,0.03)' } }
        }
      }
    });
  }
}

// ============================================================================
// 19. DEMO SIMULATION ENGINE & LANDSLIDE SCENARIO (SIH CORE FLOW)
// ============================================================================
function triggerSimulation(type) {
  closeDemoSimulatorModal();
  appState.simulationMode = type;

  const simTriggerBtn = document.getElementById('openDemoSimBtn');
  if (simTriggerBtn) simTriggerBtn.classList.add('active-hazard');

  if (type === 'Landslide') {
    executeLandslideSimulation();
  } else if (type === 'Rainfall') {
    executeRainfallSimulation();
  } else if (type === 'Blockage') {
    executeBlockageSimulation();
  } else if (type === 'Traffic') {
    executeTrafficSimulation();
  }
}

/**
 * THE LANDSLIDE DEMO:
 * Global state reaction across KPIs, maps, route optimizer, alerts, fleet, and feeds.
 */
function executeLandslideSimulation() {
  console.log('TRIGGERING LANDSLIDE DISRUPTION SIMULATION (NH-2 Senapati Corridor)...');

  // 1. Update KPIs
  const kpiCorridors = document.getElementById('kpiHighRiskCorridors');
  const kpiDisruptions = document.getElementById('kpiActiveDisruptions');
  const kpiDelay = document.getElementById('kpiAvgDelay');
  const delaySub = document.getElementById('kpiDelaySub');

  if (kpiCorridors) kpiCorridors.innerText = '18';
  if (kpiDisruptions) kpiDisruptions.innerText = '09';
  if (kpiDelay) kpiDelay.innerText = '38';
  if (delaySub) delaySub.innerHTML = '<span class="text-crimson font-weight-bold">+14m surge (NH-2 blocked)</span>';

  // 2. Generate Critical Landslide Alert
  const newAlert = window.NER_DATA.createLandslideAlert();
  // Avoid duplicate
  if (!appState.alerts.find(a => a.id === newAlert.id)) {
    appState.alerts.unshift(newAlert);
  }

  // 3. Update Vehicle NER-104 Status
  const v104 = appState.vehicles.find(v => v.id === 'NER-104');
  if (v104) {
    v104.status = 'AT RISK';
    v104.risk = 'HIGH';
    v104.eta = '9h 05m';
    v104.speed = 12;
    v104.currentLocationName = '⚠ Stalled: Approach to Senapati Landslide Zone (NH-2)';
    v104.alertHistory.unshift({
      time: 'Just now',
      msg: 'CRITICAL HAZARD: Debris flow blocking NH-2. Automated alternate diversion requested.'
    });
  }

  // 4. Update Route A to HIGH RISK
  const routeA = appState.routes.find(r => r.id === 'ROUTE-GW-IMP-A');
  if (routeA) {
    routeA.risk = 'HIGH';
    routeA.eta = '9h 05m';
  }

  // 5. Update UI Route Hero Callout & Button
  const dangerCallout = document.getElementById('landslideDangerCallout');
  if (dangerCallout) dangerCallout.style.display = 'block';

  // 6. Update Route Alternatives Display
  renderRouteAlternativesGrid();

  // 7. Add to Live Intelligence Feed
  const feed = document.getElementById('liveIntelligenceFeed');
  if (feed) {
    const item = `
      <div class="feed-item critical" onclick="switchView('alerts')">
        <div class="feed-meta-row">
          <span class="feed-tag">CRITICAL ALERT</span>
          <span class="feed-time">Just now</span>
        </div>
        <div class="feed-title">⚠ LANDSLIDE DETECTED on NH-2 Corridor</div>
        <div class="feed-loc"><i class="fa-solid fa-location-dot"></i> Senapati Pass (km 218), Manipur</div>
      </div>
    `;
    feed.insertAdjacentHTML('afterbegin', item);
  }

  // 8. Add to Notification bell
  appState.notifications.unshift({
    id: `NOTIF-LS-${Date.now()}`,
    title: "CRITICAL — Landslide on NH-2",
    text: "Senapati pass impassable. Vehicle NER-104 requires emergency reroute.",
    time: "Just now",
    severity: "critical",
    view: "route-optimizer"
  });

  updateNotifBadge();
  updateAlertBadges();
  renderAlertsList();
  renderFleetTable();
  renderCommandMapLayers();

  // Show Toast
  showToast('danger', '⚠ CRITICAL: Landslide detected on NH-2 Corridor! Alternate route generated.', 6000);
}

function executeRainfallSimulation() {
  showToast('warning', 'Heavy cloudburst simulated over Haflong & Barak Basin. Throttling convoy speeds.');
  const kpiDelay = document.getElementById('kpiAvgDelay');
  if (kpiDelay) kpiDelay.innerText = '29';
}

function executeBlockageSimulation() {
  showToast('warning', 'Bridge maintenance closure simulated near Silchar-Jiribam feeder.');
}

function executeTrafficSimulation() {
  showToast('info', 'Traffic border checkpost congestion simulated at Dimapur gate.');
}

/**
 * REROUTING ACTION:
 * Animates the route diversion and restores Vehicle NER-104 to safe status.
 */
function executeReroute() {
  showToast('info', 'Calculating optimal bypass corridor geometry via NH-37 Jiribam Highway...');

  setTimeout(() => {
    window.api.rerouteVehicle('NER-104', 'ROUTE-GW-IMP-B').then(res => {
      // 1. Hide Danger callout
      const dangerCallout = document.getElementById('landslideDangerCallout');
      if (dangerCallout) dangerCallout.style.display = 'none';

      // 2. Select Route B in optimizer
      const routeB = appState.routes.find(r => r.id === 'ROUTE-GW-IMP-B');
      if (routeB) {
        appState.selectedRoute = routeB;
        updateRouteResultsHero(routeB);
        renderOptimizerRouteOnMap(routeB);
      }

      // 3. Update Command Map
      renderCommandMapLayers();

      // 4. Update Fleet Table
      renderFleetTable();

      // 5. Update KPI delay
      const kpiDelay = document.getElementById('kpiAvgDelay');
      const delaySub = document.getElementById('kpiDelaySub');
      if (kpiDelay) kpiDelay.innerText = '26';
      if (delaySub) delaySub.innerHTML = '<span class="text-emerald font-weight-bold">Restored via NH-37 Reroute</span>';

      // 6. Add success item to live feed
      const feed = document.getElementById('liveIntelligenceFeed');
      if (feed) {
        const item = `
          <div class="feed-item success" onclick="openVehicleDetail('NER-104')">
            <div class="feed-meta-row">
              <span class="feed-tag">REROUTE EXECUTED</span>
              <span class="feed-time">Just now</span>
            </div>
            <div class="feed-title">✓ Vehicle NER-104 Rerouted to NH-37 Corridor</div>
            <div class="feed-loc"><i class="fa-solid fa-location-dot"></i> Bypassing Senapati via Jiribam</div>
          </div>
        `;
        feed.insertAdjacentHTML('afterbegin', item);
      }

      showToast('success', '✓ Vehicle NER-104 successfully rerouted to NH-37 bypass!', 5000);
    });
  }, 1000);
}

/**
 * RESET SIMULATION:
 * Restores baseline state across routes, vehicles, alerts, and KPIs.
 */
function resetSimulation() {
  closeDemoSimulatorModal();
  appState.simulationMode = null;

  const simTriggerBtn = document.getElementById('openDemoSimBtn');
  if (simTriggerBtn) simTriggerBtn.classList.remove('active-hazard');

  // Restore initial routes and vehicles
  initDataState();

  // Reset KPIs
  const kpiCorridors = document.getElementById('kpiHighRiskCorridors');
  const kpiDisruptions = document.getElementById('kpiActiveDisruptions');
  const kpiDelay = document.getElementById('kpiAvgDelay');
  const delaySub = document.getElementById('kpiDelaySub');

  if (kpiCorridors) kpiCorridors.innerText = '17';
  if (kpiDisruptions) kpiDisruptions.innerText = '08';
  if (kpiDelay) kpiDelay.innerText = '24';
  if (delaySub) delaySub.innerHTML = 'reduced via AI predictive rerouting';

  const dangerCallout = document.getElementById('landslideDangerCallout');
  if (dangerCallout) dangerCallout.style.display = 'none';

  renderCommandMapLayers();
  renderFleetTable();
  renderAlertsList();
  renderLiveIntelligenceFeed();
  renderRouteAlternativesGrid();
  selectAlternativeRoute('ROUTE-GW-IMP-A');

  showToast('info', 'Simulation reset to baseline state.');
}

function resetDemoData() {
  localStorage.removeItem('ner_smartlog_state');
  resetSimulation();
  showToast('success', 'All local cached demo state cleared and restored to default.');
}

// ============================================================================
// 20. UTILITIES
// ============================================================================
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
