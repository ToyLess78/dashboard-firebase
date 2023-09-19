const button = document.querySelector('.button');
const currentTheme = localStorage.getItem('theme') || 'light';
const event = new Event("changeTheme",{bubbles: true});

button.addEventListener('click', function () {
    button.dispatchEvent(event);
    const theme = localStorage.getItem('theme'); 
    document.documentElement.setAttribute('data-theme', theme === 'light' ? 'dark' : 'light');
    localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
});
document.documentElement.setAttribute('data-theme', currentTheme);
// console.log(localStorage.length, window.localStorage);





