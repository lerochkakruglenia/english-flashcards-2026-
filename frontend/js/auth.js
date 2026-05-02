const API_URL = 'http://localhost:5000/api/auth';

// Общая функция показа ошибки
function showError(formId, message) {
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = message;
    setTimeout(() => errorDiv.textContent = '', 4000);
}

// ====================== REGISTER ======================
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.getElementById('regUsername').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;

        try {
            const res = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            });

            const data = await res.json();

            if (res.ok) {
                alert('Регистрация прошла успешно! Теперь войдите.');
                window.location.href = 'login.html';
            } else {
                showError('registerForm', data.message || 'Ошибка регистрации');
            }
        } catch (err) {
            showError('registerForm', 'Ошибка соединения с сервером');
        }
    });
}

// ====================== LOGIN ======================
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const res = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                alert('Успешный вход!');
                window.location.href = 'index.html';   // потом сделаем
            } else {
                showError('loginForm', data.message || 'Неверный логин или пароль');
            }
        } catch (err) {
            showError('loginForm', 'Ошибка соединения');
        }
    });
}