
// Read database of prices
import {priceBase} from "./firebase-module.js";
import {calcTotal} from "./calc-invoice-module.js";
import {formatCurrency} from "./validate-module.js";
export {titleArr, priceAutocomplete, table, dataTableUpdate}
const formatCurrencyShort = (input) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0, minimumFractionDigits: 0}).format(input);

}
const priceBaseRead = await priceBase.readData();
const priceData = Object.values(priceBaseRead);
const titleArr = priceData.map(item => item.title)
const titleOptions = priceData.map(item => {
    return {
        id: item.id,
        price: item.price,
        quantity: item.quantity.replace('per ', ''),
    }
})
const priceAutocomplete = {};
titleOptions.forEach((item, index) => {
    priceAutocomplete[`${titleArr[index]}`] = item

})
console.log(priceAutocomplete);
// Create edit table
const advancedColumns = [
    {
        label: '#',
        width: 10,
        field: 'ul',
        editable: false,
        sort: false,
    },
    {
        label: 'Title',
        field: 'title',
        inputType: 'select',
        options: titleArr,
        defaultValue: 'Pro Package 4',
        sort: false,
    },
    {
        label: 'Qty',
        field: 'qty',
        inputType: 'number',
        defaultValue: 1,
        sort: false,
    },
    {
        sort: false,
        label: '',
        field: 'quantity',
        defaultValue: 'year'

    },
    {
        defaultValue: '$200',
        label: 'Unit Price',
        field: 'price',
        width: 20,
        sort: false,

    },
    {
        sort: false,
        editable: false,
        label: 'Amount',
        field: 'amount',
    },
];

const advancedRows = [
    {
        ul: '',
        title: titleArr[0],
        qty: 1,
        quantity: priceAutocomplete[titleArr[0]].quantity,
        price: priceAutocomplete[titleArr[0]].price,
        amount: priceAutocomplete[titleArr[0]].price,
    },
    {
        ul: '',
        title: titleArr[1],
        qty: 1,
        quantity: priceAutocomplete[titleArr[1]].quantity,
        price: priceAutocomplete[titleArr[1]].price,
        amount: priceAutocomplete[titleArr[1]].price,
    },
    {
        ul: '',
        title: titleArr[2],
        qty: 1,
        quantity: priceAutocomplete[titleArr[2]].quantity,
        price: priceAutocomplete[titleArr[2]].price,
        amount: priceAutocomplete[titleArr[2]].price,
    },
];

const table = new TableEditor(
    document.getElementById('table-edit'),
    {
        columns: advancedColumns,
        rows: advancedRows,
    },
    {
        sm: true,
        // pagination: false,
    },
);

const copyColumns = [

    {
        label: 'Title',
        field: 'title',
        sort: false,
    },
    {
        label: 'Qty',
        field: 'qty',
        sort: false,
    },
    {
        label: 'Unit Price',
        field: 'price',
        sort: false,
    },
    {
        sort: false,
        editable: false,
        label: 'Amount',
        field: 'amount',
    },
];
const copyTable = new mdb.Datatable(
    document.getElementById('copy-table'),
    { columns: copyColumns, },
    { loading: true,
        borderless: true,
        pagination: false,
    }
);
function dataTableUpdate(table, data) {
    table.update(
        {
            rows: data.map((item) => ({
                ... item,
                qty: `${item.qty} ${item.quantity}`,
                amount: calcAmount(item.price, item.qty)
            })),
        },
        { loading: false }
    );
    table._element.querySelector('table').classList.add('table-striped');
}
dataTableUpdate(copyTable, advancedRows);

console.log('copyTable', copyTable._element.querySelector('tbody'));

let arr = [];

const tableEditor = document.getElementById('table-edit');
tableEditor.addEventListener('update.mdb.tableEditor', () => {
    arr = table._rows;
    console.log(table._rows);
    dataTableUpdate(copyTable, table._rows);


})

// Make prices autocomplete

tableEditor.addEventListener('render.mdb.tableEditor', () => {

    const currencyInput = document.querySelector('[data-mdb-field="price"] input');
    const titleSelect = document.querySelector('.table-editor__input-select');
    if(currencyInput) {
        currencyInput.addEventListener('input', (e) => {
            currencyInput.value = formatCurrency(currencyInput.value)
        })
    }
    if(titleSelect) {
        titleSelect.setAttribute('data-mdb-filter', 'true');
        titleSelect.addEventListener('optionSelect.mdb.select', (e) => {
            let price = priceAutocomplete[e.target.value].price;
            let qty = document.querySelector('[data-mdb-field="qty"] input').value;
            console.log(e.target.value);
            document.querySelector('[data-mdb-field="quantity"] input').value = priceAutocomplete[e.target.value].quantity
            document.querySelector('[data-mdb-field="quantity"] input').dispatchEvent(new Event('input'));
            document.querySelector('[data-mdb-field="price"] input').value = price;
            document.querySelector('[data-mdb-field="amount"] input').value = calcAmount(price, qty);
            document.querySelector('[data-mdb-field="price"] input').dispatchEvent(new Event('input'));
        })
    }

    const inputs = document.querySelectorAll('td input[type="number"]')

    inputs.forEach(input => {
        input.min = '1';
    });
});

function calcAmount(price, qty) {
    let p = parseFloat(price.replace(/[^0-9\.]+/g,""));
    let q = parseInt(qty);
    let preTotal = formatCurrencyShort(p * q);
    return preTotal;
}

/*- ATTACHES AN EVENT HANDLER TO AN ELEMENT-*/

tableEditor.addEventListener('exit.mdb.tableEditor', () => calcTotal(tableEditor, table._rows));

tableEditor.addEventListener('update.mdb.tableEditor', () => calcTotal(tableEditor, table._rows));

// tableEditor.querySelector('thead').addEventListener('click',  () => {
//         dataTableUpdate(copyTable, table._rows);
//         console.log(table);
//     }
// );
const change = document.querySelectorAll('[data-change="change"]');

for (let i = 0; i < change.length; i++) {
    change[i].addEventListener('change', () => calcTotal(tableEditor, table._rows));
}