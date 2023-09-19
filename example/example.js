import {priceBase} from "../js/modules-js/firebase-module.js";

import {getDateTime} from '../modules-js/main-module.js'
function getRandomDateAndTime() {
    const startYear = 2020;
    const endYear = 2023;

    const randomYear = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
    const randomMonth = Math.floor(Math.random() * 12) + 1;
    const randomDay = Math.floor(Math.random() * 31) + 1; // Assume all months have 31 days for simplicity
    const randomHour = Math.floor(Math.random() * 24);
    const randomMinute = Math.floor(Math.random() * 60);
    const randomSecond = Math.floor(Math.random() * 60);

    const formattedDate = `${randomDay.toString().padStart(2, '0')}/${randomMonth.toString().padStart(2, '0')}/${randomYear}`;
    const formattedTime = `${randomHour.toString().padStart(2, '0')}:${randomMinute.toString().padStart(2, '0')}:${randomSecond.toString().padStart(2, '0')}`;

    return `${formattedDate}, ${formattedTime}`;
}



function generateRandomUniqueId() {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const idLength = 18; // Adjust this length as needed

    let randomId = '';

    // Add "-" at a random position
    const hyphenIndex = Math.floor(Math.random() * (idLength - 1));

    // Add "_" at a random position (different from hyphenIndex)
    let underscoreIndex = Math.floor(Math.random() * (idLength - 1));
    while (underscoreIndex === hyphenIndex) {
        underscoreIndex = Math.floor(Math.random() * (idLength - 1));
    }

    for (let i = 0; i < idLength; i++) {
        if (i === hyphenIndex) {
            randomId += '-';
        } else if (i === underscoreIndex) {
            randomId += '_';
        } else {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomId += characters.charAt(randomIndex);
        }
    }

    return randomId;
}

const uniqueId = generateRandomUniqueId();
console.log(uniqueId);


const arr = [];
for (let i = 0; i < 30; i++) {
    const uniqueId = getRandomDate();
    arr.push(uniqueId)

}
arr.sort((date1, date2) => date1 - date2);
function getRandomDate() {
    const startDate = new Date('2020-01-01');
    const endDate = new Date('2023-12-31');
    const timeDiff = endDate.getTime() - startDate.getTime();
    const randomTime = Math.random() * timeDiff;
    const randomDate = new Date(startDate.getTime() + randomTime);
    return randomDate;
}


const TimeArr = []

arr.forEach((el) => {
    TimeArr.push(getDateTime(el))
})
// console.log('arr2', TimeArr);
// const setArr = new Set(arr)
// console.log(setArr);
// const sortArr = arr.sort()
// console.log('sortArr:', sortArr);
// sortArr.forEach((el) => {
//     console.log(new Date(el))
// })

// arr2.forEach((el) => {
//     p[el]= {id: el, addAt: getRandomDateAndTime()}
//
// })
function randomNum(min, max) {
    let x = Math.round(Math.random() * (max - min) + min);
    return x
}
// Random performance
// const random = randomNum(0, 50)
const randomArray = (length, max) =>
    Array(length).fill().map(() => Math.round(Math.random() * max))
// const performance =  Object.assign({}, randomArray(12, random));
// console.log(performance);
// Random performance
const data = await exampleBase.readData()
const base = Object.values(data)
// console.log('base:', base);
base.forEach( async (el, index) => {
    const obj = {...el};
    const id = await priceBase.getItemId()
    obj.id = id;
    obj.editAt = 'Not';
    let random = randomNum(0, 50);
    let arr = randomArray(12, random)
    const performance =  Object.assign({}, arr);
    obj.annualSales = performance;
    obj.annualTotal = arr.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
    },0);
    const monthly = {
        complete: arr[arr.length - 1],
        pending: randomNum(5, 20),
        cancel: randomNum(0, 5)
    }
    obj.monthly = monthly;

    delete obj.ordersPerMonth;
    // await priceBase.addItemToDatabase(obj, id)
    console.log('obj', obj);
})
function sumArrays(...arrays) {
    const n = arrays.reduce((max, xs) => Math.max(max, xs.length), 0);
    const result = Array.from({ length: n });
    return result.map((_, i) => arrays.map(xs => xs[i] || 0).reduce((sum, x) => sum + x, 0));
}

console.log(...sumArrays([0, 1, 2], [1, 2, 3, 4], [1, 2])); // 2 5 5 4