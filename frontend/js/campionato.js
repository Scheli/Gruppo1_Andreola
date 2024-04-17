document.addEventListener('DOMContentLoaded', function () {
    var selectYear = document.getElementById('selectYear');

    for (var year = 1950; year <= 2024; year++) {
        var option = document.createElement('option');
        option.textContent = year;
        option.value = year;
        selectYear.appendChild(option);
    }

    selectYear.value = 2024;

    selectYear.addEventListener('change', function () {
        var selectedYear = this.value;
        campionato(selectedYear);
        piloti(selectedYear);
    });

    campionato(2024);
    piloti(2024);
});

async function campionato(selectedYear) {
    const g = await fetch(`http://localhost:8080/f1?resource=Constructor_Standings&season=${selectedYear}`, {
        headers: {
            'Accept': 'application/json'
        }
    });

    const result = await g.json();
    console.log(JSON.stringify(result));
    const table = document.getElementById('result');
    table.innerHTML = '';
    if (result[0].StandingsLists.length > 0) {
        result[0].StandingsLists.forEach(standingsList => {
            standingsList.ConstructorStandings.forEach(standing => {
                const row = table.insertRow();
                const cellposition = row.insertCell();
                cellposition.textContent = standing.position;
                cellposition.classList.add("table1");
                const cellconstructor = row.insertCell();
                cellconstructor.textContent = standing.Constructor.name;
                cellconstructor.classList.add("table1");
                const cellpoints = row.insertCell();
                cellpoints.textContent = standing.points;
            });
        });
    } else {
        table.innerHTML = 'Il campionato costruttori è stato istituito dal 1958';
    }
}

async function piloti(selectedYear) {
    const response = await fetch(`http://localhost:8080/f1?resource=Driver_Standings&season=${selectedYear}`, {
        headers: {
            'Accept': 'application/json'
        }
    });

    const standings = await response.json();
    console.log(JSON.stringify(standings));
    const table = document.getElementById('pilot');
    table.innerHTML = '';

    if (standings[0] && standings[0].StandingsLists && standings[0].StandingsLists.length > 0) {
        standings[0].StandingsLists.forEach(standingsList => {
            standingsList.DriverStandings.forEach(standing => {
                const row = table.insertRow();

                const cellPosition = row.insertCell();
                cellPosition.textContent = standing.position;

                const driverName = standing.Driver ? `${standing.Driver.givenName} ${standing.Driver.familyName}` : "Nome non disponibile";

                const cellDriver = row.insertCell();
                const driverLink = document.createElement('a');
                driverLink.textContent = driverName;
                driverLink.href = `statistics.html?pilot=${standing.Driver.familyName}`;
                driverLink.style.textDecoration = "none";
                driverLink.style.color = "#f1b811";
                driverLink.addEventListener('click', function () {
                    localStorage.setItem('selectedDriverLastName', standing.Driver.familyName);
                    localStorage.setItem('selectedYear', selectedYear);
                });
                cellDriver.appendChild(driverLink);

                const cellPoints = row.insertCell();
                cellPoints.textContent = standing.points;
            });
        });
    } else {
        console.log("Nessun dato pilota disponibile per l'anno selezionato.");
    }
}

const username = localStorage.getItem('username');

if (!username) {
    window.location.replace("/frontend/login.html");
}
