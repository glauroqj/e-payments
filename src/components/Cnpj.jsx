import React, { Component } from 'react'
import * as firebase from 'firebase'
// import axios from 'axios'
import { toast } from 'react-toastify'
import CurrencyFormat from 'react-currency-format'
import { SemipolarSpinner } from 'react-epic-spinners'
import {verifyCnpj} from './modules/verifyCnpj'

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
        cnpj: ''
      },
      requiredField: ['name', 'name_donator', 'password', 'password_confirm', 'email', 'address', 'telephone', 'cnpj'],
      errorBag: {},
      btnText: 'Criar Conta',
      btnLoading: false
    }
  }

  updateValue = (type) => (e) => {
    let state = this.state;
    let options = ['telephone', 'cnpj']
    
    if(options.indexOf(type) > -1) {
      state.form[type] = e.formattedValue;
      this.setState(state);
      return false;
    }

    state.form[e.target.name] = e.target.value;
    this.setState(state);
  }

  validate = (e) => {
    let verifyEmail = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm;
    let errorBag = this.state.errorBag;
    let inputs = document.querySelectorAll('input');
    for (let i = 0; i < inputs.length; i++ ) {
      /* add error mandatory */
      if(this.state.requiredField.indexOf(inputs[i].name) > -1 && inputs[i].value === '') {
        errorBag[inputs[i].name] = inputs[i].name
        this.setState({errorBag});
      }
      /* remove error mandatory */
      if(inputs[i].value !== '') {
        delete errorBag[inputs[i].name];
        this.setState({errorBag});
      }
    }

    /* invalid password */
    if(this.state.form.password.length <= 6) {
      errorBag.password = 'password';
      this.setState({errorBag});
    }
    if(this.state.form.password !== this.state.form.password_confirm) {
      errorBag.password = 'password';
      this.setState({errorBag});
    }
    if((this.state.form.password.length >= 6 && this.state.form.password === this.state.form.password_confirm && this.state.form.password !== '')) {
      delete errorBag.password;
      this.setState({errorBag}); 
    }

    /* invalid email */
    if(!verifyEmail.test(this.state.form.email)) {
      errorBag.email = 'email';
      this.setState({errorBag});
    }
    if(verifyEmail.test(this.state.form.email)) {
      delete errorBag.email;
      this.setState({errorBag}); 
    }

    if(!verifyCnpj(this.state.form.cnpj)) {
      errorBag.invalidCnpj = 'invalidCnpj'
      this.setState({errorBag})
    }
    if(verifyCnpj(this.state.form.cnpj)) {
      delete errorBag.invalidCnpj
      this.setState({errorBag})
    }
  }

  submit = (e) => {
    this.validate();
    let errorBag = Object.keys(this.state.errorBag);
    if(errorBag.length > 0) {
      return false;
    }
    this.createAcc(e);
  }

  createAcc = (e) => {
    e.preventDefault();
    let form = this.state.form;
    this.setState({
      btnText: 'Criando Conta...',
      btnLoading: true
    });

    firebase.auth().createUserWithEmailAndPassword(form.email, form.password)
    .then((success) => {
      let userNew = firebase.auth().currentUser;
      console.log('NEW USER: ', userNew)
      // update on profile
      userNew.updateProfile({
        // photoURL: this.state.instagram.profile_pic_url,
        displayName: form.name
      })
      .then(() => {
        delete form.password;
        delete form.password_confirm;
        firebase.database().ref('users/cnpj/' + userNew.uid).set({
          information: form
        })
        .then((success) => {
          console.log('Saved: ');
          window.location = '/dashboard'
        });
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
      });
    });
  }

  render() {
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

                    <div className={'col-sm-4 '+(this.state.errorBag['name'] && this.state.form.name === '' ? 'has-danger' : '')}>
                      <label className="control-label" htmlFor="nome">Nome da empresa</label>
                      <input className={"form-control "+(this.state.errorBag['name'] && this.state.form.name === '' ?'is-invalid':'')} type="text" id="name" name="name" placeholder="Ex: Equale" value={this.state.form.name} onChange={this.updateValue('name')} />
                      {(this.state.errorBag['name'] && this.state.form.name === '') &&
                        <div className="invalid-feedback">Campo Obrigatório</div>
                      }
                    </div>

                    <div className={'col-sm-4 '+(this.state.errorBag['name_donator'] && this.state.form.name_donator === '' ? 'has-danger' : '')}>
                      <label className="control-label" htmlFor="nome">Nome do doador/responsável</label>
                      <input className={"form-control "+(this.state.errorBag['name_donator'] && this.state.form.name_donator === '' ?'is-invalid':'')} type="text" id="name_donator" name="name_donator" placeholder="Ex: Valdeir Santana" value={this.state.form.name_donator} onChange={this.updateValue('name_donator')} />
                      {(this.state.errorBag['name_donator'] && this.state.form.name_donator === '') &&
                        <div className="invalid-feedback">Campo Obrigatório</div>
                      }
                    </div>

                    <div className="col-sm-4">
                      <label className="control-label" htmlFor="name_president">Nome do presidente da empresa</label>
                      <input className="form-control" type="text" id="name_president" name="name_president" placeholder="Ex: Valdeir Santana" value={this.state.form.name_president} onChange={this.updateValue('name_president')} />
                    </div>

                  </div>

                  <div className="form-group row">

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

                    <div className="col-sm-4">
                      <label className="control-label" htmlFor="metier">Área de atuação da empresa</label>
                      <input className="form-control" type="text" name="metier" id="metier" placeholder="Consultoria, saúde, educação..." value={this.state.form.metier} onChange={this.updateValue('metier')}/>
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

                    <div className={'col-sm-4 '+((this.state.errorBag['cnpj'] && this.state.form.cnpj === '') || (this.state.errorBag['invalidCnpj'] && this.state.form.cnpj !== '') ? 'has-danger' : '')}>
                      <label className="control-label" htmlFor="cnpj">CNPJ</label>
                      <CurrencyFormat
                        className={'form-control '+((this.state.errorBag['cnpj'] && this.state.form.cnpj === '') || (this.state.errorBag['invalidCnpj'] && this.state.form.cnpj !== '') ?'is-invalid':'')}
                        placeholder={'22.222.222/2222-22'}
                        allowNegative={false}
                        id="cnpj" 
                        name="cnpj"
                        format={'##.###.###/####-##'}
                        value={this.state.form.cnpj}
                        onValueChange={this.updateValue('cnpj')}
                      />
                      {(this.state.errorBag['cnpj'] && this.state.form.cnpj === '') &&
                        <div className="invalid-feedback">Campo Obrigatório</div>
                      }
                      {(this.state.errorBag['invalidCnpj'] && this.state.form.cnpj !== '') &&
                        <div className="invalid-feedback">CNPJ inválido</div>
                      }
                    </div>

                  </div>

                  <div className="form-group row">
                    <div className={"col-sm-12 "+(this.state.errorBag['address'] && this.state.form.address === '' ? 'has-danger' : '')}>
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

export default Cnpj;