// fetch("/app/static/images/country.svg")
//   .then((response) => response.text())
//   .then((svgContent) => {
//     document.getElementById("map-container").innerHTML = svgContent;
//   });



//   // Assuming regions have the class 'region' or unique IDs
// const regions = document.querySelectorAll("#map-container .region");

// regions.forEach((region) => {
//   // Mouse over event for tooltips
//   region.addEventListener("mouseover", (event) => {
//     showTooltip(event, region.id);
//   });

//   // Mouse out event to hide tooltips
//   region.addEventListener("mouseout", () => {
//     hideTooltip();
//   });

//   // Click event for actions
//   region.addEventListener("click", () => {
//     alert(`You clicked on region: ${region.id}`);
//   });
// });

// function showTooltip(event, regionId) {
//   const tooltip = document.getElementById("tooltip");
//   tooltip.style.display = "block";
//   tooltip.style.left = event.pageX + 10 + "px";
//   tooltip.style.top = event.pageY + 10 + "px";
//   tooltip.innerHTML = `Region: ${regionId}`;
// }

// function hideTooltip() {
//   const tooltip = document.getElementById("tooltip");
//   tooltip.style.display = "none";
// }

// svgPanZoom('#your-svg-id', {
//     zoomEnabled: true,
//     controlIconsEnabled: true,
//     fit: true,
//     center: true
//   });
  