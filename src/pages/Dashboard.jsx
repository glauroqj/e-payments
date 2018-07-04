import React, { Component } from 'react';
// import { SemipolarSpinner } from 'react-epic-spinners'
import { ToastContainer, toast } from 'react-toastify';
import {verify} from '../components/modules/verifyLogin'
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';

import '../assets/dashboard.css'

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
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

  render() {
    return (
      <div className="dashboard">
        {this.state.loading &&
          <Loader text="Carregando Dashboard" color="#686de0"/>
        }
        {!this.state.loading &&
          <div>
            <ToastContainer autoClose={5000} hideProgressBar={true} position="top-right"/>
            <Navbar />
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