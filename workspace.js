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
const closeModal = document.getElementById("closeModalBtn");
const addEmployeeBtn = document.getElementById("addEmployeeBtn");
const closeSelectBtn = document.getElementById("closeSelectBtn");
const selectModal = document.getElementById("selectModal");
const btnzone = document.querySelectorAll(".add-btn");
const sidebarbtn = document.getElementById("sidebarbtn")
const sidebar = document.querySelector(".sidebar")
const profile = document.querySelector(".profile")
const list = document.getElementById("employee-list");

openModal.addEventListener("click", () => modal.style.display = "flex");
closeModal.addEventListener("click", () => modal.style.display = "none");

    btnzone.forEach((btn, i) => {
    btn.addEventListener("click", () => AddToZone(zones[i]));
});

closeSelectBtn.addEventListener("click", () => {
    selectModal.style.display = "none";
});
function ajouteremployees(){
    const photo = document.getElementById("photoInput").value;
    const name = document.getElementById("nameInput").value;
    const role = document.getElementById("roleInput").value;
    if(photo == "")
    {
        profile.style.display="block"
    }
    
    // role.addEventListener("input", () =>{

    // })
    addEmployeeBtn.addEventListener("click", () => {
    employees.push({ photo,name,role });
    modal.style.display = "none";
    Listemployees();
});
}

function Listemployees(){ 
    list.innerHTML = "";
    employees.forEach(emp => {
        if (!emp.zone) {
            const div = document.createElement("div");
            // div.className = 'child'
            div.innerHTML =`<img src="${emp.photo}" class="emp-img">
            <b>${emp.name}</b> : (${emp.role})`
            list.appendChild(div);
                div.addEventListener("click", () => {
            console.log("display")
        div.style.display="none"
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
        if(sidebar.style.display === "none"){
            sidebar.style.display = "block"
        }
      else{
            sidebar.style.display = "none"
        }
    })

ajouteremployees()
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