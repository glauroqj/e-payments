import React, { Component } from 'react';
import * as firebase from 'firebase';
import { SemipolarSpinner } from 'react-epic-spinners'
import { ToastContainer, toast } from 'react-toastify';
import {verify} from '../components/modules/verifyLogin'
import Loader from '../components/Loader';

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
      console.log('LOGED: ', user)
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

  handleInput(e) {
    if(e.target.id === 'email') {
      this.setState({
        email: e.target.value
      })
    }
  }

  submit(e) {
    e.preventDefault();
    let data = this.state;
    if(this.state.email === '') {
      toast.error('Campos vazios')
      return false;
    }
    this.setState({
      btnLoading: true,
      btnText: 'Enviando email...'
    });
    
    firebase.auth().sendPasswordResetEmail(data.email)
    .then((success) => {
      console.log(success)
      this.setState({
        emailSended: true
      });
      // this.props.history.push('/dashboard');
    })
    .catch((error) => {
      console.warn(error)
      if(error.code === 'auth/invalid-email') {
        toast.error('Email inexistente!')
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
      <div className="forgotPassword container">
        {(this.state.loading && !this.state.emailSended) &&
          <Loader text="Carregando Resetar Senha" color="#686de0"/>
        }
        {(!this.state.loading && !this.state.emailSended) &&
          <div>
            <ToastContainer autoClose={5000} hideProgressBar={true} position="top-right"/>
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
                    <input type="text" className="form-control" id="email" placeholder="email@example.com" value={this.state.email} onChange={this.handleInput.bind(this)}/>
                  </div>
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary" disabled={this.state.btnLoading?'disbled':''} onClick={this.submit.bind(this)}>
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
          <h2>Email enviado! Em poucos instantes verifique sem e-mail para resetar sua senha!</h2>
        }
      </div>
    );
  }
}

export default ForgotPassword;
