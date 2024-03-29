document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector('.form-control');
    const searchButton = document.getElementById('button-addon1');
    const cards = document.querySelectorAll('.col-md-4');

    searchButton.addEventListener('click', function () {
        const searchTerm = searchInput.value.trim().toLowerCase();

        cards.forEach(card => {
            const cardTitle = card.querySelector('.card-title').textContent.trim().toLowerCase();

            if (cardTitle.startsWith(searchTerm)) {
                card.style.order = '-1'; // Sposta la carta corrispondente a sinistra
                card.style.display = 'block'; // Mostra la carta corrispondente
            } else {
                card.style.order = 'unset'; // Ripristina l'ordine predefinito
                card.style.display = 'none'; // Nasconde la carta non corrispondente
            }
        });

        searchInput.value = ''; // Resetta il campo di ricerca dopo la ricerca
    });
});
