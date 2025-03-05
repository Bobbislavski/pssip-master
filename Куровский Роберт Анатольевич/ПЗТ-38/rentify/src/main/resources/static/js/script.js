window.addEventListener("load", function (e) {
  const backToTop = document.getElementById("backToTop");
  const bars = document.querySelector(".bars");
  const close = document.querySelector(".mobile-nav button");
  const offersBtn = document.querySelector(".offers-btn");
  const NavbarMobile = document.querySelector(".mobile-nav");

  window.onscroll = function () {
    if (window.scrollY > document.documentElement.scrollHeight * 0.4) {
      backToTop.style.display = "block";
    } else {
      backToTop.style.display = "none";
    }
  };
  backToTop.onclick = function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  bars.addEventListener("click", () => {
    NavbarMobile.style.left = "0";
  });
  close.addEventListener("click", () => {
    NavbarMobile.style.left = "100%";
  });
  offersBtn.addEventListener("click", () => {
    NavbarMobile.style.left = "100%";
  });
});

document.addEventListener('DOMContentLoaded', function() {
    const editProfileBtn = document.getElementById('editProfileBtn');
    const deleteAccountBtn = document.getElementById('deleteAccountBtn');

    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function() {
            updateProfile();
        });
    }

    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', function() {
            deleteAccount();
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {

    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userRole = localStorage.getItem('userRole');
    const userEmail = localStorage.getItem('userEmail');

    if (isLoggedIn && userEmail) {
        loadUserData();
    }


    const messagesBtn = document.getElementById('messagesBtn');
    const messagesModal = document.getElementById('messagesModal');
    
    if (messagesBtn && messagesModal) {
        messagesBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (!isLoggedIn) {
                window.location.href = '/login.html';
                return;
            }

            if (userRole === 'ADMIN') {
                alert('Администраторы не могут отправлять сообщения');
                return;
            }

            messagesModal.style.display = 'block';
            loadMessages();
        });


        const closeModal = messagesModal.querySelector('.close-modal');
        if (closeModal) {
            closeModal.addEventListener('click', function() {
                messagesModal.style.display = 'none';
            });
        }


        window.addEventListener('click', function(e) {
            if (e.target === messagesModal) {
                messagesModal.style.display = 'none';
            }
        });
    }


    const messageForm = document.getElementById('messageForm');
    if (messageForm) {
        messageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            sendMessage();
        });
    }


    const accountButtons = document.querySelectorAll('.openModal, #openModal');
    
    accountButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            

            const userRole = localStorage.getItem('userRole');
            const isLoggedIn = localStorage.getItem('isLoggedIn');
            
            if (!isLoggedIn) {

                window.location.href = '/login.html';
                return;
            }
            

            if (userRole === 'admin') {
                window.location.href = '/admin.html';
            } else {
                                window.location.href = '/account.html';
            }
        });
    });


    const accountText = document.getElementById('accountText');
    if (accountText) {
        const userRole = localStorage.getItem('userRole');
        if (userRole === 'admin') {
            accountText.textContent = 'админ панель';
        }
    }


    const feedbackBtn = document.getElementById('feedbackBtn');
    const feedbackModal = document.getElementById('feedbackModal');
    const closeModal = feedbackModal.querySelector('.close-modal');
    const feedbackForm = document.getElementById('feedbackForm');


    feedbackBtn.addEventListener('click', function(e) {
        e.preventDefault();
        feedbackModal.style.display = 'block';
    });


    closeModal.addEventListener('click', function() {
        feedbackModal.style.display = 'none';
    });


    window.addEventListener('click', function(e) {
        if (e.target === feedbackModal) {
            feedbackModal.style.display = 'none';
        }
    });


    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('feedbackName').value,
            email: document.getElementById('feedbackEmail').value,
            subject: document.getElementById('feedbackSubject').value,
            message: document.getElementById('feedbackMessage').value
        };


        fetch('/api/feedback/send.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Сообщение успешно отправлено!');
                feedbackModal.style.display = 'none';
                feedbackForm.reset();
            } else {
                alert('Произошла ошибка при отправке сообщения');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Произошла ошибка при отправке сообщения');
        });
    });


    if (userRole === 'ADMIN') {
        const messageElements = document.querySelectorAll('.messages-section, .message-link');
        messageElements.forEach(el => el.style.display = 'none');
    }

        loadMessages();


    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            logout();
        });
    }

        const deleteAccountBtn = document.getElementById('deleteAccountBtn');
    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', function() {
            deleteAccount();
        });
    }
});


