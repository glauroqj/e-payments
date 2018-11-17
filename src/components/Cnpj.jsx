import React, { Component } from 'react'
import * as firebase from 'firebase'
import { toast } from 'react-toastify'
import { SemipolarSpinner } from 'react-epic-spinners'

import {validateEach, validateAll, verifyErrorBag} from './modules/validateFields'
import Input from './Input'
import InputFormat from './InputFormat'

class Cnpj extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: '',
        name_president: '',
        name_donator: '',
        email: '',
        password: '',
        password_confirm: '',
        telephone: '',
        address: '',
        metier: '',
        cnpj: '',
      },
      requiredField: ['name', 'name_donator', 'password', 'password_confirm', 'email', 'address', 'telephone', 'cnpj'],
      errorBag: {
        name: [],
        name_donator: [],
        name_president: [],
        password: [],
        password_confirm: [],
        email: [],
        metier: [],
        address: [],
        telephone: [],
        cnpj: []
      },
      btnText: 'Criar Conta',
      btnLoading: false
    }
  }

  updateValue = (type) => (e) => {
    let form = this.state.form
    form[type] = e.target.value
    this.setState({form})
  }

  validate = (e) => {
    const {form, requiredField, errorBag} = this.state
    const { value, name } = e.target
    /* we need to send, name = {input name} | value = {input value} | requiredField = {array with required fields} | form = {state with the form values} */
    validateEach(name, value, requiredField, form).then((error) => {
      console.log('VALIDATE ERROR: ',error)
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
  }

  submit = (e) => {
    const {errorBag} = this.state
    e.preventDefault()
    validateAll().then((response) => {
      verifyErrorBag(errorBag).then((response) => {
        console.log('Now verify errorBag ', response)
        if (!response) {
          console.log('INVALID FORM')
          return false
        }
        this.createAcc()
      })
    })
  }

  createAcc = () => {
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
        firebase.database().ref('users/cnpj/' + userNew.uid).set({
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
        name_president: '',
        name_donator: '',
        email: '',
        password: '',
        password_confirm: '',
        telephone: '',
        address: ''
      }
      this.setState({
        form,
        btnText: 'Criar Conta',
        btnLoading: false
      })
    })
  }

  render() {
    const {form, errorBag} = this.state
    const name = {
      label: 'Nome da empresa',
      class: '',
      type: 'text',
      id: 'name',
      name: 'name',
      placeholder: 'Ex: Equale',
      callback: this.updateValue('name'),
      validate: this.validate,
      errorBag: errorBag.name,
      value: form.name
    }
    const name_donator = {
      label: 'Nome do doador/responsável',
      class: '',
      type: 'text',
      id: 'name_donator',
      name: 'name_donator',
      placeholder: 'Ex: Equale',
      callback: this.updateValue('name_donator'),
      validate: this.validate,
      errorBag: errorBag.name_donator,
      value: form.name_donator
    }
    const name_president = {
      label: 'Nome do doador/responsável',
      class: '',
      type: 'text',
      id: 'name_president',
      name: 'name_president',
      placeholder: 'Ex: Equale',
      callback: this.updateValue('name_president'),
      validate: this.validate,
      errorBag: errorBag.name_president,
      value: form.name_president
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
      mask: '99 9 9999-9999',
      callback: this.updateValue('telephone'),
      validate: this.validate,
      errorBag: errorBag.telephone,
      value: form.telephone
    }
    const metier = {
      label: 'Área de atuação da empresa',
      class: '',
      type: 'text',
      id: 'metier',
      name: 'metier',
      placeholder: 'Ex: consultoria, saúde, educação',
      callback: this.updateValue('metier'),
      validate: this.validate,
      errorBag: errorBag.metier,
      value: form.metier
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
    const cnpj = {
      label: 'CNPJ',
      class: '',
      type: 'tel',
      id: 'cnpj',
      name: 'cnpj',
      placeholder: '222.222.222-22',
      mask: '99.999.999/9999-99',
      callback: this.updateValue('cnpj'),
      validate: this.validate,
      errorBag: errorBag.cnpj,
      value: form.cnpj
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
    let col_xs_4 = 'col-sm-4'
    let error_name = ''
    let error_name_donator = ''
    let error_name_president = ''
    let error_email = ''
    let error_telephone = ''
    let error_metier = ''
    let error_password = ''
    let error_password_confirm = ''
    let error_cnpj = ''
    let error_address = ''
    if (errorBag.name.length > 0) {
      error_name += ' has-danger'
    }
    if (errorBag.name_donator.length > 0) {
      error_name_donator += ' has-danger'
    }
    if (errorBag.name_president.length > 0) {
      error_name_president += ' has-danger'
    }
    if (errorBag.email.length > 0) {
      error_email += ' has-danger'
    }
    if (errorBag.telephone.length > 0) {
      error_telephone += ' has-danger'
    }
    if (errorBag.metier.length > 0) {
      error_metier += ' has-danger'
    }
    if (errorBag.password.length > 0) {
      error_password += ' has-danger'
    }
    if (errorBag.password_confirm.length > 0) {
      error_password_confirm += ' has-danger'
    }
    if (errorBag.cnpj.length > 0) {
      error_cnpj += ' has-danger'
    }
    if (errorBag.address.length > 0) {
      error_address += ' has-danger'
    }

    return (
      <div className="cnpj">
        <form action=""
          onKeyDown={
            (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
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
                    <div className={col_xs_4 + error_name_donator}>
                      <Input {...name_donator} />
                    </div>
                    <div className={col_xs_4 + error_name_president}>
                      <Input {...name_president} />
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className={col_xs_4 + error_email}>
                      <Input {...email} />
                    </div>
                    <div className={col_xs_4 + error_telephone}>
                      <InputFormat {...telephone} />
                    </div>
                    <div className={col_xs_4 + error_metier}>
                      <Input {...metier} />
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className={col_xs_4 + error_password}>
                      <Input {...password} />
                    </div>
                    <div className={col_xs_4 + error_password_confirm}>
                      <Input {...password_confirm} />
                    </div>
                    <div className={col_xs_4 + error_cnpj}>
                      <InputFormat {...cnpj} />
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
      </div>
    )
  }

}

export default Cnpj;