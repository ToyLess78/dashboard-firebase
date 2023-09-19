function showPassword() {
    const btnEye = document.querySelector('#eye-password')
    const inputPassword = document.querySelector('#form1Example24')

    btnEye.addEventListener('click', () => {
      btnEye.classList.toggle('fa-eye-slash')
      btnEye.classList.toggle('fa-eye')

      if (inputPassword.getAttribute('type') === 'password') {
        inputPassword.setAttribute('type', 'text')
      } else {
        inputPassword.setAttribute('type', 'password')
      }
    })
  }
  showPassword()