function loadUserData() {
    const email = localStorage.getItem('userEmail');
    
    if (!email) return;

    fetch(`http://localhost:8080/auth/profile?email=${encodeURIComponent(email)}`)
        .then(response => response.json())
        .then(data => {
            if (data.success && data.user) {

                const userNameElements = document.querySelectorAll('header .right li:first-child a');
                userNameElements.forEach(el => {
                    el.textContent = data.user.username;
                });


                const messageNameInput = document.getElementById('messageName');
                if (messageNameInput) {
                    messageNameInput.value = data.user.username;
                }


                const usernameInput = document.getElementById('username');
                const emailInput = document.getElementById('email');
                const phoneInput = document.getElementById('phone');

                if (!usernameInput || !emailInput || !phoneInput) {
                    console.error('Один или несколько элементов не найдены в DOM');
                    return;
                }

                if (usernameInput) usernameInput.value = data.user.username;
                if (emailInput) emailInput.value = data.user.email;
                if (phoneInput) phoneInput.value = data.user.phone_number;


                localStorage.setItem('userName', data.user.username);
            }
        })
        .catch(error => console.error('Error:', error));
}


function sendMessage() {
    const formData = {
        senderName: document.getElementById('messageName').value,
        subject: document.getElementById('messageSubject').value,
        text: document.getElementById('messageText').value,
        email: localStorage.getItem('userEmail')
    };


    if (!formData.senderName || !formData.subject || !formData.text || !formData.email) {
        alert('Пожалуйста, заполните все поля');
        return;
    }

    fetch('http://localhost:8080/api/messages/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Сообщение успешно отправлено!');
            document.getElementById('messageForm').reset();
            loadMessages();
        } else {
            alert(data.message || 'Произошла ошибка при отправке сообщения');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Произошла ошибка при отправке сообщения');
    });
}


function loadMessages() {
    const email = localStorage.getItem('userEmail');
    
    fetch(`http://localhost:8080/api/messages/list?email=${encodeURIComponent(email)}`)
        .then(response => response.json())
        .then(data => {
            if (data.success && data.messages) {
                const messagesList = document.getElementById('messagesList');
                if (messagesList) {
                    messagesList.innerHTML = data.messages.map(msg => `
                        <div class="message">
                            <div class="message-header">
                                <span class="message-subject">${msg.subject}</span>
                                <span class="message-date">${new Date(msg.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div class="message-text">${msg.text}</div>
                        </div>
                    `).join('');
                }
            }
        })
        .catch(error => console.error('Error:', error));
}


function logout() {
    fetch('http://localhost:8080/auth/logout', {
        method: 'POST',
        credentials: 'include'
    })
    .then(() => {
        localStorage.clear();
        window.location.href = '/login.html';
    })
    .catch(error => console.error('Error:', error));
}

function deleteAccount() {
    if (confirm('Вы уверены, что хотите удалить аккаунт? Это действие нельзя отменить.')) {
        const email = localStorage.getItem('userEmail');
        
        fetch(`http://localhost:8080/api/users/delete?email=${email}`, {
            method: 'DELETE',
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                localStorage.clear();
                window.location.href = '/register.html';
            } else {
                alert('Ошибка при удалении аккаунта');
            }
        })
        .catch(error => console.error('Error:', error));
    }
}


const profileForm = document.getElementById('profileForm');
if (profileForm) {
    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        updateProfile();
    });
}


function updateProfile() {
    const formData = {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        phone_number: document.getElementById('phone').value,
        oldEmail: localStorage.getItem('userEmail')
    };

    fetch('http://localhost:8080/api/users/update-profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Профиль успешно обновлен');
            localStorage.setItem('userEmail', formData.email);
            loadUserData();
        } else {
            alert(data.message || 'Ошибка при обновлении профиля');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Ошибка при обновлении профиля');
    });
}



document.querySelectorAll('.left ul li a').forEach(tab => {
    tab.addEventListener('click', function(e) {
        e.preventDefault();
        const tabId = this.getAttribute('data-tab');
        

        document.querySelectorAll('.tab-content').forEach(content => {
            content.style.display = 'none';
        });
        

        document.getElementById(tabId).style.display = 'block';
        
        
        document.querySelectorAll('.left ul li a').forEach(a => {
            a.classList.remove('active');
        });
        this.classList.add('active');
    });
});



