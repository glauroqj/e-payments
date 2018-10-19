import React, { Component } from 'react'
import * as firebase from 'firebase'
import * as moment from 'moment'
import 'moment/locale/pt-br'
import { ToastContainer, toast } from 'react-toastify'
import {verify, getDataUser} from '../components/modules/verifyLogin'

import Navbar from '../components/Navbar'
import Loader from '../components/Loader'

import ListGroup from '../components/myAccount/ListGroup'
// import GetPhotoInstagram from '../components/modules/getPhotoInstagram'

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
    const { job, dateBirth, accountType, address } = this.state.user.information?this.state.user.information:''
    const { creationTime } = this.state.user.metadata?this.state.user.metadata:''
    const listGroupAccountData = [
      {item: 'Nome', field: 'name', edit: true, typeInput: 'text', payload: user.displayName},
      {item: 'E-mail', field: 'email', edit: true, typeInput: 'email', payload: user.email, isVerified: user.emailVerified},
      {item: 'Status', field: 'status', payload: 'Doador'},
      {item: 'Profissão', field: 'job', payload: job},
      {item: 'Data de Nascimento', field: 'dateBirth', payload: dateBirth},
      {item: 'Tipo de Conta', field: 'accountType', payload: accountType},
      {item: 'E-mail verificado?', field: 'verifyEmail', payload: 'Após o e-mail verificado, não é possível altera-lo', isVerified: user.emailVerified},
      {item: '', field: 'accountCreated', payload: moment(creationTime).format('LLLL')}
    ]
    const listGroupAddress = [
      {item: 'Rua', field: 'address', edit: true, typeInput: 'text', payload: address}
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
                    <ListGroup items={listGroupAccountData} user={this.state.user} reloadState={this.reloadState} />
                  </div>
                </div>

                <div className="col-sm-8">
                  <div className="card mb-3">
                    <h3 className="card-header">Endereço</h3>
                    <ListGroup items={listGroupAddress} user={this.state.user} reloadState={this.reloadState} />
                  </div>
                  {/* <GetPhotoInstagram reloadState={this.reloadState} /> */}
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