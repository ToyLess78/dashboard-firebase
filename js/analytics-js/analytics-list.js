import {
    addFormListeners,
    addInputImageWork,
    addShowEdit,
    fillPreviewList,
    openForm,
    setInputsMark
} from '../modules-js/form-module.js'
import {findToDeleteImage, getAllInputsValues,} from '../modules-js/analytics-form-validate-module.js'
import {createVariable, getDate} from '../modules-js/main-module.js'
import {transformPreviewImage} from '../modules-js/preview-image-module.js'
import {firstData, priceBase} from '../modules-js/firebase-module.js'
import {columns, fillInputsOfValues, getSelectInstance, updatePriceTable} from '../modules-js/analytics-table-module.js'
import {mainPreventValidation} from '../modules-js/validate-module.js'
import {
    containerForm,
    datatable,
    datatableContainer,
    datepicker,
    formClearBtn,
    formContainer,
    formOpenBtn,
    formTitle,
    hideRowBtn,
    inputsBody,
    inputsForm,
    searchDatatable,
    showRowBtn,
    workInputsArray
} from '../modules-js/variable-module.js';
import {
    addItemDescriptionPreview,
    changeThemeChartsUpdate,
    getThemChartColor,
    lineChartConfig,
    lineChartUpdate,
    pieAnalyticsChartUpdate,
    pieChartConfig
} from "../modules-js/chart-map-module.js";

export {priceData, id, cloneData, updateAll}

document.querySelector('#main-sidenav [href="analytics.html"]').classList.add('active');
const showTableBtn = document.querySelector('#show-table-btn'),
    analyticsShow = document.querySelector('#analytics-container'),
    datatableShow = document.querySelector('#datatable-show'),
    hideTableBtn = document.querySelector('#hide-table-btn'),
    navTabs = document.querySelector('#nav-tabs'),
    liNew = document.querySelector('#li-new');


const idArray = ['#card-img', '#card-title', '#card-description', '#add-at', '#edit-at', '#card-quantity', '#main-card', '#target-card', '#card-price'];
const variableArr = new Array();
createVariable(analyticsShow, idArray, variableArr)
const [cardImage, cardTitle, cardDescription, addAt, editAt, cardQuantity, mainCard, targetCard, cardPrice] = variableArr;

const el = document.getElementById('datatable-container');
const cardAnimateOptions = {
    animation: 'fade-in-up',
    delay: '600',
    duration: '600'
}
const barAnimationOptions = {
    animation: 'fade-in-right',
    delay: '600',
    duration: '600'
}
const mainCardAnimate = new mdb.Animate(document.getElementById('main-card'), cardAnimateOptions);
const tableAnimate = new mdb.Animate(document.getElementById('datatable-container'), cardAnimateOptions);
const barAnimate = new mdb.Animate(document.getElementById('target-card'), barAnimationOptions);
showTableBtn.addEventListener('click', async () => {
    analyticsShow.classList.remove('show');
    datatableShow.classList.add('show');
    await editTableLoading();
    tableAnimate.init();
    tableAnimate.startAnimation();
})
hideTableBtn.addEventListener('click', () => {
    datatableShow.classList.remove('show');
    analyticsShow.classList.add('show');
    mainCardAnimate.init();
    mainCardAnimate.startAnimation();
    barAnimate.init();
    barAnimate.startAnimation();
});


// read firebase data
await priceBase.readItemData();

let cloneData = structuredClone(firstData);
let priceData = Object.values(cloneData);

workInputsArray.querySelectorAll('.select-input').forEach((el, i) => el.id = `select-${i + 1}`);
setInputsMark(workInputsArray);
let serviceData, devData, analyticsData, targetItem;

function updateChartList() {
    serviceData = priceData.filter(e => e.section == 'Service');
    devData = priceData.filter(e => e.section == 'Development');
    analyticsData = priceData.filter(e => e.section == 'Analytics');


// Fill right navbar

    fillPreviewList(serviceData, '#list-service');
    fillPreviewList(devData, '#list-development');
    fillPreviewList(analyticsData, '#list-analytics');
    targetItem = priceData[0]

    addItemDescriptionPreview(targetItem, cardImage, cardTitle, cardDescription, addAt, editAt, cardQuantity, cardPrice);
}

updateChartList();

let asyncTable;
let id = 0;

async function updateAll() {
    await priceBase.readItemData();
    cloneData = structuredClone(firstData);
    priceData = Object.values(cloneData);
    updatePriceTable(asyncTable, priceData);
    id = 0;
    updateChartList();
}

