import React, { Component } from 'react';
import * as firebase from 'firebase';
import { SemipolarSpinner } from 'react-epic-spinners'
import { ToastContainer, toast } from 'react-toastify';
import {verify} from '../components/modules/verifyLogin'
import Loader from '../components/Loader';
import Logo from '../components/Logo';

import '../assets/forgot-password.css'

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      btnLoading: false,
      btnText: 'Enviar Email',
      loading: true,
      emailSended: false
    }
  }

  componentWillMount() {
    /* verify if user is logged */
    verify().then((user) => {
      // console.log('LOGED: ', user)
      /* redirect to dashboard */
      this.props.history.push('/dashboard');
      return false;
    })
    .catch((error) => {
      console.log('Not Loged: ')
      this.setState({
        loading: false
      });
    })
  }

  handleInput = (type) => (e) => {
    let state = this.state
    state[type] = e.target.value
    this.setState(state)
  }

  submit = (e) => {
    e.preventDefault();
    let state = this.state;
    if(state.email === '') {
      toast.error('Campos vazios')
      return false;
    }
    this.setState({
      btnLoading: true,
      btnText: 'Enviando email...'
    });
    
    firebase.auth().sendPasswordResetEmail(state.email)
    .then((success) => {
      this.setState({
        emailSended: true
      });
      // this.props.history.push('/dashboard');
    })
    .catch((error) => {
      console.warn(error)
      if(error.code === 'auth/invalid-email') {
        toast.error('Email inválido!')
      }
      if(error.code === 'auth/user-not-found') {
        toast.error('Email não existe!')
      }
      this.setState({
        email: '',
        btnText: 'Enviar Email',
        btnLoading: false
      });
    });
  }

  render() {
    return (
      <div className="forgotPassword container animated fadeIn">
        {(this.state.loading && !this.state.emailSended) &&
          <Loader text="Carregando Resetar Senha" color="#3e5472"/>
        }
        {(!this.state.loading && !this.state.emailSended) &&
          <div className="animated fadeIn">
            <ToastContainer autoClose={5000} hideProgressBar={true} position="top-right"/>
            <Logo />
            <h5 className="forgotPassword_title">Esqueci minha senha!</h5>
            <h6>Forneça seu e-mail válido, para resetar sua senha.</h6>
              <form action="" className="forgotPassword_form"
                    onKeyDown={
                      (e) => {
                          if (e.key === 'Enter') {
                              e.preventDefault();
                              this.submit(e)
                          }
                      }
                    }
              >
                <div className="form-group row justify-content-sm-center">
                  <label className="col-sm-2 col-form-label">Email</label>
                  <div className="col-sm-6">
                    <input type="email" className="form-control" id="email" placeholder="email@example.com" value={this.state.email} onChange={this.handleInput('email')}/>
                  </div>
                </div>
                <div className="form-group">
                  <a href="/login" className="btn btn-link">Voltar</a>
                  <button type="submit" className="btn btn-primary" disabled={this.state.btnLoading?'disbled':''} onClick={this.submit}>
                    {this.state.btnLoading &&
                      <SemipolarSpinner size={30} color="white"/>
                    }
                    <div>{this.state.btnText}</div>
                  </button>
                </div>
              </form>
          </div>
        }
        {this.state.emailSended && 
          <h2>Email enviado! Em poucos instantes verifique seu e-mail para resetar sua senha!</h2>
        }
      </div>
    );
  }
}

export default ForgotPassword;
