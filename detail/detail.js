import { getContactById, deleteContact } from "../shared/app-phonebook.js";

const contactDetail = document.getElementById('contact-detail');

contactDetail.innerHTML = '<p>Caricando contatto...</p>';

const searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get('contactId');


let contact = null;
const cachedContacts = JSON.parse(localStorage.getItem('contacts'));

if (cachedContacts) {
    contact = cachedContacts.find(c => c.id === id);
}

if (contact) {
    displayContact(contact);
} else {

    getContactById(id)
        .then(result => {
            if (result && result.id) {
                displayContact(result);
            } else {
                throw new Error('Contactto non trovato');
            }
        })
        .catch(error => {
            console.error('Errore al caricare contatto:', error);
            alert('Errore al caricare contatto');
            window.location.assign('../index.html');
        });
}

function displayContact(contact) {
    contactDetail.innerHTML = '';
    
    const nameElem = document.createElement('h2');
    nameElem.className = 'title';
    nameElem.textContent = contact.name + ' ' + contact.surname;
    
    const phoneElem = document.createElement('p');
    phoneElem.textContent = 'Telefono: ' + contact.phonenumber;
    
    const emailElem = document.createElement('p');
    emailElem.textContent = 'Email: ' + contact.email;
    
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'buttons-container';
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'buttons';
    deleteBtn.textContent = '🗑️ Elimina';
    deleteBtn.addEventListener('click', () => deleteContactAndRedirect(contact.id));
    
    const modifyLink = document.createElement('a');
    modifyLink.className = 'buttons';
    modifyLink.textContent = '✏️ Modifica';
    modifyLink.href = '../modify/modify.html?contactId=' + contact.id;
    
    actionsDiv.append(deleteBtn, modifyLink);
    contactDetail.append(nameElem, phoneElem, emailElem, actionsDiv);
}


function deleteContactAndRedirect(id) {
    if (confirm("Vuoi veramente cancellare il contatto?")) {
        deleteContact(id).then(() => {
            let contacts = JSON.parse(localStorage.getItem('contacts'));
            if (contacts) {
                contacts = contacts.filter(c => c.id !== id);
                localStorage.setItem('contacts', JSON.stringify(contacts));
            }
            window.location.assign('../');
        });
    }
}
