window.onload = async function () {
  // Retrieve category name from session storage
  const categoryName = sessionStorage.getItem("categoryName");

  if (categoryName) {
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

      // Display division data on the page
      const divisionContainer = document.getElementById("divisionData");
      divisionContainer.textContent = JSON.stringify(divisionData); // Example: Display the JSON data as text
    } catch (error) {
      console.error("Error fetching division data:", error);
    }
  } else {
    console.error("Category name not found in session storage");
  }
};