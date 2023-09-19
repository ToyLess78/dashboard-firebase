import {customerBase, firstData} from "./firebase-module.js";
import {calcTotal} from "./calc-invoice-module.js";

/*- CREATE MAINE VARIABLE -*/

const imageItem = document.querySelector('#image-item'),
    avatarPreview = document.querySelector('#avatar-preview'),
    clearButton = document.querySelector('#clear-button');



/*- CREATE PREVIEW UPLOAD IMAGE IN HTML -*/


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

await customerBase.readItemData();

let cloneData = structuredClone(firstData);
let customerData = Object.values(cloneData);
const data = customerData.map(item => `${item.fullName.firstName} ${item.fullName.lastName}`)
const dataList = customerData.map(item => {
    return {
        phone: item.phone,
        address: `${item.fullAddress.address1}, ${item.fullAddress.address2}`,
        email: item.email,
        avatar: item.avatar,
        id: item.id
    }
})
const customerAutocomplete = {};
dataList.forEach((item, index) => {
    customerAutocomplete[`${data[index]}`] = item

})

const displayValueAutocomplete = document.querySelector('#displayValue');

const dataFilter = (value) => {
    return data.filter((item) => {
        return item.toLowerCase().startsWith(value.toLowerCase());
    });
};

const autocomplete = new mdb.Autocomplete(displayValueAutocomplete, {
    filter: dataFilter,
});

displayValueAutocomplete.addEventListener('close.mdb.autocomplete', (e) => {
    let key = nameInput.value;
    if (key) {
        document.querySelector('#name-output').textContent = key;
        imageItem.src = customerAutocomplete[key].avatar;
        phoneInput.value = customerAutocomplete[key].phone;
        phoneOutput.textContent = customerAutocomplete[key].phone;
        emailInput.value = customerAutocomplete[key].email;
        emailOutput.textContent = customerAutocomplete[key].email;
        addressInput.value = customerAutocomplete[key].address;
        addressOutput.textContent = customerAutocomplete[key].address;
        clearButton.classList.add('show');
        avatarPreview.classList.add('show');
    }


})

clearButton.addEventListener('click', () => {
    nameInput.value = '';
    clearButton.classList.remove('show');
    autocomplete.open();
    avatarPreview.classList.remove('show');
})





