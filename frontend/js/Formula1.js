document.addEventListener('DOMContentLoaded', function() {
    var selectYear = document.getElementById('selectYear');

    for (var year = 1950; year <= 2024; year++) {
        var option = document.createElement('option');
        option.textContent = year;
        option.value = year;
        selectYear.appendChild(option);
    }

    selectYear.value = 2024;

    selectYear.addEventListener('change', function() {
        var selectedYear = this.value;
        calendario(selectedYear);
    });

    calendario(2024);
});

async function calendario(selectedYear) {
    const g = await fetch(`http://localhost:8080/f1?resource=Calendar&season=${selectedYear}`, {
        headers: {
            'Accept': 'application/json'
        }
    });
    const gare = await g.json();
    console.log(JSON.stringify(gare));
    const table = document.getElementById('race');
    table.innerHTML = '';

    gare[0].Races.forEach(race => {
        const row = table.insertRow();
        const cellRaceName = row.insertCell();
        cellRaceName.classList.add("table1");
        const raceLink = document.createElement('a');
        raceLink.href = `round.html?race=${race.round}`;
        raceLink.textContent = race.round;
        raceLink.style.textDecoration = "none"; 
        raceLink.style.color = "#f1b811"; 
        cellRaceName.appendChild(raceLink);
        const cellDate = row.insertCell();
        cellDate.textContent = race.date;
        cellDate.classList.add("table1");
        const cellLocation = row.insertCell();
        cellLocation.textContent = `${race.Circuit.Location.locality}, ${race.Circuit.Location.country}`;
    });
    
    
}
const username = localStorage.getItem('username');

if (!username) {
    window.location.replace("/frontend/login.html");
}
