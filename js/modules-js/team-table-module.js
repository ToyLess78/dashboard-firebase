import {createVariable, setTableActions} from "./main-module.js";
import {getLastNMonths} from "./form-module.js";

export {
    columns,
    updateTeamTable,
    ratingBody,
    addRowPreview,
    fillInputsOfMembers,
    getSelectInstance,
    getRatingInstance,
}

const columns = [
    {label: 'Name', field: 'name'},
    {label: 'Title', field: 'title'},
    {label: 'Status', field: 'status'},
    {label: 'Level', field: 'level'},
    {label: 'Rating', field: 'rating'},
    {label: 'Actions', field: 'actions', sort: false}
];

function addTeamRating(num) {
    const ul = document.createElement('ul');
    ul.classList.add('rating');
    ul.setAttribute('data-mdb-readonly', 'true');
    ul.innerHTML = `<li><i class="far fa-star fa-sm text-primary"></i></li>
    <li><i class="far fa-star fa-sm text-primary"></i></li>
    <li><i class="far fa-star fa-sm text-primary"></i></li>
    <li><i class="far fa-star fa-sm text-primary"></i></li>
    <li><i class="far fa-star fa-sm text-primary"></i></li>`;
    const arrI = ul.querySelectorAll('i');
    for (let i = 0; i < num; i++) {
        arrI[i].classList.add('fas', 'active')
    }
    return ul.outerHTML;
}
const src = './img/big-camera.svg';
function updateTeamTable(table, data) {
    table.update(
        {

            rows: data.map((team) => ({
                ...team,
                name: `<div class="d-flex justify-content-end align-items-center flex-row-reverse"><div class="ms-3">
                                    <p class="fw-bold mb-1">${team?.fullName?.firstName} ${team?.fullName?.lastName}</p>
                                    <p class="grey-text mb-0">${team?.email}</p>
                                </div>
                                <img src="${team?.avatar || src}" alt="photo"
                                     style="width: 45px; height: 45px" class="rounded-circle"></div>`,
                title: `<p class="fw-normal mb-1">${team?.position}</p>
                            <p class="grey-text mb-0">${team?.department}</p>`,
                status: `<span class="badge-team badge-${team?.status} rounded-pill">${team?.status}</span>`,
                rating: addTeamRating(team?.rating),
                actions: setTableActions(team?.id),
            })),
        },
        {loading: false},
    );
}

const ratingBody = `<li class="me-3"><i class="fa-star text-primary fa-2x fas active"
                                                title="No Rating"></i></li>
                            <li class="me-3"><i class="far fa-star text-primary fa-2x" title="Poor"></i></li>
                            <li class="me-3"><i class="far fa-star text-primary fa-2x" title="OK"></i></li>
                            <li class="me-3"><i class="far fa-star text-primary fa-2x" title="Good"></i>
                            </li>
                            <li><i class="far fa-star text-primary fa-2x" title="Excellent"></i></li>`;


const lastMonth = getLastNMonths(6);
const performanceMonthArr = document.querySelectorAll('[data-month]');
performanceMonthArr.forEach((month, index) => {
    month.textContent = lastMonth[index];
});
let halfYearPerformance = 0;
let entirePerformance = 0;

function addRowPreview(itemOfId, collapsePreview) {
    const idArray = ['#image-item', '#full-name', '#email-item', '#phone-item', '#start-at', '#item-salary', '#level', '#age', '#item-location', '#performance', '#canvas']
    const variableArr = new Array();
    createVariable(collapsePreview, idArray, variableArr)
    const [imageItem, fullName, emailItem, phoneItem, startAt, salary, level, age, location, performance, canvas] = variableArr;

    imageItem.src = itemOfId?.avatar || './img/camera.svg';
    fullName.textContent = `${itemOfId?.fullName?.firstName} ${itemOfId?.fullName?.lastName}`;
    emailItem.value = itemOfId?.email;
    phoneItem.value = itemOfId?.phone;
    startAt.textContent = itemOfId?.startDate;
    salary.textContent = itemOfId?.salary;
    level.textContent = itemOfId?.level + ':';
    location.value = itemOfId?.location;
    const d = new Date();
    age.textContent = d.getFullYear() - itemOfId?.birthYear + ' years';

    if (itemOfId?.performance) {
        performance.classList.add('show');
        const performanceArr = checkPerformanceArr(itemOfId?.performance);

        runCircularProgress(halfYearPerformance, entirePerformance);

        const progressArr = performance.querySelectorAll('[data-progress]');
        setTimeout(() => {
            progressArr.forEach((progress, index) => {
                progress.style.height = performanceArr[index] + '%';
                progress.dataset.mdbOriginalTitle = performanceArr[index] + '%';
            })
        }, 500);
        document.addEventListener("changeTheme", (e) => {
            setTimeout(() => {
                runCircularProgress(halfYearPerformance, entirePerformance);
            }, 0)
        })

    } else {
        performance.classList.remove('show');
    }
}

