import React, { Component } from 'react';
import * as firebase from 'firebase';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { ToastContainer, toast } from 'react-toastify';
import {verify} from '../components/modules/verifyLogin'

import Navbar from '../components/Navbar';
import Loader from '../components/Loader';
import UpdateInformation from '../components/modules/updateInformation';

import '../assets/my-account.css'

class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      showMenu: false,
      user: '',
      link: '/my-account',
      template: {
        showTemplateName: false,
        showTemplateEmail: false,
        btnChangeLoading: false
      },
      edit: {
        name: '',
        email: '',
      },
      emailSended: false,
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

  exit = () => {
    firebase.auth().signOut()
    .then((success) => {
      this.props.history.push('/login');
    })
    .catch((error) => {
      toast.error('Ocorreu um erro, tente novamente.')
    })
  }

  verifyEmail = () => {
    this.setState({
      emailSended: true
    })
    this.state.user.sendEmailVerification()
    .then((success) => {
      console.log('Envio de email: ',success)
      toast.success('E-mail enviado com sucesso!')
    }).catch((error) => {
      toast.error('Ocorreu um erro, tente novamente.')
    });
  }

  editInfo = (type) => (e) => {
    let edit = this.state.edit
    let template = this.state.template
    if (type === 'name') {
      edit[type] = '';
      template.showTemplateName = this.state.template.showTemplateName?false:true;
    }
    if (type === 'email') {
      edit[type] = '';
      template.showTemplateEmail = this.state.template.showTemplateEmail?false:true;
    }
    this.setState({template})
  }

  saveInfo = (type) => (e) => {
    let edit = this.state.edit
    let template = this.state.template
    e.preventDefault();

    if(!this.validate()) {
      console.log( 'ALGO ERRADO' )
      edit.name = '';
      template.showTemplateEmail = false;
      template.showTemplateName = false;
      template.btnChangeLoading = false;
      this.setState({edit});
      return false;
    }

    template.btnChangeLoading = true;
    this.setState({template});

    if(type === 'name') {
      this.state.user.updateProfile({
        displayName: this.state.edit.name
      })
      .then(() => {
        toast.success('Nome alterado com sucesso!');
        template.showTemplateName = false;
        template.btnChangeLoading = false;
        this.setState({template});
        this.reloadState();
      })
      .catch((error) => {});
      return false;
    }

    if(type === 'email') {
      this.state.user.updateEmail(this.state.edit.email)
      .then(() => {
        toast.success('E-mail alterado com sucesso!');
        template.showTemplateEmail = false;
        template.btnChangeLoading = false;
        this.setState({template});
        this.reloadState();
      })
      .catch((error) => {
        console.log(error)
      });
    }
  }

  validate() {
    let edit = this.state.edit;
    let verifyEmail = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm;
    if(this.state.edit.name === '' && this.state.template.showTemplateName) {
      toast.error('O nome não pode ficar vazio!')
      return false;
    }
    if(this.state.edit.name === this.state.user.displayName && this.state.template.showTemplateName) {
      toast.error('O nome é identico ao atual!')
      edit.name = '';
      this.setState({edit})
      return false;
    }
    if(this.state.edit.email === '' && this.state.template.showTemplateEmail) {
      toast.error('O e-mail não pode ficar vazio!')
      return false;
    }
    if(this.state.edit.email === this.state.user.email & this.state.template.showTemplateEmail) {
      toast.error('O e-mail é identico ao atual!')
      edit.email = '';
      this.setState({edit})
      return false;
    }
    if(!verifyEmail.test(this.state.edit.email) && this.state.template.showTemplateEmail) {
      toast.error('E-mail inválido!')
      edit.email = '';
      this.setState({edit})
      return false;
    }

    return true;
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

  updateInput = (type) => (e) => {
    let edit = this.state.edit;
    edit[type] = e.target.value;
    this.setState({edit});
  }

  render() {
    return (
      <div className="myAccount">
        {this.state.loading &&
          <Loader text="Carregando Minha Conta" color="#3e5472"/>
        }
        {!this.state.loading &&
          <div className="animated fadeIn">
            <ToastContainer autoClose={5000} hideProgressBar={true} position="top-right"/>
            <Navbar exit={this.exit} link={this.state.link} user={this.state.user}/>
            <div className="container">
              <div className="myAccount_box row">
                <div className="col-sm-4">
                  <div className="card mb-3">
                    <h3 className="card-header">Dados da Conta</h3>
                    {this.state.user.photoURL &&
                      <img className="img-responsive" src={this.state.user.photoURL} alt=""/>
                    }
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <h5 className="card-title">Status</h5>
                        <h6 className="card-subtitle text-muted">Doador</h6>
                      </li>
                      <li className="list-group-item myAccount_box_edit">
                        <h5 className="card-title">Nome</h5>
                        <h6 className="card-subtitle text-muted">{this.state.user.displayName}</h6>
                        {this.state.template.showTemplateName &&
                          <UpdateInformation 
                            fieldName={'name'}
                            type={'text'}
                            updateInput={this.updateInput('name')}
                            save={this.saveInfo}
                            cancel={this.editInfo}
                            value={this.state.edit.name}
                            loading={this.state.template.btnChangeLoading}
                          />
                        }
                        {!this.state.template.showTemplateName &&
                          <button className="btn btn-warning btn-xs edit" id="name" onClick={this.editInfo('name')}><i className="fa fa-user-edit"></i></button>
                        }
                      </li>
                      {!this.state.user.emailVerified &&
                        <li className="list-group-item myAccount_box_edit">
                          <h5 className="card-title">Email</h5>
                          <h6 className="card-subtitle text-muted">{this.state.user.email}</h6>
                          {this.state.template.showTemplateEmail &&
                            <UpdateInformation 
                              fieldName={'email'}
                              type={'email'}
                              updateInput={this.updateInput('email')}
                              save={this.saveInfo}
                              cancel={this.editInfo}
                              value={this.state.edit.email}
                              loading={this.state.template.btnChangeLoading}
                            />
                          }
                          {!this.state.template.showTemplateEmail &&
                            <button className="btn btn-warning btn-xs edit" id="name" onClick={this.editInfo('email')}><i className="fa fa-user-edit"></i></button>
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
                              {!this.state.emailSended &&
                                <button type="button" className='btn btn-outline-danger btn-sm' onClick={this.verifyEmail}>Não, Verificar Agora!</button>
                              }
                              {this.state.emailSended &&
                                <button type="button" class="btn btn-link btn-sm disabled">Email enviado</button>
                              }
                          </div>
                        }
                      </li>
                    </ul>
                    <div className="card-footer text-muted">
                      {moment(this.state.user.metadata.creationTime).format('LLLL')}
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