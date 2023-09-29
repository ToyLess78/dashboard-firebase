import {setTableActions} from "./main-module.js";
import {invoiceBase, priceBase} from "./firebase-module.js";

const priceBaseRead = await priceBase.readData();
const priceData = Object.values(priceBaseRead);
console.log('priceBaseRead', priceBaseRead);

const invoicesData = await invoiceBase.readData();
const invoicesArray = Object.values(invoicesData);

console.log('newArr', invoicesArray);

const columns = [
    {label: 'Invoice Id', field: 'id'},
    // {label: 'Items', field: 'items'},
    {label: 'Name', field: 'name'},
    {label: 'Email', field: 'email'},
    {label: 'Date', field: 'date'},
    {label: 'Status', field: 'status'},
    {label: 'Actions', field: 'actions', sort: false}
];

function previewItemsCards(data) {
let elem = `<div class="row position-relative" style="height: 45px;">`;
let count = -15;
let arr = data.productIds;
    arr.forEach((el) => {
        let link = priceBaseRead[el].avatar
        console.log(link)

        elem = elem.concat(`<img src="${priceBaseRead[el].avatar}" alt="badge" style="left: ${count += 15}px;" class="rounded-4 shadow-3-strong position-absolute p-0 data-img">`);
});
elem = elem.concat(`</div>`);
    return elem;
}
function updateInvoicesTable(table, data) {
    table.update(
        {
            rows: data.map((invoice) => ({
                ...invoice,
                // items: previewItemsCards(invoice),
                id: `#${invoice.id}`,
                actions: setTableActions(invoice?.id),
            })),
        },
        {loading: false},
    );
};

const asyncTable = new mdb.Datatable(document.getElementById('datatable'),
    {columns},
    {loading: true}
);
// fill datatable
updateInvoicesTable(asyncTable, invoicesArray);