async function listaFighters(_id) {
    try {
        const response = await fetch(`http://localhost:8080/ufc?fighter=${_id}`, {
            headers: {
                'Accept': 'application/json'
            }
        });

        const fighter = await response.json();
        console.log(JSON.stringify(fighter));

        const fighterName = fighter.name;

        const fighterNameElement = document.getElementById('fighter-name');

        fighterNameElement.textContent = fighterName;
    } catch (error) {
        console.error('Error fetching or parsing data:', error);
    }
}

window.onload = function () {
    // Assuming 6617da43044eaa4cdeffbd42 is the correct _id
    listaFighters('6617da43044eaa4cdeffbd43'); 
};
