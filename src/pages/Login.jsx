import React, { Component } from 'react';
import * as firebase from 'firebase';
import { SemipolarSpinner } from 'react-epic-spinners'
import { ToastContainer, toast } from 'react-toastify'
import {verify} from '../components/modules/verifyLogin'
import Loader from '../components/Loader'
import Logo from '../components/Logo'
import Input from '../components/Input'

import {validateEach, validateAll, verifyErrorBag} from '../components/modules/validateFields'

import '../assets/login.css'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        email: '',
        passwordLogin: ''
      },
      requiredField: ['email', 'passwordLogin'],
      errorBag: {
        email: [],
        passwordLogin: []
      },
      btnLoading: false,
      btnText: 'Acessar',
      loading: true
    }
  }

  componentDidMount() {
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

  updateValue = (type) => (e) => {
    let form = this.state.form
    form[type] = e.target.value
    this.setState({form})
  }
  
  createAcc = () => {
    // window.location.href = '/create'
    this.props.history.push('/create');
  }

  forgotPass = () => {
    this.props.history.push('/forgot-password');
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
        this.login()
      })
    })
  }

  login = () => {
    let form = this.state.form
    this.setState({
      btnLoading: true,
      btnText: 'Verificando acesso...'
    });
    
    firebase.auth().signInWithEmailAndPassword(form.email, form.passwordLogin)
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
      form = {
        email: '',
        passwordLogin: '',
      }
      this.setState({
        form,
        btnText: 'Acessar',
        btnLoading: false
      });
    });
  }

  render() {
    const {form, errorBag} = this.state
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
    const password = {
      label: 'Senha',
      class: '',
      type: 'password',
      id: 'passwordLogin',
      name: 'passwordLogin',
      placeholder: '******',
      callback: this.updateValue('passwordLogin'),
      validate: this.validate,
      errorBag: errorBag.passwordLogin,
      value: form.passwordLogin
    }
    let col_xs_6 = 'col-sm-6'
    let error_email = ''
    let error_passwordLogin = ''
    if (errorBag.email.length > 0) {
      error_email += ' has-danger'
    }
    if (errorBag.passwordLogin.length > 0) {
      error_passwordLogin += ' has-danger'
    }
    return (
      <div className="login container">
        {this.state.loading &&
          <Loader text="Carregando Login" color="#3e5472"/>
        }
        {!this.state.loading &&
          <div className="animated fadeIn">
            <ToastContainer autoClose={5000} hideProgressBar={true} position="top-right"/>
            <Logo />
              <form action="" className="login_form"
                    onKeyDown={
                      (e) => {
                          if (e.key === 'Enter') {
                              e.preventDefault()
                              this.submit(e)
                          }
                      }
                    }
              >
              <div className="form-group row justify-content-sm-center">
                <div className={col_xs_6 + error_email}>
                  <Input {...email} />
                </div>
              </div>
              <div className="form-group row justify-content-sm-center">
                <div className={col_xs_6 + error_passwordLogin}>
                  <Input {...password} />
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

export default Login
