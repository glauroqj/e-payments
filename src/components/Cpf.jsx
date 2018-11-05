import React, { Component } from 'react'
import * as firebase from 'firebase'
// import axios from 'axios'
import * as moment from 'moment'
import { toast } from 'react-toastify'
import CurrencyFormat from 'react-currency-format'
import { SemipolarSpinner } from 'react-epic-spinners'
import {verifyCpf} from './modules/verifyCpf'

import Input from './Input'
import InputFormat from './InputFormat'

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
      btnLoading: false
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
    const {form, requiredField} = this.state
    let verifyEmail = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm
    let errorBag = {
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
    }
    let inputs = document.querySelectorAll('input')
    for (let i = 0; i < inputs.length; i++ ) {
      /* add error */
      if(requiredField.indexOf(inputs[i].name) > -1 && inputs[i].value === '') {
        let error = errorBag[inputs[i].name]
        // errorBag[inputs[i].name] = inputs[i].name
        error.push(inputs[i].name)
        // console.log(error)
        this.setState({errorBag})
      }
      /* remove error */
      if(inputs[i].value !== '') {
        // delete errorBag[inputs[i].name]
        errorBag[inputs[i].name] = []
        this.setState({errorBag})
      }
    }

    // /* invalid password */
    // if(this.state.form.password.length <= 6) {
    //   errorBag.password = 'password'
    //   this.setState({errorBag})
    // }
    // if(this.state.form.password !== this.state.form.password_confirm) {
    //   errorBag.password = 'password'
    //   this.setState({errorBag})
    // }
    // if((this.state.form.password.length >= 6 && this.state.form.password === this.state.form.password_confirm && this.state.form.password !== '')) {
    //   delete errorBag.password
    //   this.setState({errorBag})
    // }

    // /* invalid email */
    // if(!verifyEmail.test(this.state.form.email)) {
    //   errorBag.email = 'email'
    //   this.setState({errorBag})
    // }
    // if(verifyEmail.test(this.state.form.email)) {
    //   delete errorBag.email
    //   this.setState({errorBag})
    // }
    // /* date birth */
    // if(!moment(this.state.form.dateBirth, 'DD/MM/YYYY',true).isValid() && this.state.form.dateBirth !== '') {
    //   errorBag.dateBirth = 'dateBirth'
    //   this.setState({errorBag})
    // }
    // if(moment(this.state.form.dateBirth, 'DD/MM/YYYY',true).isValid()) {
    //   delete errorBag.dateBirth
    //   this.setState({errorBag})
    // }
    
    // if(!verifyCpf(this.state.form.cpf)) {
    //   errorBag.invalidCpf = 'invalidCpf'
    //   this.setState({errorBag})
    // }    
    // if(verifyCpf(this.state.form.cpf)) {
    //   delete errorBag.invalidCpf
    //   this.setState({errorBag})
    // }
  }

  submit = (e) => {
    this.validate()
    let errorBag = Object.keys(this.state.errorBag)
    if(errorBag.length > 0) {
      return false
    }
    this.createAcc(e)
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
    const {form, errorBag} = this.state
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

    let col_xs_4 = 'col-sm-4'
    let error_name = ''
    if (errorBag.name.length > 0) {
      error_name += ' has-danger'
    }

    return (
      <div className="cpf">
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

                    {/* <div className={'col-sm-4 '+(this.state.errorBag['name'] && this.state.form.name === '' ? 'has-danger' : '')}>
                      <label className="control-label" htmlFor="nome">Nome Completo</label>
                      <input className={"form-control "+(this.state.errorBag['name'] && this.state.form.name === '' ?'is-invalid':'')} type="text" id="name" name="name" placeholder="Ex: Valdeir Santana" value={this.state.form.name} onChange={this.updateValue('name')} />
                      {(this.state.errorBag['name'] && this.state.form.name === '') &&
                        <div className="invalid-feedback">Campo Obrigatório</div>
                      }
                    </div> */}

                    <div className={'col-sm-4 '+((this.state.errorBag['email'] && this.state.form.email === '') || (this.state.errorBag['email']) ? 'has-danger' : '')}>
                      <label className="control-label" htmlFor="email">E-mail</label>
                      <input className={"form-control "+((this.state.errorBag['email'] && this.state.form.email === '') || (this.state.errorBag['email']) ?'is-invalid':'')} type="email" id="email" name="email" placeholder="Ex: exemplo@gmail.com" value={this.state.form.email} onChange={this.updateValue('email')} />
                      {(this.state.errorBag['email'] && this.state.form.email === '') &&
                        <div className="invalid-feedback">Campo Obrigatório</div>
                      }
                      {(this.state.errorBag['email']) &&
                        <div className="invalid-feedback">E-mail inválido</div>
                      }
                    </div>

                    <div className={'col-sm-4 '+(this.state.errorBag['telephone'] && this.state.form.telephone === '' ? 'has-danger' : '')}>
                      <label className="control-label" htmlFor="telephone">Telefone</label>
                      <CurrencyFormat
                        className={'form-control '+(this.state.errorBag['telephone'] && this.state.form.telephone === '' ?'is-invalid':'')}
                        placeholder={'(31) 9 8765-4321'}
                        allowNegative={false}
                        format={'(##) # ####-####'}
                        mask={''}
                        id={'telephone'}
                        name={'telephone'}
                        value={this.state.form.telephone}
                        onValueChange={this.updateValue('telephone')}
                      />
                      {(this.state.errorBag['telephone'] && this.state.form.telephone === '') &&
                        <div className="invalid-feedback">Campo Obrigatório</div>
                      }
                    </div>

                  </div>

                  <div className="form-group row">

                    <div className={'col-sm-4 '+((this.state.errorBag['password'] && this.state.form.password === '') || (this.state.form.password !== this.state.form.password_confirm) || (this.state.form.password.length < 6 && this.state.form.password !== '') ? 'has-danger' : '')}>
                      <label className="control-label" htmlFor="password">Senha</label>
                      <input className={'form-control '+((this.state.errorBag['password'] && this.state.form.password === '') || (this.state.form.password !== this.state.form.password_confirm) || (this.state.form.password.length < 6 && this.state.form.password !== '') ?'is-invalid':'')} type="password" name="password" id="password" placeholder="*****" value={this.state.form.password} onChange={this.updateValue('password')}/>
                      {(this.state.errorBag['password'] && this.state.form.password === '') &&
                        <div className="invalid-feedback">Campo Obrigatório</div>
                      }
                      {(this.state.form.password !== this.state.form.password_confirm) &&
                        <div className="invalid-feedback">As senhas precisam ser idênticas, preencha (confirmar senha)</div>
                      }
                      {(this.state.errorBag['password'] && this.state.form.password.length < 6) &&
                        <div className="invalid-feedback">A senha deve conter no mínimo 6 dígitos</div>
                      }                     
                    </div>
                    <div className={"col-sm-4 "+(this.state.errorBag['password_confirm'] && this.state.form.password_confirm === '' ? 'has-danger' : '')}>
                      <label className="control-label" htmlFor="password_confirm">Confirmar Senha</label>
                      <input className={'form-control '+(this.state.errorBag['password_confirm'] && this.state.form.password_confirm === '' ?'is-invalid':'')} type="password" name="password_confirm" id="password_confirm" placeholder="*****" value={this.state.form.password_confirm} onChange={this.updateValue('password_confirm')}/>
                      {(this.state.errorBag['password_confirm'] && this.state.form.password_confirm === '') &&
                        <div className="invalid-feedback">Campo Obrigatório</div>
                      }
                    </div>

                    <div className={'col-sm-4 '+(this.state.errorBag['job'] && this.state.form.job === '' ? 'has-danger' : '')}>
                      <label className="control-label" htmlFor="job">Profissão</label>
                      <input className={'form-control '+(this.state.errorBag['job'] && this.state.form.job === '' ?'is-invalid':'')} type="text" name="job" id="job" placeholder="Professor, empresário, médico..." value={this.state.form.job} onChange={this.updateValue('job')}/>
                      {(this.state.errorBag['job'] && this.state.form.job === '') &&
                        <div className="invalid-feedback">Campo Obrigatório</div>
                      }
                    </div>

                  </div>

                  <div className="form-group row">
                    <div className={'col-sm-3 '+( (this.state.errorBag['dateBirth'] && this.state.form.dateBirth === '') || (this.state.errorBag['dateBirth'] && this.state.form.dateBirth !== '') ? 'has-danger' : '')}>
                      <label className="control-label" htmlFor="dateBirth">Data de Nascimento</label>
                      <CurrencyFormat
                        className={'form-control '+( (this.state.errorBag['dateBirth'] && this.state.form.dateBirth === '') || (this.state.errorBag['dateBirth'] && this.state.form.dateBirth !== '') ?'is-invalid':'')}
                        placeholder={'10/11/1980'}
                        allowNegative={false}
                        format={'##/##/####'}
                        mask={''}
                        id={'dateBirth'}
                        name={'dateBirth'}
                        value={this.state.form.dateBirth}
                        onValueChange={this.updateValue('dateBirth')}
                      />
                      {(this.state.errorBag['dateBirth'] && this.state.form.dateBirth !== '') &&
                        <div className="invalid-feedback">Data inválida</div>
                      }
                      {(this.state.errorBag['dateBirth'] && this.state.form.dateBirth === '') &&
                        <div className="invalid-feedback">Campo Obrigatório</div>
                      }
                    </div>

                    <div className={'col-sm-3 '+((this.state.errorBag['cpf'] && this.state.form.cpf === '') || (this.state.errorBag['invalidCpf'] && this.state.form.cpf !== '') ? 'has-danger' : '')}>
                      <label className="control-label" htmlFor="cpf">CPF</label>
                      <CurrencyFormat
                        className={'form-control '+((this.state.errorBag['cpf'] && this.state.form.cpf === '') || (this.state.errorBag['invalidCpf'] && this.state.form.cpf !== '') ?'is-invalid':'')}
                        placeholder={'222.222.222-22'}
                        allowNegative={false}
                        id="cpf" 
                        name="cpf"
                        format={'###.###.###-##'}
                        value={this.state.form.cpf}
                        onValueChange={this.updateValue('cpf')}
                      />
                      {(this.state.errorBag['cpf'] && this.state.form.cpf === '') &&
                        <div className="invalid-feedback">Campo Obrigatório</div>
                      }
                      {(this.state.errorBag['invalidCpf'] && this.state.form.cpf !== '') &&
                        <div className="invalid-feedback">CPF inválido</div>
                      }
                    </div>

                    <div className={'col-sm-3 '+(this.state.errorBag['nationality'] && this.state.form.nationality === '' ? 'has-danger' : '')}>
                      <label className="control-label" htmlFor="nationality">Nacionalidade</label>
                      <input className={"form-control "+(this.state.errorBag['nationality'] && this.state.form.nationality === '' ?'is-invalid':'')} type="text" id="nationality" name="nationality" placeholder="Ex: Brasileiro" value={this.state.form.nationality} onChange={this.updateValue('nationality')} />
                      {(this.state.errorBag['nationality'] && this.state.form.nationality === '') &&
                        <div className="invalid-feedback">Campo Obrigatório</div>
                      }
                    </div>

                    <div className={'col-sm-3 '+(this.state.errorBag['marital_status'] && this.state.form.marital_status === '' ? 'has-danger' : '')}>
                      <label className="control-label" htmlFor="marital_status">Estado Civil</label>
                      <select className={"custom-select "+(this.state.errorBag['marital_status'] && this.state.form.marital_status === '' ?'is-invalid':'')} id="marital_status" name="marital_status" onChange={this.updateValue('marital_status')}>
                        <option value="solteira(o)">Solteira(o)</option>
                        <option value="casada(o)">Casada(o)</option>
                        <option value="divorciada(o)">Divorciada(o)</option>
                        <option value="viuva(o)">Viúva(o)</option>
                      </select>
                      {(this.state.errorBag['marital_status'] && this.state.form.marital_status === '') &&
                        <div className="invalid-feedback">Campo Obrigatório</div>
                      }
                    </div>

                  </div>

                  <div className="form-group row">
                    <div className={'col-sm-12 '+(this.state.errorBag['address'] && this.state.form.address === '' ? 'has-danger' : '')}>
                        <label className="control-label" htmlFor="adress">Endereço (nome da rua, número, bairro, cidade e estado)</label>
                        <input className={'form-control '+(this.state.errorBag['address'] && this.state.form.address === '' ?'is-invalid':'')} type="text" name="address" id="address" placeholder="Ex: Rua Nossa Senhora do Carmo, 1571, São Pedro, Belo Horizonte-MG" value={this.state.form.address} onChange={this.updateValue('address')}/>
                        {(this.state.errorBag['address'] && this.state.form.address === '') &&
                          <div className="invalid-feedback">Campo Obrigatório</div>
                        }
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

export default Cpf