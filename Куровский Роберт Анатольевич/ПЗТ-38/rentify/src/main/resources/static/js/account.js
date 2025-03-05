document.addEventListener('DOMContentLoaded', function() {

    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        window.location.href = '/login.html';
        return;
    }

    const userEmail = localStorage.getItem('userEmail');
    const userRole = localStorage.getItem('userRole');
    

    if (userRole === 'ADMIN') {
        document.querySelectorAll('.message-buttons').forEach(el => el.style.display = 'none');
    }


    function loadUserProfile() {
        fetch(`http://localhost:8080/auth/profile?email=${userEmail}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const user = data.user;
                    document.getElementById('username').value = user.username;
                    document.getElementById('email').value = user.email;
                    document.getElementById('phone').value = user.phone_number;
                    document.getElementById('senderName').value = user.username;


                    const accountLinks = document.querySelectorAll('header .right li:first-child a');
                    accountLinks.forEach(link => {
                        link.textContent = user.username;
                    });
                }
            });
    }


    function loadMessages() {
        fetch(`http://localhost:8080/api/messages/list?email=${userEmail}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const messagesList = document.getElementById('messagesList');
                    messagesList.innerHTML = data.messages.map(msg => `
                        <div class="message">
                            <div class="message-header">
                                <span class="message-subject">${msg.subject}</span>
                                <span class="message-date">${new Date(msg.createdAt).toLocaleString()}</span>
                            </div>
                            <div class="message-text">${msg.text}</div>
                        </div>
                    `).join('');
                }
            });
    }


    const deleteAccountBtn = document.querySelector('a.popup-opener');
    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const userEmail = localStorage.getItem('userEmail');
            
            if (confirm('Вы действительно хотите удалить аккаунт? Это действие нельзя отменить.')) {
                fetch(`http://localhost:8080/auth/delete?email=${encodeURIComponent(userEmail)}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert('Аккаунт успешно удален');
                        localStorage.clear();
                        window.location.href = '/register.html';
                    } else {
                        throw new Error(data.message || 'Ошибка при удалении аккаунта');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert(error.message || 'Произошла ошибка при удалении аккаунта');
                });
            }
        });
    }


    const profileForm = document.getElementById('profileForm');
    const editBtn = document.getElementById('editProfileBtn');
    const saveBtn = document.getElementById('saveProfileBtn');
    const inputs = profileForm.querySelectorAll('input');

    if (editBtn) {
        editBtn.addEventListener('click', function() {
            inputs.forEach(input => {
                if (input.id !== 'email') {
                    input.disabled = false;
                }
            });
            editBtn.style.display = 'none';
            saveBtn.style.display = 'block';
        });
    }

    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const userEmail = localStorage.getItem('userEmail');
            
            const userData = {
                username: document.getElementById('username').value,
                email: userEmail,
                phone_number: document.getElementById('phone').value,
                oldEmail: userEmail
            };

            fetch('http://localhost:8080/auth/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Профиль успешно обновлен');
                    inputs.forEach(input => input.disabled = true);
                    editBtn.style.display = 'block';
                    saveBtn.style.display = 'none';
                    loadUserProfile();
                } else {
                    throw new Error(data.message || 'Ошибка при обновлении профиля');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert(error.message || 'Произошла ошибка при обновлении профиля');
            });
        });
    }


    const logoutBtn = document.querySelector('a.popup-opener[href="#"]');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Вы уверены, что хотите выйти?')) {
                localStorage.clear();
                window.location.href = '/login.html';
            }
        });
    }


    const messageForm = document.getElementById('sendMessageForm');
    messageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const messageData = {
            senderName: document.getElementById('senderName').value,
            subject: document.getElementById('subject').value,
            text: document.getElementById('messageText').value,
            email: userEmail
        };

        fetch('http://localhost:8080/api/messages/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(messageData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Сообщение отправлено');
                document.getElementById('subject').value = '';
                document.getElementById('messageText').value = '';
                loadMessages(); // Перезагружаем сообщения
            }
        });
    });


    const messagesLink = document.querySelector('a[href="#"].popup-opener:contains("Сообщение")');
    const profileSection = document.querySelector('.right');
    const messagesSection = document.getElementById('messagesSection');

    messagesLink.addEventListener('click', function(e) {
        e.preventDefault();
        profileSection.style.display = 'none';
        messagesSection.style.display = 'block';
        loadMessages();
    });

        loadUserProfile();
});

function updateUserProfile() {
    const oldEmail = prompt("Введите ваш текущий email:");
    const newUsername = prompt("Введите новое имя пользователя:");
    const newEmail = prompt("Введите новый email:");
    const newPhone = prompt("Введите новый телефон:");

    if (!oldEmail || !newUsername || !newEmail || !newPhone) {
        alert('Все поля должны быть заполнены');
        return;
    }

    fetch('http://localhost:8080/api/users/update-profile', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            oldEmail: oldEmail,
            username: newUsername,
            email: newEmail,
            phone_number: newPhone
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Профиль обновлен');
        } else {
            alert('Ошибка при обновлении профиля: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Ошибка:', error);
        alert('Ошибка при обновлении профиля');
    });
}