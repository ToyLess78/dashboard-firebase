// Create new element `Date`
let today = new Date();

// Getting today in format `MM/DD/YYYY`
let date = new Date();
let output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();
const options = {
    inputMask: output
}
const inputElement = document.getElementById('day-input');
const instances = new Inputmask(inputElement, options)
document.getElementById('date-input').value = output;
document.getElementById('date-output').textContent = output;


// https://www.google.com/maps?q=адрес