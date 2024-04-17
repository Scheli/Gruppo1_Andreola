async function getstatistic() {
    const container = document.getElementById("pilot-details");

    try {
        const selectedYear = localStorage.getItem('selectedYear');
        const driverLastName = localStorage.getItem('selectedDriverLastName');

        const response = await fetch(
            `http://localhost:8080/f1winrate?season=${selectedYear}&pilot=${driverLastName}`, {
                headers: {
                    Accept: "application/json",
                },
            }
        );

        const data = await response.json();

        container.innerHTML = `
            <p>Numero di vittorie: ${data.wins}</p>
            <p>Punti totali: ${data.point}</p>
            <p>Percentuale di vittorie: ${data.winPercentage}%</p>
            <p>Punti per gara: ${data.pointPerRace}</p>
        `;

    } catch (error) {
        console.error("Errore nel recupero delle statistiche del pilota:", error);
    }
}



const username = localStorage.getItem('username');

if (!username) {
    window.location.replace("/frontend/login.html");
}

window.onload = function () {
    getstatistic();
};
