let employees = [];
let experienceCounter = 0;
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
const closeSelectBtn = document.getElementById("closeSelectBtn");
const selectModal = document.getElementById("selectModal");
const btnzone = document.querySelectorAll(".add-btn");
const sidebarbtn = document.getElementById("sidebarbtn")
const sidebar = document.querySelector(".sidebar")
const list = document.getElementById("employee-list");

openModal.addEventListener("click", modalliste);
closeSelectBtn.addEventListener("click", () => selectModal.style.display = "none");
btnzone.forEach((btn, i) => {
    btn.addEventListener("click", () => AddToZone(zones[i]));
});

function modalliste() {
    modal.style.display = "flex";
    modal.innerHTML = "";
    const div = document.createElement("div");
    div.className = "modal-content";
    div.id = "modal-content-height"
    div.innerHTML = `
        <h2>Ajouter un travailleur</h2>
        <label for="nameInput">Name:</label>
        <input id="nameInput" type="text" placeholder="name">

        <label for="gmailInput">Email:</label>
        <input id="gmailInput" type="text" placeholder="email">

        <label for="phoneInput">Phone:</label>
        <input id="phoneInput" type="text" placeholder="phone">

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

        <div id="experienceList"></div>
        <button type="button" id="addExperienceBtn">Ajouter une expérience</button>

        <button class="btn green" id="addEmployeeBtn">Add</button>
        <button class="btn red" id="closeModalBtn">Close</button>
    `;
    modal.appendChild(div);

    const Imgprofile = document.getElementById("Imgprofile");
    document.getElementById("photoInput").addEventListener("input", (event) => {
        Imgprofile.src = event.target.value || "./profile.webp";
    });

    document.getElementById("addExperienceBtn").addEventListener("click", ajouterExperience);
    document.getElementById("addEmployeeBtn").addEventListener("click", ajouterEmployee);
    document.getElementById("closeModalBtn").addEventListener("click", () => {
        modal.style.display = "none";
    });
}

function ajouterExperience() {
    const list = document.getElementById("experienceList");
    const id = "exp_" + experienceCounter++;

    const exp = document.createElement("div");
    exp.className = "experience-item";
    exp.id = id;

    exp.innerHTML = `
        <label>Company:</label>
        <input type="text" class="exp-company">

        <label>Role:</label>
        <input type="text" class="exp-role">

        <label>From:</label>
        <input type="date" class="exp-from">

        <label>To:</label>
        <input type="date" class="exp-to">
    `;

    const removeBtn = document.createElement("button");
    removeBtn.className = "remove-exp";
    removeBtn.textContent = "×";
    removeBtn.addEventListener("click", () => exp.remove());

    exp.appendChild(removeBtn);
    list.appendChild(exp);
}

const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{2,}$/;
const emailRegex = /^[\w.-]+@[\w.-]+\.[A-Za-zone]{2,}$/;
const phoneRegex = /^\+?\d{1,4}[\s\-]?\(?\d{1,4}\)?[\s\-]?\d{1,4}[\s\-]?\d{1,4}$/;
const urlRegex = /^(https?:\/\/.*\.(jpg|jpeg|png|gif|webp))$/i;

function validateEmployeeForm() {
    const name = document.getElementById("nameInput").value.trim();
    const email = document.getElementById("gmailInput").value.trim();
    const phone = document.getElementById("phoneInput").value.trim();
    const photo = document.getElementById("photoInput").value.trim();

    if (!nameRegex.test(name)) {
        alert("Nom invalide !");
        return false;
    }
    if (!emailRegex.test(email)) {
        alert("Email invalide !");
        return false;
    }
    if (!phoneRegex.test(phone)) {
        alert("Numéro de téléphone invalide !");
        return false;
    }
    if (photo && !urlRegex.test(photo)) {
        alert("URL de l'image invalide !");
        return false;
    }

    return true;
}

function ajouterEmployee() {
    if (!validateEmployeeForm()) return;

    const employee = {
        name: document.getElementById("nameInput").value.trim(),
        email: document.getElementById("gmailInput").value.trim(),
        phone: document.getElementById("phoneInput").value.trim(),
        role: document.getElementById("roleInput").value,
        photo: document.getElementById("photoInput").value || "./profile.webp",
        experiences: []
    };

    document.querySelectorAll(".experience-item").forEach(exp => {
        employee.experiences.push({
            company: exp.querySelector(".exp-company").value,
            role: exp.querySelector(".exp-role").value,
            from: exp.querySelector(".exp-from").value,
            to: exp.querySelector(".exp-to").value,
        });
    });

    employees.push(employee);
    modal.style.display = "none";
    Listemployees();
}

function Listemployees() {
    list.innerHTML = "";
    employees.forEach(emp => {
        if (!emp.zone) {
            const div = document.createElement("div");
            div.innerHTML = `<img src="${emp.photo}" class="emp-img">
            <b>${emp.name}</b> : (${emp.role})`;
            list.appendChild(div);
            div.addEventListener("click", () => div.style.display = "none");
            console.log("div")
        }
    });
}

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
    zones.forEach(zone => {
        const zoneDiv = document.getElementById(zone.id);
        const content = zoneDiv.querySelector(".zone-content");
        content.innerHTML = "";
        employees.forEach(emp => {
            if (emp.zone === zone.name) {
                const div = document.createElement("div");
                div.className = "employee-in-zone"
                div.innerHTML = `<img src="${emp.photo}" class="emp-img">
                <b>${emp.name}</b> : (${emp.role})
                <button class="remove-emp-btn">X</button>
                `;
                const removeBtn = div.querySelector(".remove-emp-btn");
                removeBtn.addEventListener("click", () => {
                    console.log(emp.zone)
                    console.log(emp)
                    emp.zone = null;
                    Listemployees();
                    renderZones();
                });
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