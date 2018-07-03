import React, { Component } from 'react';
import * as firebase from 'firebase';
import { SemipolarSpinner } from 'react-epic-spinners'
import { ToastContainer, toast } from 'react-toastify';
import {verify} from '../components/modules/verifyLogin'
import Loader from '../components/Loader';

import '../assets/login.css'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
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
  }
  
  createAcc() {
    // window.location.href = '/create'
    this.props.history.push('/create');
  }

  async submit() {
    if(this.state.email === '' || this.state.password === '') {
      toast.error('Campos vazios')
      return false;
    }
  }

  render() {
    return (
      <div className="login container">
        {this.state.loading &&
          <Loader text="Carregando Login" color="#686de0"/>
        }
        {!this.state.loading &&
          <div>
            <ToastContainer autoClose={5000} hideProgressBar={true} position="top-right"/>
            <h5 className="login_title">Faça Login!</h5>
            <form action="" className="login_form"
                  onKeyDown={
                    (e) => {
                        if (e.key == 'Enter') {
                            e.preventDefault();
                            this.submit()
                        }
                    }
                  }
            >
              <div className="form-group row justify-content-sm-center">
                <label className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-6">
                  <input type="text" className="form-control" id="email" placeholder="email@example.com" onChange={this.handleInput.bind(this)}/>
                </div>
              </div>
              <div className="form-group row justify-content-sm-center">
                <label className="col-sm-2 col-form-label">Senha</label>
                <div className="col-sm-6">
                  <input type="password" className="form-control" id="password" placeholder="*****" onChange={this.handleInput.bind(this)}/>
                </div>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary" onClick={this.submit.bind(this)}>Acessar</button>
              </div>
              <div className="form-group justify-content-sm-left">
                <button type="button" href="/create" className="btn btn-link" onClick={this.createAcc.bind(this)}>Não tenho conta ainda. Criar conta!</button>
              </div>
            </form>
          </div>
        }
      </div>
    );
  }
}

export default Login;
