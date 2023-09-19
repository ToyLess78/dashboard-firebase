import {getDateTime} from './main-module.js'
import {checkFeedback} from './validate-module.js'
import {customerBase, customerStorage} from './firebase-module.js'
import {cloneData, customerData, id, updateAll} from '../customers-js/customers-list.js'
import {formOpenBtn} from "./variable-module.js";
export {
    Customer,
    findToDeleteImage,
    getAllInputsValues,
    customerData,
    cloneData
}
let avatarSrc = '';

let arrAllInputsValues = new Array();

async function getAllInputsValues(event, inputsForm, formContainer) {
    const imageSrc = document.getElementById('image-preview').src
    if (imageSrc.includes('img/camera.svg')) {
        event.preventDefault();
        document.getElementById('form-title').click();
        document.getElementById('popconfirm-button-confirm').addEventListener('click', async () => {
            await setStandardActions(formContainer);
            await findToDeleteImage(id);
        })

    } else if (imageSrc.includes('base64')) {
        const id = await checkCustomerId();
        await customerStorage.uploadItemImage(id, imageSrc);
        const imagePass = await customerStorage.getItemUrl(id);
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
    const id = await checkCustomerId();
    await getMainInputsValues(id);
    formContainer.hide();
    formOpenBtn.classList.add('show');
    await updateAll();
}

class Customer {
    constructor(id, editAt, addAt, firstName, lastName, email, phone, address1, address2, gender, feedback = 1) {
        const fullName = {firstName: firstName, lastName: lastName}
        const fullAddress = {address1: address1, address2: address2}
        this.fullName = fullName;
        this.fullAddress = fullAddress;
        this.email = email;
        this.phone = phone;
        this.gender = gender;
        this.id = id;
        this.feedback = feedback;
        this.editAt = editAt;
        this.addAt = addAt;
    }
}

let feedbackValue;

async function getMainInputsValues(ids) {
    const inputsBody = document.getElementById('inputs-body');

    const inputsBodyArray = inputsBody.querySelectorAll('input');

    inputsBodyArray.forEach((input) => arrAllInputsValues.push(input.value));
    feedbackValue = checkFeedback();
    arrAllInputsValues.push(feedbackValue);
    await updateFirebase(ids);
    arrAllInputsValues = [];
    avatarSrc = '';
}

async function checkCustomerId() {
    if (id !== 0) {
        arrAllInputsValues.unshift(cloneData[id].addAt);
        arrAllInputsValues.unshift(getDateTime(new Date()));
        return id;

    } else {
        arrAllInputsValues.unshift(getDateTime(new Date()));
        arrAllInputsValues.unshift('Not');
        return await customerBase.getItemId();

    }
}

async function updateFirebase(ids) {


    arrAllInputsValues.unshift(ids);
    const newCustomer = new Customer(...arrAllInputsValues);
    if (avatarSrc) {
        newCustomer.avatar = avatarSrc;
    }
    await customerBase.addItemToDatabase(newCustomer, ids)
}


async function findToDeleteImage(id) {
    const arrNames = await customerStorage.getItemNames();
    if (arrNames.includes(id)) {
        await customerStorage.deleteItemImage(id);
    }
}