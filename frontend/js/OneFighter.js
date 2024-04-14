async function getFighterDetails() {
    const container = document.getElementById("fighter-details");
  
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const fighterName = urlParams.get("name");
  
    //   if (!fighterName) {
    //     console.error("Nome del combattente non trovato nella query string dell'URL.");
    //     container.innerHTML = `<p>Nome del combattente non specificato nell'URL.</p>`;
    //     return;
    //   }
  
      console.log("Nome del combattente dalla query string:", fighterName);
  
      const response = await fetch(
        `http://localhost:8080/ufc/fighters/${encodeURIComponent(fighterName)}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
  
      if (!response.ok) {
        console.error(`Errore HTTP! status: ${response.status}`);
        container.innerHTML = `<p>Dettagli del combattente non trovati. Verifica il nome o riprova più tardi.</p>`;
        return;
      }
  
      const fighters = await response.json();
    //   console.log("Response status:", response.status);
    //   console.log("Fighters data:", fighters);
  
      // Accedi al primo combattente nell'array
      const fighterData = fighters[0];
  
      container.innerHTML = `
        <h2>${fighterData.name}</h2>
        <h3>${fighterData.nickname}</h3>
        <img src="${fighterData.imgUrl}" alt="${fighterData.name}">
        <p>Category: ${fighterData.category}</p>
        <p>Age: ${fighterData.age}</p>
        <p>Height: ${fighterData.height} inches</p>
        <p>Weight: ${fighterData.weight} lbs</p>
        <p>Reach: ${fighterData.reach} inches</p>
        <p>Leg Reach: ${fighterData.legReach} inches</p>
        <p>Fighting Style: ${fighterData.fightingStyle}</p>
        <p>Wins: ${fighterData.wins}</p>
        <p>Losses: ${fighterData.losses}</p>
        <p>Draws: ${fighterData.draws}</p>
        <p>Octagon Debut: ${fighterData.octagonDebut}</p>
        <p>Place of Birth: ${fighterData.placeOfBirth}</p>
        <p>Trains At: ${fighterData.trainsAt}</p>
        <!-- Aggiungere altre caratteristiche del combattente qui -->
      `;
    } catch (error) {
      console.error("Errore nel recupero dei dettagli del combattente:", error);
    }
  }
  
  window.onload = function () {
    getFighterDetails();
  };