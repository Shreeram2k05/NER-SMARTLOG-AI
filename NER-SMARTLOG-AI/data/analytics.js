/**
 * NER-SMARTLOG AI - Analytics Dataset
 * Comprehensive metrics and datasets for Chart.js visualizations.
 * Supports dynamic filtering (7 Days, 30 Days, 90 Days, 1 Year).
 * DEMO DATA: Simulated performance indices across North Eastern logistics corridors.
 */

window.NER_DATA = window.NER_DATA || {};

window.NER_DATA.analytics = {
  timeframes: {
    "7d": {
      summary: {
        totalDeliveries: 342,
        onTimeRate: "96.4%",
        avgDelayMinutes: 24,
        activeDisruptions: 8,
        fuelSavingsPct: "14.2%",
        totalKmTracked: "48,290 km"
      },
      delayByCorridor: {
        labels: ["NH-2 (Imphal)", "NH-27 (Assam Trunk)", "NH-37 (Jiribam)", "NH-29 (Kohima)", "NH-6 (Shillong)", "NH-10 (Gangtok)"],
        datasets: [
          {
            label: "Average Delay (Minutes)",
            data: [38, 14, 22, 32, 8, 29],
            backgroundColor: ["rgba(239, 68, 68, 0.7)", "rgba(14, 165, 233, 0.7)", "rgba(245, 158, 11, 0.7)", "rgba(239, 68, 68, 0.7)", "rgba(16, 185, 129, 0.7)", "rgba(245, 158, 11, 0.7)"],
            borderColor: ["#ef4444", "#0ea5e9", "#f59e0b", "#ef4444", "#10b981", "#f59e0b"],
            borderWidth: 1.5
          }
        ]
      },
      disruptionsByMonth: {
        labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"],
        datasets: [
          {
            label: "Landslide Incidents",
            data: [4, 18, 32, 28, 14, 6],
            borderColor: "#ef4444",
            backgroundColor: "rgba(239, 68, 68, 0.2)",
            tension: 0.4,
            fill: true
          },
          {
            label: "Flash Floods & Waterlogging",
            data: [6, 24, 41, 35, 19, 4],
            borderColor: "#38bdf8",
            backgroundColor: "rgba(56, 189, 248, 0.15)",
            tension: 0.4,
            fill: true
          }
        ]
      },
      districtAccessibility: {
        labels: ["Assam", "Meghalaya", "Tripura", "Nagaland", "Mizoram", "Manipur", "Sikkim", "Arunachal"],
        datasets: [
          {
            label: "Regional Accessibility Index (%)",
            data: [81, 74, 72, 56, 52, 49, 48, 36],
            backgroundColor: [
              "rgba(16, 185, 129, 0.75)",
              "rgba(16, 185, 129, 0.75)",
              "rgba(14, 165, 233, 0.75)",
              "rgba(245, 158, 11, 0.75)",
              "rgba(245, 158, 11, 0.75)",
              "rgba(245, 158, 11, 0.75)",
              "rgba(239, 68, 68, 0.75)",
              "rgba(239, 68, 68, 0.75)"
            ],
            borderColor: "#0f172a",
            borderWidth: 1
          }
        ]
      },
      vehicleUtilization: {
        labels: ["On Route Active", "Delayed", "At Risk", "Delivered", "Staging / Idle"],
        datasets: [
          {
            data: [62, 16, 8, 10, 4],
            backgroundColor: ["#10b981", "#f59e0b", "#ef4444", "#0ea5e9", "#64748b"],
            borderColor: "#0a1128",
            borderWidth: 2
          }
        ]
      },
      routeRiskDistribution: {
        labels: ["Low Risk (<20%)", "Medium Risk (20-50%)", "High Risk (>50%)"],
        datasets: [
          {
            data: [58, 27, 15],
            backgroundColor: ["#10b981", "#f59e0b", "#ef4444"],
            borderColor: "#0a1128",
            borderWidth: 2
          }
        ]
      },
      deliverySuccessTrend: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "With AI Predictive Rerouting (%)",
            data: [95.2, 96.8, 97.4, 96.1, 98.2, 97.9, 98.4],
            borderColor: "#00f2fe",
            backgroundColor: "rgba(0, 242, 254, 0.15)",
            tension: 0.35,
            fill: true
          },
          {
            label: "Traditional Baseline (Without AI)",
            data: [82.4, 84.1, 80.6, 79.2, 83.5, 81.0, 82.8],
            borderColor: "#64748b",
            borderDash: [5, 5],
            tension: 0.35,
            fill: false
          }
        ]
      }
    },

    "30d": {
      summary: {
        totalDeliveries: 1420,
        onTimeRate: "95.8%",
        avgDelayMinutes: 27,
        activeDisruptions: 14,
        fuelSavingsPct: "15.1%",
        totalKmTracked: "198,400 km"
      },
      delayByCorridor: {
        labels: ["NH-2 (Imphal)", "NH-27 (Assam Trunk)", "NH-37 (Jiribam)", "NH-29 (Kohima)", "NH-6 (Shillong)", "NH-10 (Gangtok)"],
        datasets: [
          {
            label: "Average Delay (Minutes)",
            data: [42, 16, 26, 38, 11, 34],
            backgroundColor: ["rgba(239, 68, 68, 0.7)", "rgba(14, 165, 233, 0.7)", "rgba(245, 158, 11, 0.7)", "rgba(239, 68, 68, 0.7)", "rgba(16, 185, 129, 0.7)", "rgba(245, 158, 11, 0.7)"],
            borderWidth: 1.5
          }
        ]
      },
      disruptionsByMonth: {
        labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
        datasets: [
          {
            label: "Landslide Incidents",
            data: [2, 7, 22, 38, 31, 16],
            borderColor: "#ef4444",
            backgroundColor: "rgba(239, 68, 68, 0.2)",
            tension: 0.4,
            fill: true
          },
          {
            label: "Flash Floods & Waterlogging",
            data: [3, 9, 31, 49, 42, 23],
            borderColor: "#38bdf8",
            backgroundColor: "rgba(56, 189, 248, 0.15)",
            tension: 0.4,
            fill: true
          }
        ]
      },
      districtAccessibility: {
        labels: ["Assam", "Meghalaya", "Tripura", "Nagaland", "Mizoram", "Manipur", "Sikkim", "Arunachal"],
        datasets: [
          {
            label: "Regional Accessibility Index (%)",
            data: [81, 74, 72, 56, 52, 49, 48, 36],
            backgroundColor: ["rgba(16, 185, 129, 0.75)", "rgba(16, 185, 129, 0.75)", "rgba(14, 165, 233, 0.75)", "rgba(245, 158, 11, 0.75)", "rgba(245, 158, 11, 0.75)", "rgba(245, 158, 11, 0.75)", "rgba(239, 68, 68, 0.75)", "rgba(239, 68, 68, 0.75)"]
          }
        ]
      },
      vehicleUtilization: {
        labels: ["On Route Active", "Delayed", "At Risk", "Delivered", "Staging / Idle"],
        datasets: [
          {
            data: [59, 19, 10, 8, 4],
            backgroundColor: ["#10b981", "#f59e0b", "#ef4444", "#0ea5e9", "#64748b"]
          }
        ]
      },
      routeRiskDistribution: {
        labels: ["Low Risk (<20%)", "Medium Risk (20-50%)", "High Risk (>50%)"],
        datasets: [
          {
            data: [54, 29, 17],
            backgroundColor: ["#10b981", "#f59e0b", "#ef4444"]
          }
        ]
      },
      deliverySuccessTrend: {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        datasets: [
          {
            label: "With AI Predictive Rerouting (%)",
            data: [94.8, 96.2, 97.1, 98.0],
            borderColor: "#00f2fe",
            backgroundColor: "rgba(0, 242, 254, 0.15)",
            tension: 0.35,
            fill: true
          },
          {
            label: "Traditional Baseline (Without AI)",
            data: [81.5, 83.0, 80.2, 82.4],
            borderColor: "#64748b",
            borderDash: [5, 5],
            tension: 0.35,
            fill: false
          }
        ]
      }
    },

    "90d": {
      summary: {
        totalDeliveries: 4310,
        onTimeRate: "94.6%",
        avgDelayMinutes: 31,
        activeDisruptions: 19,
        fuelSavingsPct: "16.8%",
        totalKmTracked: "612,000 km"
      },
      delayByCorridor: {
        labels: ["NH-2 (Imphal)", "NH-27 (Assam Trunk)", "NH-37 (Jiribam)", "NH-29 (Kohima)", "NH-6 (Shillong)", "NH-10 (Gangtok)"],
        datasets: [
          {
            label: "Average Delay (Minutes)",
            data: [49, 19, 29, 44, 14, 41],
            backgroundColor: ["rgba(239, 68, 68, 0.7)", "rgba(14, 165, 233, 0.7)", "rgba(245, 158, 11, 0.7)", "rgba(239, 68, 68, 0.7)", "rgba(16, 185, 129, 0.7)", "rgba(245, 158, 11, 0.7)"],
            borderWidth: 1.5
          }
        ]
      },
      disruptionsByMonth: {
        labels: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        datasets: [
          {
            label: "Landslide Incidents",
            data: [1, 2, 4, 11, 28, 44],
            borderColor: "#ef4444",
            backgroundColor: "rgba(239, 68, 68, 0.2)",
            tension: 0.4,
            fill: true
          },
          {
            label: "Flash Floods & Waterlogging",
            data: [0, 1, 5, 14, 38, 56],
            borderColor: "#38bdf8",
            backgroundColor: "rgba(56, 189, 248, 0.15)",
            tension: 0.4,
            fill: true
          }
        ]
      },
      districtAccessibility: {
        labels: ["Assam", "Meghalaya", "Tripura", "Nagaland", "Mizoram", "Manipur", "Sikkim", "Arunachal"],
        datasets: [
          {
            label: "Regional Accessibility Index (%)",
            data: [81, 74, 72, 56, 52, 49, 48, 36],
            backgroundColor: ["rgba(16, 185, 129, 0.75)", "rgba(16, 185, 129, 0.75)", "rgba(14, 165, 233, 0.75)", "rgba(245, 158, 11, 0.75)", "rgba(245, 158, 11, 0.75)", "rgba(245, 158, 11, 0.75)", "rgba(239, 68, 68, 0.75)", "rgba(239, 68, 68, 0.75)"]
          }
        ]
      },
      vehicleUtilization: {
        labels: ["On Route Active", "Delayed", "At Risk", "Delivered", "Staging / Idle"],
        datasets: [
          {
            data: [56, 22, 11, 7, 4],
            backgroundColor: ["#10b981", "#f59e0b", "#ef4444", "#0ea5e9", "#64748b"]
          }
        ]
      },
      routeRiskDistribution: {
        labels: ["Low Risk (<20%)", "Medium Risk (20-50%)", "High Risk (>50%)"],
        datasets: [
          {
            data: [50, 31, 19],
            backgroundColor: ["#10b981", "#f59e0b", "#ef4444"]
          }
        ]
      },
      deliverySuccessTrend: {
        labels: ["Month 1", "Month 2", "Month 3"],
        datasets: [
          {
            label: "With AI Predictive Rerouting (%)",
            data: [93.9, 95.8, 97.4],
            borderColor: "#00f2fe",
            backgroundColor: "rgba(0, 242, 254, 0.15)",
            tension: 0.35,
            fill: true
          },
          {
            label: "Traditional Baseline (Without AI)",
            data: [80.1, 81.8, 83.2],
            borderColor: "#64748b",
            borderDash: [5, 5],
            tension: 0.35,
            fill: false
          }
        ]
      }
    },

    "1y": {
      summary: {
        totalDeliveries: 18940,
        onTimeRate: "93.8%",
        avgDelayMinutes: 34,
        activeDisruptions: 26,
        fuelSavingsPct: "17.4%",
        totalKmTracked: "2,840,000 km"
      },
      delayByCorridor: {
        labels: ["NH-2 (Imphal)", "NH-27 (Assam Trunk)", "NH-37 (Jiribam)", "NH-29 (Kohima)", "NH-6 (Shillong)", "NH-10 (Gangtok)"],
        datasets: [
          {
            label: "Average Delay (Minutes)",
            data: [54, 21, 33, 48, 16, 45],
            backgroundColor: ["rgba(239, 68, 68, 0.7)", "rgba(14, 165, 233, 0.7)", "rgba(245, 158, 11, 0.7)", "rgba(239, 68, 68, 0.7)", "rgba(16, 185, 129, 0.7)", "rgba(245, 158, 11, 0.7)"],
            borderWidth: 1.5
          }
        ]
      },
      disruptionsByMonth: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
          {
            label: "Landslide Incidents",
            data: [1, 1, 2, 5, 12, 34, 52, 46, 24, 8, 2, 1],
            borderColor: "#ef4444",
            backgroundColor: "rgba(239, 68, 68, 0.2)",
            tension: 0.4,
            fill: true
          },
          {
            label: "Flash Floods & Waterlogging",
            data: [0, 0, 1, 6, 18, 48, 68, 59, 32, 9, 1, 0],
            borderColor: "#38bdf8",
            backgroundColor: "rgba(56, 189, 248, 0.15)",
            tension: 0.4,
            fill: true
          }
        ]
      },
      districtAccessibility: {
        labels: ["Assam", "Meghalaya", "Tripura", "Nagaland", "Mizoram", "Manipur", "Sikkim", "Arunachal"],
        datasets: [
          {
            label: "Regional Accessibility Index (%)",
            data: [81, 74, 72, 56, 52, 49, 48, 36],
            backgroundColor: ["rgba(16, 185, 129, 0.75)", "rgba(16, 185, 129, 0.75)", "rgba(14, 165, 233, 0.75)", "rgba(245, 158, 11, 0.75)", "rgba(245, 158, 11, 0.75)", "rgba(245, 158, 11, 0.75)", "rgba(239, 68, 68, 0.75)", "rgba(239, 68, 68, 0.75)"]
          }
        ]
      },
      vehicleUtilization: {
        labels: ["On Route Active", "Delayed", "At Risk", "Delivered", "Staging / Idle"],
        datasets: [
          {
            data: [54, 23, 12, 7, 4],
            backgroundColor: ["#10b981", "#f59e0b", "#ef4444", "#0ea5e9", "#64748b"]
          }
        ]
      },
      routeRiskDistribution: {
        labels: ["Low Risk (<20%)", "Medium Risk (20-50%)", "High Risk (>50%)"],
        datasets: [
          {
            data: [47, 33, 20],
            backgroundColor: ["#10b981", "#f59e0b", "#ef4444"]
          }
        ]
      },
      deliverySuccessTrend: {
        labels: ["Q1", "Q2", "Q3", "Q4"],
        datasets: [
          {
            label: "With AI Predictive Rerouting (%)",
            data: [94.1, 92.8, 96.5, 97.9],
            borderColor: "#00f2fe",
            backgroundColor: "rgba(0, 242, 254, 0.15)",
            tension: 0.35,
            fill: true
          },
          {
            label: "Traditional Baseline (Without AI)",
            data: [82.0, 78.4, 81.2, 83.5],
            borderColor: "#64748b",
            borderDash: [5, 5],
            tension: 0.35,
            fill: false
          }
        ]
      }
    }
  }
};
