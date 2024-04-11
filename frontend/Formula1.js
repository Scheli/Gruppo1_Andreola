document.addEventListener('DOMContentLoaded', function () {
    var selectYear = document.getElementById('selectYear');

    for (var year = 1979; year <= 2024; year++) {
        var option = document.createElement('option');
        option.textContent = year;
        option.value = year;
        selectYear.appendChild(option);
    }

    selectYear.value = 2024;

    selectYear.addEventListener('change', function () {
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
        cellRaceName.textContent = race.raceName;
        const cellDate = row.insertCell();
        cellDate.textContent = race.date;
        const cellLocation = row.insertCell();
        cellLocation.textContent = `${race.Circuit.Location.locality}, ${race.Circuit.Location.country}`;
    });
}
