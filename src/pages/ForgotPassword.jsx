import React, { Component } from 'react'
import * as firebase from 'firebase'
import { SemipolarSpinner } from 'react-epic-spinners'
import { ToastContainer, toast } from 'react-toastify'
import {verify} from '../components/modules/verifyLogin'
import Loader from '../components/Loader'
import Logo from '../components/Logo'
import Input from '../components/Input'
import {validateEach, validateAll, verifyErrorBag} from '../components/modules/validateFields'

import '../assets/forgot-password.css'

class ForgotPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {
        email: ''
      },
      requiredField: ['email'],
      errorBag: {
        email: []
      },
      btnLoading: false,
      btnText: 'Enviar Email',
      loading: true,
      emailSended: false
    }
  }

  componentDidMount() {
    /* verify if user is logged */
    verify().then((user) => {
      // console.log('LOGED: ', user)
      /* redirect to dashboard */
      this.props.history.push('/dashboard')
      return false
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
        this.getNewPassword()
      })
    })
  }

  getNewPassword = () => {
    let form = this.state.form

    this.setState({
      btnLoading: true,
      btnText: 'Enviando email...'
    })
    
    firebase.auth().sendPasswordResetEmail(form.email)
    .then((success) => {
      this.setState({
        emailSended: true
      })
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
      form = {
        email: ''
      }
      this.setState({
        form,
        btnText: 'Enviar Email',
        btnLoading: false
      })
    })
  }

  render() {
    const { form, errorBag, loading, emailSended, btnLoading, btnText } = this.state
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
    let col_xs_6 = 'col-sm-6'
    let error_email = ''
    if (errorBag.email.length > 0) {
      error_email += ' has-danger'
    }
    return (
      <div className="forgotPassword container animated fadeIn">
        {(loading && !emailSended) && (
          <Loader text="Carregando Resetar Senha" color="#3e5472"/>
        )}
        {(!loading && !emailSended) && (
          <div className="animated fadeIn">
            <ToastContainer autoClose={5000} hideProgressBar={true} position="top-right"/>
            <Logo />
            <h5 className="forgotPassword_title">Esqueci minha senha!</h5>
            <h6>Forneça seu e-mail válido, para resetar sua senha.</h6>
              <form action="" className="forgotPassword_form"
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

                <div className="form-group mt-5">
                  <a href="/login" className="btn btn-link">Voltar</a>
                  <button type="submit" className="btn btn-primary" disabled={btnLoading?'disbled':''} onClick={this.submit}>
                    {btnLoading &&
                      <SemipolarSpinner size={30} color="white"/>
                    }
                    <div>{btnText}</div>
                  </button>
                </div>

              </form>
          </div>
        )}
        {emailSended && (
          <h2>Email enviado! Em poucos instantes verifique seu e-mail para resetar sua senha!</h2>
        )}
      </div>
    );
  }
}

export default ForgotPassword
