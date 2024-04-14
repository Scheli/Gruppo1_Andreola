function hideErrorMessages() {
    setTimeout(() => {
      document.getElementById('passwordFeedbackLength').classList.add('d-none');
      document.getElementById('passwordFeedbackContent').classList.add('d-none');
      document.getElementById('confirmPasswordFeedback').classList.add('d-none');
    }, 3000);
  }
  
  document.getElementById('registrationForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
  
    document.getElementById('password').classList.remove('is-invalid');   
    document.getElementById('confirmPassword').classList.remove('is-invalid');
  
    if (password.length < 8) {
      document.getElementById('password').classList.add('is-invalid');
      document.getElementById('passwordFeedbackLength').classList.remove('d-none');
      hideErrorMessages();
      return;
    }
  
    if (!password.match(/^(?=.*[A-Za-z]).{8,}$/)) {
      document.getElementById('password').classList.add('is-invalid');
      document.getElementById('passwordFeedbackContent').classList.remove('d-none');
      hideErrorMessages();
      return;
    }
  
    if (password !== confirmPassword) {
      document.getElementById('confirmPassword').classList.add('is-invalid');
      document.getElementById('confirmPasswordFeedback').classList.remove('d-none');
      hideErrorMessages();
      
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8080/utenti", {
        method: 'POST',
        body: JSON.stringify({
          username,
          email,
          password
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      });
    
      if (response.status === 400) {
        const data = await response.json();
        document.getElementById('email').classList.add('is-invalid');
        document.getElementById('errorMessage').innerText = data.error;
        var myModal = new bootstrap.Modal(document.getElementById('errorModal'));
        myModal.show();
        hideErrorMessages();
        return;
      }
    
      if (response.ok) {
        window.location.href = 'login.html'; 
        return;
      }
    
      const ris = await response.json();
      console.log(ris);
    } catch (error) {
      console.error("Errore durante la richiesta POST:", error);
    }
  });
  
  document.getElementById('username').addEventListener('input', resetErrors);
  document.getElementById('email').addEventListener('input', resetErrors);
  document.getElementById('password').addEventListener('input', resetErrors);
  document.getElementById('confirmPassword').addEventListener('input', resetErrors);
  
  function togglePasswordVisibility(inputId, buttonId) {
    const input = document.getElementById(inputId);
    const button = document.getElementById(buttonId);
    if (input.type === "password") {
      input.type = "text";
      button.innerHTML = '<i class="bi bi-eye-slash"></i>';
    } else {
      input.type = "password";
      button.innerHTML = '<i class="bi bi-eye"></i>';
    }
  }
  