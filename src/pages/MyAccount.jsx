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
      link: '/my-account',
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

  render() {
    return (
      <div className="myAccount">
        {this.state.loading &&
          <Loader text="Carregando Minha Conta" color="#686de0"/>
        }
        {!this.state.loading &&
          <div>
            <ToastContainer autoClose={5000} hideProgressBar={true} position="top-right"/>
            <Navbar exit={this.exit.bind(this)} link={this.state.link}/>
            <div className="container">
              <div className="myAccount_title">
                <h2>Configure sua conta</h2>
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