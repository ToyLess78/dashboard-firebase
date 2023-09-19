import {createVariable} from "./main-module.js";
export {
    containerForm,
    inputsForm,
    genderSelect,
    inputsBody,
    formOpenBtn,
    formClearBtn,
    formCloseBtn,
    datatable,
    searchDatatable,
    hideRowBtn,
    showRowBtn,
    itemCloseBtn,
    collapsePreview,
    collapseForm,
    datatableContainer,
    rating,
    editButtons,
    addSubmitBtn,
    formTitle,
    datepicker,
    mainVariableArray,
    elementsIdArray,
    formContainer,
    workInputsArray
}
/*- CREATE MAIN VARIABLES -*/
const idArray = ['#form-container', '#input-form', '#gender-select', '#inputs-body', '#form-open-btn', '#form-clear-btn', '#form-close-btn', '#datatable', '#search_datatable', '#hide-row-btn', '#show-row-btn', '#item-close-btn', '#collapse-preview', '#collapse-form', '#datatable-container', '#rating', '#edit-buttons', '#add-submit-btn', '#form-title', '#datepicker', '#work-inputs-array']

const variableArr = new Array();
createVariable(document, idArray, variableArr)

const [containerForm, inputsForm, genderSelect, inputsBody, formOpenBtn, formClearBtn, formCloseBtn, datatable, searchDatatable, hideRowBtn, showRowBtn, itemCloseBtn, collapsePreview, collapseForm, datatableContainer, rating, editButtons, addSubmitBtn, formTitle, datepicker, workInputsArray] = variableArr;
const mainVariableArray = new Array();
const elementsIdArray = ['#image-preview', '#url', '#url-input-collapse', '#link-preview', '#custom-file', '#upload', '#danger'];

/*- CREATE NEW CUSTOMER FORM INPUTS -*/
const formContainer = mdb.Sidenav.getInstance(containerForm);
