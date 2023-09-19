import {createVariable, setTableActions} from "./main-module.js";

export {
    columns,
    updateCustomerTable,
    feedbackBody,
    addRowPreview,
    fillInputsOfValues,
    getSelectInstance,
    getRatingInstance,
}
/*- CREATE CUSTOMER DATATABLE -*/


const columns = [
    {label: '', field: 'id'},
    {label: 'Name', field: 'name'},
    {label: 'Email', field: 'email'},
    {label: 'Phone', field: 'phone'},
    {label: 'Gender', field: 'gender'},
    {label: 'Actions', field: 'actions', sort: false}
];

function updateCustomerTable(table, data) {
    table.update(
        {
            rows: data.map((customer) => ({
                ...customer,
                name: `<div class="d-flex justify-content-end align-items-center flex-row-reverse"><div class="ms-3">
                                    <p class="mb-1">${customer?.fullName?.firstName} ${customer?.fullName?.lastName}</p>
                                </div>
                                <img src="${customer?.avatar || './img/big-camera.svg'}" alt="" style="width: 35px; height: 35px" class="rounded-circle"></div>`,
                gender: `<span class="badge-customer badge-${customer?.gender} rounded-pill">${customer?.gender}</span>`,
                actions: setTableActions(customer?.id),
            })),
        },
        {loading: false},
    );
}

const feedbackBody = `<li class="me-3"><i class="far fa-face-rolling-eyes fa-2x grey-text-opacity" title="No Feedback"></i></li>
    <li class="me-3"><i class="far fa-frown fa-2x grey-text-opacity" title="Poor"></i></li>
    <li class="me-3"><i class="far fa-meh fa-2x grey-text-opacity" title="OK"></i></li>
    <li class="me-3"><i class="far fa-face-smile-wink fa-2x grey-text-opacity" title="Good"></i></li>
    <li><i class="far fa-grin-stars fa-2x grey-text-opacity" title="Excellent"></i></li>`;

function addRowPreview(itemOfId, collapsePreview) {
    const idArray = ['#rating-item', '#image-item', '#full-name', '#item-gender', '#email-item', '#phone-item', '#full-address', '#add-at', '#edit-at']
    const variableArr = new Array();
    createVariable(collapsePreview, idArray, variableArr)
    const [rating, imageItem, fullName, itemGender, emailItem, phoneItem, fullAddress, addAt, editAt] = variableArr;

    rating.innerHTML = feedbackBody;
    imageItem.src = itemOfId?.avatar || './img/camera.svg';
    fullName.textContent = `${itemOfId?.fullName?.firstName} ${itemOfId?.fullName?.lastName}`;
    itemGender.textContent = itemOfId?.gender;
    emailItem.value = itemOfId?.email;
    phoneItem.value = itemOfId?.phone;
    fullAddress.value = `${itemOfId?.fullAddress?.address1}, ${itemOfId?.fullAddress?.address2}`;
    addAt.textContent = itemOfId?.addAt;
    editAt.textContent = itemOfId?.editAt;


    const instance = new mdb.Rating(rating, {dynamic: true, value: itemOfId?.feedback, readonly: true});
}

function fillInputsOfValues(itemOfId, firstName, lastName, email, phone, firstAddress, secondAddress) {
    firstName.value = itemOfId?.fullName.firstName;
    lastName.value = itemOfId?.fullName.lastName;
    email.value = itemOfId?.email;
    phone.value = itemOfId?.phone;
    firstAddress.value = itemOfId?.fullAddress?.address1;
    secondAddress.value = itemOfId?.fullAddress?.address2;
}

function getSelectInstance(itemOfId, select) {
    const selectInstance = mdb.Select.getInstance(select);
    selectInstance.setValue(itemOfId?.gender);
}

function getRatingInstance(itemOfId, ratingEdit) {
    ratingEdit.innerHTML = feedbackBody;
    const instance = new mdb.Rating(ratingEdit, {dynamic: true, value: itemOfId?.feedback});
}