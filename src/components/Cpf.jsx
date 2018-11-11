import React, { Component } from 'react'
import * as firebase from 'firebase'
// import axios from 'axios'
import * as moment from 'moment'
import { toast } from 'react-toastify'
import { SemipolarSpinner } from 'react-epic-spinners'
import {verifyCpf} from './modules/verifyCpf'

import {validateEach, validateAll} from './modules/validateFields'

import Input from './Input'
import InputFormat from './InputFormat'
import LoadingCard from './LoadingCard'

class Cpf extends Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {
        name: '',
        email: '',
        password: '',
        password_confirm: '',
        telephone: '',
        job: '',
        address: '',
        dateBirth: '',
        cpf: '',
        nationality: '',
        marital_status: 'solteira(o)'
      },
      requiredField: ['name', 'password', 'password_confirm', 'email', 'address', 'telephone', 'cpf', 'job', 'dateBirth', 'nationality'],
      errorBag: {
        name: [],
        password: [],
        password_confirm: [],
        email: [],
        address: [],
        telephone: [],
        cpf: [],
        job: [],
        dateBirth: [],
        nationality: []
      },
      btnText: 'Criar Conta',
      btnLoading: false,
      loadingTemplate: false
    }
  }

  updateValue = (type) => (e) => {
    let form = this.state.form
    form[type] = e.target.value
    this.setState({form})
  }

  updateValueFormat = (type) => (e) => {
    let form = this.state.form
    form[type] = e.formattedValue
    this.setState({form})
  }

  validate = (e) => {
    const {form, requiredField, errorBag} = this.state
    const { value, name } = e.target
    /* we need to send, name = {input name} | value = {input value} | requiredField = {array with required fields} | form = {state with the form values} */
    validateEach(name, value, requiredField, form).then((error) => {
      console.log('ERROR: ',error)
      /* reset error, avoid same errors on bag */
      errorBag[name] = []
      /* set error */
      errorBag[name] = error
      if (error === null) {
        /* reset error to empty */
        errorBag[name] = []
      }
      console.log('Error BAG: ', errorBag)
      this.setState({errorBag})
    })

    // let inputs = document.querySelectorAll('input')
    // for (let i = 0; i < inputs.length; i++ ) {
    //   /* add error */
    //   if (requiredField.indexOf(name) > -1 && value === '') {
    //     let error = errorBag[name]
    //     error.push(name)
    //     this.setState({errorBag})
    //   }
    //   /* remove error */
    //   if(inputs[i].value !== '') {
    //     errorBag[inputs[i].name] = []
    //     this.setState({errorBag})
    //   }
    // }
  }

  submit = (e) => {
    validateAll().then((result) => {
      // console.log('Validate ALL: ', result)
    })
    // let errorBag = Object.keys(this.state.errorBag)
    // if(errorBag.length > 0) {
    //   return false
    // }
    // this.createAcc(e)
  }

  createAcc = (e) => {
    e.preventDefault()
    let form = this.state.form
    this.setState({
      btnText: 'Criando Conta...',
      btnLoading: true
    })

    firebase.auth().createUserWithEmailAndPassword(form.email, form.password)
    .then((success) => {
      let userNew = firebase.auth().currentUser
      console.log('NEW USER: ', userNew)
      // update on profile
      userNew.updateProfile({
        // photoURL: this.state.instagram.profile_pic_url,
        displayName: form.name
      })
      .then(() => {
        delete form.password
        delete form.password_confirm
        firebase.database().ref('users/cpf/' + userNew.uid).set({
          information: form
        })
        .then((success) => {
          console.log('Saved: ')
          window.location = '/dashboard'
        })
      })

    })
    .catch((error) => {
      console.warn(error)
      if(error.code === 'auth/invalid-email') {
        toast.error('Email inexistente!')
      }
      if(error.code === 'auth/weak-password') {
        toast.error('Senha muito fraca! Mínimo de 6 caracteres')
      }
      if(error.code === 'auth/email-already-in-use') {
        toast.error('Email já utilizado.')
      }
      toast.error('Não foi possível completar seu cadastro no momento :(')

      form = {
        name: '',
        email: '',
        password: '',
        password_confirm: '',
        telephone: '',
        job: '',
        address: '',
        dateBirth: '',
        cpf: '',
        nationality: ''
      }
      this.setState({
        form,
        btnText: 'Criar Conta',
        btnLoading: false
      })
    })
  }

  render() {
    const {form, errorBag, loadingTemplate} = this.state
    const name = {
      label: 'Nome Completo',
      class: '',
      type: 'text',
      id: 'nome',
      name: 'name',
      placeholder: 'Ex: Valdeir Santana',
      callback: this.updateValue('name'),
      validate: this.validate,
      errorBag: errorBag.name,
      value: form.name
    }
    const email = {
      label: 'E-mail',
      class: '',
      type: 'email',
      id: 'email',
      name: 'email',
      placeholder: 'Ex: exemplo@gmail.com',
      callback: this.updateValue('email'),
      validate: this.validate,
      errorBag: errorBag.email,
      value: form.email
    }
    const telephone = {
      label: 'Telefone',
      class: '',
      type: 'tel',
      id: 'telephone',
      name: 'telephone',
      placeholder: '(31) 9 8765-4321',
      format: '(##) # ####-####',
      mask: '',
      callback: this.updateValueFormat('telephone'),
      validate: this.validate,
      errorBag: errorBag.telephone,
      value: form.telephone
    }
    const password = {
      label: 'Senha',
      class: '',
      type: 'password',
      id: 'password',
      name: 'password',
      placeholder: 'Ex: exemplo@gmail.com',
      callback: this.updateValue('password'),
      validate: this.validate,
      errorBag: errorBag.password,
      value: form.password
    }
    const password_confirm = {
      label: 'Confirmar Senha',
      class: '',
      type: 'password',
      id: 'password_confirm',
      name: 'password_confirm',
      placeholder: 'Ex: exemplo@gmail.com',
      callback: this.updateValue('password_confirm'),
      validate: this.validate,
      errorBag: errorBag.password_confirm,
      value: form.password_confirm
    }
    const job = {
      label: 'Profissão',
      class: '',
      type: 'text',
      id: 'job',
      name: 'job',
      placeholder: 'Ex: exemplo@gmail.com',
      callback: this.updateValue('job'),
      validate: this.validate,
      errorBag: errorBag.job,
      value: form.job
    }
    const dateBirth = {
      label: 'Data de Nascimento',
      class: '',
      type: 'tel',
      id: 'dateBirth',
      name: 'dateBirth',
      placeholder: '10/11/1980',
      format: '##/##/####',
      mask: '',
      callback: this.updateValueFormat('dateBirth'),
      validate: this.validate,
      errorBag: errorBag.dateBirth,
      value: form.dateBirth          
    }
    const cpf = {
      label: 'CPF',
      class: '',
      type: 'tel',
      id: 'cpf',
      name: 'cpf',
      placeholder: '222.222.222-22',
      format: '###.###.###-##',
      mask: '',
      callback: this.updateValueFormat('cpf'),
      validate: this.validate,
      errorBag: errorBag.cpf,
      value: form.cpf
    }
    const nationality = {
      label: 'Nacionalidade',
      class: '',
      type: 'text',
      id: 'nationality',
      name: 'nationality',
      placeholder: 'Ex: exemplo@gmail.com',
      callback: this.updateValue('nationality'),
      validate: this.validate,
      errorBag: errorBag.nationality,
      value: form.nationality
    }
    const address = {
      label: 'Endereço (nome da rua, número, bairro, cidade e estado)',
      class: '',
      type: 'text',
      id: 'address',
      name: 'address',
      placeholder: 'Ex: Rua Nossa Senhora do Carmo, 1571, São Pedro, Belo Horizonte-MG',
      callback: this.updateValue('address'),
      validate: this.validate,
      errorBag: errorBag.address,
      value: form.address
    }
    let col_xs_12 = 'col-sm-12'
    let col_xs_3 = 'col-sm-3'
    let col_xs_4 = 'col-sm-4'
    let error_name = ''
    let error_email = ''
    let error_telephone = ''
    let error_password = ''
    let error_password_confirm = ''
    let error_job = ''
    let error_dateBirth = ''
    let error_cpf = ''
    let error_nationality = ''
    let error_address = ''
    if (errorBag.name.length > 0) {
      error_name += ' has-danger'
    }
    if (errorBag.email.length > 0) {
      error_email += ' has-danger'
    }
    if (errorBag.telephone.length > 0) {
      error_telephone += ' has-danger'
    }
    if (errorBag.password.length > 0) {
      error_password += ' has-danger'
    }
    if (errorBag.password_confirm.length > 0) {
      error_password_confirm += ' has-danger'
    }
    if (errorBag.job.length > 0) {
      error_job += ' has-danger'
    }
    if (errorBag.dateBirth.length > 0) {
      error_dateBirth += ' has-danger'
    }
    if (errorBag.cpf.length > 0) {
      error_cpf += ' has-danger'
    }
    if (errorBag.nationality.length > 0) {
      error_nationality += ' has-danger'
    }
    if (errorBag.address.length > 0) {
      error_address += ' has-danger'
    }

    return (
      <div className="cpf">
        {loadingTemplate && (
          <LoadingCard text={'Criando conta...'} size={70} color={'#323232'} />
        )}
        {!loadingTemplate && (
          <form action=""
            onKeyDown={
              (e) => {
                  if (e.key === 'Enter') {
                      e.preventDefault()
                      this.submit(e)
                  }
              }
            }
          >
            <div className="card border-secondary mb-3">
              <div className="card-body">
                <div className="row-fluid">
                  <div className="form-horizontal">
                    <div className="form-group row">
                      <div className={col_xs_4 + error_name}>
                        <Input {...name} />
                      </div>
                      <div className={col_xs_4 + error_email}>
                        <Input {...email} />
                      </div>
                      <div className={col_xs_4 + error_telephone}>
                        <InputFormat {...telephone} />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className={col_xs_4 + error_password}>
                        <Input {...password} />
                      </div>
                      <div className={col_xs_4 + error_password_confirm}>
                        <Input {...password_confirm} />
                      </div>
                      <div className={col_xs_4 + error_job}>
                        <Input {...job} />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className={col_xs_3 + error_dateBirth}>
                        <InputFormat {...dateBirth} />
                      </div>

                      <div className={col_xs_3 + error_cpf}>
                        <InputFormat {...cpf} />
                      </div>

                      <div className={col_xs_3 + error_nationality}>
                        <Input {...nationality} />
                      </div>

                      <div className="col-sm-3">
                        <label className="control-label" htmlFor="marital_status">Estado Civil</label>
                        <select className="custom-select " id="marital_status" name="marital_status" onChange={this.updateValue('marital_status')}>
                          <option value="solteira(o)">Solteira(o)</option>
                          <option value="casada(o)">Casada(o)</option>
                          <option value="divorciada(o)">Divorciada(o)</option>
                          <option value="viuva(o)">Viúva(o)</option>
                        </select>
                      </div>

                    </div>

                    <div className="form-group row">
                      <div className={col_xs_12 + error_address}>
                        <Input {...address} />
                      </div>
                    </div>
                    
                    <div className="form-group row mt-5">
                      <div className="col-sm-12">
                        <button type="button" id="button-confirm" className={"btn btn-block btn-success btn-donation "+(this.state.btnLoading?'disabled':'')} disabled={this.state.btnLoading} onClick={this.submit}>
                          {this.state.btnLoading &&
                            <SemipolarSpinner size={30} color="white"/>
                          }
                          <div>{this.state.btnText}</div>                        
                        </button>
                      </div>
                    </div>
                  </div>
                </div> {/* row-fluid */}
              </div> {/*  card-body */}
            </div> {/* card */}
          </form>
        )}
      </div>
    )
  }

}

export default Cpf