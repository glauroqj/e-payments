import React, { Component } from 'react'
import * as firebase from 'firebase'
import * as moment from 'moment'
import 'moment/locale/pt-br'
import { ToastContainer, toast } from 'react-toastify'
import {verify, getDataUser} from '../components/modules/verifyLogin'

import Navbar from '../components/Navbar'
import Loader from '../components/Loader'

import ListGroup from '../components/myAccount/ListGroup'

import GetPhotoInstagram from '../components/modules/getPhotoInstagram'
import UpdateInformation from '../components/modules/updateInformation'

import '../assets/my-account.css'

class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      showMenu: false,
      user: {
        information: {}
      },
      link: '/my-account',
      template: {
        showTemplateName: false,
        showTemplateEmail: false,
        showTemplateAddress: false,
        btnChangeLoading: false
      },
      edit: {
        name: '',
        email: '',
        address: ''
      },
      emailSended: false,
      isVisible: true
    }
  }

  componentWillMount() {
    /* verify if user is logged */
    verify().then((response) => {
      /* redirect to dashboard */
      this.setState({
        user: response
      },
        () => {
          this.dataUser()
        }
      )
    })
    .catch((error) => {
      console.log('Not Loged: ')
      this.props.history.push('/login')
    })

  }

  dataUser() {
    let user = this.state.user
    getDataUser(user.uid)
    .then((response) => {
      user.information = response;
      this.setState({
        user,
        loading: false
      })
    })
    .catch((error) => {
      console.warn('Error on getUserData')
    })
  }

  exit = () => {
    firebase.auth().signOut()
    .then((success) => {
      this.props.history.push('/login')
    })
    .catch((error) => {
      toast.error('Ocorreu um erro, tente novamente.')
    })
  }

  editInfo = (type) => (e) => {
    let edit = this.state.edit
    let template = this.state.template
    if (type === 'name') {
      edit[type] = ''
      template.showTemplateName = this.state.template.showTemplateName?false:true
    }
    if (type === 'email') {
      edit[type] = ''
      template.showTemplateEmail = this.state.template.showTemplateEmail?false:true
    }
    if (type === 'address') {
      edit[type] = ''
      template.showTemplateAddress = this.state.template.showTemplateAddress?false:true
    }
    this.setState({template})
  }

  saveInfo = (type) => (e) => {
    let edit = this.state.edit
    let template = this.state.template
    e.preventDefault()

    if(!this.validate()) {

      edit.name = ''
      template.showTemplateEmail = false
      template.showTemplateName = false
      template.showTemplateAddress = false
      template.btnChangeLoading = false
      this.setState({edit})
      return false
    }

    template.btnChangeLoading = true
    this.setState({template})

    if (type === 'address') {
      firebase.database().ref('users/cpf/' + this.state.user.uid + '/information/').update({
        address: edit.address
      })
      .then((success) => {
        console.log('Saved: ')
        toast.success('Endereço alterado com sucesso!')
        template.showTemplateEmail = false
        template.btnChangeLoading = false
        template.showTemplateAddress = false
        this.setState({template})
        this.reloadState()
      })
    }
  }

  reloadState = (e) => {
    verify().then((response) => {
      this.setState({
        user: response
      },
        () => {
          this.dataUser()
        }
      )
    })
    .catch((error) => {
      console.log('Not Loged: ')
      this.props.history.push('/login')
    })
  }

  updateInput = (type) => (e) => {
    let edit = this.state.edit
    edit[type] = e.target.value
    this.setState({edit})
  }

  render() {
    const { user } = this.state
    const { job, dateBirth, accountType } = this.state.user.information?this.state.user.information:''
    const { creationTime } = this.state.user.metadata?this.state.user.metadata:''
    const listGroupTitle = [
      {item: 'Nome', field: 'name', edit: true, typeInput: 'text', payload: user.displayName},
      {item: 'E-mail', field: 'email', edit: true, typeInput: 'email', payload: user.email, isVerified: user.emailVerified},
      {item: 'Status', field: 'status', payload: 'Doador'},
      {item: 'Profissão', field: 'job', payload: job},
      {item: 'Data de Nascimento', field: 'dateBirth', payload: dateBirth},
      {item: 'Tipo de Conta', field: 'accountType', payload: accountType},
      {item: 'E-mail verificado?', field: 'verifyEmail', payload: 'Após o e-mail verificado, não é possível altera-lo', isVerified: user.emailVerified},
      {item: '', field: 'accountCreated', payload: moment(creationTime).format('LLLL')}
    ]
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
                    <ListGroup items={listGroupTitle} user={this.state.user} reloadState={this.reloadState} />

                  </div>
                </div>

                <div className="col-sm-8">
                  <div className="card mb-3">
                    <h3 className="card-header">Endereço</h3>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item myAccount_box_edit">
                        <h5 className="card-title">Rua</h5>
                        <h6 className="card-subtitle text-muted">{this.state.user.information.address}</h6>
                        {this.state.template.showTemplateAddress &&
                            <UpdateInformation 
                              fieldName={'address'}
                              type={'text'}
                              updateInput={this.updateInput('address')}
                              save={this.saveInfo}
                              cancel={this.editInfo}
                              value={this.state.edit.address}
                              loading={this.state.template.btnChangeLoading}
                            />
                          }
                          {!this.state.template.showTemplateAddress &&
                            <button className="btn btn-warning btn-xs edit" id="address" onClick={this.editInfo('address')}><i className="fa fa-user-edit"></i></button>
                          }
                      </li>
                    </ul>
                  </div>
                  <GetPhotoInstagram reloadState={this.reloadState} />
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