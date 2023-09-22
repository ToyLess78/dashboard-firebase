export {formatCurrencyShort, calcTotal}
// Create format currency short
const formatCurrencyShort = (input) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0, minimumFractionDigits: 0}).format(input);

}
// Getting a table edit

function calcTotal(upgradeTable, data) {
    const noFoundTd = upgradeTable.querySelector('td');
    let subTotal = 0;
    let discountSum = 0;
    let taxSum = 0;
    if (noFoundTd.textContent !== 'No matching results found') {
        data.forEach((row) => {
            let price = parseFloat(row.price.replace(/[^0-9\.]+/g,""));
            let qty = parseInt(row.qty);
            let preTotal = price * qty;
            // row.cells[5].textContent = formatCurrencyShort(preTotal);
            subTotal += preTotal;
        });

        let taxPercent = parseFloat(document.getElementById('tax').value);
        taxSum = calculateTax(subTotal, taxPercent);
        updateOutput('tax-output', taxSum, `Tax(${taxPercent}%)`);

        let discountPercent = parseFloat(document.getElementById('discount').value);
        discountSum = calculateTax(subTotal, discountPercent);
        updateOutput('discount-output', discountSum, `Discount(${discountPercent}%)`);

        document.getElementById("sub-total").innerHTML = `<span class="me-4">SubTotal</span>${formatCurrencyShort(subTotal)}`;
        // mergeColumns();

        const total = subTotal + parseFloat(taxSum) - parseFloat(discountSum);
        document.getElementById('total-amount').innerHTML = `<span class=" me-3"> Total Amount</span><span style="font-size: 25px;">${formatCurrencyShort(total)}</span>`;
    } else {

        // document.querySelector('#print-table tbody tr').innerHTML = `<tr></tr>`;
        document.getElementById("sub-total").innerHTML = `<span class="me-4"></span>`;
        subTotal = 0;
        document.getElementById('total-amount').innerHTML = `<span class=" me-3"> Total Amount</span><span style="font-size: 25px;">$ 0</span>`;
        document.getElementById('tax').value = 0;
        updateOutput('tax-output', 0, '');
        document.getElementById('discount').value = 0;
        updateOutput('discount-output', 0, '');
    }

}

// function mergeColumns() {
//     const tbodyParent = document.querySelector('#table-edit .table tbody');
//     const tbodyMod = document.getElementById('tbodyMod');
//     tbodyMod.innerHTML = tbodyParent.innerHTML;
//
//     const previewTable = document.querySelector('#print-table tbody');
//
//     for (let i = 0; i < previewTable.rows.length; i++) {
//         const row = previewTable.rows[i];
//
//         mergeAndRemoveCells(row, 2, 3); // Merge 3rd and 4th columns
//         // mergeAndRemoveCells(row, 3, 4); // Merge 5th and 6th columns
//         // mergeAndRemoveCells(row, 4, 5); // Merge 7th and 8th columns
//
//         removeCell(row, 5); // Remove 9th column
//     }
// }
//
// function mergeAndRemoveCells(row, index1, index2) {
//     const cell1 = row.cells[index1];
//     const cell2 = row.cells[index2];
//     cell1.innerHTML += `&nbsp;` + cell2.innerHTML;
//     cell2.remove();
// }
//
// function removeCell(row, index) {
//     row.cells[index].remove();
// }

/*- FUNCTION TO CALCULATE, WRITE AND DYNAMIC CHANGE SUB TOTAL, TAX, DISCOUNT AND TOTAL AMOUNT-*/

function calculateTax(subTotal, taxPercent) {
    return (subTotal * taxPercent / 100).toFixed();
}

function updateOutput(elementId, value, text) {
    const element = document.getElementById(elementId);
    element.innerHTML = value > 0 ? `<li class="grey-text ms-3 mt-2 text-end" id="${elementId}">${text} ${formatCurrencyShort(value)}</li>` : `<li class="grey-text ms-3 mt-2 text-end" id="${elementId}"></li>`;
}