async function editTableLoading() {
    if (!asyncTable) {
        asyncTable = new mdb.Datatable(document.getElementById('datatable'),
            {columns},
            {loading: true}
        );
        // fill datatable
        updatePriceTable(asyncTable, priceData);
        // make image input logics
        await addInputImageWork(inputsForm);
        // toggle button to open form
        openForm('Add to Price:', id);
        // toggle button to clear form inputs
        addFormListeners();
        // main prevent validation
        await mainPreventValidation(inputsForm, formContainer, formClearBtn, getAllInputsValues);


        let arrPriceId = []
        let filterArrPriceId = []
        datatable.addEventListener('selectRows.mdb.datatable', (e) => {
            hideRowBtn.classList.add('show');
            showRowBtn.classList.remove('show');
            let iterator = e.selectedRows.values();
            for (let el of iterator) {
                arrPriceId.push(el.id)
            }
            filterArrPriceId = [...new Set(arrPriceId)]
            arrPriceId = []
        });

        // make inputs body values array
        const inputsBodyArray = inputsBody.querySelectorAll('input');


        hideRowBtn.addEventListener('click', () => {
            filterArrPriceId.forEach((i) => {
                delete cloneData[i];
            });
            priceData = Object.values(cloneData);
            filterArrPriceId = [];
            updatePriceTable(asyncTable, priceData);
            showRowBtn.classList.add('show');
            hideRowBtn.classList.remove('show');

        })

        showRowBtn.addEventListener('click', () => {
            cloneData = structuredClone(firstData);
            priceData = Object.values(cloneData);
            updatePriceTable(asyncTable, priceData);
            showRowBtn.classList.remove('show');
        })

// datatable search init
        searchDatatable.addEventListener('input', (e) => {
            asyncTable.search(e.target.value);
        });

        let itemOfId

        datatable.addEventListener('click', (e) => {
            // const id = e.target.dataset.id
            const elementsIdArray = ['#image-preview', '#url-input-collapse', '#link-preview', '#custom-file', '#title', '#price', '#description', '#quantity-select', '#section-select']
            const mainVariableArray = new Array();
            createVariable(containerForm, elementsIdArray, mainVariableArray);

            const [preview, collapseInput, linkPreview, inputFile, title, price, description, quantitySelect, sectionSelect] = mainVariableArray;
            if (e.target.closest('[data-edit]')) {
                id = e.target.closest('.id-target').id
                itemOfId = cloneData[id];
                formTitle.textContent = 'Edit Price:'
                transformPreviewImage(preview, linkPreview, collapseInput, inputFile, itemOfId, './img/camera-300.svg');
                const allInputs = containerForm.querySelectorAll('input');
                allInputs.forEach((input) => input.classList.add('active'));
                addShowEdit();
                fillInputsOfValues(itemOfId, title, price, description);
                getSelectInstance(itemOfId?.quantity, quantitySelect);
                getSelectInstance(itemOfId?.section, sectionSelect);
                formOpenBtn.classList.remove('show');

            } else if (e.target.closest('[data-delete]')) {
                setTimeout(() => {
                    document.querySelector('#confirm-delete').click();
                    datatable.querySelector('.collapse.show').classList.remove('show');
                }, 0)

                id = e.target.closest('.id-target').id
                datatableContainer.addEventListener('confirm.mdb.popconfirm', async () => {
                    await priceBase.removeItem(id);
                    await findToDeleteImage(id);
                    await updateAll();
                });
            }
        })

    }

}

const inputMaskOptions = {
    inputMask: getDate(new Date())
}
const instances = new Inputmask(datepicker, inputMaskOptions)

const cardObserver = new ResizeObserver(entries => {
    entries.forEach(entry => {
        targetCard.style.height = entry.contentRect.height + 32 + 'px';
    });
});

cardObserver.observe(mainCard);


getThemChartColor();
let lineChartData = priceData[0].annualSales;

const lineChart = new mdb.Chart(document.getElementById("chart-line"), {type: 'line'}, lineChartConfig);
lineChartUpdate(lineChart, lineChartData);

// <!-- Chart -->

const chartPie = document.getElementById('chart-pie')


const pieChart = new mdb.Chart(chartPie, {type: 'doughnut'}, pieChartConfig);

pieAnalyticsChartUpdate(targetItem, pieChart, liNew);

changeThemeChartsUpdate(targetItem, pieChart, liNew, lineChart, lineChartData)
navTabs.addEventListener('click', (e) => {
    let id = 0;
    if (e.target.closest('[data-target]')) {
        id = e.target.closest('[data-target]').dataset.target;
        targetItem = cloneData[id];
        addItemDescriptionPreview(targetItem, cardImage, cardTitle, cardDescription, addAt, editAt, cardQuantity, cardPrice);
        lineChartData = targetItem.annualSales;
        lineChartUpdate(lineChart, lineChartData);
        pieAnalyticsChartUpdate(targetItem, pieChart, liNew);
    }


})

const searchInputList = document.getElementById('search-list');

searchInputList.addEventListener('input', () => {
    const listOptions = document.querySelectorAll('#price-content .active li');
    const filter = searchInputList.value.toLowerCase();
    listOptions.forEach((el) => {
        el.classList.add('d-flex');
        el.classList.remove('d-none');
        const valueExist = !!filter.length;
        if (valueExist) {
            listOptions.forEach((el) => {
                console.log(el.querySelector('p'));
                const elText = el.querySelector('p').textContent.trim().toLowerCase();
                let isIncluded = elText.includes(filter);
                if (!isIncluded) {
                    el.classList.add('d-none')
                    el.classList.remove('d-flex')
                }
            });
        }

    });
});










