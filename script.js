let members = JSON.parse(localStorage.getItem("members")) || [];

document.getElementById("loginBtn").onclick = function() {
    document.getElementById("loginModal").style.display = "block";
};

document.querySelector(".close").onclick = function() {
    document.getElementById("loginModal").style.display = "none";
};

function showLoginForm(type) {
    document.getElementById("adminLoginForm").classList.add("hidden");
    document.getElementById("memberLoginForm").classList.add("hidden");
    if (type === 'admin') document.getElementById("adminLoginForm").classList.remove("hidden");
    if (type === 'member') document.getElementById("memberLoginForm").classList.remove("hidden");
}

function adminLogin() {
    let user = document.getElementById("adminUsername").value;
    let pass = document.getElementById("adminPassword").value;
    if (user === "admin" && pass === "1234") {
        document.getElementById("loginModal").style.display = "none";
        document.getElementById("adminPanel").classList.remove("hidden");
        loadMembers();
    } else {
        alert("Invalid admin credentials");
    }
}

function memberLogin() {
    let id = document.getElementById("memberUsername").value;
    let pass = document.getElementById("memberPassword").value;
    let member = members.find(m => m.id == id && m.password == pass);
    if (member) {
        document.getElementById("loginModal").style.display = "none";
        document.getElementById("memberPanel").classList.remove("hidden");
        document.getElementById("memberNameDisplay").innerText = member.name;
    } else {
        alert("Invalid member login");
    }
}

function addMember() {
    let name = document.getElementById("memberName").value;
    let phone = document.getElementById("memberPhone").value;
    let pass = document.getElementById("memberPass").value;
    if (!name || !phone || !pass) return alert("Fill all fields");

    let id = Date.now();
    members.push({ name, phone, password: pass, id });
    localStorage.setItem("members", JSON.stringify(members));
    loadMembers();
}

function loadMembers() {
    let table = document.getElementById("memberTable");
    table.innerHTML = "";
    members.forEach(m => {
        table.innerHTML += `
            <tr>
                <td>${m.name}</td>
                <td>${m.id}</td>
                <td>${m.password}</td>
                <td>${m.phone}</td>
                <td>
                    <span class="action-btn" onclick="editMember(${m.id})">✏️</span>
                    <span class="action-btn" onclick="deleteMember(${m.id})">🗑️</span>
                </td>
            </tr>
        `;
    });
}

function deleteMember(id) {
    members = members.filter(m => m.id != id);
    localStorage.setItem("members", JSON.stringify(members));
    loadMembers();
}

function editMember(id) {
    let member = members.find(m => m.id == id);
    let newName = prompt("Edit Name:", member.name);
    let newPhone = prompt("Edit Phone:", member.phone);
    let newPass = prompt("Edit Password:", member.password);
    member.name = newName;
    member.phone = newPhone;
    member.password = newPass;
    localStorage.setItem("members", JSON.stringify(members));
    loadMembers();
}
