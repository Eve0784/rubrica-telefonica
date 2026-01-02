import { getContacts } from "./shared/app-phonebook.js";

let contacts = [];
let filteredContacts = [];

function displayContacts(contactsToDisplay) {
    const contactsList = document.getElementById('contacts-list');
    contactsList.innerHTML = '';
    
    if (contactsToDisplay.length === 0) {
        const noResults = document.createElement('p');
        noResults.className = 'no-results';
        noResults.textContent = 'Nessun contatto trovato';
        contactsList.appendChild(noResults);
        return;
    }
    
    for (const contact of contactsToDisplay) {
        const card = document.createElement('div');
        card.className = 'contact-card';
        
        const contactIcon = document.createElement('span');
        contactIcon.classList.add('contact-icon');
        fetch('./assets/contact-icon.svg')
            .then(res => res.text())
            .then(svg => { contactIcon.innerHTML = svg; });
        card.appendChild(contactIcon);
        
        const fullName = document.createElement('span');
        fullName.appendChild(document.createTextNode(contact.name + ' ' + contact.surname));
        card.appendChild(fullName);
        
        const actionsDiv = document.createElement('div');
        actionsDiv.classList.add('actions-div');
        
        const detailLink = document.createElement('a');
        detailLink.classList.add('action');
        detailLink.appendChild(document.createTextNode('🡺'));
        detailLink.href = './detail/detail.html?contactId=' + contact.id;
        actionsDiv.appendChild(detailLink);
        
        card.appendChild(actionsDiv);
        contactsList.appendChild(card);
    }
}

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

getContacts().then(result => {
    contacts = result;
    filteredContacts = [...contacts];
    console.log('Contactos recibidos:', result);
    displayContacts(filteredContacts);
});

function compareNames(n1, n2) {
    return n1.name.localeCompare(n2.name);
}

function orderByTitle() {
    filteredContacts.sort(compareNames);
    displayContacts(filteredContacts);
}

// Event listener para el botón de ordenar
const orderByNameBtn = document.getElementById('name-order');
orderByNameBtn.addEventListener('click', orderByTitle);

// Event listener para la barra de búsqueda
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', (e) => {
    filterContacts(e.target.value);
});