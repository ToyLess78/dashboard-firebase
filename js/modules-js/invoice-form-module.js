import {priceBaseRead, table} from "./invoice-tables-module.js";
import {simpleValidation} from "./validate-module.js";
import {exampleBase, invoiceBase} from "./firebase-module.js";
import {dateFormat} from "./main-module.js";
simpleValidation()
const saveButton = document.querySelector('#form-save-btn'),
    canselButton = document.querySelector('#form-cansel-btn'),
    printContainer = document.querySelector('#print-container');

const arrPriceValues = []
saveButton.addEventListener('click', async () => {
    const data = printContainer.querySelectorAll('[data-price-object]')
    arrPriceValues.length = 0;
    data.forEach(el => arrPriceValues.push(el.textContent));
    const customerId = printContainer.querySelector('[data-customer-id]');
    let productIds = []
    table.computedRows.forEach(el => {
        let arr = []
        arr.length = el.qty
        arr.fill(el.productId)
        productIds.push(...arr)
    })
    const id = +arrPriceValues[0].slice(1);
    const invoice = new Invoice(customerId.dataset.customerId, arrPriceValues[1], arrPriceValues[2], arrPriceValues[3], arrPriceValues[4], arrPriceValues[6], arrPriceValues[7], arrPriceValues.slice(-1)[0], table.computedRows, arrPriceValues, productIds, id);
console.log(invoice)
    // await invoiceBase.addItemToDatabase(invoice, id);


})
class Invoice {
    constructor(customerId, name, address, phone, email, date, status, total, priceTable, values, productIds, id) {
        this.customerId = customerId;
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.date = date;
        this.status = status;
        this.total = total;
        this.priceTable = priceTable;
        this.values = values;
        this.productIds = productIds;
        this.id = id;
    }
}

// let newArr = []
// table.rows.forEach(el => {
//     let arr = []
//     arr.length = el.qty
//     arr.fill(el.productId)
//     newArr.push(...arr)
// })
//
// console.log('newArr', newArr);


// console.log(new Date('29/09/2023'))