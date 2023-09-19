import {
    addFormListeners,
    addInputImageWork,
    addShowEdit,
    addShowPreview,
    openForm,
    setInputsMark
} from '../modules-js/form-module.js'
import {createVariable, getDate} from '../modules-js/main-module.js'
import {transformPreviewImage} from '../modules-js/preview-image-module.js'
import {customerBase, teamBase} from '../modules-js/firebase-module.js'
import {addRowPreview, columns, fillInputsOfMembers, updateTeamTable,} from '../modules-js/team-table-module.js'
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
    inputsBody,
    inputsForm,
    searchDatatable,
    itemCloseBtn, workInputsArray
} from "../modules-js/variable-module.js";
import {mainPreventValidation} from "../modules-js/validate-module.js";
import {findToDeleteImage, getAllInputsValues} from "../modules-js/team-form-validate-module.js";

export {teamTable, id, cloneData, updateAll}

// make select instance
const genderSelectInstance = mdb.Select.getInstance(genderSelect);

// make image input logics
await addInputImageWork(inputsForm)

let id = 0;
// make inputs body values array
const inputsBodyArray = inputsBody.querySelectorAll('input');

// toggle button to open form
openForm('Add Member:', id)


addFormListeners()
// main prevent validation

await mainPreventValidation(inputsForm, formContainer, formClearBtn, getAllInputsValues);

/*- CREATE CUSTOMER DATATABLE -*/

const teamTable = new mdb.Datatable(document.getElementById('datatable'),
    {columns,},
    {loading: true, hover: true}
);

// read firebase data
let newData = await teamBase.readData()
let cloneData = structuredClone(newData);
let teamData = Object.values(cloneData);

// fill datatable
updateTeamTable(teamTable, teamData);
document.querySelector('table.datatable-table').classList.add('table-hover')


// datatable search init
searchDatatable.addEventListener('input', (e) => {
    teamTable.search(e.target.value);
});

let itemOfId

datatable.addEventListener('click', (e) => {
    // const id = e.target.dataset.id
    const elementsIdArray = ['#image-preview', '#url-input-collapse', '#link-preview', '#custom-file', '#first-name', '#last-name', '#member-email', '#member-tel', '#birth-year', '#location', '#department-select', '#position', '#salary', '#level-select', '#start-date', '#status-select', '#rating-edit']
    const mainVariableArray = new Array();
    createVariable(containerForm, elementsIdArray, mainVariableArray);

    const [preview, collapseInput, linkPreview, inputFile, firstName, lastName, email, phone, birth, location, department, position, salary, level, start, status, ratingEdit] = mainVariableArray;
    if (e.target.closest('[data-preview]')) {
        id = e.target.closest('.id-target').id
        itemOfId = cloneData[id];
        addShowPreview();
        addRowPreview(itemOfId, collapsePreview);
        formOpenBtn.classList.remove('show');

    } else if (e.target.closest('[data-edit]')) {
        id = e.target.closest('.id-target').id
        itemOfId = cloneData[id];

        formTitle.textContent = 'Edit Member:'
        transformPreviewImage(preview, linkPreview, collapseInput, inputFile, itemOfId, './img/camera.svg');
        const inputs = containerForm.querySelectorAll('input');
        inputs.forEach((input) => input.classList.add('active'));
        addShowEdit();
        fillInputsOfMembers(itemOfId, firstName, lastName, email, phone, birth, location, department, position, salary, level, start, status, ratingEdit);
        formOpenBtn.classList.remove('show');


    } else if (e.target.closest('[data-delete]')) {
        setTimeout(() => {
            document.querySelector('#confirm-delete').click();
            datatable.querySelector('.collapse.show').classList.remove('show');
        }, 0)
        id = e.target.closest('.id-target').id
        datatableContainer.addEventListener('confirm.mdb.popconfirm', async () => {
            await teamBase.removeItem(id);
            await findToDeleteImage(id);
            await updateAll();
        });
    }
})

const options = {
    inputMask: getDate(new Date())
}
const instances = new Inputmask(datepicker, options);

async function updateAll() {
    newData = await teamBase.readData()
    cloneData = structuredClone(newData);
    teamData = Object.values(cloneData);
// fill datatable
    updateTeamTable(teamTable, teamData);
    id = 0;
}

workInputsArray.querySelectorAll('.select-input').forEach((el, i) => el.id = `select-${i+1}`);
setInputsMark(workInputsArray);


