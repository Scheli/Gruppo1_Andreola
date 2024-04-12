async function listaFighters() {
    try {
        const response = await fetch('http://localhost:8080/ufc/fighters', {
            headers: {
                'Accept': 'application/json'
            }
        });

        const fighters = await response.json();

        const container = document.getElementById('fighter-names');

        container.innerHTML = '';

        // Create a <ul> element
        const ulElement = document.createElement('ul');

        fighters.forEach(fighter => {
            // Create an <li> element for each fighter
            const liElement = document.createElement('li');

            // Create an <a> element with href attribute set to '#' (you can replace '#' with the appropriate link)
            const aElement = document.createElement('a');
            aElement.textContent = fighter.name;
            aElement.href = '#'; // Replace '#' with the appropriate link

            // Append the <a> element to the <li> element
            liElement.appendChild(aElement);

            // Append the <li> element to the <ul> element
            ulElement.appendChild(liElement);
        });

        // Append the <ul> element to the container
        container.appendChild(ulElement);

    } catch (error) {
        console.error('Error fetching or parsing data:', error);
    }
}

window.onload = function () {
    listaFighters();
};
