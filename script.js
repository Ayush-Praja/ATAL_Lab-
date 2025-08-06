function displayMembers() {
  const members = JSON.parse(localStorage.getItem('members')) || [];
  const table = document.getElementById('membersTable');
  if (!table) return;

  table.innerHTML = `
    <tr>
      <th>Member Name</th>
      <th>Member ID</th>
      <th>Phone Number</th>
      <th>Password</th>
      <th>Actions</th>
    </tr>
  `;

  members.forEach((m, index) => {
    const row = table.insertRow();
    row.insertCell(0).innerText = m.name || "—";
    row.insertCell(1).innerText = m.id || "—";
    row.insertCell(2).innerText = m.phone || "—";
    row.insertCell(3).innerText = m.password || "—";

    // Actions cell
    const actionCell = row.insertCell(4);
    actionCell.innerHTML = `
      <div class="action-menu">
        <button onclick="toggleMenu(this)">⋮</button>
        <div class="action-dropdown">
          <button onclick="editMember(${index})">Edit</button>
          <button onclick="deleteMember(${index})">Delete</button>
        </div>
      </div>
    `;
  });
}

function toggleMenu(button) {
  const menu = button.parentElement;
  document.querySelectorAll('.action-menu').forEach(m => m.classList.remove('show'));
  menu.classList.toggle('show');
}

function addMember() {
  const name = document.getElementById('memberName').value.trim();
  const phone = document.getElementById('memberPhone').value.trim();
  const password = document.getElementById('memberPassword').value.trim();

  if (!name || !phone || !password) {
    alert('Please fill all fields!');
    return;
  }

  if (!/^\d{10}$/.test(phone)) {
    alert('Please enter a valid 10-digit phone number!');
    return;
  }

  let members = JSON.parse(localStorage.getItem('members')) || [];
  let memberID = "MEM" + String(members.length + 1).padStart(3, '0');

  members.push({ id: memberID, name, phone, password });
  localStorage.setItem('members', JSON.stringify(members));

  alert(`Member "${name}" added!\nUser ID: ${memberID}\nPassword: ${password}\nPhone: ${phone}`);

  displayMembers();

  document.getElementById('memberName').value = '';
  document.getElementById('memberPhone').value = '';
  document.getElementById('memberPassword').value = '';
}

function deleteMember(index) {
  let members = JSON.parse(localStorage.getItem('members')) || [];
  if (confirm(`Are you sure you want to delete ${members[index].name}?`)) {
    members.splice(index, 1);
    localStorage.setItem('members', JSON.stringify(members));
    displayMembers();
  }
}

function editMember(index) {
  let members = JSON.parse(localStorage.getItem('members')) || [];
  let m = members[index];

  const newName = prompt("Edit Name:", m.name);
  const newPhone = prompt("Edit Phone:", m.phone);
  const newPassword = prompt("Edit Password:", m.password);

  if (newName && newPhone && /^\d{10}$/.test(newPhone) && newPassword) {
    members[index] = { ...m, name: newName, phone: newPhone, password: newPassword };
    localStorage.setItem('members', JSON.stringify(members));
    displayMembers();
  } else {
    alert("Invalid details. Edit cancelled.");
  }
}

document.addEventListener('click', (event) => {
  if (!event.target.closest('.action-menu')) {
    document.querySelectorAll('.action-menu').forEach(m => m.classList.remove('show'));
  }
});

window.onload = displayMembers;
