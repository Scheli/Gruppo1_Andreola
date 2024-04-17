async function getRace() {
    const container = document.getElementById("round-details");

    try {
        const urlParams = new URLSearchParams(window.location.search);
        const raceName = urlParams.get("race");

        const selectedYear = localStorage.getItem('selectedYear');

        const response = await fetch(
            `http://localhost:8080/f1?resource=Race&season=${selectedYear}&round=${encodeURIComponent(raceName)}`, {
                headers: {
                    Accept: "application/json",
                },
            }
        );

        const round = await response.json();


        console.log(round.Races[0].Results)
       

        const rounddetaildiv = RoundDetailDiv(round.Races[0].Results);

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

    
        roundata.forEach(result => {
            const resultContainer = document.createElement("div");
            resultContainer.classList.add("result-item");

            const positionTag = document.createElement("p");
            positionTag.textContent = `Posizione: ${result.position}`;
            resultContainer.appendChild(positionTag);

            if (result.Driver) {
                const driverNameTag = document.createElement("p");
                driverNameTag.textContent = `Pilota: ${result.Driver.givenName} ${result.Driver.familyName}`;
                resultContainer.appendChild(driverNameTag);
                const nationalityTag = document.createElement("p");
                nationalityTag.textContent = `Nazionalità: ${result.Driver.nationality}`;
                resultContainer.appendChild(nationalityTag);
            } else {
                console.warn("Dati pilota mancanti per il risultato:", result);
            }

            if (result.Constructor) {
                const constructorTag = document.createElement("p");
                constructorTag.textContent = `Scuderia: ${result.Constructor.name}`;
                resultContainer.appendChild(constructorTag) + '';
            } else {
                console.warn("Dati scuderia mancanti per il risultato:", result);
            }

            statsContainer.appendChild(resultContainer);
        });
   

    rounddetaildiv.appendChild(statsContainer);

    return rounddetaildiv;
}


const username = localStorage.getItem('username');

if (!username) {
    window.location.replace("/frontend/login.html");
}

window.onload = function() {
    getRace();
};
