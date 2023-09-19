export {previewImageModule, handleUploadClick, unUploadClick, regexp, allEventsPreviewListener, transformPreviewImage};

// const regexp = /(http(s?):)([/|.\w\s-])*\.(?:jpg|gif|png)/g
const regexp = /(http(s?):)/g

async function previewImageModule(input, preview, link, collapseIn) {

    const res = await imageToBase64(input.files[0]);
    if (res) {
        preview.style.opacity = '0';

        const resized = await reduceImageFileSize(res);

        setTimeout(() => {

            preview.src = resized;
            preview.style.opacity = '1';
            input.value = '';
            link.innerHTML = `<i class="far fa-circle-xmark grey-text"></i><br>`;
            input.setAttribute('disabled', '');
            collapseIn.classList.remove('show');
        }, 500);

    } else {

        console.log('return err')
    }
}

// Convert to base64
async function imageToBase64(file) {

    return await new Promise((resolve) => {

        let fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result);
        fileReader.onerror = (error) => {

            console.log(error)
            alert('An Error occurred please try again, File might be corrupt');
        }
        fileReader.readAsDataURL(file);
    });
}

// Resize image
async function reduceImageFileSize(base64Str, newSize = 400) {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = base64Str;
        img.onload = () => {
            let {width, height, dx, dy} = calculateDimensions(img, newSize);

            const canvas = document.createElement('canvas');
            canvas.width = newSize;
            canvas.height = newSize;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, dx, dy, width, height, 0, 0, newSize, newSize);

            resolve(canvas.toDataURL("image/png", 1));
        };
    });
}

// Crop image to square
function calculateDimensions(img) {
    let width = img.width;
    let height = img.height;
    let dx = 0;
    let dy = 0;

    if (width > height) {
        dx = (width - height) / 2;
        width = height;
    } else if (height > width) {
        dy = (height - width) / 2;
        height = width;
    }

    return {width, height, dx, dy};
}

// Upload link validation
function showDangerMessage(message, danger) {
    danger.textContent = message;
    danger.style.opacity = '1';

    setTimeout(() => (danger.style.opacity = '0'), 2500);
    setTimeout(() => (danger.textContent = ''), 3500);
}

function handleUploadClick(link, regexp, preview, linkPreview, inputFile, collapseInput, danger) {
    if (link.value !== '') {
        if (!regexp.test(link.value)) {
            link.value = '';
            showDangerMessage('Please enter a valid URL!', danger);
        } else {
            preview.style.opacity = '0';
            setTimeout(() => {
                preview.src = link.value;
                preview.style.opacity = '1';
                link.value = '';
                document.getElementById('collapseOne').classList.remove('show');
                linkPreview.innerHTML = `<i class="far fa-circle-xmark grey-text"></i><br>`;
                inputFile.setAttribute('disabled', '');
                collapseInput.classList.remove('show');
            }, 500);
        }
    } else {
        document.getElementById('collapseOne').classList.remove('show');
    }
}

function unUploadClick(preview, linkPreview, collapseInput, inputFile) {

    preview.style.opacity = '0';

    setTimeout(() => {

        preview.src = './img/camera-300.svg';
        preview.style.opacity = '1';
        linkPreview.innerHTML = `<span>Upload</span><br><small>or</small>`;
        collapseInput.classList.add('show');

    }, 500);

    setTimeout(() => inputFile.removeAttribute('disabled', ''), 1000);
}

async function allEventsPreviewListener(preview, link, collapseInput, linkPreview, inputFile, upload, danger, regexp) {
    let addEventListener = inputFile.addEventListener('change', () => {
        previewImageModule(inputFile, preview, linkPreview, collapseInput);
    });

    upload.addEventListener('click', () => {
        handleUploadClick(link, regexp, preview, linkPreview, inputFile, collapseInput, danger);
    });

    linkPreview.addEventListener('click', () => {
        unUploadClick(preview, linkPreview, collapseInput, inputFile);
    });
}

function transformPreviewImage(preview, linkPreview, collapseInput, inputFile, itemOfId, src) {
    preview.src = itemOfId?.avatar || src;
    linkPreview.innerHTML = `<i class="far fa-circle-xmark grey-text"></i><br>`;
    collapseInput.classList.remove('show');
    inputFile.setAttribute('disabled', '');
}