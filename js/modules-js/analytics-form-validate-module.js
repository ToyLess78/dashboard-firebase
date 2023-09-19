import {getDateTime} from './main-module.js'
import {priceBase, priceStorage} from './firebase-module.js'
import {cloneData, id, updateAll} from '../analytics-js/analytics-list.js'
import {formOpenBtn} from "./variable-module.js";
export {
    Price,
    findToDeleteImage,
    getAllInputsValues,
    cloneData
}
let avatarSrc = '';

let arrAllInputsValues = new Array();

async function getAllInputsValues(event, inputsForm, formContainer) {
    const imageSrc = document.getElementById('image-preview').src
    console.log(imageSrc);

    if (imageSrc.includes('camera-300.svg')) {
        console.log('imageSrc', imageSrc);
        console.log('id', id);
        event.preventDefault();
        document.getElementById('form-title').click();
        document.getElementById('popconfirm-button-confirm').addEventListener('click', async () => {
            await setStandardActions(formContainer);
            await findToDeleteImage(id);
        })

    } else if (imageSrc.includes('base64')) {
        const id = await checkPriceId();
        await priceStorage.uploadItemImage(id, imageSrc);
        const imagePass = await priceStorage.getItemUrl(id);
        avatarSrc = imagePass;
        await getMainInputsValues(id)
        formContainer.hide();
        formOpenBtn.classList.add('show');
        await updateAll();


    } else if (imageSrc.includes('firebasestorage')) {
        avatarSrc = imageSrc;
        await setStandardActions(formContainer);

    } else {
        avatarSrc = imageSrc;
        await setStandardActions(formContainer);
        await findToDeleteImage(id);
    }
}

async function setStandardActions(formContainer) {
    const id = await checkPriceId();
    await getMainInputsValues(id);
    formContainer.hide();
    formOpenBtn.classList.add('show');
    await updateAll();
}

class Price {
    constructor(id, editAt, addAt, title, price, quantity, section, description) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.quantity = quantity;
        this.id = id;
        this.editAt = editAt;
        this.addAt = addAt;
        this.section = section;
    }
}


async function getMainInputsValues(ids) {
    const inputsBody = document.getElementById('inputs-body');

    const inputsBodyArray = inputsBody.querySelectorAll('input');

    inputsBodyArray.forEach((input) => arrAllInputsValues.push(input.value));
    arrAllInputsValues.push(inputsBody.querySelector('textarea').value);
    await updateFirebase(ids);
    arrAllInputsValues = [];
    avatarSrc = '';
}

async function checkPriceId() {
    if (id !== 0) {
        arrAllInputsValues.unshift(cloneData[id].addAt);
        arrAllInputsValues.unshift(getDateTime(new Date()));
        return id;

    } else {
        arrAllInputsValues.unshift(getDateTime(new Date()));
        arrAllInputsValues.unshift('Not');
        return await priceBase.getItemId();

    }
}

async function updateFirebase(ids) {

    arrAllInputsValues.unshift(ids);
    const newPrice = new Price(...arrAllInputsValues);
    if (avatarSrc) {
        newPrice.avatar = avatarSrc;
    }
    if (cloneData[id]?.annualTotal) {
        newPrice.annualTotal = cloneData[id].annualTotal;
    }
    if (cloneData[id]?.annualSales) {
        newPrice.annualSales = cloneData[id].annualSales;
    }
    if (cloneData[id]?.monthly) {
        newPrice.monthly = cloneData[id].monthly;
    }
    await priceBase.addItemToDatabase(newPrice, ids)
}


async function findToDeleteImage(id) {
    const arrNames = await priceStorage.getItemNames();
    console.log(arrNames);
    if (arrNames.includes(id)) {
        await priceStorage.deleteItemImage(id);
    }
}