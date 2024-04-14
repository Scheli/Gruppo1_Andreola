async function listaFighters() {
    try {
        const response = await fetch('http://localhost:8080/ufc/fighters', {
            headers: {
                'Accept': 'application/json'
            }
        });

        const fighters = await response.json();

        fighters.sort((a, b) => a.name.localeCompare(b.name));

        const container = document.getElementById('fighter-names');

        container.innerHTML = '';

        const ulElement = document.createElement('ul');

        fighters.forEach(fighter => {
            const liElement = document.createElement('li');

            const aElement = document.createElement('a');
            aElement.textContent = fighter.name;
            aElement.href = 'fighter-details.html';
            liElement.appendChild(aElement);

            ulElement.appendChild(liElement);
        });

        container.appendChild(ulElement);

    } catch (error) {
        console.error('Error fetching or parsing data:', error);
    }
}

window.onload = function () {
    listaFighters();
};
const username = localStorage.getItem('username');

if (!username) {
    window.location.replace("/frontend/login.html");
}
