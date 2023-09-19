import {allEventsPreviewListener, regexp, unUploadClick} from './preview-image-module.js'
import {createVariable} from './main-module.js'
import {firstPreventValidation} from "./validate-module.js";
import {
    addSubmitBtn,
    collapseForm,
    collapsePreview,
    datatable,
    editButtons,
    elementsIdArray,
    formClearBtn,
    formCloseBtn,
    formContainer,
    formOpenBtn,
    formTitle,
    inputsForm,
    itemCloseBtn,
    mainVariableArray,
    rating
} from "./variable-module.js";

export {
    addInputImageWork,
    clearImageInput,
    openForm,
    clearInputsForm,
    addFormListeners,
    addShowPreview,
    addShowEdit,
    setInputsMark,
    fillPreviewList,
    getLastNMonths
}

// make image input logics
async function addInputImageWork(form) {
    createVariable(form, elementsIdArray, mainVariableArray);

    /*- ------------------------------!MAIN VARIABLES ARRAY!--------------------------------- -*/
    const [preview, link, collapseInput, linkPreview, inputFile, upload, danger] = mainVariableArray;

// Add listener all events preview to image block
    await allEventsPreviewListener(preview, link, collapseInput, linkPreview, inputFile, upload, danger, regexp);
}

function clearImageInput(form) {
    createVariable(form, elementsIdArray, mainVariableArray);

    /*- ------------------------------!MAIN VARIABLES ARRAY!--------------------------------- -*/
    const [preview, link, collapseInput, linkPreview, inputFile, upload, danger] = mainVariableArray;

    unUploadClick(preview, linkPreview, collapseInput, inputFile);
    link.value = '';
    document.getElementById('collapseOne').classList.remove('show');
}

function openForm(text, ids) {
    formOpenBtn.addEventListener('click', () => {
        formContainer.show();
        collapsePreview.classList.remove('show');
        clearInputsForm(inputsForm);
        inputsForm.reset()
        rating.classList.remove('show');
        editButtons.classList.remove('show');
        addSubmitBtn.classList.add('show');
        formOpenBtn.classList.remove('show');
        ids = 0;
        formTitle.textContent = text;
    })
}

// toggle clear form inputs
function clearInputsForm(inputsForm) {
    clearImageInput(inputsForm);
    inputsForm.querySelectorAll('.select-label').forEach(select => select.classList.remove('active'));
    setTimeout(() => {
        // inputsForm.reset();
        inputsForm.classList.remove('was-validated');
    }, 0)
}

function addFormListeners() {
    // toggle button to clear form inputs
    formClearBtn.addEventListener('click', () => {
        // inputsForm.reset()
        clearInputsForm(inputsForm);
    });

// toggle button to close form
    formCloseBtn.addEventListener('click', () => {
        formContainer.hide();
        clearInputsForm(inputsForm);
        inputsForm.reset();
        formOpenBtn.classList.add('show');

    })

// toggle button to close full info
    itemCloseBtn.addEventListener('click', () => {
        formContainer.hide();
        collapseForm.classList.add('show');
    })

// first prevent validation
    inputsForm.addEventListener('change', (e) => {
        firstPreventValidation(e);
    })

    itemCloseBtn.addEventListener('click', () => {
        formOpenBtn.classList.add('show')
    })

}

function addShowPreview() {
    formContainer.show();
    collapsePreview.classList.add('show');
    collapseForm.classList.remove('show');
    datatable.querySelector('.collapse.show').classList.remove('show');
}

function addShowEdit() {
    formContainer.show();
    collapsePreview.classList.remove('show');
    collapseForm.classList.add('show');
    datatable.querySelector('.collapse.show').classList.remove('show');
    rating.classList.add('show');
    editButtons.classList.add('show');
    addSubmitBtn.classList.remove('show');
}

function setInputsMark(workInputsArray) {
    workInputsArray.addEventListener(
        'focus',
        (event) => {
            workInputsArray?.querySelector(`[data-relation=${event.target?.id}]`)?.classList.add('active');
        },
        true,
    );

    workInputsArray.addEventListener(
        "blur",
        (event) => {
            workInputsArray?.querySelector(`[data-relation=${event.target?.id}]`)?.classList.remove('active');
        },
        true,
    );
}

function fillPreviewList(arr, doc) {
    const setImage = (data) => {
        if (data?.avatar) {
            return data.avatar;
        } else {
            return './img/big-camera.svg'
        }
    }
    const setLink = (data) => {
        if (data?.annualSales) {
            return `<a class="btn btn-link btn-rounded btn-sm" role="button" data-target="${data?.id}">View</a>`;
        } else {
            return `<a class="btn btn-link btn-rounded btn-sm" role="button" style="cursor: not-allowed;">No data</a>`
        }
    }
    let el = '';
    arr.forEach((data) => {
        let str = `<li class="list-group-item d-flex justify-content-between align-items-center" data-list><div class="d-flex align-items-center"><img src="${setImage(data)}" alt="badge" style="width: 45px; height: 45px; background-color: var(--mark-color);" class="rounded-4"><div class="ms-3"><p class="fw-bold mb-1" data-list-title>${data?.title}</p><p class="text-muted mb-0">${data?.price}</p></div></div>${setLink(data)}</li>`;
        el += str;
    })
    const li = document.createElement('li')
    document.querySelector(doc).append(li)
    li.outerHTML = el;

}

const getLastNMonths = n => {
    const d = new Date();
    const currentMonth = d.getMonth();
    const locale = 'en-GB';

    let result = [];
    for (let i = n; i > 0; i--) {
        d.setMonth(currentMonth - i);
        result.push(d.toLocaleDateString(locale, {month: 'short'}));
    }
    return result;
};



