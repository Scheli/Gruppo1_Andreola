async function printDivisions() {
  try {
    const response = await fetch(`http://localhost:8080/ufc/allranking`, {
      headers: {
        Accept: "application/json",
      },
    });

    const categoriesData = await response.json();
    const container = document.getElementById("division");
    const displayedDivisions = new Set();

    const divisionsContainer = document.createElement("div");
    divisionsContainer.classList.add("divisions");

    for (const category of categoriesData) {
      if (!displayedDivisions.has(category.name)) {
        const divisionDiv = document.createElement("div");
        divisionDiv.classList.add("division");
        const divisionLink = document.createElement("a");
        divisionLink.href = "category.html";
        divisionLink.addEventListener("click", function() {
          const categoryName = category.name;
          console.log("Storing category name:", categoryName);
          sessionStorage.setItem("categoryName", categoryName);
        });

        const divisionName = document.createElement("h2");
        divisionName.textContent = category.name;

        divisionLink.appendChild(divisionName);
        divisionDiv.appendChild(divisionLink);
        divisionsContainer.appendChild(divisionDiv);

        displayedDivisions.add(category.name);
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
