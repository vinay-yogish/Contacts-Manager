/**
 * 1. Add new contact
 * 2. View contacts list
 * 3. View each contact details
 * 4. Edit each contact details
 * 5. Remove single and all contacts
 * 6. Persist Data
 */

 /**
  * Data :-
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

  /** From Elements */
  const inputFullName = document.querySelector('.input-fullname');
  const inputProfession = document.querySelector('.input-profession');
  const inputEmail = document.querySelector('.input-email');
  const inputPhone = document.querySelector('.input-phone');
  const inputAddress = document.querySelector('.input-address');
  

 const state = {};
 
 state.contacts = [];

 /**1. Add new contact & 2. View contacts list */

  /** Handle icon-add btn*/
iconAdd.addEventListener('click', (e) => {
    showInputForm();
});

/** Handle add contact form */
inputForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    /**Get inputs and save the contact */
    const contact = getInputs();
    saveContact(contact);

    /**clear all the input fields and close the input-field dialog */
    clearInputs();
    closeInputForm();
    
    /**Render the contact in the contact list */
    renderContact(contact);
});

/**Close the modal when it is clicked */
modalBox.addEventListener('click', (e) => {
    modalBox.classList.toggle('show');

    if(inputDialog.classList.contains('show'))
        inputDialog.classList.toggle('show');
    
    if(contactInfoContainer.classList.contains('show'))
        contactInfoContainer.classList.toggle('show');
});

 const showInputForm = () => {
    /** show modal and input dialog to accept contact details */
    modalBox.classList.toggle('show');
    inputDialog.classList.toggle('show');
 };

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
        <li class="contacts-list__item">
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

    /**Insert into the DOM */
    contactList.insertAdjacentHTML('beforeend', markup);
};




