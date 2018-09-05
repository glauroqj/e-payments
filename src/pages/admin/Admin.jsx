import React, { Component } from 'react';
import * as firebase from 'firebase';
import { ToastContainer, toast } from 'react-toastify'
import {verify} from '../../components/modules/verifyLogin'
import Navbar from '../../components/Navbar'
import SideMenu from '../../components/admin/SideMenu'
import Summary from '../../components/admin/Summary'
import Configure from '../../components/admin/Configure'
import Loader from '../../components/Loader'
import Footer from '../../components/Footer'

import '../../assets/admin.css'

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      link: '/admin',
      menuOptions: [{name: 'Resumo', link: 'summary'},{name: 'Gerenciar Administrador', link: 'add-admin'}],
      user: '',
      cpfUsers: '',
      cnpjUsers: '',
      tab: '',
      summaryLoading: true,
      configureLoading: true
    }
  }

  componentWillMount() {
    /* verify if user is logged */
    verify().then((user) => {
      // console.log('LOGED: ', user)
      /* redirect to dashboard */
      this.setState({
        user: user
      },
        () => {
          this.validateUser()
        }
      )
      return false;
    })
    .catch((error) => {
      // console.log('Not Loged: ')
      this.props.history.push('/login')
    });

  }

  validateUser() {
    let state = this.state;
    firebase.database().ref('admin/value').once('value')
    .then((snapshot) => {
      if(snapshot.val()) {
        let data = snapshot.val();
        // console.log('VALIDAR EMAIL: ',data ,' EMAIL USER: ', state.user.email)
        if(data.indexOf(state.user.email) > 0) {
          /* valid */
          this.setState({
            loading: false
          },
            () => {
              this.getInfo()
            }
          )
          return false
        }
        this.props.history.push('/create');
      }
    })
    .catch((error) => {
      console.log(error)
    });
  }

  getInfo() {
    /* cpf */
    firebase.database().ref('users/cpf').once('value')
    .then((snapshot) => {
      let data = snapshot.val()
      if(data) {
        this.setState({
          cpfUsers: data,
          summaryLoading: false,
          tab: 'summary'
        })
      }
    })
    .catch((error) => {})

    /* cnpj */
    firebase.database().ref('users/cnpj').once('value')
    .then((snapshot) => {
      let data = snapshot.val()
      if(data){
        this.setState({
          cnpjUsers: data,
          summaryLoading: false,
          tab: 'summary'
        })
      }
    })
    .catch((error) => {})
    
  }

  exit = () => {
    // console.log('Deslogar')
    firebase.auth().signOut()
    .then((success) => {
      this.props.history.push('/login');
    })
    .catch((error) => {
      toast.error('Ocorreu um erro, tente novamente.')
    })
  }

  updateValue = (value) => (e) => {
    let state = this.state;
    this.setState({state})
  }

  clickSideMenu = (value, e) => {
    let tab = this.state.tab
    tab = value
    this.setState({tab})
  }

  render() {
    return (
      <div className="admin">
        {this.state.loading &&
          <Loader text="Carregando Painel de Controle" color="#3e5472"/>
        }
        {!this.state.loading &&
          <div className="animated fadeIn">
            <ToastContainer autoClose={5000} hideProgressBar={true} position="top-right"/>
            <Navbar exit={this.exit} link={this.state.link} user={this.state.user}/>
            <div className="container">
              <div className="row">
                <div className="col-sm-4">
                  <SideMenu menu={this.state.menuOptions} clickSideMenu={this.clickSideMenu}/>
                </div>
                <div className="col-sm-8">
                  {this.state.tab === 'summary' &&
                    <Summary loading={this.state.summaryLoading} cpf={this.state.cpfUsers} cnpj={this.state.cnpjUsers}/>
                  }
                  {this.state.tab === 'add-admin' &&
                    <Configure />
                  }
                </div>
              </div>
            </div>
            <Footer/>
          </div>
        }
        {/* end loading */}
      </div>
    );
  }
}

export default Admin;