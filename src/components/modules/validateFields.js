// import * as moment from 'moment'
// import {verifyCpf} from './verifyCpf'
// import {verifyCnpj} from './verifyCnpj'
/* I'm not using polyfill {babel} :( */
const moment = require('moment')
const {verifyCpf} = require('./verifyCpf')
/* name = {input name} | value = {input value} | requiredField = {array with required fields} | form = {state with the form values} */
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
    if ((form.password.length <= 6 && name === 'password') || (form.password_confirm.length <= 6 && name === 'password_confirm')) {
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

    /* validate date birth */
    if (!moment(form.dateBirth, 'DD/MM/YYYY',true).isValid() && form.dateBirth !== '' && name === 'dateBirth') {
      errors.push('invalidDateBirth')
    }
    if (moment(form.dateBirth, 'DD/MM/YYYY',true).isValid() && name === 'dateBirth') {
      errors.splice('invalidDateBirth', 1)
    }

    /* validate CPF */
    if (!verifyCpf(form.cpf) && name === 'cpf') {
      errors.push('invalidCpf')
    }    
    if (verifyCpf(form.cpf) && name === 'cpf') {
      errors.splice('invalidCpf', 1)
    }

    /* return array of errors to set on state */
    resolve(errors)
  })
}

function validateAll() {
  let inputs = document.querySelectorAll('form input')
  inputs = Array.from(inputs) /* convert NodeList to array */
  return new Promise((resolve) => {
    const validations = inputs.map((element, index) => {
      const {value} = element
      /* verify if input use component format, bug if focus on this inputs :( */
      if (value === '') {
        element.focus()
        element.blur()
      }
      return index
    })

    /* just resolce if inputs.length === count */
    if (inputs.length === validations.length) {
      // console.log('validations', validations.length, ' Inputs: ', inputs.length)
      resolve(true)
    }
    // resolve(true)
  })
}

function verifyErrorBag(errorBag) {
  console.log('Receive: ', errorBag)
  const errorsArray = Object.keys(errorBag)
  // console.log(errorsArray)
  return new Promise((resolve) => {
    errorsArray.map((name) => {
      let error = errorBag[name].length
      if (error > 0) {
        resolve(false)
      }
      // console.log(error)
    })
    resolve(true)
  })
}

module.exports = {validateEach, validateAll, verifyErrorBag}