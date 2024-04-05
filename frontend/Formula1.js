document.addEventListener('DOMContentLoaded', function() {
    var selectYear = document.getElementById('selectYear');

    for (var year = 1980; year <= 2024; year++) {
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

    selectYear.addEventListener('change', function() {
        var selectedYear = this.value;
        fetchRaceData(selectedYear);
    });
});

async function fetchRaceData(selectedYear) {
    const response = await fetch(`http://localhost:8080/races/${selectedYear}`);
    const raceData = await response.json();

    updateRaceSection(raceData.previousYear, 'previous');
    updateRaceSection(raceData.nextYear, 'next');
}

function updateRaceSection(data, section) {
    var raceSection = document.getElementById(`${section}RaceSection`);
    raceSection.innerHTML = '';

    if (data) {
        data.forEach(function(race) {
            var raceElement = document.createElement('div');
            raceElement.classList.add('card');
            raceElement.innerHTML = `
                <img src="${race.image}" class="card-img-top" alt="${race.title}">
                <div class="card-body">
                    <h2 class="card-title">${race.title}</h2>
                    <p class="card-text">${race.description}</p>
                    <div class="text-center">
                        <a href="${race.videoUrl}" class="btn-garda-video">GUARDA IL VIDEO</a>
                    </div>
                </div>
            `;
            raceSection.appendChild(raceElement);
        });
    } else {
        raceSection.innerHTML = '<p>Nessun dato disponibile per questo anno.</p>';
    }
}
