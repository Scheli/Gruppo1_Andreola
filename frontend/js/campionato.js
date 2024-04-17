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
    if(result[0].StandingsLists.length > 0){
        
    

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

    } else{
        table.innerHTML = 'Il campionato costruttori è stato istituito dal 1958';
    }
    
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
            const cellposition = row.insertCell();
            cellposition.textContent = standing.position;

            const driverName = standing.Driver?.givenName + " " + standing.Driver.familyName;

            const celldriver = row.insertCell();
            celldriver.textContent = driverName;
            celldriver.classList.add("table1");

            const cellpoints = row.insertCell();
            cellpoints.textContent = standing.points;
        });
    });


}
const username = localStorage.getItem('username');

if (!username) {
    window.location.replace("/frontend/login.html");
}
