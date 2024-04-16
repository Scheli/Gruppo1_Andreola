async function getRace() {
  const container = document.getElementById("round-details");

  try {
      const urlParams = new URLSearchParams(window.location.search);
      const raceName = urlParams.get("race");

      const response = await fetch(
          `http://localhost:8080/f1?resource=Race&season=2024&round=${encodeURIComponent(raceName)}`, {
              headers: {
                  Accept: "application/json",
              },
          }
      );

      const round = await response.json();

      // Verifica se round è un array o un oggetto
      const roundata = Array.isArray(round) ? round[0] : round;

      // Genera il dettaglio della gara in modo dinamico
      const rounddetaildiv = createRoundDetailDiv(roundata);

      // Aggiungi il dettaglio della gara al container
      container.appendChild(rounddetaildiv);

  } catch (error) {
      console.error("Errore nel recupero dei dettagli della gara:", error);
  }
}

function RoundDetailDiv(roundata) {
  const rounddetaildiv = document.createElement("div");
  rounddetaildiv.classList.add("round-details");

  const statsContainer = document.createElement("div");
  statsContainer.classList.add("round-stats");

  statsContainer.innerHTML = `
      <div class="stat-tag"><p>posizione: ${roundata.Results.position}</p></div>
      <div class="stat-tag"><p>nome: ${roundata.Result.givenName}</p></div>
      <div class="stat-tag"><p>congome: ${roundata.Result.familyName} </p></div>
      <div class="stat-tag"><p>nazionalità: ${roundata.Result.nationality} </p></div>
      <div class="stat-tag"><p>scuderia: ${roundata.Result.name} </p></div>
      <div class="stat-tag"><p>stato gara: ${roundata.Result.status} </p></div>
  `;

  rounddetaildiv.innerHTML = `
      <div><h2>${roundata.raceName}</h2></div>
  `;
  rounddetaildiv.appendChild(statsContainer);

  return rounddetaildiv;
}

window.onload = function() {
  getRace();
};
