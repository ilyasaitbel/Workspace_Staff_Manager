let employees = [];
let currentZone = null;

const zones = [
    { id: "zoneConference", name: "Conference Room" },
    { id: "zoneReception", name: "Reception" },
    { id: "zoneServer", name: "Server Room" },
    { id: "zoneSecurity", name: "Security Room" },
    { id: "zoneStaff", name: "Staff Room" },
    { id: "zoneArchives", name: "Archives" }
];


const modal = document.getElementById("modal");
const openModal = document.getElementById("openModal");
const addEmployeeBtn = document.getElementById("addEmployeeBtn");
const closeSelectBtn = document.getElementById("closeSelectBtn");
const selectModal = document.getElementById("selectModal");
const btnzone = document.querySelectorAll(".add-btn");
const sidebarbtn = document.getElementById("sidebarbtn")
const sidebar = document.querySelector(".sidebar")
const profile = document.querySelector(".profile")
const list = document.getElementById("employee-list");

openModal.addEventListener("click", modalliste);

btnzone.forEach((btn, i) => {
    btn.addEventListener("click", () => AddToZone(zones[i]));
});
function modalliste() {
    modal.style.display = "flex";
    modal.innerHTML = "";
    const div = document.createElement("div");
    div.className = "modal-content";
    div.innerHTML = `<h2>Ajouter un travailleur</h2>
        <label for="nameInput">Name:</label>
        <input id="nameInput" type="text" placeholder="name">
        <label for="roleInput">Role</label>
        <select id="roleInput">
            <option>Réceptionniste</option>
            <option>Technicien IT</option>
            <option>Agent de sécurité</option>
            <option>Manager</option>
            <option>Nettoyage</option>
            <option>Autre</option>
        </select>
        <label for="photoInput">Photo (URL)</label>
        <input id="photoInput" type="text" placeholder="URL">
        <img id="Imgprofile" class="profile" src="./profile.webp" alt="image-">
        <button class="btn green" id="addEmployeeBtn">Add</button>
        <button class="btn red" id="closeModalBtn">Close</button>`;
    modal.appendChild(div);
    const closeModalBtn = document.getElementById("closeModalBtn");
    const addEmployeeBtn = document.getElementById("addEmployeeBtn");
    const Imgprofile = document.getElementById("Imgprofile");

    document.getElementById("photoInput").addEventListener("input", (event) => {
        console.log(event.target)
        Imgprofile.src = event.target.value || "./profile.webp";
    });

    closeModalBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    addEmployeeBtn.addEventListener("click", () => {
        const photo = document.getElementById("photoInput").value || "./profile.webp";
        const name = document.getElementById("nameInput").value;
        const role = document.getElementById("roleInput").value;

        if (!name.trim()) {
            alert("Le nom est obligatoire !");
            return;
        }

        employees.push({ photo, name, role });
        modal.style.display = "none";
        Listemployees();
    });
}



function Listemployees() {
    list.innerHTML = "";
    employees.forEach(emp => {
        if (!emp.zone) {
            const div = document.createElement("div");
            // div.className = 'child'
            div.innerHTML = `<img src="${emp.photo}" class="emp-img">
            <b>${emp.name}</b> : (${emp.role})`
            list.appendChild(div);
            div.addEventListener("click", () => {
                console.log("display")
                div.style.display = "none"
            })
        }
    });
}
// const child = document.querySelectorAll(".child")
// console.log("ok")
// child.forEach(child => {
//     console.log("o")

// })

function AddToZone(zoneName) {
    currentZone = zoneName;
    selectModal.style.display = "flex";

    const list = document.getElementById("selectList");
    list.innerHTML = "";

    employees.forEach(emp => {
        if (!emp.zone) {
            const btn = document.createElement("button");
            btn.className = "btn orange";
            btn.innerText = emp.name;
            btn.addEventListener("click", () => ToZone(emp));
            list.appendChild(btn);
        }
    });
}

function ToZone(emp) {
    emp.zone = currentZone.name;
    renderZones();
    selectModal.style.display = "none";
    Listemployees();
}

function renderZones() {
    zones.forEach(z => {
        const zoneDiv = document.getElementById(z.id);
        const content = zoneDiv.querySelector(".zone-content");
        content.innerHTML = "";
        employees.forEach(emp => {
            if (emp.zone === z.name) {
                const div = document.createElement("div");
                div.innerHTML = `<img src="${emp.photo}" class="emp-img">
            <b>${emp.name}</b> : (${emp.role})`
                content.appendChild(div);
            }
        });
    });
}
sidebarbtn.addEventListener("click", () => {
    if (sidebar.style.display === "none") {
        sidebar.style.display = "block"
    }
    else {
        sidebar.style.display = "none"
    }
})
// renderZones();
// Listemployees();



// const workers = [
//   {
//     name: "Alice",
//     department: "IT",
//     experiences: ["Frontend Developer", "React Developer"]
//   },
//   {
//     name: "Karim",
//     department: "HR",
//     experiences: ["Recruitment Specialist"]
//   },
//   {
//     name: "Sofia",
//     department: "Finance",
//     experiences: ["Accountant", "Financial Analyst", "Risk Advisor"]
//   },
//   {
//     name: "Youssef",
//     department: "IT",
//     experiences: ["DevOps Engineer", "Cloud Architect"]
//   },
//   {
//     name: "Maya",
//     department: "Marketing",
//     experiences: ["Content Creator", "SEO Specialist"]
//   },
//   {
//     name: "Omar",
//     department: "Finance",
//     experiences: ["Junior Accountant"]
//   }
// ];
// const workersContainer = document.getElementById("workersContainer")
// const departmentSelect = document.getElementById("departmentSelect")
// departmentSelect.addEventListener("change", () => {
//     const value = departmentSelect.value;
//     const filtered = workers.filter(w => w.department === value);

//     filtered.forEach(worker => {
//         const div = document.createElement("div");
//     div.innerHTML = `${}` ;

//     let res =  worker.experiences.map(exp => `<li>${exp}</li>`).join("");
//  worker.experiences.forEach(exp);
// workersContainer.appendChild(div);

// créer et afficher des divs
// });

//     console.log(departmentSelect.value)
// })