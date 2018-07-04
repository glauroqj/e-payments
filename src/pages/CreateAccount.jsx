import React, { Component } from 'react';
import * as firebase from 'firebase';
import { SemipolarSpinner } from 'react-epic-spinners'
import { ToastContainer, toast } from 'react-toastify';
import {verify} from '../components/modules/verifyLogin'
import Loader from '../components/Loader';

import 'react-toastify/dist/ReactToastify.css';
import '../assets/createAcc.css'

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirm_password: '',
      btnLoading: false,
      btnText: 'Criar Conta',
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

  handleInput(e) {
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

    if(e.target.id === 'confirm_password') {
      this.setState({
        confirm_password: e.target.value
      })
    }
  }
  
  createAcc(e) {
    e.preventDefault();
    let data = this.state;
    if(this.state.email === '' || this.state.password === '') {
      toast.error('Campos vazios')
      return false;
    }
    if(this.state.password !== this.state.confirm_password) {
      toast.error('As senhas precisam ser identicas')
      return false;
    }
    this.setState({
      btnLoading: true,
      btnText: 'Criando Conta...'
    });

    // window.location.href = '/dashboard'
    // this.props.history.push('/dashboard');
    
    firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
    .then((success) => {
      console.log(success)
      this.props.history.push('/dashboard');
    })
    .catch((error) => {
      console.warn(error)
      if(error.code === 'auth/invalid-email') {
        toast.error('Email inexistente!')
      }
      toast.error('Não foi possível completar seu cadastro no momento :(')
      this.setState({
        email: '',
        password: '',
        confirm_password: '',
        btnText: 'Criar Conta',
        btnLoading: false
      });
    });
  }

  render() {
    return (
      <div className="createAcc container">
        {this.state.loading &&
          <Loader text="Carregando Criar Conta" color="#686de0"/>
        }
        {!this.state.loading &&
          <div>
            <ToastContainer autoClose={5000} hideProgressBar={true} position="top-right"/>
            <h5 className="createAcc_title">Criar Conta!</h5>
            <form action="" className="createAcc_form"
                onKeyDown={
                  (e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        this.createAcc(e)
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
              <div className="form-group row justify-content-sm-center">
                <label className="col-sm-2 col-form-label">Senha</label>
                <div className="col-sm-6">
                  <input type="password" className="form-control" id="password" placeholder="*****" value={this.state.password} onChange={this.handleInput.bind(this)}/>
                </div>
              </div>
              <div className="form-group row justify-content-sm-center">
                <label className="col-sm-2 col-form-label">Confirmar Senha</label>
                <div className="col-sm-6">
                  <input type="password" className="form-control" id="confirm_password" placeholder="*****" value={this.state.confirm_password} onChange={this.handleInput.bind(this)}/>
                </div>
              </div>
              <div className="form-group">
                <button type="button" className="btn btn-success" disabled={this.state.btnLoading?'disbled':''} onClick={this.createAcc.bind(this)}>
                  {this.state.btnLoading &&
                    <SemipolarSpinner size={30} color="white"/>
                  }
                  <div>{this.state.btnText}</div>
                </button>
              </div>
            </form>
          </div>
        } 
        {/* end no loading */}
      </div>
    );
  }
}

export default CreateAccount;