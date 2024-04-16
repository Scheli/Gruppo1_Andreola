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
  
          // Create anchor tag
          const divisionLink = document.createElement("a");
          divisionLink.href = `category.html?id=${category}`; // Adjust the href accordingly
  
          const divisionName = document.createElement("h2");
          divisionName.textContent = category;
  
          divisionLink.appendChild(divisionName); // Append division name to anchor tag
          divisionDiv.appendChild(divisionLink); // Append anchor tag to division div
          divisionsContainer.appendChild(divisionDiv);
  
          displayedDivisions.add(category);
        }
      }
  
      container.appendChild(divisionsContainer);
    } catch (error) {
      console.error("Error:", error);
    }
}
function renderFighters(fighters, container) {
    container.innerHTML = '';

    fighters.forEach(fighter => {
        const divElement = document.createElement('div');
        divElement.classList.add('fighter');

        const nameElement = document.createElement('h2');
        nameElement.textContent = fighter.name;

        // Aggiungi qui il gestore degli eventi click
        nameElement.addEventListener('click', () => {
            window.location.href = `fighter-details.html?name=${encodeURIComponent(fighter.name)}`;
        });

        divElement.appendChild(nameElement);
        container.appendChild(divElement);
    });
}

window.onload = function () {
    listaFighters();
};