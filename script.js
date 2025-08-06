let currentLoginType = '';

function showLoginOptions() {
  document.getElementById('loginOptions').style.display = 'block';
}

function closeLoginOptions() {
  document.getElementById('loginOptions').style.display = 'none';
}

function showLogin(type) {
  currentLoginType = type;
  document.getElementById('loginOptions').style.display = 'none';
  document.getElementById('loginModal').style.display = 'block';
  document.getElementById('loginTitle').innerText =
    type === 'admin' ? 'Admin Login' : 'Member Login';
}

function closeLogin() {
  document.getElementById('loginModal').style.display = 'none';
}

function login() {
  const user = document.getElementById('username').value.trim();
  const pass = document.getElementById('password').value.trim();

  if (currentLoginType === 'admin') {
    if (user === 'admin' && pass === 'atal123') {
      window.location.href = 'admin.html';
    } else {
      alert('Invalid admin credentials!');
    }
  } else if (currentLoginType === 'member') {
    const members = JSON.parse(localStorage.getItem('members')) || [];
    const found = members.find(m => m.id === user && m.password === pass);
    if (found) {
      window.location.href = 'member.html';
    } else {
      alert('Invalid Member ID or Password!');
    }
  }
}

function addMember() {
  const name = document.getElementById('memberName').value.trim();
  const password = document.getElementById('memberPassword').value.trim();
  const phone = document.getElementById('memberPhone').value.trim();

  if (!name || !password || !phone) {
    alert('Please fill all fields!');
    return;
  }

  if (!/^\d{10}$/.test(phone)) {
    alert('Please enter a valid 10-digit phone number!');
    return;
  }

  let members = JSON.parse(localStorage.getItem('members')) || [];
  let memberID = "MEM" + String(members.length + 1).padStart(3, '0');

  members.push({ id: memberID, name, password, phone });
  localStorage.setItem('members', JSON.stringify(members));

  alert(`Member "${name}" added!\nUser ID: ${memberID}\nPassword: ${password}\nPhone: ${phone}`);

  displayMembers();

  document.getElementById('memberName').value = '';
  document.getElementById('memberPassword').value = '';
  document.getElementById('memberPhone').value = '';
}

function displayMembers() {
  const members = JSON.parse(localStorage.getItem('members')) || [];
  const table = document.getElementById('membersTable');
  if (!table) return;

  // Reset table header
  table.innerHTML = `
    <tr>
      <th>Member Name</th>
      <th>Member ID</th>
      <th>Phone Number</th>
      <th>Password</th>
    </tr>
  `;

  // Add each member as a row
  members.forEach(m => {
    const row = table.insertRow();
    row.insertCell(0).innerText = m.name;
    row.insertCell(1).innerText = m.id;
    row.insertCell(2).innerText = m.phone;
    row.insertCell(3).innerText = m.password;
  });
}

// Call displayMembers() on page load
window.onload = displayMembers;
