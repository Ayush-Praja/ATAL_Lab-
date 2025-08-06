let members = JSON.parse(localStorage.getItem("members")) || [];

// Login modal open/close
document.getElementById("loginBtn")?.addEventListener("click", () => {
    document.getElementById("loginModal").style.display = "block";
});

document.querySelector(".close")?.addEventListener("click", () => {
    document.getElementById("loginModal").style.display = "none";
});
function adminLogin() {
    let user = prompt("Enter Admin Username:");
    let pass = prompt("Enter Admin Password:");

    // Default admin credentials
    if (user === "admin" && pass === "1234") {
        window.location.href = "admin.html";
    } else {
        alert("Invalid admin credentials!");
    }
}

function memberLogin() {
    let id = prompt("Enter Member ID:");
    let pass = prompt("Enter Password:");

    let members = JSON.parse(localStorage.getItem("members")) || [];
    let member = members.find(m => m.id === id && m.pass === pass);

    if (member) {
        localStorage.setItem("loggedMember", JSON.stringify(member));
        window.location.href = "member.html";
    } else {
        alert("Invalid Member ID or Password!");
    }
}


// Add Member (Admin Page)
function addMember() {
    let name = document.getElementById("memberName").value;
    let phone = document.getElementById("memberPhone").value;
    let pass = document.getElementById("memberPass").value;

    if (!name || !phone || !pass) {
        alert("Please fill all fields");
        return;
    }

    let id = "MEM" + (members.length + 1);
    members.push({ name, phone, pass, id });
    localStorage.setItem("members", JSON.stringify(members));
    displayMembers();
}

// Display Members in Table
function displayMembers() {
    let table = document.getElementById("memberTable");
    if (!table) return;

    table.innerHTML = "";
    members.forEach(m => {
        let row = `<tr>
            <td>${m.name}</td>
            <td>${m.id}</td>
            <td>${m.pass}</td>
            <td>${m.phone}</td>
            <td><button onclick="deleteMember(${index})">Delete</button></td>
        </tr>`;
        table.innerHTML += row;
    });
}
displayMembers();

// Member Login
function memberLogin() {
    let id = prompt("Enter Member ID:");
    let pass = prompt("Enter Password:");

    let member = members.find(m => m.id === id && m.pass === pass);
    if (member) {
        localStorage.setItem("loggedMember", JSON.stringify(member));
        window.location.href = "member.html";
    } else {
        alert("Invalid ID or Password");
    }
}

// Load Member Page
let loggedMember = JSON.parse(localStorage.getItem("loggedMember"));
if (loggedMember && document.getElementById("memberNameDisplay")) {
    document.getElementById("memberNameDisplay").innerText = loggedMember.name;
}
function deleteMember(index) {
    if (confirm("Are you sure you want to delete this member?")) {
        members.splice(index, 1);
        localStorage.setItem("members", JSON.stringify(members));
        renderTable();
    }
}
