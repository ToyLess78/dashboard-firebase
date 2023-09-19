import {getDateTime} from './main-module.js'
import {checkRating} from './validate-module.js'
import {teamBase, teamStorage} from './firebase-module.js'
import {cloneData, id, updateAll} from '../team-js/team-list.js'
import {formOpenBtn} from "./variable-module.js";

export {
    Member,
    findToDeleteImage,
    getAllInputsValues,
}
let avatarSrc = '';

let arrTeamInputsValues = new Array();
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
        const id = await checkMemberId();
        await teamStorage.uploadItemImage(id, imageSrc);
        const imagePass = await teamStorage.getItemUrl(id);
        avatarSrc = imagePass;
        // arrTeamInputsValues.push(imagePass);
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
    const id = await checkMemberId();
    await getMainInputsValues(id);
    formContainer.hide();
    formOpenBtn.classList.add('show');
    await updateAll();
}

class Member {
    constructor(id, editAt, addAt, firstName, lastName, email, phone, birthYear, location, department, position, salary, level, startDate, status, rating = 1) {
        const fullName = {firstName: firstName, lastName: lastName}
        this.fullName = fullName;
        this.birthYear = birthYear;
        this.location = location;
        this.position = position;
        this.salary = salary;
        this.email = email;
        this.phone = phone;
        this.department = department;
        this.level = level;
        this.id = id;
        this.rating = rating;
        this.editAt = editAt;
        this.addAt = addAt;
        this.startDate = startDate;
        this.status = status;
    }
}

let ratingValue;

async function getMainInputsValues(ids) {
    const inputsBody = document.getElementById('inputs-body');

    const inputsBodyArray = inputsBody.querySelectorAll('input');

    inputsBodyArray.forEach((input) => arrTeamInputsValues.push(input.value));
    ratingValue = checkRating();
    arrTeamInputsValues.push(ratingValue);
    await updateFirebase(ids);
    arrTeamInputsValues = [];
    avatarSrc = '';
}

async function checkMemberId() {
    if (id !== 0) {
        arrTeamInputsValues.unshift(cloneData[id].addAt);
        arrTeamInputsValues.unshift(getDateTime(new Date()));
        return id;

    } else {
        arrTeamInputsValues.unshift(getDateTime(new Date()));
        arrTeamInputsValues.unshift('Not');
        return await teamBase.getItemId();
    }
}

async function updateFirebase(ids) {

    arrTeamInputsValues.unshift(ids);

    const newMember = new Member(...arrTeamInputsValues);
    if (cloneData[ids]?.performance) {
        newMember.performance = cloneData[ids].performance
    }
    if (avatarSrc) {
        newMember.avatar = avatarSrc;
    }
    await teamBase.addItemToDatabase(newMember, ids)
}


async function findToDeleteImage(ids) {
    const arrNames = await teamStorage.getItemNames();
    if (arrNames.includes(ids)) {
        await teamStorage.deleteItemImage(ids);
    }
}

// Random performance
// const randomArray = (length, max) =>
//     Array(length).fill().map(() => Math.round(Math.random() * max))
// const performance =  Object.assign({}, randomArray(10, 100));
// arrTeamInputsValues.unshift(performance);
// Random performance