const Pending = 'Pending';
Pending.value = 1;
const setActions = () => {
    document.getElementsByClassName('call-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            console.log(`call ${btn.attributes['data-mdb-number'].value}`)
        })
    })
}
const tel = `<span class="badge-customer badge-primary rounded-pill">Onboarding</span>`

const advancedColumns = [
    {
        sort: false,
        editable: false,
        inputType: 'text',
        label: `<input class="datatable-header-checkbox form-check-input" type="checkbox">`,
        field: 'checkbox',
    },
    {
        inputType: 'text',
        label: 'Invoice Id',
        field: 'invoice',
    },
    {
        sort: false,
        type: 'url',
        editable: false,
        label: 'Photo',
        field: 'avatar',
    },
    {
        label: 'Name',
        field: 'name',
    },
    {
        inputType: 'email',
        label: 'Email',
        field: 'email',
    },
    {
        inputType: 'date',
        label: 'Date',
        field: 'date',
    },

    {
        defaultValue: 'Complete',
        options: ['Pending', 'Complete', 'Cancel'],
        filter: true,
        inputType: 'select',
        label: 'Status',
        field: 'status',
    },
    {
        inputType: 'number',
        defaultValue: 1,
        label: 'Employees',
        field: 'employees',
    },

];

const advancedRows = [

    {
        checkbox: '',
        invoice: '#876123',
        avatar: 'https://mdbootstrap.com/img/new/avatars/7.jpg',
        name: 'Arrora gaur',
        email: 'arroragaur@gmail.com',
        date: '23.02.2022',
        status: `<span class="badge-customer badge-success rounded-pill">Cancel</span>`,
        employees: 30,
    },
    {
        checkbox: '',
        invoice: '#876364',
        avatar: 'https://mdbootstrap.com/img/new/avatars/8.jpg',
        name: 'James Mullican',
        email: 'jamesmullican@gmail.com',
        date: '23.03.2022',
        status: `<span class="badge-customer badge-warning rounded-pill">Pending</span>`,
        employees: 80,
    },
    {
        checkbox: '',
        invoice: '#876213',
        avatar: 'https://mdbootstrap.com/img/new/avatars/6.jpg',
        name: 'Robert Bacins',
        email: 'robertbacins@gmail.com',
        date: '20.02.2022',
        status: `<span class="badge-customer badge-success rounded-pill">Cancel</span>`,
        employees: 12,
    },
    {
        checkbox: '',
        invoice: '#876987',
        avatar: 'https://docs.webix.com/usermanager-backend/users/102/avatar/898151818.jpg',
        name: 'Bethany Jackson',
        email: 'bethanyjackson@gmail.com',
        date: '23.02.2022',
        status: `<span class="badge-customer badge-primary rounded-pill">Complete</span>`,
        employees: 17,
    },
    {
        checkbox: '',
        invoice: '#871345',
        avatar: 'https://docs.webix.com/usermanager-backend/users/105/avatar/096793420.jpg',
        name: 'Anne Jacob',
        email: 'annejacob@gmail.com',
        date: '23/02/2022',
        status: `<span class="badge-customer badge-primary rounded-pill">Complete</span>`,
        employees: 4,
        international: false,
    },
    {
        checkbox: '',
        invoice: '#872345',
        avatar: 'https://docs.webix.com/usermanager-backend/users/101/avatar/092352563.jpg',
        name: 'Bethany jackson',
        email: 'bethanyjackson@gmail.com',
        date: '23/02/2022',
        status: `<span class="badge-customer badge-warning rounded-pill">Pending</span>`,
        employees: 4,
    },
    {
        checkbox: '',
        invoice: '#879423',
        avatar: 'https://mdbootstrap.com/img/new/avatars/9.jpg',
        name: 'Jane Cooper',
        email: 'jane.cooper@example.com',
        date: '13.02.2021',
        status: `<span class="badge-customer badge-success rounded-pill">Cancel</span>`,
        employees: 30,
    },
    {
        checkbox: '',
        invoice: '#863345',
        avatar: 'https://mdbootstrap.com/img/new/avatars/11.jpg',
        name: 'Esther Howard',
        email: 'esther.howard@example.com',
        date: '20/12/2022',
        status: `<span class="badge-customer badge-primary rounded-pill">Complete</span>`,
        employees: 4,
        international: false,
    },
    {
        checkbox: '',
        invoice: '#876987',
        avatar: 'https://mdbootstrap.com/img/new/avatars/2.jpg',
        name: 'Danny Williamson',
        email: 'danny.williamson@example.com',
        date: '23.02.2022',
        status: `<span class="badge-customer badge-primary rounded-pill">Complete</span>`,
        employees: 17,
    },
    {
        checkbox: '',
        invoice: '#876343',
        avatar: 'https://mdbootstrap.com/img/Photos/Avatars/img%20(1).jpg',
        name: 'Kristin Watson',
        email: 'kristin.watson@gmail.com',
        date: '17.08.2022',
        status: `<span class="badge-customer badge-warning rounded-pill">Pending</span>`,
        employees: 80,
    },
    {
        checkbox: '',
        invoice: '#876278',
        avatar: 'https://mdbootstrap.com/img/new/avatars/15.jpg',
        name: 'Janny Wilson',
        email: 'jenny.wilsons@gmail.com',
        date: '20.02.2022',
        status: `<span class="badge-customer badge-success rounded-pill">Cancel</span>`,
        employees: 12,
    },
    {
        checkbox: '',
        invoice: '#872345',
        avatar: 'https://mdbootstrap.com/img/new/avatars/14.jpg',
        name: 'Cody Fisher',
        email: 'cody.fisher@example.com',
        date: '23/05/2021',
        status: `<span class="badge-customer badge-warning rounded-pill">Pending</span>`,
        employees: 4,
    },
    {
        checkbox: '',
        invoice: '#879423',
        avatar: 'https://mdbootstrap.com/img/new/avatars/5.jpg',
        name: 'Flora Wu',
        email: 'flora.wu@example.com',
        date: '19.02.2021',
        status: `<span class="badge-customer badge-success rounded-pill">Cancel</span>`,
        employees: 30,
    },
    {
        checkbox: '',
        invoice: '#803345',
        avatar: 'https://mdbootstrap.com/img/new/avatars/19.jpg',
        name: 'Estar Goana',
        email: 'est.howard@example.com',
        date: '20/12/2022',
        status: `<span class="badge-customer badge-primary rounded-pill">Complete</span>`,
        employees: 4,
        international: false,
    },
    {
        checkbox: '',
        invoice: '#876987',
        avatar: 'https://mdbootstrap.com/img/new/avatars/3.jpg',
        name: 'Denis Williamson',
        email: 'den.williamson@example.com',
        date: '23.02.2022',
        status: `<span class="badge-customer badge-primary rounded-pill">Complete</span>`,
        employees: 17,
    },
].map((row) => {
    return {
        ...row,
        avatar: `<img src="${row.avatar}" alt=""
//           style="width: 45px; height: 45px" class="rounded-circle">`,
        date: `<a href="#"><svg width="13" height="14" viewBox="0 0 13 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.38762 0.538034L9.38832 1.06277C11.3166 1.2139 12.5903 2.52784 12.5924 4.54283L12.6 10.4409C12.6028 12.6378 11.2226 13.9895 9.01027 13.993L3.60633 14C1.40784 14.0028 0.0103782 12.6189 0.00761371 10.4157L1.12822e-05 4.58691C-0.00275324 2.55862 1.22608 1.24818 3.15433 1.07117L3.15364 0.54643C3.15294 0.238584 3.38102 0.00700034 3.68511 0.00700034C3.98921 0.00630069 4.21728 0.237185 4.21797 0.545031L4.21867 1.03479L8.32398 1.02919L8.32328 0.539434C8.32259 0.231588 8.55067 0.000703491 8.85476 3.84109e-06C9.15195 -0.000695808 9.38693 0.230189 9.38762 0.538034ZM1.0651 4.80311L11.5288 4.78912V4.54424C11.4991 3.04 10.7444 2.25079 9.38976 2.13325L9.39045 2.67198C9.39045 2.97283 9.15615 3.21141 8.85897 3.21141C8.55487 3.21211 8.32611 2.97423 8.32611 2.67338L8.32542 2.10667L4.22011 2.11226L4.2208 2.67828C4.2208 2.97983 3.99342 3.21771 3.68932 3.21771C3.38522 3.21841 3.15646 2.98123 3.15646 2.67968L3.15577 2.14095C1.80806 2.27598 1.06234 3.06798 1.06441 4.58552L1.0651 4.80311ZM8.56799 7.98297V7.99067C8.57491 8.31251 8.83753 8.55668 9.15615 8.54969C9.46715 8.54199 9.71527 8.27542 9.70836 7.95359C9.69384 7.64574 9.44435 7.39457 9.13403 7.39527C8.81611 7.40226 8.5673 7.66113 8.56799 7.98297ZM9.13888 11.1244C8.82096 11.1174 8.56455 10.8522 8.56386 10.5304C8.55695 10.2086 8.81197 9.942 9.12989 9.9343H9.1368C9.46164 9.9343 9.72496 10.1995 9.72496 10.5283C9.72565 10.8571 9.46302 11.1237 9.13888 11.1244ZM5.72049 7.99425C5.73431 8.31608 5.99763 8.56726 6.31555 8.55327C6.62656 8.53857 6.87467 8.27271 6.86085 7.95087C6.85325 7.63602 6.59753 7.39115 6.28652 7.39185C5.9686 7.40584 5.71979 7.67241 5.72049 7.99425ZM6.31828 11.093C6.00036 11.107 5.73773 10.8558 5.72322 10.534C5.72322 10.2121 5.97133 9.94626 6.28925 9.93157C6.60026 9.93087 6.85667 10.1757 6.86358 10.4899C6.8781 10.8124 6.62929 11.0783 6.31828 11.093ZM2.87298 8.01868C2.8868 8.34052 3.15012 8.5924 3.46804 8.5777C3.77905 8.56371 4.02716 8.29714 4.01265 7.97531C4.00574 7.66046 3.75002 7.41559 3.43832 7.41629C3.1204 7.43028 2.87228 7.69685 2.87298 8.01868ZM3.47099 11.0964C3.15307 11.1111 2.89044 10.8592 2.87593 10.5374C2.87524 10.2156 3.12404 9.949 3.44196 9.93501C3.75297 9.93431 4.00938 10.1792 4.01629 10.494C4.03081 10.8159 3.78269 11.0824 3.47099 11.0964Z"/>
</svg>
</a>` + `&nbsp;` + row.date,
        checkbox: `<input class="datatable-header-checkbox form-check-input" type="checkbox">`,
    };
})
const tableModal = new TableEditor(
    document.getElementById('table_modal'),
    {
        columns: advancedColumns,
        rows: advancedRows,
    },
    { entries: 10, entriesOptions: [10, 15, 20], confirm: true }
);

const arr = [
    {'name': {value: 3}}
]
const arr2 = []
advancedRows.forEach((el) => arr2.push(el.invoice))
console.log('arr', arr2.sort().pop(), arr2.sort())

function randomNum(min, max) {
    let x = Math.round(Math.random() * (max - min) + min);
    return x
}
// Random performance
// const random = randomNum(0, 50)
const randomArray = (length, min, max) =>
    Array(length).fill().map(() => `#${
            Math.round(Math.random() * (max - min) + min)
        }`
    )
const newArr = randomArray(20, 300000, 499999)
let val = newArr.sort().pop().slice(1)
console.log('val', val, ++val)