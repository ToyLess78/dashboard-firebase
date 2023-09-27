
export {checkFeedback, firstPreventValidation, mainPreventValidation, checkRating, simpleValidation}
const checkRating = () => {
    let rating
    if (document.querySelectorAll('#rating-edit i.active').length > 0) {
        rating = document.querySelectorAll('#rating-edit i.active').length;
    } else {
        rating = 1;
    }
    return rating;
}
const checkFeedback = () => {
    let rating
    if (document.getElementById('rating').classList.contains('show')) {
        rating = document.querySelectorAll('#rating-edit i.active').length;
    } else rating = 1;
    return rating;
}
// first prevent validation inputs
const toTitleCaseAddress = (input) => {
    return input
        .trim()
        .replace(/[~`!@#$%^&*()+={}\[\];:\"<>\\\?_]/g, '')
        .replace(/ +\,/g, ',')
        .replace(/ +\./g, '.')
        .replace(/  +/g, ' ')
        .split(' ')
        .map(word=> word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

const toTitleCaseName = (input) => {
    return input
        .trim()
        .toLowerCase()
        .replace(/[~`!@#$%^&*()+={}\[\];:\"<>,\/\\\?-_]/g, '')
        .replace(/  +/g, ' ')
        .replace(/ +\./g, '.')
        .replace(/ +\'/g, "'")
        .split(' ')
        .map(word=> word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}
export const formatCurrency = (input) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0, minimumFractionDigits: 0}).format(input.replace(/[^0-9\.]+/g,""));

}

function firstPreventValidation(e) {
    switch (e.target.dataset.valid) {
        case 'name':
            e.target.value = toTitleCaseName(e.target.value)
            break
        case 'address':
            e.target.value = toTitleCaseAddress(e.target.value)
            break
        case 'email':
            e.target.value = e.target.value.trim().toLowerCase()
            break
        case 'salary':
            e.target.value = formatCurrency(e.target.value)
            break
        case 'description':
            e.target.value = e.target.value.trim().charAt(0).toUpperCase() + e.target.value.trim().slice(1)
            break
        case '':
            e.target.value = e.target.value.trim()
            break
    }
    return e.target.value
}

async function mainPreventValidation(inputsForm, formContainer, formClearBtn, getAllInputsValues) {

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation');

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach((form) => {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            event.stopPropagation();

            if (form.checkValidity()) {
                getAllInputsValues(event, inputsForm, formContainer, formClearBtn);
            }
            form.classList.add('was-validated');
        }, false);
    });

}

function simpleValidation() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation');

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach((form) => {
        form.addEventListener('submit', (event) => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
            event.preventDefault();
        }, false);
    });
}



