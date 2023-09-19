
import {
    addFormListeners,
    addInputImageWork,
    addShowEdit,
    addShowPreview,
    openForm,
    setInputsMark
} from '../modules-js/form-module.js'
import {findToDeleteImage, getAllInputsValues,} from '../modules-js/customer-form-validate-module.js'
import {createVariable, getDate} from '../modules-js/main-module.js'
import {transformPreviewImage} from '../modules-js/preview-image-module.js'
import {customerBase, firstData} from '../modules-js/firebase-module.js'
import {
    addRowPreview,
    fillInputsOfValues,
    getRatingInstance,
    getSelectInstance,
    updateCustomerTable,
    columns
} from '../modules-js/customer-table-module.js'
import {mainPreventValidation} from '../modules-js/validate-module.js'
import {
    collapsePreview,
    containerForm,
    datatable,
    datatableContainer,
    datepicker,
    formClearBtn,
    formContainer,
    formOpenBtn,
    formTitle,
    genderSelect,
    hideRowBtn,
    inputsBody,
    inputsForm,
    searchDatatable,
    showRowBtn, workInputsArray
} from '../modules-js/variable-module.js';

export {customerData, id, cloneData, updateAll}

// make select instance
const genderSelectInstance = mdb.Select.getInstance(genderSelect);

// make image input logics
await addInputImageWork(inputsForm)
let id = 0;
// make inputs body values array
const inputsBodyArray = inputsBody.querySelectorAll('input');

// toggle button to open form
openForm('Add Customer:', id)


// toggle button to clear form inputs
addFormListeners()

// main prevent validation

await mainPreventValidation(inputsForm, formContainer, formClearBtn, getAllInputsValues);


// read firebase data
await customerBase.readItemData();

let cloneData = structuredClone(firstData);
let customerData = Object.values(cloneData);

const asyncTable = new mdb.Datatable(document.getElementById('datatable'),
    {columns},
    {loading: true}
);
// fill datatable
updateCustomerTable(asyncTable, customerData);

let arrId = []
let filterArrId = []
datatable.addEventListener('selectRows.mdb.datatable', (e) => {
    hideRowBtn.classList.add('show');
    showRowBtn.classList.remove('show');
    let iterator = e.selectedRows.values();
    for (let el of iterator) {
        arrId.push(el.id)
    }
    filterArrId = [...new Set(arrId)]
    arrId = []
})

hideRowBtn.addEventListener('click', () => {
    filterArrId.forEach((i) => {
        delete cloneData[i];
    });
    customerData = Object.values(cloneData);
    filterArrId = [];
    updateCustomerTable(asyncTable, customerData);
    showRowBtn.classList.add('show');
    hideRowBtn.classList.remove('show');

})

showRowBtn.addEventListener('click', () => {
    cloneData = structuredClone(firstData);
    customerData = Object.values(cloneData);
    updateCustomerTable(asyncTable, customerData);
    showRowBtn.classList.remove('show');
})

// datatable search init
searchDatatable.addEventListener('input', (e) => {
    asyncTable.search(e.target.value);
});

let itemOfId

datatable.addEventListener('click', (e) => {
    // const id = e.target.dataset.id
    const elementsIdArray = ['#image-preview', '#url-input-collapse', '#link-preview', '#custom-file', '#first-name', '#last-name', '#customer-email', '#customer-tel', '#first-address', '#second-address', '#gender-select', '#rating-edit']
    const mainVariableArray = new Array();
    createVariable(containerForm, elementsIdArray, mainVariableArray);

    const [preview, collapseInput, linkPreview, inputFile, firstName, lastName, email, phone, firstAddress, secondAddress, select, ratingEdit] = mainVariableArray;
    if (e.target.closest('[data-preview]')) {
        id = e.target.closest('.id-target').id
        itemOfId = cloneData[id];
        addShowPreview();
        addRowPreview(itemOfId, collapsePreview);

    } else if (e.target.closest('[data-edit]')) {
        id = e.target.closest('.id-target').id
        itemOfId = cloneData[id];
        formTitle.textContent = 'Edit Customer:'
        transformPreviewImage(preview, linkPreview, collapseInput, inputFile, itemOfId, './img/camera.svg');
        const inputs = containerForm.querySelectorAll('input');
        inputs.forEach((input) => input.classList.add('active'));
        addShowEdit();
        fillInputsOfValues(itemOfId, firstName, lastName, email, phone, firstAddress, secondAddress);
        getSelectInstance(itemOfId, select);
        getRatingInstance(itemOfId, ratingEdit);
        formOpenBtn.classList.remove('show');

    } else if (e.target.closest('[data-delete]')) {
        setTimeout(() => {
            document.querySelector('#confirm-delete').click();
            datatable.querySelector('.collapse.show').classList.remove('show');
        }, 0)

        id = e.target.closest('.id-target').id

        datatableContainer.addEventListener('confirm.mdb.popconfirm', async () => {
            await customerBase.removeItem(id);
            await findToDeleteImage(id);
            await updateAll();
        });
    }
})

const options = {
    inputMask: getDate(new Date())
}
const instances = new Inputmask(datepicker, options)

async function updateAll() {
    await customerBase.readItemData();
    cloneData = structuredClone(firstData);
    customerData = Object.values(cloneData);
    updateCustomerTable(asyncTable, customerData);
    id = 0;
}
workInputsArray.querySelector('.select-input').id = 'gender';
setInputsMark(workInputsArray);


