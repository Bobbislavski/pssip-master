document.addEventListener('DOMContentLoaded', function() {

    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userRole = localStorage.getItem('userRole');
    
    if (!isLoggedIn || userRole.toLowerCase() !== 'admin') {
        window.location.href = '/login.html';
        return;
    }


    document.getElementById('adminLogout').addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userEmail');
        window.location.href = '/login.html';
    });


    const sidebarLinks = document.querySelectorAll('.sidebar a');
    const tabContents = document.querySelectorAll('.tab-content');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            
            sidebarLinks.forEach(l => l.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));
            
            link.classList.add('active');
            document.getElementById(targetId).classList.add('active');
            
            loadTabData(targetId);
        });
    });


    function fetchDashboardStats() {
        fetch('http://localhost:8080/api/admin/dashboard-stats')
            .then(response => response.json())
            .then(data => {
                document.querySelector('.stat-card:nth-child(1) .number').textContent = data.usersCount || '4';
                document.querySelector('.stat-card:nth-child(2) .number').textContent = data.propertiesCount || '3';
                document.querySelector('.stat-card:nth-child(3) .number').textContent = data.bookingsCount || '3';
                document.querySelector('.stat-card:nth-child(4) .number').textContent = 
                    new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'BYN', minimumFractionDigits: 2 })
                    .format(data.totalRevenue || 0);
            })
            .catch(error => console.error('Error:', error));
    }

    function fetchUsers() {
        fetch('http://localhost:8080/api/admin/users')
            .then(response => response.json())
            .then(users => {
                const tbody = document.getElementById('usersTableBody');
                tbody.innerHTML = users.map(user => `
                    <tr data-id="${user.user_id}">
                        <td>${user.user_id}</td>
                        <td>${user.username}</td>
                        <td>${user.email}</td>
                        <td>${user.phone_number}</td>
                        <td>${new Date(user.created_at).toLocaleDateString()}</td>
                        <td>
                            <button class="action-btn edit-btn" onclick="editUser(${user.user_id})">Изменить</button>
                            <button class="action-btn delete-btn" onclick="deleteUser(${user.user_id})">Удалить</button>
                        </td>
                    </tr>
                `).join('');
            })
            .catch(error => console.error('Ошибка:', error));
    }


    function editUser(userId) {
        if (!userId) {
            alert('Ошибка: ID пользователя не определен');
            return;
        }

        const row = document.querySelector(`tr[data-id="${userId}"]`);
        const username = row.querySelector('td:nth-child(2)').textContent;
        const email = row.querySelector('td:nth-child(3)').textContent;
        const phone = row.querySelector('td:nth-child(4)').textContent;

        const newUsername = prompt('Введите новое имя пользователя:', username);
        const newEmail = prompt('Введите новый email:', email);
        const newPhone = prompt('Введите новый телефон:', phone);

        if (!newUsername || !newEmail || !newPhone) return;

        fetch(`http://localhost:8080/api/admin/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: newUsername,
                email: newEmail,
                phone_number: newPhone
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data) {
                alert('Пользователь обновлен');
                fetchUsers();
            } else {
                alert('Ошибка при обновлении пользователя');
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Ошибка при обновлении пользователя');
        });
    }

    function deleteUser(userId) {
        if (!userId) {
            alert('Ошибка: ID пользователя не определен');
            return;
        }

        if (confirm('Вы уверены, что хотите удалить этого пользователя?')) {
            fetch(`http://localhost:8080/api/admin/users/${userId}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка при удалении пользователя');
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    alert('Пользователь удален');
                    fetchUsers();
                } else {
                    alert('Ошибка при удалении пользователя: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Ошибка:', error);
                alert('Ошибка при удалении пользователя: ' + error.message);
            });
        }
    }


    function fetchProperties() {
        fetch('http://localhost:8080/api/admin/properties')
            .then(response => response.json())
            .then(properties => {
                const tbody = document.getElementById('propertiesTableBody');
                tbody.innerHTML = properties.map(property => `
                    <tr data-id="${property.id}">
                        <td>${property.id || 'Н/Д'}</td>
                        <td>${property.title || 'Н/Д'}</td>
                        <td>${property.owner_name || 'Н/Д'}</td>
                        <td>${property.type || 'Н/Д'}</td>
                        <td>${property.price ? property.price + ' BYN' : 'Н/Д'}</td>
                        <td>${property.region || 'Н/Д'}</td>
                        <td>
                            <button class="action-btn edit-btn" onclick="editProperty(${property.id})">
                                Изменить
                            </button>
                            <button class="action-btn delete-btn" onclick="deleteProperty(${property.id})">
                                Удалить
                            </button>
                        </td>
                    </tr>
                `).join('');
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Ошибка при загрузке объектов недвижимости');
            });
    }


    function editProperty(propertyId) {
        const row = document.querySelector(`tr[data-id="${propertyId}"]`);
        const title = row.querySelector('td:nth-child(2)').textContent;
        const owner = row.querySelector('td:nth-child(3)').textContent;
        const type = row.querySelector('td:nth-child(4)').textContent;
        const price = row.querySelector('td:nth-child(5)').textContent.replace(' BYN', '');
        const region = row.querySelector('td:nth-child(6)').textContent;

        const newTitle = prompt('Введите новое название:', title);
        const newOwner = prompt('Введите нового владельца:', owner);
        const newType = prompt('Введите новый тип:', type);
        const newPrice = prompt('Введите новую цену:', price);
        const newRegion = prompt('Введите новый регион:', region);

        if (!newTitle || !newOwner || !newType || !newPrice || !newRegion) return;

        fetch(`http://localhost:8080/api/admin/properties/${propertyId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: newTitle,
                owner_name: newOwner,
                type: newType,
                price: parseFloat(newPrice),
                region: newRegion
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Объект недвижимости успешно обновлен');
                fetchProperties();
            } else {
                alert(data.message || 'Ошибка при обновлении объекта недвижимости');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Ошибка при обновлении объекта недвижимости');
        });
    }


    function deleteProperty(propertyId) {
        if (!confirm('Вы уверены, что хотите удалить этот объект недвижимости?')) return;

        fetch(`http://localhost:8080/api/admin/properties/${propertyId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Объект недвижимости успешно удален');
                fetchProperties();
            } else {
                alert(data.message || 'Ошибка при удалении объекта недвижимости');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Ошибка при удалении объекта недвижимости');
        });
    }


    function fetchBookings() {
        fetch('http://localhost:8080/api/admin/bookings')
            .then(response => response.json())
            .then(bookings => {
                const tbody = document.getElementById('bookingsTableBody');
                tbody.innerHTML = bookings.map(booking => `
                    <tr data-id="${booking.id}">
                        <td>${booking.id}</td>
                        <td>${booking.property.title}</td>
                        <td>${booking.user.username}</td>
                        <td>${new Date(booking.startDate).toLocaleDateString()} - ${new Date(booking.endDate).toLocaleDateString()}</td>
                        <td>${booking.status}</td>
                        <td>
                            <button class="action-btn edit-btn" onclick="editBooking(${booking.id})">Изменить</button>
                            <button class="action-btn delete-btn" onclick="deleteBooking(${booking.id})">Удалить</button>
                        </td>
                    </tr>
                `).join('');
            })
            .catch(error => console.error('Error:', error));
    }


    function loadTabData(tabId) {
        switch(tabId) {
            case 'users':
                fetchUsers();
                break;
            case 'properties':
                fetchProperties();
                break;
            case 'bookings':
                fetchBookings();
                break;
            case 'dashboard':
                fetchDashboardStats();
                break;
        }
    }


    loadTabData('dashboard');


    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Поиск пользователей...';
    searchInput.className = 'search-input';
    document.querySelector('#users').insertBefore(searchInput, document.querySelector('.table-container'));

    searchInput.addEventListener('input', function(e) {
        const searchText = e.target.value.toLowerCase();
        const rows = document.querySelectorAll('#usersTableBody tr');
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchText) ? '' : 'none';
        });
    });


    const propertySearchInput = document.createElement('input');
    propertySearchInput.type = 'text';
    propertySearchInput.placeholder = 'Поиск объектов недвижимости...';
    propertySearchInput.className = 'search-input';
    document.querySelector('#properties').insertBefore(propertySearchInput, document.querySelector('#properties .table-container'));

    propertySearchInput.addEventListener('input', function(e) {
        const searchText = e.target.value.toLowerCase();
        const rows = document.querySelectorAll('#propertiesTableBody tr');
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchText) ? '' : 'none';
        });
    });


    window.editUser = editUser;
    window.deleteUser = deleteUser;
    window.editProperty = editProperty;
    window.deleteProperty = deleteProperty;
    window.addUser = addUser;

    document.getElementById('addPropertyForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const property = Object.fromEntries(formData.entries());

        fetch('http://localhost:8080/api/admin/properties', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(property)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Объект добавлен');
                fetchProperties();
                                closeModal();
            } else {
                alert('Ошибка при добавлении объекта');
            }
        });
    });


    function addUser() {
        const username = prompt("Введите имя пользователя:");
        const email = prompt("Введите email:");
        const phone = prompt("Введите телефон:");

        if (!username || !email || !phone) {
            alert('Все поля должны быть заполнены');
            return;
        }

        fetch('http://localhost:8080/api/admin/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, phone_number: phone })
        })
        .then(response => response.json())
        .then(data => {
            if (data.user_id) {
                alert('Пользователь добавлен');
                fetchUsers();
            } else {
                alert('Ошибка при добавлении пользователя: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Ошибка при добавлении пользователя');
        });
    }


    document.addEventListener('DOMContentLoaded', fetchUsers);
}); 