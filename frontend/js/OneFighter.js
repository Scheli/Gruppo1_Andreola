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
    // Create a div element to hold fighter details
    const fighterDetailsDiv = document.createElement("div");
  
    // Set the class of the fighter details div
    fighterDetailsDiv.classList.add("fighter-details");
  
    // Set the inner HTML of the fighter details div
    fighterDetailsDiv.innerHTML = `
      <div><h2>${fighterData.name}</h2></div>
      <div><h3>"${fighterData.nickname}"</h3></div>
      <div><img src="${fighterData.imgUrl}" alt="${fighterData.name}"></div>
      <div class="category"><p>Category: ${fighterData.category}</p></div>
      <div class="age"><p>Age: ${fighterData.age}</p></div>
      <div class="height"><p>Height: ${fighterData.height} inches</p></div>
      <div class="weight"><p>Weight: ${fighterData.weight} lbs</p></div>
      <div class="reach"><p>Reach: ${fighterData.reach} inches</p></div>
      <div class="legReach"><p>Leg Reach: ${fighterData.legReach} inches</p></div>
      <div class="style"><p>Fighting Style: ${fighterData.fightingStyle}</p></div>
      <div class="wins"><p>Wins: ${fighterData.wins}</p></div>
      <div class="losses"><p>Losses: ${fighterData.losses}</p></div>
      <div class="draws"><p>Draws: ${fighterData.draws}</p></div>
      <div class="debut"><p>Octagon Debut: ${fighterData.octagonDebut}</p></div>
      <div class="birth"><p>Place of Birth: ${fighterData.placeOfBirth}</p></div>
      <div class="trains"><p>Trains At: ${fighterData.trainsAt}</p></div>
    `;
  
    return fighterDetailsDiv;
  }
  
  window.onload = function() {
    getFighterDetails();
  };
  