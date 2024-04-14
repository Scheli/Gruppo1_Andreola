document.addEventListener('DOMContentLoaded', function() {
    var selectYear = document.getElementById('selectYear');

    for (var year = 1979; year <= 2024; year++) {
        var option = document.createElement('option');
        option.textContent = year;
        option.value = year;
        selectYear.appendChild(option);
    }

    selectYear.value = 2024;

    selectYear.addEventListener('change', function() {
        var selectedYear = this.value;
        campionato(selectedYear);
        piloti(selectedYear)
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

    result[0].StandingsLists.forEach(standingsList => {
        standingsList.ConstructorStandings.forEach(standing => {
            const row = table.insertRow();
            const cellconstructor = row.insertCell();
            cellconstructor.textContent = standing.Constructor.name;
            const cellposition = row.insertCell();
            cellposition.textContent = standing.position;
            const cellpoints = row.insertCell();
            cellpoints.textContent = standing.points;
        });
    });
    
}

async function piloti(selectedYear) {
    const g = await fetch(`http://localhost:8080/f1?resource=Driver_Standings&season=${selectedYear}`, {
        headers: {
            'Accept': 'application/json'
        }
    });

    const pilot = await g.json();
    console.log(JSON.stringify(pilot));
    const table = document.getElementById('pilot');
    table.innerHTML = '';

    pilot[0].StandingsLists.forEach(standingsList => {
        standingsList.DriverStandings.forEach(standing => {
            const row = table.insertRow();
            const celldriver = row.insertCell();
            celldriver.textContent = standing.driver.name;
            const cellposition = row.insertCell();
            cellposition.textContent = standing.position;
            const cellpoints = row.insertCell();
            cellpoints.textContent = standing.points;
        });
    });
    
}