let currentLoginType = '';

function showLogin(type) {
  currentLoginType = type;
  document.getElementById('loginModal').style.display = 'block';
  document.getElementById('loginTitle').innerText =
    type === 'admin' ? 'Admin Login' : 'Member Login';
}

function closeLogin() {
  document.getElementById('loginModal').style.display = 'none';
}

function login() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (currentLoginType === 'admin') {
    if (username === 'admin' && password === 'atal123') {
      window.location.href = 'admin.html';
    } else {
      alert('Invalid admin credentials!');
    }
  } else if (currentLoginType === 'member') {
    if (username !== '' && password !== '') {
      window.location.href = 'member.html';
    } else {
      alert('Please enter member username and password!');
    }
  }
}
