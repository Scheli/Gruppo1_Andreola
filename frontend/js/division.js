async function printDivisions(divisionId) {
  try {
    const response = await fetch(`http://localhost:8080/ufc/${divisionId}`, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch UFC categories data");
    }

    const categoriesData = await response.json();
    const categories = categoriesData.fighters.map((category) => category.id);
    console.log(categories);
    const container = document.getElementById("division"); // Assuming you have a container with id "division" in your HTML
    const displayedDivisions = new Set(); // Use a set to keep track of displayed divisions

    const divisionsContainer = document.createElement("div");
    divisionsContainer.classList.add("divisions"); // Apply the 'divisions' class to the parent div

    for (const category of categories) {
      if (!displayedDivisions.has(category)) {
        const divisionDiv = document.createElement("div");
        divisionDiv.classList.add("division");

        const divisionLink = document.createElement("a");
        divisionLink.href = `category.html`;
        // Open link in the same 
        divisionLink.target = "_self";

        const divisionName = document.createElement("h2");
        divisionName.textContent = category;

        divisionLink.appendChild(divisionName); // Append divisionName to anchor element
        divisionDiv.appendChild(divisionLink); // Append anchor element to divisionDiv
        divisionsContainer.appendChild(divisionDiv);

        displayedDivisions.add(category);
      }
    }

    container.appendChild(divisionsContainer);
  } catch (error) {
    console.error("Error:", error);
  }
}

window.onload = function () {
  const divisionId = "6617da04c9082c8049eb7901"; // Pass the ID of the UFC division you want to retrieve
  printDivisions(divisionId);
};
