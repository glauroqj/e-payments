// import * as moment from 'moment'
// import {verifyCpf} from './verifyCpf'
// import {verifyCnpj} from './verifyCnpj'
/* I'm not using polyfill {babel} :( */
// const moment = require('moment')
function validateEach(name, value, requiredField, form) {
  let verifyEmail = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm
  let errors = []
  return new Promise((resolve) => {
    /* if field is empty and required set error */
    if (requiredField.indexOf(name) > -1 && value === '') {
      errors.push(name)
    }
    /* if field is not empty and required remove error */
    if (requiredField.indexOf(name) > -1 && value !== '') {
      errors.splice(name, 1)
    }

    /* validate email */
    if (!verifyEmail.test(form.email) && name === 'email') {
      errors.push('invalidEmail')
    }
    if (verifyEmail.test(form.email) && name === 'email') {
      errors.splice('invalidEmail', 1)
    }

    /* invalid password */
    if ((form.password.length <= 6 && name === 'password') || form.password_confirm.length <= 6 && name === 'password_confirm') {
      errors.push('minCharacterPassword')
    }
    if ((form.password.length >= 6 && name === 'password') || (form.password_confirm.length >= 6 && name === 'password_confirm')) {
      errors.splice('minCharacterPassword', 1)
    }
    if (form.password !== form.password_confirm && name === 'password_confirm') {
      errors.push('invalidPassword')
    }
    if (form.password === form.password_confirm && name === 'password_confirm') {
      errors.splice('invalidPassword', 1)
    }

    /* return array of errors to set on state */
    resolve(errors)
  })

  // /* date birth */
  // if (!moment(form.dateBirth, 'DD/MM/YYYY',true).isValid() && form.dateBirth !== '') {
  //   let error = errorBag.dateBirth
  //   error.push('invalidDateBirth')
  //   this.setState({errorBag})
  // }
  // if (moment(form.dateBirth, 'DD/MM/YYYY',true).isValid()) {
  //   errorBag.dateBirth = []
  //   this.setState({errorBag})
  // }
  
  // if (!verifyCpf(this.state.form.cpf)) {
  //   let error = errorBag.cpf
  //   error.push('invalidCpf')
  //   this.setState({errorBag})
  // }    
  // if (verifyCpf(this.state.form.cpf)) {
  //   errorBag.cpf = []
  //   this.setState({errorBag})
  // }
}

function validateAll() {
  return new Promise((resolve) => {
    let inputs = document.querySelectorAll('form input')
    for (let i = 0; i < inputs.length; i++) {
      // inputs[i].focus()
      inputs[i].blur()
    }
    resolve(true)
  })
}

module.exports = {validateEach, validateAll}