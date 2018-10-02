import React, { Component } from 'react';
import * as firebase from 'firebase';
import { SemipolarSpinner } from 'react-epic-spinners'
import { ToastContainer, toast } from 'react-toastify';
import {verify} from '../components/modules/verifyLogin'
import Loader from '../components/Loader';
import Logo from '../components/Logo'

import '../assets/login.css'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      btnLoading: false,
      btnText: 'Acessar',
      loading: true
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

  handleInput = (e) => {
    if(e.target.id === 'email') {
      this.setState({
        email: e.target.value
      })
    }

    if(e.target.id === 'password') {
      this.setState({
        password: e.target.value
      })
    }
  }
  
  createAcc = () => {
    // window.location.href = '/create'
    this.props.history.push('/create');
  }

  forgotPass = () => {
    this.props.history.push('/forgot-password');
  }

  submit = (e) => {
    e.preventDefault()
    let state = this.state
    if(state.email === '' || state.password === '') {
      toast.error('Campos vazios')
      return false;
    }
    this.setState({
      btnLoading: true,
      btnText: 'Verificando acesso...'
    });
    
    firebase.auth().signInWithEmailAndPassword(state.email, state.password)
    .then((success) => {
      console.log(success)
      this.props.history.push('/dashboard');
    })
    .catch((error) => {
      console.warn(error)
      if(error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        toast.error('Email ou Senha inválidos :(')
      }
      if(error.code === 'auth/invalid-email') {
        toast.error('Email inexistente!')
      }
      this.setState({
        email: '',
        password: '',
        btnText: 'Acessar',
        btnLoading: false
      });
    });
  }

  render() {
    return (
      <div className="login container">
        {this.state.loading &&
          <Loader text="Carregando Login" color="#3e5472"/>
        }
        {!this.state.loading &&
          <div className="animated fadeIn">
            <ToastContainer autoClose={5000} hideProgressBar={true} position="top-right"/>
            <Logo />
            <h5 className="login_title">Faça Login!</h5>
              <form action="" className="login_form"
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
                  <input type="text" className="form-control" id="email" placeholder="email@example.com" value={this.state.email} onChange={this.handleInput}/>
                </div>
              </div>
              <div className="form-group row justify-content-sm-center">
                <label className="col-sm-2 col-form-label">Senha</label>
                <div className="col-sm-6">
                  <input type="password" className="form-control" id="password" placeholder="*****" value={this.state.password} onChange={this.handleInput}/>
                </div>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary" disabled={this.state.btnLoading?'disbled':''} onClick={this.submit}>
                  {this.state.btnLoading &&
                    <SemipolarSpinner size={30} color="white"/>
                  }
                  <div>{this.state.btnText}</div>
                </button>
              </div>
            </form>
            <div className="form-group justify-content-sm-left">
              <button type="button" className="btn btn-link" onClick={this.createAcc}>Não tenho conta. Criar conta.</button>
              <button type="button" className="btn btn-link" onClick={this.forgotPass}>Esqueci minha senha!</button>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default Login;
