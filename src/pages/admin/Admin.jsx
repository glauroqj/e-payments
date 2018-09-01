import React, { Component } from 'react';
// import { SemipolarSpinner } from 'react-epic-spinners'
import * as firebase from 'firebase';
import { ToastContainer, toast } from 'react-toastify'
import {verify} from '../../components/modules/verifyLogin'
import Navbar from '../../components/Navbar'
import SideMenu from '../../components/admin/SideMenu'
import Loader from '../../components/Loader'
import Footer from '../../components/Footer'

import '../../assets/admin.css'

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      link: '/admin',
      menuOptions: ['Resumo','Cadastrar Administrador'],
      user: '',
      cpfUsers: '',
      cnpjUsers: ''
    }
  }

  componentWillMount() {
    /* verify if user is logged */
    verify().then((user) => {
      console.log('LOGED: ', user)
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
      console.log('Not Loged: ')
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
        if(data.indexOf(state.user.email) === 0) {
          /* valid */
          this.setState({
            loading: false
          })
          return false
        }
        this.props.history.push('/create');
      }
    })
    .catch((error) => {
      console.log(error)
    });
  }

  exit = () => {
    console.log('Deslogar')
    firebase.auth().signOut()
    .then((success) => {
      this.props.history.push('/login');
    })
    .catch((error) => {
      toast.error('Ocorreu um erro, tente novamente.')
    })
  }

  updateValue = (type) => (e) => {
    let state = this.state;
    if(type === 'custom') {
      if(e.floatValue === 0) {
        toast.error('O valor mínimo para doação é de R$ 1');
        state.valueSelected = '';
        state.valueCustom = '';
      }

      state.valueSelected = e.formattedValue;
      state.valueCustom = e.formattedValue;
    }

    if(type === 'button') {
      state.valueSelected = e.target.value;
      state.valueCustom = '';
    }

    if(type === 'radio') {
      state.radio = e.target.id
    }

    this.setState({state})

  }

  render() {
    return (
      <div className="dashboard">
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
                  <SideMenu menu={this.state.menuOptions}/>
                </div>
                <div className="col-sm-8">
                  WINDOW
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