import { updateContact, getContactById } from "../shared/app-phonebook.js";

const searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get('contactId'); 

console.log('ID del contacto:', id);

if (!id) {
    alert('Error: No hai specificato il ID del contatto');
    window.location.assign('../index.html');
}

let contact = null;
const nameInput = document.getElementById('name-input');
const surnameInput = document.getElementById('surname-input');
const phoneInput = document.getElementById('phone-input');
const emailInput = document.getElementById('email-input');
const saveBtn = document.getElementById('save-btn');
const modifyForm = document.getElementById('modify-form');

modifyForm.addEventListener('submit', (e) => {
    e.preventDefault();
});

getContactById(id).then(result => {
    contact = result;
    console.log('✅ uploading contatto:', contact);
    
    if (contact && contact.id) {
        nameInput.value = contact.name || '';
        surnameInput.value = contact.surname || '';
        phoneInput.value = contact.phonenumber || '';
        emailInput.value = contact.email || '';
    } else {
        alert('Error: contatto non trovato');
        window.location.assign('../index.html');
    }
}).catch(error => {
    console.error('Errore al caricare il contatto:', error);
    alert('Errore al caricare il contatto');
    window.location.assign('../index.html');
});


saveBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    console.log('🔍 Click - Contact:', contact);
    
    if (!contact || !contact.id) {
        alert('attendere il caricamento del contatto prima di salvare');
        return;
    }
    
    const updatedContact = {
        name: nameInput.value,
        surname: surnameInput.value,
        phonenumber: phoneInput.value,
        email: emailInput.value
    };  
      
    console.log('aggiornando contatto ID:', contact.id);
    console.log('Nuovi dati:', updatedContact);
    
saveBtn.disabled = true;
saveBtn.textContent = 'Salvando...';

updateContact(contact.id, updatedContact)
    .then(updated => {
        console.log('✅ Contatto aggiornato:', updated);

        let contacts = JSON.parse(localStorage.getItem('contacts'));

        if (contacts) {
            const index = contacts.findIndex(c => c.id === contact.id);
            if (index !== -1) {
                contacts[index] = updated;
                localStorage.setItem('contacts', JSON.stringify(contacts));
            }
        }

        window.location.assign('../detail/detail.html?contactId=' + contact.id);
    })
    .catch(error => {
        console.error('❌ Error:', error);
        alert('Errore durante l\'aggiornamento del contatto');
        saveBtn.disabled = false;
        saveBtn.textContent = 'Salva Modifiche';
    });

});