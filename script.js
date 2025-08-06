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

    // Actions cell with 3 dots menu
    const actionCell = row.insertCell(4);
    actionCell.innerHTML = `
      <div class="action-menu" style="position: relative; display: inline-block;">
        <button onclick="toggleMenu(this)" style="background:none;border:none;font-size:18px;cursor:pointer;">⋮</button>
        <div class="action-dropdown" style="display:none;position:absolute;right:0;background:white;border:1px solid #ccc;box-shadow:0px 4px 6px rgba(0,0,0,0.2);z-index:10;">
          <button onclick="editMember(${index})" style="background:none;border:none;width:100%;padding:8px;text-align:left;cursor:pointer;">Edit</button>
          <button onclick="deleteMember(${index})" style="background:none;border:none;width:100%;padding:8px;text-align:left;cursor:pointer;">Delete</button>
        </div>
      </div>
    `;
  });
}

function toggleMenu(button) {
  const menu = button.parentElement;
  document.querySelectorAll('.action-menu').forEach(m => m.classList.remove('show'));
  document.querySelectorAll('.action-dropdown').forEach(dd => dd.style.display = 'none');

  const dropdown = menu.querySelector('.action-dropdown');
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
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

// Click outside → close menu
document.addEventListener('click', (event) => {
  if (!event.target.closest('.action-menu')) {
    document.querySelectorAll('.action-dropdown').forEach(dd => dd.style.display = 'none');
  }
});

window.onload = displayMembers;
