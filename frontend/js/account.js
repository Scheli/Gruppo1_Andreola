document.addEventListener("DOMContentLoaded", function() {
    const userEmail = localStorage.getItem('userEmail');
    
    if (userEmail) {
      document.getElementById('email').value = userEmail;
    }
  
    const username = localStorage.getItem('username');
    
    if (username) {
      document.getElementById('username').value = username;
    }
  
    const deleteAccountButton = document.getElementById('deleteAccountButton');
    if (deleteAccountButton) {
      deleteAccountButton.addEventListener('click', async function() {
        try {
          const userEmail = localStorage.getItem('userEmail');
          if (userEmail) {
            const response = await fetch(`http://localhost:8080/utenti/${userEmail}`, {
              method: 'DELETE'
            });
            if (response.ok) {
              localStorage.removeItem('userEmail');
              localStorage.removeItem('username');
              alert('Account eliminato con successo!');
              window.location.href = 'index.html';
            } else {
              alert('Errore durante l\'eliminazione dell\'account!');
            }
          } else {
            alert('Nessuna email trovata nel localStorage!');
          }
        } catch (error) {
          console.error('Errore durante l\'eliminazione dell\'account:', error);
          alert('Errore durante l\'eliminazione dell\'account!');
        }
      });
    }
  
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
      logoutButton.addEventListener('click', function() {
        // Rimuovi solo le credenziali dal localStorage
        localStorage.removeItem('userEmail');
        localStorage.removeItem('username');
        alert('Credenziali rimosse con successo!');
        window.location.href = 'index.html';
      });
    }
  });
  