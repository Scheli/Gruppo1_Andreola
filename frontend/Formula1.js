document.addEventListener('DOMContentLoaded', function () {
    var selectYear = document.getElementById('selectYear');

    for (var year = 1979; year < 2024; year++) {
        var option = document.createElement('option');
        option.textContent = year;
        option.value = year;
        selectYear.appendChild(option);
    }

    var option2024 = document.createElement('option');
    option2024.textContent = 2024;
    option2024.value = 2024;
    option2024.selected = true;
    selectYear.appendChild(option2024);

    selectYear.addEventListener('change', function () {
        var selectedYear = this.value;
        fetchRaceData(selectedYear);
    });
});

async function calendario() {
    const s = document.getElementById("selectYear").value;
    const g = await fetch(`http://localhost:8080/f1?resource=Calendar&season=${s}`,{
        headers: {
            'Accept': 'application/json'
        }
    });
    const gare = await g.json();
    console.log(JSON.stringify(gare));

async function fetchRaceData(selectedYear) {
    console.log(selectedYear)
    const response = await fetch(`http://localhost:8080/season?resource=Race&season=${selectedYear}`);
    const raceData = await response.json();
    
    // console.log(raceData) undefined

    updateRaceSection(raceData.previousYear, 'previous');
    updateRaceSection(raceData.nextYear, 'next');
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

