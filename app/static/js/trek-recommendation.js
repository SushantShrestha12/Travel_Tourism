const form = document.getElementById("trekForm");
const loadingSpinner = document.querySelector(".loading-spinner");
const modal = document.getElementById("resultModal");
const resultMessage = document.getElementById("resultMessage");
const closeModal = document.getElementById("closeModal");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent page refresh

  // Show loading spinner
  loadingSpinner.style.display = "block";

  // Gather form data
  const formData = new FormData(form);

  // Send form data to /predict using fetch
  fetch('/predict', {
    method: 'POST',
    body: formData,
  })
  .then(response => response.json())
  .then(data => {
    // Hide loading spinner
    loadingSpinner.style.display = "none";

    // Show the modal with the result
    resultMessage.textContent = "Recommendation: " + data.recommendation;
    modal.style.display = "flex"; // Show modal

    // Add 'show' class for animation effect
    setTimeout(function () {
      modal.classList.add("show");
    }, 100);
  })
  .catch(error => {
    console.error('Error:', error);
    loadingSpinner.style.display = "none";
  });
});

// Close the modal
closeModal.addEventListener("click", function () {
  modal.classList.remove("show");
  setTimeout(function () {
    modal.style.display = "none"; // Hide modal after animation
  }, 300);
});

// Close modal if clicked outside of modal content
window.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.classList.remove("show");
    setTimeout(function () {
      modal.style.display = "none";
    }, 300);
  }
});