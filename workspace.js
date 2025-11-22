let employees = [];
let experienceCounter = 0;
let currentZone = null;

// DOM elements
const modal = document.getElementById("modal");
const openModal = document.getElementById("openModal");
const closeSelectBtn = document.getElementById("closeSelectBtn");
const selectModal = document.getElementById("selectModal");
const btnzone = document.querySelectorAll(".add-btn");
const sidebarbtn = document.getElementById("sidebarbtn");
const sidebar = document.querySelector(".sidebar");
const list = document.getElementById("employee-list");

const zones = document.querySelectorAll(".zone");

//-------------------------
// EVENT LISTENERS
//-------------------------
openModal.addEventListener("click", modalliste);
closeSelectBtn.addEventListener("click", () => selectModal.style.display = "none");

btnzone.forEach((btn, i) => {
    btn.addEventListener("click", () => AddToZone(zones[i]));
});

sidebarbtn.addEventListener("click", () => {
    if (sidebar.style.display === "none") {
        sidebar.style.display = "block"
    }
    else {
        sidebar.style.display = "none"
    }
})

//-------------------------
// MODAL ADD EMPLOYEE
//-------------------------
function modalliste() {
    modal.style.display = "flex";
    modal.innerHTML = "";

    const div = document.createElement("div");
    div.className = "modal-content";
    div.id = "modal-content-height";

    div.innerHTML = `
        <h2>Ajouter un travailleur</h2>
        <label>Name:</label>
        <input id="nameInput" type="text">

        <label>Email:</label>
        <input id="gmailInput" type="text">

        <label>Phone:</label>
        <input id="phoneInput" type="text">

        <label>Role:</label>
        <select id="roleInput">
            <option>Réceptionniste</option>
            <option>Technicien IT</option>
            <option>Agent de sécurité</option>
            <option>Manager</option>
            <option>Nettoyage</option>
            <option>Autre</option>
        </select>

        <label>Photo (URL):</label>
        <input id="photoInput" type="text">
        <img id="Imgprofile" class="profile" src="./profile.webp">

        <div id="experienceList"></div>
        <button id="addExperienceBtn">Ajouter une expérience</button>

        <button class="btn green" id="addEmployeeBtn">Add</button>
        <button class="btn red" id="closeModalBtn">Close</button>
    `;

    modal.appendChild(div);

    document.getElementById("photoInput").addEventListener("input", e => {
        document.getElementById("Imgprofile").src = e.target.value || "./profile.webp";
    });

    document.getElementById("addExperienceBtn").addEventListener("click", ajouterExperience);
    document.getElementById("addEmployeeBtn").addEventListener("click", ajouterEmployee);
    document.getElementById("closeModalBtn").addEventListener("click", () => {
        modal.style.display = "none";
    });
}

//-------------------------
// EXPERIENCE SYSTEM
//-------------------------

function ajouterExperience() {
    const list = document.getElementById("experienceList");
    const id = experienceCounter++;

    const exp = document.createElement("div");
    exp.className = "experience-item";
    exp.id = id;

    exp.innerHTML = `
        <label>Company:</label><input type="text" class="exp-company">
        <label>Role:</label><input type="text" class="exp-role">
        <label>From:</label><input type="date" class="exp-from">
        <label>To:</label><input type="date" class="exp-to">
    `;

    const removeBtn = document.createElement("button");
    removeBtn.className = "remove-exp";
    removeBtn.textContent = "x";
    removeBtn.addEventListener("click", () => exp.remove());

    exp.appendChild(removeBtn);
    list.appendChild(exp);
}

//-------------------------
// VALIDATION
//-------------------------

const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{2,}$/;
const emailRegex = /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/;
const phoneRegex = /^\+?\d{1,4}[\s\-]?\(?\d{1,4}\)?[\s\-]?\d{1,4}[\s\-]?\d{1,4}$/;
const urlRegex = /^(https?:\/\/.*\.(jpg|jpeg|png|gif|webp))$/i;

function validateEmployee() {
    const name = document.getElementById("nameInput").value
    const email = document.getElementById("gmailInput").value
    const phone = document.getElementById("phoneInput").value
    const photo = document.getElementById("photoInput").value

    if (!nameRegex.test(name))
        return alert("Nom invalide !");
    if (!emailRegex.test(email)) 
        return alert("Email invalide !");
    if (!phoneRegex.test(phone))
        return alert("Numéro invalide !");
    if (photo && !urlRegex.test(photo)) 
        return alert("URL image invalide !");

    return true;
}

//-------------------------
// ADD EMPLOYEE
//-------------------------

function ajouterEmployee() {
    if (!validateEmployee()) return;

    const employee = {
        name: document.getElementById("nameInput").value,
        email: document.getElementById("gmailInput").value,
        phone: document.getElementById("phoneInput").value,
        role: document.getElementById("roleInput").value,
        photo: document.getElementById("photoInput").value || "./profile.webp",
        zone: null,
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

//-------------------------
// LIST EMPLOYEES IN SIDEBAR
//-------------------------

function Listemployees() {
    list.innerHTML = "";

    employees.forEach(emp => {
        if (!emp.zone) {
            const div = document.createElement("div");
            div.innerHTML = `<img src="${emp.photo}" class="emp-img">
            <b>${emp.name}</b> : (${emp.role})`;
            div.addEventListener("click", () => div.style.display = "none");
            list.appendChild(div);
        }
    });
}

//-------------------------
// ADD EMPLOYEE TO ZONE
//-------------------------

function AddToZone(zoneElement) {
    currentZone = zoneElement;

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
    currentZone.classList.remove("blob");

    const zoneName = currentZone.querySelector("h3").innerText;
    emp.zone = zoneName;

    renderZones();
    selectModal.style.display = "none";
    Listemployees();
}

//-------------------------
// RENDER ZONES
//-------------------------

function renderZones() {
    zones.forEach(zoneElement => {

        const zoneName = zoneElement.querySelector("h3").innerText;
        const content = zoneElement.querySelector(".zone-content");

        content.innerHTML = "";

        employees.forEach(emp => {
            if (emp.zone === zoneName) {

                const div = document.createElement("div");
                div.className = "employee-in-zone";
                div.innerHTML = `
                    <img src="${emp.photo}" class="emp-img">
                    <b>${emp.name}</b> (${emp.role})
                    <button class="remove-emp-btn">X</button>
                `;

                const removeBtn = div.querySelector(".remove-emp-btn");

                removeBtn.addEventListener("click", () => {
                    emp.zone = null;

                    if (content.children.length === 1) {
                        zoneElement.classList.add("blob");
                    }

                    Listemployees();
                    renderZones();
                });

                content.appendChild(div);
            }
        });
    });
}

// sidebarbtn.addEventListener("click", () => {
//     if (sidebar.style.display === "none") {
//         sidebar.style.display = "block"
//     }
//     else {
//         sidebar.style.display = "none"
//     }
// })

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