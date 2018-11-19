/**
 * Tasks
 * 
 * 1. Add new contact
 * 2. View contacts list
 * 3. View each contact details
 * 4. Edit each contact details
 * 5. Remove contacts
 * 6. Persist Data
 */

 /**
  * Data :-
  * 
  * 1. fullname
  * 2. profession
  * 3. email
  * 4. phone
  * 5. address
  */

  /** Elements */
  const iconAdd = document.querySelector('.icon-add');
  const modalBox = document.querySelector('.modal-box');
  const inputDialog = document.querySelector('.input-dialog');
  const contactInfoContainer = document.querySelector('.contact-info__container');
  const addContactBtn = document.querySelector('.add-contact__btn');
  const inputForm = document.querySelector('.input-form');
  const contactList = document.querySelector('.contacts-list');
  const closeIcon = document.querySelector('.close-icon');
  const closeBtn = document.querySelector('.close-btn');
  const editIcon = document.querySelector('.icon-edit');
  const contactItems = document.querySelectorAll('.contacts-list__item');
  const iconDeleteSeleted = document.querySelector('.icon-delete-selected');

  /** From Elements */
  const inputFullName = document.querySelector('.input-fullname');
  const inputProfession = document.querySelector('.input-profession');
  const inputEmail = document.querySelector('.input-email');
  const inputPhone = document.querySelector('.input-phone');
  const inputAddress = document.querySelector('.input-address');

  /** Contact Info Elements */
  const contactName = document.querySelector('.contact-info__name');
  const contactProfession = document.querySelector('.contact-info__profession');
  const contactEmail = document.querySelector('.contact-info__email');
  const contactPhone = document.querySelector('.contact-info__phone');
  const contactAddress = document.querySelector('.contact-info__address');
  

 const state = {};
 
 state.contacts = [];

 /** Retrieve the persisted data if it is exists */

 window.addEventListener('load', (e) => {
    if(localStorage.contacts) {

        let contacts = JSON.parse(localStorage.contacts);

        if(contacts.length > 0) {
            /** Restore all the contacts */
            state.contacts = contacts;
            renderAllContacts();
        }
    }
  
 });


 /***********************************************
  * 1. Add new contact & 2. View contacts list  *
  * *********************************************/


  /** Handle icon-add btn*/
iconAdd.addEventListener('click', (e) => {
    showInputForm();
    inputForm.dataset.mode = 'add';
    addContactBtn.setAttribute('value', '+');
    clearInputs();
});

/** Handle add contact form */
inputForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (inputForm.dataset.mode === 'add') {
         /**Get inputs and save the contact */
        const contact = getInputs();
        saveContact(contact);

        /**clear all the input fields and close the input-field dialog */
        clearInputs();
        closeInputForm();
        
        /**Render the contact in the contact list */
        renderContact(contact);

        inputForm.dataset.mode = '';
    }

});

/**Close the modal when it is clicked */
modalBox.addEventListener('click', (e) => {
    closeAll();
    clearInputs();
});

 const showInputForm = () => {
    /** show modal and input dialog to accept contact details */

    closeBtn.textContent = 'Close';

    modalBox.classList.toggle('show');
    inputDialog.classList.toggle('show');
 };

 const generateID = () => {
     return new Date().valueOf();
 }

const getInputs = () => {
    const contact = {};

    contact.fullName = inputFullName.value;
    contact.profession = inputProfession.value;
    contact.email = inputEmail.value;
    contact.phone = inputPhone.value;
    contact.address = inputAddress.value;

    return contact;
};

const saveContact = (contact) => {
    contact.id = generateID();
    state.contacts.push(contact);
};

const clearInputs = () => {
    inputFullName.value = '';
    inputProfession.value = '';
    inputEmail.value = '';
    inputPhone.value = '';
    inputAddress.value = '';
};

const closeInputForm = () => {
    modalBox.classList.toggle('show');
    inputDialog.classList.toggle('show');
};

const renderContact = (contact) => {

    /**Construct the html markup for contact */
    const markup = `
        <li class="contacts-list__item" data-id=${contact.id}>
            <div class="check-box">
                <i class="material-icons icon-check">check</i>
            </div>

            <div class="contact-text valign-wrapper">
                <h3 class="contact-name">${contact.fullName}</h3>
                <p class="contact-profession">${contact.profession}</p>
            </div>

            <div class="contact-icons">
                <i class="material-icons icon-edit">edit</i>
                <i class="material-icons icon-delete">delete</i>
            </div>
        </li>
    `;

    /**Insert into the DOM  */
    contactList.insertAdjacentHTML('beforeend', markup);
};

const closeAll = () => {
    modalBox.classList.toggle('show');

    if(inputDialog.classList.contains('show'))
        inputDialog.classList.toggle('show');
    
    if(contactInfoContainer.classList.contains('show'))
        contactInfoContainer.classList.toggle('show');
};



 /***********************************************
  *      3. View each contact details           *
  * *********************************************/

contactList.addEventListener('click', (e) => {
    if (e.target.className === 'contact-name' || e.target.className === 'contact-profession') {

        /**Get the contact item from the list */
        const contactItem = e.target.closest('.contacts-list__item')
        
        /** Get the id of the element */
        const id = contactItem.dataset.id;
        console.log(id);

        /**Get the contact details */
        const contact = getContact(id);
        console.log(contact);

        /** Render the contact details */
        editContactInfo(contact);
        renderContactInfo();
    }
});


contactInfoContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('close-btn') || e.target.classList.contains('close-icon')) {
        closeAll();
    }
});

const getContact = (id) => {
    return state.contacts.find( (contact) => {
        return contact.id == id;
    })
};


const editContactInfo = (contact) => {
    contactName.textContent = contact.fullName;
    contactProfession.textContent = contact.profession;
    contactEmail.textContent = contact.email;
    contactPhone.textContent = contact.phone;
    contactAddress.textContent = contact.address;
};

const renderContactInfo = () => {
    /** Render modal & contact info card */
    modalBox.classList.toggle('show');
    contactInfoContainer.classList.toggle('show');
};


 /***********************************************
  *      3. Edit each contact details           *
  * *********************************************/
contactList.addEventListener('click', (e) => {
    if (e.target.classList.contains('icon-edit')) {
        addContactBtn.setAttribute('value', 'Update');
        inputForm.dataset.mode = 'edit';

        const contactItem = e.target.closest('.contacts-list__item');
        const contact = getContact(contactItem.dataset.id);
        
        setInputFields(contact);
        showInputForm();
        inputFullName.select();

        window.id = contact.id;
    }
});

inputForm.addEventListener('submit', (e) => {
    if (inputForm.dataset.mode === 'edit') {
        const editedContact = getInputs();

        console.log(window.id, editedContact);
        saveEditedContact(window.id, editedContact);
        renderAllContacts();

        window.id = undefined;
        inputForm.dataset.mode = '';
        closeAll();
    }
});

const setInputFields = (contact) => {
    inputFullName.value = contact.fullName;
    inputProfession.value = contact.profession;
    inputEmail.value = contact.email;
    inputPhone.value = contact.phone;
    inputAddress.value = contact.address;
};

const saveEditedContact = (id, editedContact) => {
    state.contacts.forEach( (contact) => {
        if (contact.id === id) {
            contact.fullName = editedContact.fullName;
            contact.profession = editedContact.profession;
            contact.email = editedContact.email;
            contact.phone = editedContact.phone;
            contact.address = editedContact.address;
        }
    });
};

const renderAllContacts = () => {
    contactList.innerHTML = '';
    state.contacts.forEach( (contact) => {
        renderContact(contact);
    });
};


/***********************************************
*           5. Remove contacts                 *
************************************************/

/** Remove single contact item */

contactList.addEventListener('click', (e) => {
    if (e.target.classList.contains('icon-delete')) {
        const contactItem = e.target.closest('.contacts-list__item');
        const id = contactItem.dataset.id;

        console.log(`removing contact with id : ${id}`);
        removeContact(id);
        renderAllContacts();
        handleDeleteIcon();
    }
});


const removeContact = (id) => {
    const newContactsList = state.contacts.filter((contact) => contact.id != id);
    state.contacts = newContactsList;
};


contactList.addEventListener('click', (e) => {
    if (e.target.classList.contains('check-box') || e.target.classList.contains('icon-check')) {
        const contactItem = e.target.closest('.contacts-list__item');
        const checkBoxIcon = contactItem.children[0].children[0];
        checkBoxIcon.classList.toggle('show');

        console.log('working...');
        handleDeleteIcon();
    }
});


/** Remove the seleted contacts */
iconDeleteSeleted.addEventListener('click', (e) => {
    /** Get all the seleted Items */
    const selectedContacts = getSeletedItems();


    console.log(selectedContacts);

    /** Remove the seleted items */
    selectedContacts.forEach((contact) => {
        removeContact(contact.dataset.id);
    });

    renderAllContacts();
    handleDeleteIcon();
});

const handleDeleteIcon = () => {

    console.log(isContactItemChecked());
    
    if(isContactItemChecked()) {
        if(!iconDeleteSeleted.classList.contains('show')) {
            /** Render the delete icon */
            renderDeleteIcon();
        }
    } else {
        /** Hide the delete icon */
        hideDeleteIcon();
    }

    const contactItemsRendered = document.querySelectorAll('.contacts-list__item');

        console.log(contactItemsRendered.length);

        if(contactItemsRendered.length === 0) {
            hideDeleteIcon();
        }
};

const renderDeleteIcon = () => {
    iconDeleteSeleted.classList.add('show');
};

const hideDeleteIcon = () => {
    iconDeleteSeleted.classList.remove('show');
}

const isContactItemChecked = () => {
    const contactItems = document.querySelectorAll('.contacts-list__item');
    const contactsItemArray = Array.from(contactItems);

    const checkedItems = contactsItemArray.filter( (contactItem) => {
        return contactItem.children[0].children[0].classList.contains('show');
    });

    if(checkedItems.length > 0)
        return true;
    else
        return false;
};

const getSeletedItems = () => {
    const contactItems = document.querySelectorAll('.contacts-list__item');
    const contactItemsArray = Array.from(contactItems);
    const contactItemsSeleted = contactItemsArray.filter((contactItem) => {
        return contactItem.children[0].children[0].classList.contains('show');
    });

    return contactItemsSeleted;
};

/** 6. Persist Data */

window.addEventListener('beforeunload', (e) => {
    localStorage.setItem('contacts', JSON.stringify(state.contacts));
});