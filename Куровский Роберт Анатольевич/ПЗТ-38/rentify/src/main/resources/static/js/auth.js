document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            fetch(`http://localhost:8080/auth/login?username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('userEmail', email);
                    localStorage.setItem('userRole', data.role.toUpperCase());
                    localStorage.setItem('userName', data.username);

                    if (data.role.toUpperCase() === 'ADMIN') {
                        window.location.href = '/admin.html';
                    } else {
                        window.location.href = '/index.html';
                    }
                    alert('Успешная авторизация');
                } else {
                    alert(data.message || 'Неверный email или пароль');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Ошибка при входе');
            });
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm_password').value;
            
            if (password !== confirmPassword) {
                alert('Пароли не совпадают!');
                return;
            }

            const userData = {
                username: document.getElementById('username').value,
                email: document.getElementById('email').value,
                password: password,
                phone_number: document.getElementById('phone').value,
                role: 'USER',
                created_at: new Date(),
                updated_at: new Date()
            };

            fetch('http://localhost:8080/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            })
            .then(response => {
                if (response.ok) {
                    return response.text().then(text => ({ success: true, message: text }));
                } else {
                    return response.text().then(text => ({ success: false, message: text }));
                }
            })
            .then(data => {
                if (data.success) {
                    alert('Регистрация успешна!');
                    window.location.href = '/login.html';
                } else {
                    alert(data.message || 'Ошибка при регистрации');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Ошибка при регистрации');
            });
        });
    }
});