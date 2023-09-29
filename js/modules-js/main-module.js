export {createVariable, getDateTime, getDate, setTableActions, setCutActions, getTime, dateFormat};

/*- CREATE ARRAY FROM MAIN VARIABLES -*/
function createVariable(parent, idArray, variableArr) {

    idArray.forEach(el => {
        variableArr.push(parent.querySelector(el))
    })
}

const dateTimeFormat= new Intl.DateTimeFormat("en-gb", {"timeZone":"Europe/Kyiv","hour12":false,"year":"numeric","month":"numeric","day":"numeric","hour":"numeric","minute":"numeric","second":"numeric"});
const timeFormat = new Intl.DateTimeFormat("en-gb", {"timeZone":"Europe/Kyiv","hour12":false, "hour":"numeric","minute":"numeric"});
const dateFormat=new Intl.DateTimeFormat("en-gb", {"timeZone":"Europe/Kyiv","year":"numeric","month":"numeric","day":"numeric"});
function getDate(date) {
    const dateNow = dateFormat.format(date);
    return dateNow;
}
function getDateTime(date) {
    const dateTimeNow = dateTimeFormat.format(date);
    return dateTimeNow;
}

function getTime(date) {
    const timeNow = timeFormat.format(date);
    return timeNow;
}

const setTableActions = (customer) => {
    return `<div class="text-center"><a class=""
             data-mdb-toggle="collapse"
             href="#${customer}"
             role="button"
             aria-expanded="false"
             aria-controls="${customer}">
            <i class="fas fa-ellipsis grey-text"></i>
          </a>
          <div class="collapse id-target" id="${customer}">
            <a data-preview role="button" class="edit-button"><i class="fas trailing eye fa-eye grey-text"></i></a><a data-edit role="button" class="edit-button grey-text ms-3"><svg data-edit width="14" height="14" viewBox="0 0 15 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M5.31342 14.1893L12.6351 4.72098C13.033 4.21039 13.1745 3.62008 13.0418 3.01902C12.9269 2.4726 12.5908 1.95305 12.0868 1.55891L10.8577 0.582526C9.78775 -0.268455 8.46137 -0.178878 7.70091 0.79751L6.87855 1.86437C6.77244 1.99784 6.79897 2.19491 6.9316 2.3024C6.9316 2.3024 9.00961 3.96853 9.05382 4.00436C9.1953 4.13873 9.30141 4.31788 9.32794 4.53287C9.37215 4.95388 9.08035 5.34802 8.64706 5.40176C8.44368 5.42863 8.24915 5.36593 8.10767 5.24948L5.92355 3.51169C5.81744 3.43197 5.65828 3.44899 5.56985 3.55648L0.379264 10.2747C0.0432467 10.6958 -0.0717067 11.2422 0.0432467 11.7707L0.706439 14.6461C0.741809 14.7984 0.874448 14.9059 1.03361 14.9059L3.95166 14.87C4.48221 14.8611 4.9774 14.6192 5.31342 14.1893ZM9.40028 13.2918H14.1585C14.6227 13.2918 15.0003 13.6743 15.0003 14.1446C15.0003 14.6157 14.6227 14.9973 14.1585 14.9973H9.40028C8.93605 14.9973 8.55847 14.6157 8.55847 14.1446C8.55847 13.6743 8.93605 13.2918 9.40028 13.2918Z"></path>
                              </svg></a><a data-delete role="button" class="delete-button grey-text ms-3"><svg width="13" height="14" viewBox="0 0 14 15" fill="currentColor"  xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M12.9653 2.43223C13.2571 2.43223 13.5 2.67447 13.5 2.98272V3.26772C13.5 3.56846 13.2571 3.81821 12.9653 3.81821H0.53539C0.242895 3.81821 0 3.56846 0 3.26772V2.98272C0 2.67447 0.242895 2.43223 0.53539 2.43223H2.72217C3.16639 2.43223 3.55298 2.11648 3.65291 1.67098L3.76743 1.15949C3.9454 0.462745 4.53112 0 5.20145 0H8.29855C8.96158 0 9.55387 0.462745 9.72528 1.12274L9.84782 1.67023C9.94702 2.11648 10.3336 2.43223 10.7786 2.43223H12.9653ZM11.8542 12.8506C12.0825 10.7229 12.4822 5.66794 12.4822 5.61694C12.4968 5.46244 12.4465 5.3162 12.3466 5.19845C12.2393 5.0882 12.1037 5.02295 11.9541 5.02295H1.55123C1.40097 5.02295 1.25801 5.0882 1.1588 5.19845C1.05815 5.3162 1.00855 5.46244 1.01584 5.61694C1.01718 5.62631 1.03152 5.80438 1.0555 6.10207C1.16203 7.42451 1.45872 11.1077 1.65043 12.8506C1.7861 14.1346 2.62857 14.9416 3.84888 14.9708C4.79056 14.9926 5.76068 15.0001 6.75268 15.0001C7.68706 15.0001 8.63603 14.9926 9.60688 14.9708C10.8695 14.9491 11.7112 14.1564 11.8542 12.8506Z"></path>
                              </svg></a>
          </div></div>`
}

