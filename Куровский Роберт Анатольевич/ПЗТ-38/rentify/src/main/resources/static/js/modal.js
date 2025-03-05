document.getElementById('openModal').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('authModal').style.display = 'block';
});

document.querySelector('.close-button').addEventListener('click', function () {
    document.getElementById('authModal').style.display = 'none';
});

window.addEventListener('click', function (e) {
    if (e.target === document.getElementById('authModal')) {
        document.getElementById('authModal').style.display = 'none';
    }
});
