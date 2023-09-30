import {priceBaseRead, table} from "./invoice-tables-module.js";
import {simpleValidation} from "./validate-module.js";
import {exampleBase, invoiceBase, doubleBase, priceBase} from "./firebase-module.js";
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
    // await exampleBase.addItemToDatabase(invoice, baseId);


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
let objBase = await  exampleBase.readData();
let objData = Object.values(objBase)
console.log('Data length:', objData)
let shuffled = objData
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

console.log('shuffled', shuffled)

let invoice = await invoiceBase.readData()
let invArr = Object.values(invoice)
console.log('invArr', invArr);
const doubleArr = []
// shuffled.forEach(async (el, i) => {
//     let orig = invArr[i]
//     let ids = orig.id
//     el.id = ids
//     el.date = orig.date
//     el.status = orig.status
//     el.values[0] = `#${ids}`
//     el.values[5] = `#${ids}`
//     el.values[6] = orig.date
//     el.values[7] = orig.status
//
//     doubleArr.push(el)
//     await doubleBase.addItemToDatabase(el, ids);
//
// })
// console.log('doubleArr', doubleArr);
// let newArr = []
// id date status values[0], [5] = `#${id}` values[6] = date values[7] = status
// table.rows.forEach(el => {
//     let arr = []
//     arr.length = el.qty
//     arr.fill(el.productId)
//     newArr.push(...arr)
// })
//
// console.log('newArr', newArr);


// console.log(new Date('29/09/2023'))