import {table} from "./invoice-tables-module.js";
import {simpleValidation} from "./validate-module.js";
simpleValidation()
const saveButton = document.querySelector('#form-save-btn'),
    canselButton = document.querySelector('#form-cansel-btn'),
    printContainer = document.querySelector('#print-container');

const arrPriceValues = []
saveButton.addEventListener('click', () => {
    const data = printContainer.querySelectorAll('[data-price-object]')
    arrPriceValues.length = 0;
    data.forEach(el => arrPriceValues.push(el.textContent));
    console.log(arrPriceValues, arrPriceValues[0], arrPriceValues[8]);
    const customerId = printContainer.querySelector('[data-customer-id]')
    const invoice = new Invoice(customerId.dataset.customerId, arrPriceValues[1], arrPriceValues[2], arrPriceValues[8], table.rows, arrPriceValues);
    console.log('invoice', invoice)
})
class Invoice {
    constructor(customerId, date, status, total, priceTable, values) {
        this.customerId = customerId;
        this.date = date;
        this.status = status;
        this.total = total;
        this.priceTable = priceTable;
        this.values = values;
    }
}

