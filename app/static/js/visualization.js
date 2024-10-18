let barChart;
let pieChart;
let doughnutChart;

function trek_duration_chart() {
  // Hide pie chart container and show bar chart container
  document.getElementById("trek-pie-chart-container").style.display = "none";
  document.getElementById("time-bar-chart-container").style.display = "block";
  document.getElementById("doughnut-chart").style.display = "none";

  // Destroy pie chart if it exists
  if (pieChart instanceof Chart) {
    pieChart.destroy();
    pieChart = null;
  } else if (doughnutChart instanceof Chart) {
    doughnutChart.destroy();
    doughnutChart = null;
  }

  const timeDataContainer = document.getElementById("timeDataContainer");
  const timeData = JSON.parse(timeDataContainer.getAttribute("data-time"));

  // Sort the timeData to use as labels
  const sortedTimeData = timeData.slice().sort((a, b) => a - b);

  // Count the frequency of each unique time value
  const timeFrequency = sortedTimeData.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});

  // Extract the unique time values and their corresponding frequencies
  const timeLabels = Object.keys(timeFrequency);
  const frequencies = Object.values(timeFrequency);

  const ctx = document.getElementById("chartCanvas").getContext("2d");

  // Create the chart with the actual time data as labels
  barChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: timeLabels, // Use the actual time values as labels
      datasets: [
        {
          label: "Frequency",
          data: frequencies, // Use the frequency counts
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        x: {
          title: {
            display: true,
            text: "Time (Days)", // Adjust based on your data context
          },
          ticks: {
            autoSkip: false, // Display all labels if needed
          },
        },
        y: {
          title: {
            display: true,
            text: "Frequency",
          },
        },
      },
    },
  });
}

function trek_pie_chart() {
  // Hide bar chart container and show pie chart container
  document.getElementById("time-bar-chart-container").style.display = "none";
  document.getElementById("trek-pie-chart-container").style.display = "block";
  document.getElementById("doughnut-chart").style.display = "none";

  // Destroy the bar chart if it exists
  if (barChart instanceof Chart) {
    barChart.destroy();
    barChart = null;
  } else if (doughnutChart instanceof Chart) {
    doughnutChart.destroy();
    doughnutChart = null;
  }

  fetch("/trek-data")
    .then((response) => response.json())
    .then((data) => {
      const trekLabels = {
        1: "Annapurna",
        2: "Everest",
        3: "Poon Hill",
        4: "Gokyo",
        5: "Helambu",
        6: "Kanchenjunga",
        7: "Langtang",
        8: "Makalu",
        9: "Manaslu",
        10: "Mardi",
        11: "Narphu",
        12: "Rara",
        13: "Mustang",
      };
      const trekLabelsArray = Object.values(trekLabels);
      const frequencies = data.frequency;

      const ctx = document.getElementById("pieChartCanvas").getContext("2d");
      // Destroy previous pie chart if it exists
      if (pieChart instanceof Chart) {
        pieChart.destroy();
      }

      // Create the pie chart
      pieChart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: trekLabelsArray, // Use trek names as labels
          datasets: [
            {
              label: "Number of Visits",
              data: frequencies, // Use the frequency counts
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(51, 102, 230, 0.2)",
                "rgba(153, 153, 102, 0.2)",
                "rgba(153, 255, 153, 0.2)",
                "rgba(179, 77, 77, 0.2)",
                "rgba(128, 179, 0, 0.2)",
                "rgba(128, 153, 0, 0.2)",
                "rgba(230, 179, 179, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(51, 102, 230, 1)",
                "rgba(153, 153, 102, 1)",
                "rgba(153, 255, 153, 1)",
                "rgba(179, 77, 77, 1)",
                "rgba(128, 179, 0, 1)",
                "rgba(128, 153, 0, 1)",
                "rgba(230, 179, 179, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Most Visited Trek Locations",
            },
          },
        },
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
}

function travel_doughnut_chart() {
  document.getElementById("doughnut-chart").style.display = "block";
  document.getElementById("time-bar-chart-container").style.display = "none";
  document.getElementById("trek-pie-chart-container").style.display = "none";

  if (barChart instanceof Chart) {
    barChart.destroy();
    barChart = null;
  } else if (pieChart instanceof Chart) {
    pieChart.destroy();
    pieChart = null;
  }

  fetch("/doughnutChart")
    .then((response) => response.json())
    .then((data) => {
      // Extract labels and frequencies from the server response
      const travelLabels = data.labels;
      const travelFrequencies = data.frequencies;

      // Create the Doughnut Chart
      const ctx = document.getElementById("doughnutChart").getContext("2d");
      doughnutChart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: travelLabels, // Travel purposes (Adventure, Charity, Leisure)
          datasets: [
            {
              label: "Purpose of Travel",
              data: travelFrequencies, // Frequency of each purpose
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(158, 236, 35, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(158, 236, 35, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Distribution of Travel Purposes",
            },
          },
        },
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
}

// You can call these functions based on user interaction, e.g., button click
document
  .getElementById("showBarChart")
  .addEventListener("click", trek_duration_chart);
document
  .getElementById("showPieChart")
  .addEventListener("click", trek_pie_chart);

document
  .getElementById("showDoughnutChart")
  .addEventListener("click", travel_doughnut_chart);

window.onload = function () {
  trek_duration_chart();
};
