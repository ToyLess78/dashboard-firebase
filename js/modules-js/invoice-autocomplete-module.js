import {customerBase, firstData} from "./firebase-module.js";

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

    // customerAutocomplete.data[index] = item

    customerAutocomplete[`${data[index]}`] = item

})
console.log(customerAutocomplete);

const displayValueAutocomplete = document.querySelector('#displayValue');

const dataFilter = (value) => {
    return data.filter((item) => {
        return item.toLowerCase().startsWith(value.toLowerCase());
    });
};

const autocomplete = new mdb.Autocomplete(displayValueAutocomplete, {
    filter: dataFilter,
});
console.log(autocomplete);
displayValueAutocomplete.addEventListener('close.mdb.autocomplete', (e) => {
    let key = document.querySelector('#name-input').value;
    document.querySelector('#name-output').textContent = key;
    document.querySelector('#image-preview').src = customerAutocomplete[key].avatar;
    document.querySelector('#phone-input').value = customerAutocomplete[key].phone;
    document.querySelector('#phone-output').textContent = customerAutocomplete[key].phone;
    document.querySelector('#email-input').value = customerAutocomplete[key].email;
    document.querySelector('#email-output').textContent = customerAutocomplete[key].email;
    document.querySelector('#address-input').value = customerAutocomplete[key].address;
    document.querySelector('#address-output').textContent = customerAutocomplete[key].address;
})

