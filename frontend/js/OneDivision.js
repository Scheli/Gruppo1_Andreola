// Define categoryName variable before window.onload
const categoryName = "Bantamweight"; // Example category name, replace with your actual logic to obtain the category name

window.onload = async function() {
  try {
    const response = await fetch(`http://localhost:8080/ufc/ranking?rankingId=${encodeURIComponent(categoryName)}`, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const divisionData = await response.json();
    console.log(divisionData); // Log division data

    // Display only the names of the fighters on the page
    const divisionContainer = document.getElementById("divisionData");
    divisionContainer.innerHTML = ""; // Clear previous content

    divisionData.fighters.forEach((fighter) => {
      const fighterNameElement = document.createElement("p");
      fighterNameElement.textContent = fighter.name;
      divisionContainer.appendChild(fighterNameElement);
    });
  } catch (error) {
    console.error("Error fetching division data:", error);
  }
};
