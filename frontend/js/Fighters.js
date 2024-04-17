async function listaFighters(divisionId) {
  try {
    const response = await fetch("http://localhost:8080/ufc/fighters", {
      headers: {
        Accept: "application/json",
      },
    });

    const fighters = await response.json();

    fighters.sort((a, b) => a.name.localeCompare(b.name));

    const container = document.getElementById("fighter-list");

    container.innerHTML = "";

    fighters.forEach((fighter) => {
      const divElement = document.createElement("div");
      divElement.classList.add("fighter");

      const nameElement = document.createElement("h2");
      nameElement.textContent = fighter.name;

      // Aggiungi qui il gestore degli eventi click
      nameElement.addEventListener("click", () => {
        window.location.href = `fighter-details.html?name=${encodeURIComponent(
          fighter.name
        )}`;
      });

      divElement.appendChild(nameElement);
      container.appendChild(divElement);
    });

    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("input", () => {
      const searchValue = searchInput.value.trim().toLowerCase();
      const filteredFighters = fighters.filter((fighter) =>
        fighter.name.toLowerCase().includes(searchValue)
      );
      renderFighters(filteredFighters, container);
    });
  } catch (e) {
    console.error("Error:", e);
  }
}

// function renderFighters(fighters, container) {
//   container.innerHTML = "";

//   fighters.forEach((fighter) => {
//     const divElement = document.createElement("div");
//     divElement.classList.add("fighter");

//     const nameElement = document.createElement("h2");
//     nameElement.textContent = fighter.name;

//     // Aggiungi qui il gestore degli eventi click
//     nameElement.addEventListener("click", () => {
//       window.location.href = `fighter-details.html?name=${encodeURIComponent(
//         fighter.name
//       )}`;
//     });

//     divElement.appendChild(nameElement);
//     container.appendChild(divElement);
//   });
// }

window.onload = function () {
  listaFighters();
};
const username = localStorage.getItem('username');

if (!username) {
    window.location.replace("/frontend/login.html");
}
