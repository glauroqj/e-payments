import React, { Component } from 'react'
import { ToastContainer } from 'react-toastify'
import {verify} from '../components/modules/verifyLogin'
import Navbar from '../components/Navbar'

import Values from '../components/dashboard/Values'
import Options from '../components/dashboard/Options'
import ToggleTab from '../components/dashboard/ToggleTab'

import Loader from '../components/Loader'
import Maintenance from '../components/Maintenance'
import Footer from '../components/Footer'

import '../assets/dashboard.css'

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      link: '/dashboard',
      idSession: '',
      radio: 'option1',
      form: {
        value: ''
      },
      maintenance: true /* change to true */
    }
  }

  componentDidMount() {
    /* verify if user is logged */
    verify().then((user) => {
      // console.log('LOGED: ', user)
      /* redirect to dashboard */
      this.setState({
        user: user,
        loading: false
      });
      return false;
    })
    .catch((error) => {
      // console.log('Not Loged: ')
      this.props.history.push('/login');
    });

  }

  updateDonationValue = (value) => {
    console.log('UPDATE DONATION VALUE: ', value)
    let form = this.state.form
    form.value = value
    this.setState({form})
  }

  updateOptionValue = (value) => {
    console.log('UPDATE OPTION VALUE: ', value)
    let state = this.state
    state.radio = value
    this.setState(state)
  }

  render() {
    const { loading, link, maintenance, user, form } = this.state
    return (
      <div className="dashboard">
        {loading &&
          <Loader text="Carregando Dashboard" color="#3e5472"/>
        }
        {!loading &&
          <div className="animated fadeIn">
            <ToastContainer autoClose={5000} hideProgressBar={true} position="top-right"/>
            <Navbar link={link} user={user}/>
            
            {maintenance &&
              <Maintenance />
            }

            <div className={'container ' + (maintenance ? 'hide' : '')}>
              <div className="dashboard_values">
                <Values updateDonateValue={this.updateDonationValue} />
                <Options updateOptionValue={this.updateOptionValue} />
              </div>

              <ToggleTab 
                valueDonation={form.value}
              />
              
            </div>
            <Footer/>
          </div>
        }
        {/* end loading */}
      </div>
    );
  }
}

export default Dashboard;