/**
 * Tasks
 * 
 * 1. Add new contact
 * 2. View contacts list
 * 3. View each contact details
 * 4. Edit each contact details
 * 5. Remove single and all contacts
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


 /***********************************************
  * 1. Add new contact & 2. View contacts list  *
  * *********************************************/


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
    closeAll();
    clearInputs();
});

 const showInputForm = () => {
    /** show modal and input dialog to accept contact details */
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
    contact.id = generateID();

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

/** Handle the close buttons */
closeIcon.addEventListener('click', (e) => {
    closeAll();
});

closeBtn.addEventListener('click', (e) => {
    closeAll();
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