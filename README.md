# WorkSphere – Workspace Staff Manager

Hello! This project gives you a clean, visual way to organize staff across a workspace floor plan—simple, interactive, and without turning into spreadsheet chaos.

---

## Core Functionality
- Add, edit, and delete employees through a modal form.  
- Dynamic experience fields + live photo preview.  
- Visual floor plan with 6 zones:
  - Conference Room
  - Reception
  - Server Room
  - Security Room
  - Staff Room
  - Archives Room
- Role-based placement rules for each zone.  
- Unassigned staff panel for quick organization.  
- Clickable employee profiles with full details.

---

## Interaction & UI
- “+” button in each zone to assign eligible employees.  
- “X” button to move them back to Unassigned.  
- Restricted areas highlighted in pale red.

---

## Logic & Restrictions
- **Reception → Receptionists**  
- **Server Room → IT Technicians**  
- **Security Room → Security Officers**  
- **Managers → Anywhere**  
- **Cleaning → Anywhere except Archives**  
- **Others → Anywhere except restricted zones**  
- Optional limits per zone.

---

## Technical Stack
- HTML5 / CSS3 / JavaScript  
- Flexbox + Grid  
- Responsive breakpoints for desktop, tablet, and mobile  
- Deployable on GitHub Pages  
- Planning with Trello