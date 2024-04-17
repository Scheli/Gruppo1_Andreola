async function printDivisions() {
  try {
    const response = await fetch(`http://localhost:8080/ufc/allranking`, {
      headers: {
        Accept: "application/json",
      },
    });

    const categoriesData = await response.json();
    const categories = categoriesData.map((category) => category.categoryName); // Extract category names

    console.log(categories);
    const container = document.getElementById("division");
    const displayedDivisions = new Set();

    const divisionsContainer = document.createElement("div");
    divisionsContainer.classList.add("divisions"); // Apply the 'divisions' class to the parent div

    for (const category of categories) {
      if (!displayedDivisions.has(category)) {
        const divisionDiv = document.createElement("div");
        divisionDiv.classList.add("division");
        const divisionLink = document.createElement("a");

        // Encode category name into Base64 and append it to the URL
        const encodedCategoryName = btoa(category);
        divisionLink.href = `category.html#${encodedCategoryName}`;

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
  printDivisions();
};

