import React, { Component } from 'react';
import * as firebase from 'firebase';
import {config} from '../auth.js'
import '../assets/createAcc.css'

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
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
  }

  async submit() {

  }

  render() {
    return (
      <div className="createAcc container">
        <h5 className="createAcc_title">Criar Conta!</h5>
        <form action="" className="createAcc_form">
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
          <div className="form-group row justify-content-sm-center">
            <label className="col-sm-2 col-form-label">Confirmar Senha</label>
            <div className="col-sm-6">
              <input type="password" className="form-control" id="confirm_password" placeholder="*****" onChange={this.handleInput.bind(this)}/>
            </div>
          </div>
          <div className="form-group">
            <button type="button" className="btn btn-success" onClick={this.createAcc}>Criar Conta</button>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateAccount;