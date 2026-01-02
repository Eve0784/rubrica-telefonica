import{createContact}from'../shared/app-phonebook.js';

function saveContact(event) {
    event.preventDefault();
    console.log(event);
    const form = document.getElementById('new-contact-form');
    const data = new FormData(form);

    console.log('Saving contact data:', data);

    const newContact = {
        name: data.get('name'),
        surname: data.get('surname'),
        phonenumber: data.get('phonenumber'),
        email: data.get('email'),
    };

    createContact(newContact).then(created => {
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contacts.push(created);
    localStorage.setItem('contacts', JSON.stringify(contacts));
});

    // createContact(newContact)
    // .then(createContact => {
    //     console.log('Created contact:', createContact);
    //     form.reset();
    //     window.location.assign('../');
    // })
}

document.getElementById('new-contact-form').addEventListener('submit', saveContact);