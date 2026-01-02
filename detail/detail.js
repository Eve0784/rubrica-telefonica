import { getContactById, deleteContact } from "../shared/app-phonebook.js";

function displayContact(contact) {
    const contactDetail = document.getElementById('contact-detail');
    contactDetail.innerHTML = '';
    
    const nameElem = document.createElement('h2');
    nameElem.classList.add('title');
    nameElem.appendChild(document.createTextNode(contact.name + ' ' + contact.surname));
    contactDetail.appendChild(nameElem);
    
    const phoneElem = document.createElement('p');
    phoneElem.appendChild(document.createTextNode('Telefono: ' + contact.phonenumber));
    contactDetail.appendChild(phoneElem);
    
    const emailElem = document.createElement('p');
    emailElem.appendChild(document.createTextNode('Email: ' + contact.email));
    contactDetail.appendChild(emailElem);
    
    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('buttons-container');
    contactDetail.appendChild(actionsDiv);
    
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('buttons');
    deleteBtn.innerHTML = '🗑️ Elimina';
    deleteBtn.addEventListener('click', deleteContactAndRedirect);
    actionsDiv.appendChild(deleteBtn);
    
    const modifyLink = document.createElement('a');
    modifyLink.classList.add('buttons');
    modifyLink.innerHTML = '✏️ Modifica';
    // ✅ CORREGIDO - ahora apunta a la carpeta correcta "modify"
    modifyLink.href = '../modify/modify.html?contactId=' + contact.id;
    actionsDiv.appendChild(modifyLink);
}

const searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get('contactId');

if (!id) {
    alert('Error: No se especificó el ID del contacto');
    window.location.assign('../index.html');
}

let contact;

getContactById(id).then(result => {
    contact = result;
    console.log('Contacto recibido:', result);
    
    if (contact && contact.id) {
        displayContact(result);
    } else {
        alert('Contacto no encontrado');
        window.location.assign('../index.html');
    }
}).catch(error => {
    console.error('Error al cargar contacto:', error);
    alert('Error al cargar el contacto');
    window.location.assign('../index.html');
});

function deleteContactAndRedirect() {
    if (confirm("Vuoi veramente cancellare il contatto???")) {
        deleteContact(contact.id).then(_ => {
            console.log("ID a borrar:", contact.id);
            window.location.assign('../');
        });  
    }
}