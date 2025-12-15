/**
 * Login functionaliteit voor Vraag het Pip
 * Simpele client-side wachtwoordbeveiliging
 */

(function() {
    'use strict';

    // Het wachtwoord (in een echte app zou dit server-side zijn)
    const CORRECT_PASSWORD = 'Pippeledokus!';
    const SESSION_KEY = 'pip_authenticated';

    // Check of al ingelogd
    if (sessionStorage.getItem(SESSION_KEY) === 'true') {
        window.location.href = 'app.html';
        return;
    }

    // DOM elementen
    const form = document.getElementById('login-form');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');

    // Form submit handler
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const enteredPassword = passwordInput.value;

        if (enteredPassword === CORRECT_PASSWORD) {
            // Succes! Sla sessie op en ga naar app
            sessionStorage.setItem(SESSION_KEY, 'true');
            window.location.href = 'app.html';
        } else {
            // Fout wachtwoord
            errorMessage.textContent = 'Hmm, dat klopt niet. Probeer het nog eens!';
            passwordInput.value = '';

            // Schud animatie
            form.classList.add('shake');
            setTimeout(() => form.classList.remove('shake'), 500);
        }
    });

    // Info scherm toggle
    const infoBtn = document.getElementById('info-btn');
    const infoBackBtn = document.getElementById('info-back-btn');
    const loginScreen = document.getElementById('login-screen');
    const infoScreen = document.getElementById('info-screen');

    infoBtn.addEventListener('click', function() {
        loginScreen.classList.add('hidden');
        infoScreen.classList.remove('hidden');
        infoBtn.classList.add('hidden');
    });

    infoBackBtn.addEventListener('click', function() {
        infoScreen.classList.add('hidden');
        loginScreen.classList.remove('hidden');
        infoBtn.classList.remove('hidden');
    });
})();
