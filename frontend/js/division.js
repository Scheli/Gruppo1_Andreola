async function Division(){
    const cont = document.getElementById('division');

    const response = await fetch(
        `http://localhost:8080/ufc/${id}`, {
          headers: {
            Accept: "application/json",
          },
        }
    );

    const fightersData = await response.json();
    console.log(fightersData);

    cont.innerHTML = '';

    fightersData.fighters.forEach(fighter => {
        const fighterDiv = document.createElement('div');
        fighterDiv.classList.add('fighter');

        const fighterName = document.createElement('h3');
        fighterName.textContent = fighter.name;

        const fighterId = document.createElement('p');
        fighterId.textContent = `ID: ${fighter.id}`;

        fighterDiv.appendChild(fighterName);
        fighterDiv.appendChild(fighterId);

        cont.appendChild(fighterDiv);
    });
}
