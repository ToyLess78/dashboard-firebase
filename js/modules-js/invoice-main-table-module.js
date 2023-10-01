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
    {label: 'Items', field: 'items', sort: false, width: 150},
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
        elem = elem.concat(`<img src="${priceBaseRead[el].avatar}" alt="badge" style="left: ${count += 15}px;" class="rounded-4 shadow-3-strong position-absolute p-0 data-img" data-title="${priceBaseRead[el].title}">`);
    });
    elem = elem.concat(`</div>`);
    return elem;
}

function updateInvoicesTable(table, data) {
    table.update(
        {
            rows: data.map((invoice) => ({
                ...invoice,
                items: previewItemsCards(invoice),
                id: `#${invoice.id}`,
                actions: setTableActions(invoice?.id),
            })),
        },
        {loading: false},
    );
};

const asyncTable = new mdb.Datatable(document.getElementById('main-datatable'),
    {columns},
    {loading: true}
);
const mainDatatable = document.getElementById('main-datatable');
const titleText = document.getElementById('title-text');
mainDatatable.addEventListener("mouseout", () =>
    titleText.textContent = ''
);
mainDatatable.addEventListener("mousemove", (e) => {
    if (e.target.closest('.data-img')) {
        let img = e.target.closest('.data-img');
        let x = e.pageX;
        let y = e.pageY;

        titleText.textContent = img.dataset.title;
        titleText.style.top = `${y - 125}px`;
        titleText.style.left = `${x - 45}px`;
    }
})
// fill datatable
updateInvoicesTable(asyncTable, invoicesArray);