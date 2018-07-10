import React, { Component } from 'react';
import * as firebase from 'firebase';
import { ToastContainer, toast } from 'react-toastify';
import {verify} from '../components/modules/verifyLogin'

import Navbar from '../components/Navbar';
import Loader from '../components/Loader';

import '../assets/my-account.css'

class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      showMenu: false,
      user: '',
      link: '/my-account',
      showTemplateName: false,
      showTemplateEmail: false,
      editName: '',
      editEmail: ''
    }
  }

  componentWillMount() {
    /* verify if user is logged */
    verify().then((user) => {
      console.log('LOGED: ', user)
      /* redirect to dashboard */
      this.setState({
        user: user,
        loading: false
      });
      return false;
    })
    .catch((error) => {
      console.log('Not Loged: ')
      this.props.history.push('/login');
    }); 
  }

  exit() {
    console.log('Deslogar')
    firebase.auth().signOut()
    .then((success) => {
      this.props.history.push('/login');
    })
    .catch((error) => {
      toast.error('Ocorreu um erro, tente novamente.')
    })
  }

  verifyEmail() {
    this.state.user.sendEmailVerification()
    .then((success) => {
      console.log('Enviao de email: ',success)
      toast.success('E-mail enviado com sucesso!')
    }).catch((error) => {
      toast.error('Ocorreu um erro, tente novamente.')
    });
  }

  editInfo(type) {
    console.log(type)
    if(type === 'name') {
      this.setState({
        editName: '',
        showTemplateName: true
      });
    }

  }

  saveInfo(type, e) {
    console.log('SAVE', type, e)
    e.preventDefault();
    if(type === 'name') {
      this.state.user.updateProfile({
        displayName: this.state.editName,
      })
      .then(() => {
        // Update successful.
        toast.success('Nome alterado com sucesso!');
        this.setState({
          showTemplateName: false
        });
        this.reloadState()
      })
      .catch((error) => {
        // An error happened.
      });
      return false;
    }
    if(type === 'email') {

    }
  }

  reloadState() {
    verify().then((user) => {
      console.log('Update information: ', user)
      /* redirect to dashboard */
      this.setState({
        user: user
      });
      return false;
    })
    .catch((error) => {
      console.log('Not Loged: ')
      this.props.history.push('/login');
    }); 
  }

  updateInput(e) {
    if(e.target.id === 'name') {
      this.setState({
        editName: e.target.value
      })
    }
  }

  render() {
    return (
      <div className="myAccount">
        {this.state.loading &&
          <Loader text="Carregando Minha Conta" color="#686de0"/>
        }
        {!this.state.loading &&
          <div>
            <ToastContainer autoClose={5000} hideProgressBar={true} position="top-right"/>
            <Navbar exit={this.exit.bind(this)} link={this.state.link} user={this.state.user}/>
            <div className="container">
              <div className="myAccount_title">
                <h2>Configure sua conta</h2>
              </div>
              <div className="myAccount_box row">
                <div className="col-sm-4">
                  <div className="card mb-3">
                    <h3 className="card-header">Dados da Conta</h3>
                    <img className="img-responsive" src={this.state.user.photoURL} alt="Profile Photo"/>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <h5 className="card-title">Status</h5>
                        <h6 className="card-subtitle text-muted">Doador</h6>
                      </li>
                      <li className="list-group-item">
                        <h5 className="card-title">Nome</h5>
                        <h6 className="card-subtitle text-muted">{this.state.user.displayName}</h6>
                        {this.state.showTemplateName &&
                          <form action=""
                            onKeyDown={
                              (e) => {
                                    if (e.key === 'Enter') {
                                      console.log('ENTER')
                                      this.saveInfo.bind(this, 'name')
                                      // e.preventDefault();
                                    }
                                }
                            }
                          >
                            <div className="form-group animated fadeIn">
                              <input type="text" id="name" className="form-control" value={this.state.editName} onChange={this.updateInput.bind(this)}/>
                            </div>
                            <div className="myAccount_box_edit">
                                <button type="submit" className="btn btn-success btn-xs save" id="name" onClick={this.saveInfo.bind(this, 'name')}><i className="fa fa-check"></i></button>
                            </div>
                          </form>
                        }
                        {!this.state.showTemplateName &&
                          <div className="myAccount_box_edit">
                            <button className="btn btn-warning btn-xs edit" id="name" onClick={this.editInfo.bind(this, 'name')}><i className="fa fa-user-edit"></i></button>
                          </div>
                        }
                      </li>
                      {/* <li className="list-group-item">
                        <h5 className="card-title">Email</h5>
                        <div className="form-group">
                          <input type="text" id="email" className="form-control" value={this.state.user.email} disabled/>
                        </div>
                        <div className="myAccount_box_edit">
                          <button className="btn btn-warning btn-xs" id="email" onClick={this.editInfo.bind(this, 'email')}><i className="fa fa-user-edit"></i></button>
                        </div>
                      </li> */}
                      <li className="list-group-item">
                        <h5 className="card-title">Email verificado?</h5>
                        {this.state.user.emailVerified &&
                          <button type="button" className="btn btn-success btn-sm disabled">Verificado</button>
                        }
                        {!this.state.user.emailVerified &&
                          <button type="button" className="btn btn-outline-danger btn-sm" onClick={this.verifyEmail.bind(this)}>Não, Verificar Agora!</button>
                        }
                      </li>
                    </ul>
                    <div className="card-body">
                      <a href="" className="card-link">Card link</a>
                      <a href="" className="card-link">Another link</a>
                    </div>
                    <div className="card-footer text-muted">
                      2 days ago
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        }
        {/* end loading */}
      </div>
    );
  }
}

export default MyAccount;