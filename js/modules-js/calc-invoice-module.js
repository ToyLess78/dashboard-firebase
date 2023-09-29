import {table} from "./invoice-tables-module.js";

export {formatCurrencyShort, calcTotal, calcAmount}


/*- FUNCTIONS TO CALCULATE, WRITE AND DYNAMIC CHANGE SUB TOTAL, TAX, DISCOUNT AND TOTAL AMOUNT-*/

const formatCurrencyShort = (input) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0, minimumFractionDigits: 0}).format(input);
}

function calcTotal(upgradeTable, data) {
    const noFoundTd = upgradeTable.querySelector('td');
    let subTotal = 0;
    let discountSum = 0;
    let taxSum = 0;
    if (noFoundTd.textContent !== ' ') {
        data.forEach((row) => {
            let price = parseFloat(row.price.replace(/[^0-9\.]+/g,""));
            let qty = parseInt(row.qty);
            let preTotal = price * qty;
            subTotal += preTotal;
        });

        let taxPercent = parseFloat(document.getElementById('tax').value);
        taxSum = calculateTax(subTotal, taxPercent);
        updateOutput('tax-output', taxSum, `Tax(${taxPercent}%)`);

        let discountPercent = parseFloat(document.getElementById('discount').value);
        discountSum = calculateTax(subTotal, discountPercent);
        updateOutput('discount-output', discountSum, `Discount(${discountPercent}%)`);

        document.getElementById("sub-total").innerHTML = `<span class="me-4">SubTotal</span><span data-price-object>${formatCurrencyShort(subTotal)}</span>`;

        const total = subTotal + parseFloat(taxSum) - parseFloat(discountSum);
        document.getElementById('total-amount').innerHTML = `<span class=" me-3"> Total Amount</span><span style="font-size: 25px;" data-price-object>${formatCurrencyShort(total)}</span>`;
    } else {

        document.getElementById("sub-total").innerHTML = `<span class="me-4" data-price-object></span>`;
        subTotal = 0;
        document.getElementById('total-amount').innerHTML = `<span class=" me-3"> Total Amount</span><span style="font-size: 25px;" data-price-object>$ 0</span>`;
        document.getElementById('tax').value = 0;
        updateOutput('tax-output', 0, '');
        document.getElementById('discount').value = 0;
        updateOutput('discount-output', 0, '');
    }
}

function calculateTax(subTotal, taxPercent) {
    return (subTotal * taxPercent / 100).toFixed();
}

function updateOutput(elementId, value, text) {
    const element = document.getElementById(elementId);
    element.innerHTML = value > 0 ? `<span class="me-4" data-price-object>${text}</span><span data-price-object>${formatCurrencyShort(value)}</span>` : `<span class="me-4" data-price-object><span data-price-object></span></span>`;
}

function calcAmount(price, qty) {
    let p = parseFloat(price.replace(/[^0-9\.]+/g,""));
    let q = parseInt(qty);
    return formatCurrencyShort(p * q);
}


