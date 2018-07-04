import React, { Component } from 'react';
// import { SemipolarSpinner } from 'react-epic-spinners'
import * as firebase from 'firebase';
import { ToastContainer, toast } from 'react-toastify';
import {verify} from '../components/modules/verifyLogin'
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';

import '../assets/dashboard.css'

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      link: '/dashboard'
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
      <div className="dashboard">
        {this.state.loading &&
          <Loader text="Carregando Dashboard" color="#686de0"/>
        }
        {!this.state.loading &&
          <div>
            <ToastContainer autoClose={5000} hideProgressBar={true} position="top-right"/>
            <Navbar exit={this.exit.bind(this)} link={this.state.link}/>
            <div className="container">

            </div>
          </div>
        }
        {/* end loading */}
      </div>
    );
  }
}

export default Dashboard;