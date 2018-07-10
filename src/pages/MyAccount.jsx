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
      return false;
    }
    if(type === 'email') {
      this.setState({
        editEmail: '',
        showTemplateEmail: true
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
        toast.success('Nome alterado com sucesso!');
        this.setState({
          showTemplateName: false
        });
        this.reloadState()
      })
      .catch((error) => {});
      return false;
    }
    if(type === 'email') {
      this.state.user.updateEmail(this.state.editEmail)
      .then(() => {
        toast.success('E-mail alterado com sucesso!');
        this.setState({
          showTemplateEmail: false
        });
        this.reloadState()
      })
      .catch((error) => {});
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
    if(e.target.id === 'email') {
      this.setState({
        editEmail: e.target.value
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
                      {!this.state.user.emailVerified &&
                        <li className="list-group-item">
                          <h5 className="card-title">Email</h5>
                          <h6 className="card-subtitle text-muted">{this.state.user.email}</h6>
                          {this.state.showTemplateEmail &&
                            <form action=""
                              onKeyDown={
                                (e) => {
                                      if (e.key === 'Enter') {
                                        console.log('ENTER')
                                        this.saveInfo.bind(this, 'email')
                                      }
                                  }
                              }
                            >
                              <div className="form-group animated fadeIn">
                                <input type="text" id="email" className="form-control" value={this.state.editEmail} onChange={this.updateInput.bind(this)}/>
                              </div>
                              <div className="myAccount_box_edit">
                                  <button type="submit" className="btn btn-success btn-xs save" id="email" onClick={this.saveInfo.bind(this, 'email')}><i className="fa fa-check"></i></button>
                              </div>
                            </form>
                          }
                          {!this.state.showTemplateEmail &&
                            <div className="myAccount_box_edit">
                              <button className="btn btn-warning btn-xs edit" id="name" onClick={this.editInfo.bind(this, 'email')}><i className="fa fa-user-edit"></i></button>
                            </div>
                          }
                        </li>
                      }
                      <li className="list-group-item">
                        <h5 className="card-title">Email verificado?</h5>
                        {this.state.user.emailVerified &&
                          <button type="button" className="btn btn-success btn-sm disabled">Verificado</button>
                        }
                        {!this.state.user.emailVerified &&
                          <div>
                            <p className="text-muted">Após o e-mail verificado, não é possível altera-lo</p>
                            <button type="button" className="btn btn-outline-danger btn-sm" onClick={this.verifyEmail.bind(this)}>Não, Verificar Agora!</button>
                          </div>
                        }
                      </li>
                    </ul>
                    <div className="card-footer text-muted">
                      {this.state.user.metadata.creationTime}
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