/*qui ho fatto in modo che le card di tipo .col-md4 vengano temporaneamente rimosse dalla tabella se non rispettano i paramentri
di ricerca. la ricerca parte in seguito al click del pulsante e mostra tutti gli sport che inziano con le determinate lettere inserite*/

document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector('.form-control');
    const searchButton = document.getElementById('button-addon1');
    const cards = document.querySelectorAll('.col-md-4');

    searchButton.addEventListener('click', function () {
        const searchTerm = searchInput.value.trim().toLowerCase();

        cards.forEach(card => {
            const cardTitle = card.querySelector('.card-title').textContent.trim().toLowerCase();

            if (cardTitle.startsWith(searchTerm)) {
                card.style.order = '-1';
                card.style.display = 'block';
            } else {
                card.style.order = 'unset';
                card.style.display = 'none';
            }
        });

        searchInput.value = '';
    });
});

document.addEventListener("DOMContentLoaded", function () {
    var myCarousel = document.getElementById('carouselExampleAutoplaying');
    var carousel = new bootstrap.Carousel(myCarousel);

    myCarousel.addEventListener('mouseenter', function () {
        carousel.pause();
    });

    myCarousel.addEventListener('mouseleave', function () {
        carousel.cycle();
    });
});