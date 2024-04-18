async function listaFighters() {
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

    renderFighters(fighters, container); // Initial rendering

    const searchInput = document.getElementById("searchInput");

    // Clear placeholder text when the input is focused
    searchInput.addEventListener("focus", () => {
      searchInput.placeholder = "";
    });

    // Restore placeholder text when the input loses focus and it's empty
    searchInput.addEventListener("blur", () => {
      if (!searchInput.value.trim()) {
        searchInput.placeholder = "Search fighters...";
      }
    });

    searchInput.addEventListener("input", () => {
      const searchValue = searchInput.value.trim().toLowerCase();
      const filteredFighters = fighters.filter((fighter) =>
        fighter.name.toLowerCase().startsWith(searchValue)
      );
      renderFighters(filteredFighters, container);
    });
  } catch (e) {
    console.error("Error:", e);
  }
}

function renderFighters(fighters, container) {
  container.innerHTML = "";

  fighters.forEach((fighter) => {
    const divElement = document.createElement("div");
    divElement.classList.add("fighter");

    const nameElement = document.createElement("h2");
    nameElement.textContent = fighter.name;

    // Event listener for fighter details
    nameElement.addEventListener("click", () => {
      window.location.href = `fighter-details.html?name=${encodeURIComponent(
        fighter.name
      )}`;
    });

    divElement.appendChild(nameElement);
    container.appendChild(divElement);
  });
}

window.onload = function () {
  listaFighters();
};

const username = localStorage.getItem('username');
if (!username) {
    window.location.replace("/frontend/login.html");
}
