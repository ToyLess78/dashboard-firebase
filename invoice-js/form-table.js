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
        label: 'Description',
        field: 'description',
    },
    {

        label: 'Qty',
        field: 'qty',
        inputType: 'number',
        defaultValue: 1,

    },
    {
        sort: false,
        label: '',
        field: 'options',
    },
    {
        editable: false,
        sort: false,
        label: '',
        field: 'dollar',
        defaultValue: '$',

    },
    {
        inputType: 'number',
        defaultValue: 10,
        label: 'Unit Price',
        field: 'price',
    },
    {
        editable: false,
        sort: false,
        label: '',
        field: 'dollar2',
        defaultValue: '$',
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
        description: 'Pro Package',
        qty: 4,
        options: '',
        dollar: '$',
        price: 200,
        dollar2: '$',
        amount: '',
    },
    {
        ul: '',
        description: 'Web hosting',
        qty: 1,
        options: '',
        dollar: '$',
        price: 10,
        dollar2: '$',
        amount: '',
    },
    {
        ul: '',
        description: 'Consulting',
        qty: 1,
        options: 'year',
        dollar: '$',
        price: 300,
        dollar2: '$',
        amount: '',
    },
];

const table = new TableEditor(
    document.getElementById('table_disable_edit'),
    {
        columns: advancedColumns,
        rows: advancedRows,
    },
    {
        sm: true,
        // pagination: false,
    },
);
// Collapse table default pagination

window.onload =  () =>
    document.querySelector('.table-editor__pagination').classList.add('collapse');

let arr = [];

const tableEditor = document.getElementById('table_disable_edit');
tableEditor.addEventListener('update.mdb.tableEditor', () => {
    arr = table._rows;
    console.log(table._rows);

})
tableEditor.addEventListener('click', (e) => {
    console.log(e.target)
})




