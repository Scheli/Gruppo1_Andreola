async function OneDivision(divisionId) {
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
      const fighters = categoriesData.fighters[0].fighters; 
      const container = document.getElementById("division"); 
  
      const divisionsContainer = document.createElement("div");
      divisionsContainer.classList.add("divisions"); 
  
      for (const fighter of fighters) {
        const fighterName = fighter.name;
  
        const fighterDiv = document.createElement("div");
        fighterDiv.classList.add("fighter");
  
        const fighterNameElement = document.createElement("h2");
        fighterNameElement.textContent = fighterName;
  
        fighterDiv.appendChild(fighterNameElement);
        divisionsContainer.appendChild(fighterDiv);
      }
  
      container.appendChild(divisionsContainer);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
window.onload = () => {
    OneDivision();
}