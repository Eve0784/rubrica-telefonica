const baseUrl = 'https://694115c8686bc3ca81658f52.mockapi.io/api/v1/contacts';

export function getContacts() {
    const apiUrl = baseUrl;

    return fetch(apiUrl)
        .then(response => response.json())
        .then(result => result)
        .catch(error => console.log('error', error));
}

export function getContactById(id) {
    const apiUrl = baseUrl + '/' + id;

    return fetch(apiUrl)
        .then(response => response.json())
        .then(result => result)
        .catch(error => console.log('error', error));
}

export function createContact(contact) {
    const apiUrl = baseUrl;

    return fetch(apiUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(contact)
    }).then(response => response.json())
      .then(result => result)
      .catch(error => console.log('error', error));
}

export function updateContact(id, updatedContact) {
    const apiUrl = baseUrl + '/' + id;
    return fetch(apiUrl, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(updatedContact)
    })
    .then(response => {
        if (!response.ok) throw new Error('Error al actualizar el contacto');
        return response.json();
    })
    .catch(error => {
        console.error('Error en updateContact:', error);
        throw error; // Propaga el error
    });
}


export function deleteContact(id) {
    const apiUrl = baseUrl + '/' + id;
    return fetch(apiUrl, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    }).then(response => response.json())
      .then(result => result)
      .catch(error => console.log('error', error));
}