import React, { Component } from 'react';
import * as firebase from 'firebase';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import CurrencyFormat from 'react-currency-format';
import { SemipolarSpinner } from 'react-epic-spinners';

class Cpf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirm: '',
      telephone: '',
      job: '',
      address: '',
      dateBirth: '',
      requiredField: ['name', 'password', 'password_confirm', 'email'],
      errorBag: {},
      btnText: 'Criar Conta',
      btnLoading: false
    }
  }

  updateValue = (e) => {
    let state = this.state;
    state[e.target.name] = e.target.value;
    this.setState({state});
  }

  validate = (e) => {
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
    if(this.state.password !== this.state.password_confirm) {
      errorBag.password = 'password';
      this.setState({errorBag});
    }
    if((this.state.password === this.state.password_confirm) && (this.state.password !== '')) {
      console.log( errorBag.password )
      delete errorBag.password;
      this.setState({errorBag});
    }

  }

  submit = (e) => {
    console.log( this.validate() )
  }

  render() {
    return (
      <div className="cpf">
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
                    <div className={"col-sm-4 "+(this.state.errorBag['name'] && this.state.name === '' ? 'has-danger' : '')}>
                      <label className="control-label" htmlFor="nome">Nome (primeiro e último)</label>
                      <input className={"form-control "+(this.state.errorBag['name'] && this.state.name === '' ?'is-invalid':'')} type="text" id="name" name="name" placeholder="Ex: Valdeir Santana" onChange={this.updateValue} />
                      {(this.state.errorBag['name'] && this.state.name === '') &&
                        <div className="invalid-feedback">Campo Obrigatório</div>
                      }
                    </div>

                    <div className={"col-sm-4 "+(this.state.errorBag['email'] && this.state.email === '' ? 'has-danger' : '')}>
                      <label className="control-label" htmlFor="email">E-mail</label>
                      <input className={"form-control "+(this.state.errorBag['email'] && this.state.email === '' ?'is-invalid':'')} type="email" id="email" name="email" placeholder="Ex: exemplo@gmail.com" onChange={this.updateValue} />
                      {(this.state.errorBag['email'] && this.state.email === '') &&
                        <div className="invalid-feedback">Campo Obrigatório</div>
                      }
                    </div>

                  </div>

                  <div className="form-group row">

                    <div className={"col-sm-4 "+((this.state.errorBag['password'] && this.state.password === '') || (this.state.password !== this.state.password_confirm) ? 'has-danger' : '')}>
                      <label className="control-label" htmlFor="password">Senha</label>
                      <input className={"form-control "+((this.state.errorBag['password'] && this.state.password === '') || (this.state.password !== this.state.password_confirm) ?'is-invalid':'')} type="password" name="password" id="password" placeholder="*****" value={this.state.password} onChange={this.updateValue}/>
                      {(this.state.errorBag['password'] && this.state.password === '') &&
                        <div className="invalid-feedback">Campo Obrigatório</div>
                      }
                      {(this.state.password !== this.state.password_confirm) &&
                        <div className="invalid-feedback">As senhas precisam ser idênticas</div>
                      }                      
                    </div>
                    <div className={"col-sm-4 "+(this.state.errorBag['password_confirm'] && this.state.password_confirm === '' ? 'has-danger' : '')}>
                      <label className="control-label" htmlFor="password_confirm">Confirmar Senha</label>
                      <input className={"form-control "+(this.state.errorBag['password_confirm'] && this.state.password_confirm === '' ?'is-invalid':'')} type="password" name="password_confirm" id="password_confirm" placeholder="*****" value={this.state.password_confirm} onChange={this.updateValue}/>
                      {(this.state.errorBag['password_confirm'] && this.state.password_confirm === '') &&
                        <div className="invalid-feedback">Campo Obrigatório</div>
                      }
                    </div>

                  </div>
                  
                  <div className="form-group row mt-5">
                    <div className="col-sm-12">
                      <button type="button" id="button-confirm" className="btn btn-block btn-success btn-donation" onClick={this.submit}>
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

export default Cpf;