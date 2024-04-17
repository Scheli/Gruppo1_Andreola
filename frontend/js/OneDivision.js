window.onload = async function () {
  
  const encodedCategoryName = window.location.hash.substring(1);
  const categoryName = atob(encodedCategoryName);

  
  try {
    const response = await fetch(
      `http://localhost:8080/ufc/ranking?rankingId=${encodeURIComponent(
        categoryName
      )}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const divisionData = await response.json();
    console.log(divisionData);

    const divisionContainer = document.getElementById("divisionData");
    let displayedCategories = {};

    divisionData.forEach((category) => {
      if (!displayedCategories[category.categoryName]) {
        const categoryElement = document.createElement("div");
        categoryElement.textContent = "Category: " + category.categoryName;
        divisionContainer.appendChild(categoryElement);

        const fightersList = document.createElement("ul");

        category.fighters.forEach((fighter) => {
          const fighterItem = document.createElement("h2");
          const divisionLink = document.createElement("a");
          divisionLink.textContent = fighter.name;
          divisionLink.href = `https://example.com/${fighter.id}`;
          divisionLink.classList.add("fight");
          fighterItem.appendChild(divisionLink); 
          fightersList.appendChild(fighterItem); 

          divisionLink.addEventListener("click", (event) => {
            event.preventDefault(); 
            window.location.href = `fighter-details.html?name=${encodeURIComponent(fighter.name)}`;
          });
        });

        divisionContainer.appendChild(fightersList); 
        displayedCategories[category.categoryName] = true;
      }
    });
  } catch (error) {
    console.error("Error fetching division data:", error);
  }
};