const setCutActions = (price) => {
    return `<div class="text-center"><a class=""
             data-mdb-toggle="collapse"
             href="#${price}"
             role="button"
             aria-expanded="false"
             aria-controls="${price}">
            <i class="fas fa-ellipsis grey-text"></i>
          </a>
          <div class="collapse id-target" id="${price}">
            <a data-edit role="button" class="edit-button grey-text"><svg data-edit width="14" height="14" viewBox="0 0 15 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M5.31342 14.1893L12.6351 4.72098C13.033 4.21039 13.1745 3.62008 13.0418 3.01902C12.9269 2.4726 12.5908 1.95305 12.0868 1.55891L10.8577 0.582526C9.78775 -0.268455 8.46137 -0.178878 7.70091 0.79751L6.87855 1.86437C6.77244 1.99784 6.79897 2.19491 6.9316 2.3024C6.9316 2.3024 9.00961 3.96853 9.05382 4.00436C9.1953 4.13873 9.30141 4.31788 9.32794 4.53287C9.37215 4.95388 9.08035 5.34802 8.64706 5.40176C8.44368 5.42863 8.24915 5.36593 8.10767 5.24948L5.92355 3.51169C5.81744 3.43197 5.65828 3.44899 5.56985 3.55648L0.379264 10.2747C0.0432467 10.6958 -0.0717067 11.2422 0.0432467 11.7707L0.706439 14.6461C0.741809 14.7984 0.874448 14.9059 1.03361 14.9059L3.95166 14.87C4.48221 14.8611 4.9774 14.6192 5.31342 14.1893ZM9.40028 13.2918H14.1585C14.6227 13.2918 15.0003 13.6743 15.0003 14.1446C15.0003 14.6157 14.6227 14.9973 14.1585 14.9973H9.40028C8.93605 14.9973 8.55847 14.6157 8.55847 14.1446C8.55847 13.6743 8.93605 13.2918 9.40028 13.2918Z"></path>
                              </svg></a><a data-delete role="button" class="delete-button grey-text ms-3"><svg width="13" height="14" viewBox="0 0 14 15" fill="currentColor"  xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M12.9653 2.43223C13.2571 2.43223 13.5 2.67447 13.5 2.98272V3.26772C13.5 3.56846 13.2571 3.81821 12.9653 3.81821H0.53539C0.242895 3.81821 0 3.56846 0 3.26772V2.98272C0 2.67447 0.242895 2.43223 0.53539 2.43223H2.72217C3.16639 2.43223 3.55298 2.11648 3.65291 1.67098L3.76743 1.15949C3.9454 0.462745 4.53112 0 5.20145 0H8.29855C8.96158 0 9.55387 0.462745 9.72528 1.12274L9.84782 1.67023C9.94702 2.11648 10.3336 2.43223 10.7786 2.43223H12.9653ZM11.8542 12.8506C12.0825 10.7229 12.4822 5.66794 12.4822 5.61694C12.4968 5.46244 12.4465 5.3162 12.3466 5.19845C12.2393 5.0882 12.1037 5.02295 11.9541 5.02295H1.55123C1.40097 5.02295 1.25801 5.0882 1.1588 5.19845C1.05815 5.3162 1.00855 5.46244 1.01584 5.61694C1.01718 5.62631 1.03152 5.80438 1.0555 6.10207C1.16203 7.42451 1.45872 11.1077 1.65043 12.8506C1.7861 14.1346 2.62857 14.9416 3.84888 14.9708C4.79056 14.9926 5.76068 15.0001 6.75268 15.0001C7.68706 15.0001 8.63603 14.9926 9.60688 14.9708C10.8695 14.9491 11.7112 14.1564 11.8542 12.8506Z"></path>
                              </svg></a>
          </div></div>`
}

