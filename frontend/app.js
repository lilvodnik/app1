document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;

    const response = await fetch('http://localhost:4000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    alert(data.message);
});

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem('token', data.token);
        alert('Успешно!');
    } else {
        alert('Хорошая попытка!');
    }
});

document.getElementById('protectedButton').addEventListener('click', async () => {
    const token = localStorage.getItem('token');
    
    const response = await fetch('http://localhost:4000/protected', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
    });

    const data = await response.json();
    document.getElementById('protectedData').innerText = data.message || data.error;
});
