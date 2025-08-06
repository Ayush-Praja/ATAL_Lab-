let currentLoginType = "";

function toggleLoginMenu() {
  const menu = document.getElementById('login-menu');
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

function showLogin(type) {
  currentLoginType = type;
  document.getElementById('login-title').innerText = type === 'admin' ? 'Admin Login' : 'Member Login';
  document.getElementById('login-modal').style.display = 'block';
}

function closeLogin() {
  document.getElementById('login-modal').style.display = 'none';
}

function login() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;

  if (currentLoginType === 'admin') {
    if (user === 'admin' && pass === '12345') {
      window.location.href = 'admin.html';
    } else {
      alert('Invalid admin credentials!');
    }
  } else if (currentLoginType === 'member') {
    const members = JSON.parse(localStorage.getItem('members')) || [];
    const found = members.find(m => m.id === user && m.password === pass);
    if (found) {
      alert(`Welcome ${found.name}`);
    } else {
      alert('Invalid member login!');
    }
  }
}

/* Admin functions */
function displayMembers() {
  const members = JSON.parse(localStorage.getItem('members')) || [];
  const table = document.getElementById('membersTable');
  if (!table) return;

  table.innerHTML = `
    <tr>
      <th>Name</th>
      <th>Member ID</th>
      <th>Phone</th>
      <th>Password</th>
      <th>Actions</th>
    </tr>
  `;

  members.forEach((m, index) => {
    const row = table.insertRow();
    row.insertCell(0).innerText = m.name;
    row.insertCell(1).innerText = m.id;
    row.insertCell(2).innerText = m.phone;
    row.insertCell(3).innerText = m.password;
    row.insertCell(4).innerHTML = `
      <div style="position: relative; display: inline-block;">
        <button onclick="toggleMenu(this)">⋮</button>
        <div class="action-dropdown" style="display:none; position:absolute; right:0; background:white; border:1px solid #ccc;">
          <button onclick="editMember(${index})">Edit</button>
          <button onclick="deleteMember(${index})">Delete</button>
        </div>
      </div>
    `;
  });
}

function toggleMenu(btn) {
  document.querySelectorAll('.action-dropdown').forEach(d => d.style.display = 'none');
  const menu = btn.nextElementSibling;
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

function addMember() {
  const name = document.getElementById('memberName').value.trim();
  const phone = document.getElementById('memberPhone').value.trim();
  const password = document.getElementById('memberPassword').value.trim();

  if (!name || !phone || !password) {
    alert('Please fill all fields!');
    return;
  }

  let members = JSON.parse(localStorage.getItem('members')) || [];
  let memberID = "MEM" + String(members.length + 1).padStart(3, '0');
  members.push({ id: memberID, name, phone, password });
  localStorage.setItem('members', JSON.stringify(members));

  alert(`Member added! ID: ${memberID}`);
  displayMembers();

  document.getElementById('memberName').value = '';
  document.getElementById('memberPhone').value = '';
  document.getElementById('memberPassword').value = '';
}

function deleteMember(index) {
  let members = JSON.parse(localStorage.getItem('members')) || [];
  if (confirm('Delete this member?')) {
    members.splice(index, 1);
    localStorage.setItem('members', JSON.stringify(members));
    displayMembers();
  }
}

function editMember(index) {
  let members = JSON.parse(localStorage.getItem('members')) || [];
  let m = members[index];
  const newName = prompt('Edit name:', m.name);
  const newPhone = prompt('Edit phone:', m.phone);
  const newPass = prompt('Edit password:', m.password);
  if (newName && newPhone && newPass) {
    members[index] = { id: m.id, name: newName, phone: newPhone, password: newPass };
    localStorage.setItem('members', JSON.stringify(members));
    displayMembers();
  }
}

function logout() {
  window.location.href = 'index.html';
}

window.onload = displayMembers;
