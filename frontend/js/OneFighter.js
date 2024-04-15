async function getFighterDetails() {
    const container = document.getElementById("fighter-details");
  
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const fighterName = urlParams.get("name");
  
      const response = await fetch(
        `http://localhost:8080/ufc/fighters/${encodeURIComponent(fighterName)}`, {
          headers: {
            Accept: "application/json",
          },
        }
      );
  
      const fighters = await response.json();
      const fighterData = fighters[0];
  
      // Generate the fighter details div dynamically
      const fighterDetailsDiv = createFighterDetailsDiv(fighterData);
  
      // Append the fighter details div to the container
      container.appendChild(fighterDetailsDiv);
    } catch (error) {
      console.error("Error fetching fighter details:", error);
    }
  }
  
  function createFighterDetailsDiv(fighterData) {
    const fighterDetailsDiv = document.createElement("div");
    fighterDetailsDiv.classList.add("fighter-details");

    const statsContainer = document.createElement("div");
    statsContainer.classList.add("fighter-stats");

    statsContainer.innerHTML = `
        <div class="stat-tag"><p>Category: ${fighterData.category}</p></div>
        <div class="stat-tag"><p>Age: ${fighterData.age}</p></div>
        <div class="stat-tag"><p>Height: ${fighterData.height} inches</p></div>
        <div class="stat-tag"><p>Weight: ${fighterData.weight} lbs</p></div>
        <div class="stat-tag"><p>Reach: ${fighterData.reach} inches</p></div>
        <div class="stat-tag"><p>Leg Reach: ${fighterData.legReach} inches</p></div>
        <div class="stat-tag"><p>Fighting Style: ${fighterData.fightingStyle}</p></div>
        <div class="stat-tag"><p>Wins: ${fighterData.wins}</p></div>
        <div class="stat-tag"><p>Losses: ${fighterData.losses}</p></div>
        <div class="stat-tag"><p>Draws: ${fighterData.draws}</p></div>
        <div class="stat-tag"><p>Octagon Debut: ${fighterData.octagonDebut}</p></div>
        <div class="stat-tag"><p>Place of Birth: ${fighterData.placeOfBirth}</p></div>
        <div class="stat-tag"><p>Trains At: ${fighterData.trainsAt}</p></div>
    `;

    fighterDetailsDiv.innerHTML = `
        <div><h2>${fighterData.name}</h2></div>
        <div><h3>"${fighterData.nickname}"</h3></div>
        <div><img src="${fighterData.imgUrl}" alt="${fighterData.name}"></div>
    `;
    fighterDetailsDiv.appendChild(statsContainer);

    return fighterDetailsDiv;
}

  
  window.onload = function() {
    getFighterDetails();
  };
  