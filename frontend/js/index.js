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
var chatOpened = false;

function openChatBox() {
    var chatBox = document.getElementById("chatBox");
    if (!chatOpened) {
        chatBox.style.display = "block";
        var now = new Date();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        var seconds = now.getSeconds();
        document.getElementById("startTime").textContent = hours + ":" + minutes + ":" + seconds;
        chatOpened = true;
    }
}

function toggleChatBox() {
    var chatBox = document.getElementById("chatBox");
    chatBox.style.display = "none";
    chatOpened = false;
}

function insertText(text) {
    var chatMessages = document.getElementById("chatMessages");
    var messageDiv = document.createElement("div");
    messageDiv.classList.add("message");
    messageDiv.classList.add("user-message");
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    scrollChatToBottom(); 
    processInput(); 
}

function processInput() {
    var userInput = document.getElementById("chatMessages").lastElementChild.textContent.toLowerCase();
    var responseDiv = document.getElementById("chatMessages");

    var responses = {
        "ricerca": "La barra di ricerca ti permette di trovare il tuo sport facilmente, certo non dovrebbe essere difficile, visto che sono tre, comunque digita una o più cifre del nome del tuo sport e clicca su cerca, ci sei riuscito? bravissimo!",
        "navbar": "La navbar e le card ti permettono di viaggiare velocemente nelle varie pagine, appena aperto il sito sarà possibile cliccare sui campi come mma per essere spediti immediatamente nella pagina, in alternativa, basta scendere nel sito e si troveranno le card, da qui clicca sul bottone entra, questo è quanto B)",
        "fonti": "Vuoi pure le fonti? Abbiamo anche quelle! ecco qui il link con il quale scaricare le relazione del progetto:(da mettere).",
    };

    var found = false;
    for (var keyword in responses) {
        if (userInput.includes(keyword)) {
            var botResponse = responses[keyword];
            var messageDiv = document.createElement("div");
            messageDiv.classList.add("message");
            messageDiv.classList.add("bot-message");
            messageDiv.textContent = botResponse;
            responseDiv.appendChild(messageDiv);
            found = true;
            break;
        }
    }

    if (!found) {
        var defaultMessage = "Scusa, non ho capito. Potresti essere più chiaro?";
        var messageDiv = document.createElement("div");
        messageDiv.classList.add("message");
        messageDiv.classList.add("bot-message");
        messageDiv.textContent = defaultMessage;
        responseDiv.appendChild(messageDiv);
    }
    scrollChatToBottom(); 
}

function addMessage(sender, message) {
    var chatMessages = document.getElementById("chatMessages");
    var messageDiv = document.createElement("div");
    messageDiv.classList.add("message");
    if (sender === "user") {
        messageDiv.classList.add("user-message");
    } else {
        messageDiv.classList.add("bot-message");
    }
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    scrollChatToBottom();
}

function scrollChatToBottom() {
    var chatMessages = document.getElementById("chatMessages");
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

 function toggleDarkMode() {
     var body = document.body;
     var button = document.getElementById('dark-mode-btn');
     if (body.classList.contains('dark-mode')) {
         body.classList.remove('dark-mode');
         button.innerHTML = "Dark mode";
     } else {
         body.classList.add('dark-mode');
         button.innerHTML = "Light mode";
     }
 }
 window.onload = function() {
    const username = localStorage.getItem('username');
    const loginButton = document.getElementById('loginButton');

    if (username) {
        document.getElementById('username').innerText = username;
    } else {
        loginButton.innerText = 'Accedi';
        loginButton.href = '/frontend/login.html';
    }

    toggleDarkMode();
};


 