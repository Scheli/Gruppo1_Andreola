async function Division(){
  const cont = document.getElementById('division');
  
  
  try {
      const response = await fetch(`http://localhost:8080/ufc/${_id}`, {
          headers: {
              Accept: "application/json",
          },
      });

      if (!response.ok) {
          throw new Error('Failed to fetch UFC fighter data');
      }

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
  } catch (error) {
      console.error('Error:', error);
  }
}
