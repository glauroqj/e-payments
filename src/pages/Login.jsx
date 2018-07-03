import React, { Component } from 'react';
import '../assets/login.css'

class Login extends Component {
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
    window.location.href = '/create'
  }

  async submit() {

  }

  render() {
    return (
      <div className="login container">
        <h5 className="login_title">Faça Login!</h5>
        <form action="" className="login_form">
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
            <button type="button" className="btn btn-primary">Acessar</button>
          </div>
          <div className="form-group justify-content-sm-left">
            <button type="button" href="/create" className="btn btn-link" onClick={this.createAcc}>Não tenho conta ainda. Criar conta!</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