const average = arr => Math.round(arr.reduce((p, c) => p + c, 0) / arr.length);

function checkPerformanceArr(performance) {
    let newArr = new Array()
    if (performance.length < 6) {
        document.querySelector('#canvas').classList.remove('show');
        entirePerformance = average(performance);
        const newLength = 6 - performance.length
        newArr.length = newLength;
        newArr.fill(0, 0, newLength);
        newArr = newArr.concat(performance)
    } else if (performance.length > 6) {
        document.querySelector('#canvas').classList.add('show');
        entirePerformance = average(performance);
        newArr = performance.slice(-6);
        halfYearPerformance = average(newArr);
    } else {
        document.querySelector('#canvas').classList.add('show');
        entirePerformance = average(performance);
        newArr = performance;
        halfYearPerformance = average(newArr);

    }
    return newArr;
}

function fillInputsOfMembers(itemOfId, firstName, lastName, email, phone, birth, location, department, position, salary, level, start, status, ratingEdit) {
    firstName.value = itemOfId?.fullName?.firstName;
    lastName.value = itemOfId?.fullName?.lastName;
    email.value = itemOfId?.email;
    phone.value = itemOfId?.phone;
    birth.value = itemOfId?.birthYear;
    location.value = itemOfId?.location;
    position.value = itemOfId?.position;
    salary.value = itemOfId?.salary;
    start.value = itemOfId?.startDate;
    getSelectInstance(itemOfId?.department, department);
    getSelectInstance(itemOfId?.status, status);
    getRatingInstance(itemOfId?.rating, ratingEdit);
    getSelectInstance(itemOfId?.level, level);
}

function getSelectInstance(itemOfId, select) {
    const selectInstance = mdb.Select.getInstance(select);
    selectInstance.setValue(itemOfId);
}

function getRatingInstance(itemOfId, ratingEdit) {
    ratingEdit.innerHTML = ratingBody;
    const instance = new mdb.Rating(ratingEdit, {dynamic: true, value: itemOfId});
}

function getCanvas(canvases, percents, color, background, value) {

    const canvas = document.getElementById(canvases),
        spanPercent = document.getElementById(percents);


    let posX = canvas.width / 2,
        posY = canvas.height / 2,
        fps = 1000 / 200,
        percent = 0,
        onePercent = 360 / 100,
        result = onePercent * value,
        c = canvas.getContext('2d');
    c.lineCap = 'round';

    let degrees = 0;
    const acrInterval = setInterval(() => {
        degrees += 1;
        c.clearRect(0, 0, canvas.width, canvas.height);
        percent = degrees / onePercent;

        spanPercent.textContent = percent.toFixed();

        c.beginPath();
        c.arc(posX, posY, 63, (Math.PI / 180) * 270, (Math.PI / 180) * (270 + 360));
        c.strokeStyle = background;
        c.lineWidth = '12';
        c.stroke();

        c.beginPath();
        c.strokeStyle = color;
        c.lineWidth = '14';
        c.arc(posX, posY, 63, (Math.PI / 180) * 270, (Math.PI / 180) * (270 + degrees));
        c.stroke();
        if (degrees >= result) clearInterval(acrInterval);
    }, fps);
}

function runCircularProgress(value1, value2) {
    let indigoColor;
    let greenColor;
    let background;
    if (localStorage.getItem('theme') === 'light') {
        indigoColor = '#3a36db';
        greenColor = '#03a89e';
        background = 'hsla(216, 76%, 10%, 0.1)';
    } else {
        indigoColor = '#605cff';
        greenColor = '#2fe6a7';
        background = 'hsla(0, 0%, 100%, 0.2)';
    }
    getCanvas('canvas1', 'percent1', indigoColor, background, value1);
    getCanvas('canvas2', 'percent2', greenColor, background, value2);
}

