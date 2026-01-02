import { getContacts } from "./shared/app-phonebook.js";

let contacts = [];
let filteredContacts = [];
let contactIconSVG = '';

// Cargar el SVG una sola vez
fetch('./assets/contact-icon.svg')
    .then(res => res.text())
    .then(svg => {
        contactIconSVG = svg;
        init();
    })
    .catch(err => console.error('Errore al caricare SVG:', err));

// Inicializar la app
function init() {
    const contactsList = document.getElementById('contacts-list');
    contactsList.innerHTML = '<p>Caricando contatti...</p>';

    // Intentar leer del cache
    const cached = localStorage.getItem('contacts');
    if (cached) {
        contacts = JSON.parse(cached);
        filteredContacts = [...contacts];
        displayContacts(filteredContacts);
        return; // Fin inmediato
    }

    // Si no hay cache, llamar a la API
    getContacts()
        .then(result => {
            contacts = result;
            filteredContacts = [...contacts];

            // Guardar en cache
            localStorage.setItem('contacts', JSON.stringify(contacts));

            displayContacts(filteredContacts);
        })
        .catch(err => {
            contactsList.innerHTML = '<p>Error al cargar contactos</p>';
            console.error(err);
        });
}

// Mostrar los contactos
function displayContacts(contactsToDisplay) {
    const contactsList = document.getElementById('contacts-list');
    contactsList.innerHTML = '';

    if (contactsToDisplay.length === 0) {
        contactsList.innerHTML = '<p class="no-results">Nessun contatto trovato</p>';
        return;
    }

    for (const contact of contactsToDisplay) {
        const card = document.createElement('div');
        card.className = 'contact-card';
        
        const contactIcon = document.createElement('span');
        contactIcon.className = 'contact-icon';
        contactIcon.innerHTML = contactIconSVG;
        
        const fullName = document.createElement('span');
        fullName.textContent = contact.name + ' ' + contact.surname;
        
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'actions-div';
        
        const detailLink = document.createElement('a');
        detailLink.className = 'action';
        detailLink.textContent = '➡️';
        detailLink.href = './detail/detail.html?contactId=' + contact.id;
        
        actionsDiv.appendChild(detailLink);
        card.append(contactIcon, fullName, actionsDiv);
        contactsList.appendChild(card);
    }
}

// Filtrar contactos
function filterContacts(searchTerm) {
    const term = searchTerm.toLowerCase().trim();
    
    if (term === '') {
        filteredContacts = [...contacts];
    } else {
        filteredContacts = contacts.filter(contact => {
            const fullName = `${contact.name} ${contact.surname}`.toLowerCase();
            return fullName.includes(term);
        });
    }

    displayContacts(filteredContacts);
}

// Ordenar contactos por nombre
function compareNames(a, b) {
    return a.name.localeCompare(b.name);
}

function orderByTitle() {
    filteredContacts.sort(compareNames);
    displayContacts(filteredContacts);
}

// Event listeners
const orderByNameBtn = document.getElementById('name-order');
orderByNameBtn.addEventListener('click', orderByTitle);

const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', (e) => {
    filterContacts(e.target.value);
});
