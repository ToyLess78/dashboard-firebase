import {previewImageModule, handleUploadClick, unUploadClick, regexp} from '../js/modules-js/preview-image-module.js'
import {calcTotal} from '../js/modules-js/calculate-invoce-module.js'

/*- CREATE PREVIEW UPLOAD IMAGE IN HTML -*/

const preview = document.getElementById('image-preview'),
    link = document.getElementById('url'),
    collapseInput = document.getElementById('url-input-collapse'),
    linkPreview = document.getElementById('link-preview'),
    inputFile = document.getElementById('customFile'),
    upload = document.getElementById('upload'),
    danger = document.getElementById('danger');



/*- CREATE PREVIEW UPLOAD IMAGE IN HTML -*/

inputFile.addEventListener('change', async () => {
   await previewImageModule(inputFile, preview, linkPreview, collapseInput);
});

// const regexp = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

upload.addEventListener('click', () => {
    handleUploadClick(link, regexp, preview, linkPreview, inputFile, collapseInput, danger);
});

linkPreview.addEventListener('click', () => {
    unUploadClick(preview, linkPreview, collapseInput, inputFile);
});

/*- GET INPUT AND OUTPUT INVOICE ID VALUE -*/

const inputId = document.querySelector('#invoiceId'),
    outputId1 = document.querySelector('#id-output1'),
    outputId2 = document.querySelector('#id-output2');

inputId.addEventListener("input", () => {

    outputId1.textContent = inputId.value;
    outputId2.textContent = inputId.value;
});

/*- GET INPUT AND OUTPUT DATE VALUE -*/

const dateInput = document.querySelector('#date-input'),
    dateOutput = document.querySelector('#date-output'),
    datepicker = document.querySelector('#datepicker');

datepicker.addEventListener('dateChange.mdb.datepicker', () => {

    dateOutput.textContent = dateInput.value;
});

/*- GET INPUT AND OUTPUT NAME VALUE -*/

const nameInput = document.getElementById('name-input'),
    nameOutput = document.getElementById('name-output');

nameInput.addEventListener('input', () =>
    nameOutput.textContent = nameInput.value);

/*- GET INPUT AND OUTPUT PHONE VALUE -*/

const phoneInput = document.getElementById('phone-input'),
    phoneLink = document.getElementById('phone-link'),
    phoneOutput = document.getElementById('phone-output');

phoneInput.addEventListener('input', () => {

    phoneOutput.textContent = phoneInput.value
    phoneLink.href = `tel:${phoneInput.value}`
});

/*- GET INPUT AND OUTPUT EMAIL VALUE -*/

const emailInput = document.getElementById('email-input'),
    emailOutput = document.getElementById('email-output'),
    emailLink = document.getElementById('email-link');

emailInput.addEventListener('input', () => {

    emailOutput.textContent = emailInput.value
    emailLink.href = `mailto:${emailInput.value}`
});

/*- GET INPUT AND OUTPUT ADDRESS VALUE -*/

const addressInput = document.getElementById('address-input'),
    addressOutput = document.getElementById('address-output'),
    addressLink = document.getElementById('address-link');

addressInput.addEventListener('input', () => {

    addressOutput.textContent = addressInput.value
    addressLink.href = `https://www.google.com/maps?q=${addressInput.value}`
});

// Set minimum to table inputs numbers values

const editTable = document.getElementById('table_disable_edit');

editTable.addEventListener('render.mdb.tableEditor', () => {

    const inputs = document.querySelectorAll('td input[type="number"]')

    inputs.forEach(input => {

        input.min = '1';
    });
});

/*- ATTACHES AN EVENT HANDLER TO AN ELEMENT-*/

editTable.addEventListener('exit.mdb.tableEditor', calcTotal);

editTable.addEventListener('update.mdb.tableEditor', calcTotal);

editTable.querySelector('thead').addEventListener('click', calcTotal);

const change = document.querySelectorAll('[data-change="change"]');

for (let i = 0; i < change.length; i++) {
    change[i].addEventListener('change', calcTotal);
}

// ???????

// console.log(!regexp.test(preview.src))
// Name
// Roles (Owner, Admin, Guest, Customer)
// Email
// Phone number
// Gender
//----full:
// UI/UX Designer
// Contact Info:
// 2239  Hog Camp Road - full address
// Performance
//---invoice
// Invoice Id
// Date
// Invoice table
// Tax
// Discount
// Total amount
// Status