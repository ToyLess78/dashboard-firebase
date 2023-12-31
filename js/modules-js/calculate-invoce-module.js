/*- FUNCTIONS TO CALCULATE, WRITE AND DYNAMIC CHANGE SUB TOTAL, TAX, DISCOUNT AND TOTAL AMOUNT-*/

// Getting a table edit
const upgradeTable = document.querySelector('#table-edit .table');
// Create regular to format sum
const formatSum = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

export function calcTotal() {
    const noFoundTd = upgradeTable.querySelector('td');
    const rows = upgradeTable.querySelectorAll('tbody tr');
    let subTotal = 0;
    let discountSum = 0;
    let taxSum = 0;
    if (noFoundTd.textContent !== 'No matching results found') {
        rows.forEach((row) => {
            let price = parseFloat(row.cells[5].textContent);
            let qty = parseInt(row.cells[2].textContent);
            let preTotal = price * qty;
            row.cells[7].textContent = preTotal;
            subTotal += preTotal;
        });

        let taxPercent = parseFloat(document.getElementById('tax').value);
        taxSum = calculateTax(subTotal, taxPercent);
        updateOutput('tax-output', taxSum, `Tax(${taxPercent}%)`);

        let discountPercent = parseFloat(document.getElementById('discount').value);
        discountSum = calculateTax(subTotal, discountPercent);
        updateOutput('discount-output', discountSum, `Discount(${discountPercent}%)`);

        document.getElementById("sub-total").innerHTML = `<span class="me-4">SubTotal</span>$&nbsp${formatSum(subTotal)}`;
        mergeColumns();

        const total = subTotal + parseFloat(taxSum) - parseFloat(discountSum);
        document.getElementById('total-amount').innerHTML = `<span class=" me-3"> Total Amount</span><span style="font-size: 25px;">$ ${formatSum(total)}</span>`;
    } else {

        document.querySelector('#print-table tbody tr').innerHTML = `<tr></tr>`;
        document.getElementById("sub-total").innerHTML = `<span class="me-4"></span>`;
        subTotal = 0;
        document.getElementById('total-amount').innerHTML = `<span class=" me-3"> Total Amount</span><span style="font-size: 25px;">$ 0</span>`;
        document.getElementById('tax').value = 0;
        updateOutput('tax-output', 0, '');
        document.getElementById('discount').value = 0;
        updateOutput('discount-output', 0, '');

    }

}

function mergeColumns() {
    const tbodyParent = document.querySelector('#table-edit .table tbody');
    const tbodyMod = document.getElementById('tbodyMod');
    tbodyMod.innerHTML = tbodyParent.innerHTML;

    const previewTable = document.querySelector('#print-table tbody');

    for (let i = 0; i < previewTable.rows.length; i++) {
        const row = previewTable.rows[i];

        mergeAndRemoveCells(row, 2, 3); // Merge 3rd and 4th columns
        mergeAndRemoveCells(row, 3, 4); // Merge 5th and 6th columns
        mergeAndRemoveCells(row, 4, 5); // Merge 7th and 8th columns

        removeCell(row, 5); // Remove 9th column
    }
}

function mergeAndRemoveCells(row, index1, index2) {
    const cell1 = row.cells[index1];
    const cell2 = row.cells[index2];
    cell1.innerHTML += `&nbsp;` + cell2.innerHTML;
    cell2.remove();
}

function removeCell(row, index) {
    row.cells[index].remove();
}

/*- FUNCTION TO CALCULATE, WRITE AND DYNAMIC CHANGE SUB TOTAL, TAX, DISCOUNT AND TOTAL AMOUNT-*/

function calculateTax(subTotal, taxPercent) {
    return (subTotal * taxPercent / 100).toFixed();
}

function updateOutput(elementId, value, text) {
    const element = document.getElementById(elementId);
    element.innerHTML = value > 0 ? `<li class="grey-text ms-3 mt-2 text-end" id="${elementId}">${text} $ ${value}</li>` : `<li class="grey-text ms-3 mt-2 text-end" id="${elementId}"></li>`;
}