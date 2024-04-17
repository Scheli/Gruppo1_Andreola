document.getElementById('loginForm').addEventListener('submit', async function (event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch(`http://localhost:8080/utenti?email=${email}`);
    const data = await response.json();

    if (response.ok) {
      if (data.length > 0) {
        if (data[0].password === password) {
          localStorage.setItem('userEmail', email);
          const username = data[0].username;
          localStorage.setItem('username', username);
          window.location.replace("/frontend/index.html");
        } else {
          showError("La password inserita non è corretta. Riprova.");
        }
      } 
    } else {
      showError("Errore durante la richiesta al server. Riprova più tardi.");
    }
  } catch (error) {
    console.error("Errore durante il login:", error);
    showError("Email non esistente nel database.");
  }
});

function showError(message) {
  const errorMessageElement = document.getElementById('errorMessage');
  errorMessageElement.textContent = message;
  const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
  errorModal.show();
}
