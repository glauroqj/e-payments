import React, { Component } from 'react'
// import { SemipolarSpinner } from 'react-epic-spinners'
import * as firebase from 'firebase'
import { ToastContainer, toast } from 'react-toastify'
import {verify} from '../components/modules/verifyLogin'
import Navbar from '../components/Navbar'

import DashboardValues from '../components/dashboard/DashboardValues'
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

  updateValue = (type) => (e) => {
    let state = this.state;
    if(type === 'radio') {
      state.radio = e.target.id
    }
    this.setState(state)
  }

  updateDonationValue = (value) => {
    console.log('UPDATE DONATION VALUE: ', value)
    let form = this.state.form
    form.value = value
    this.setState({form})
  }
  // saveOptionRadio = () => {
  //   /* after donation is done, save on database preferences */
  //   firebase.database().ref('users/' + this.state.user.uid).set({
  //     radio: this.state.radio
  //   })
  //   .then(() => {
  //     console.log('Saved')
  //   })

  //   /* get informations */
  //   setTimeout(() => {
  //     firebase.database().ref('users/' + this.state.user.uid).once('value')
  //     .then((snapshot) => {
  //       console.log('Get infos: ', snapshot.val())
  //     })
  //   }, 5000);

  // }

  render() {
    const { loading, link, maintenance, user, radio } = this.state
    return (
      <div className="dashboard">
        {loading &&
          <Loader text="Carregando Dashboard" color="#3e5472"/>
        }
        {!loading &&
          <div className="animated fadeIn">
            <ToastContainer autoClose={5000} hideProgressBar={true} position="top-right"/>
            <Navbar exit={this.exit} link={link} user={user}/>
            
            {maintenance &&
              <Maintenance />
            }

            <div className={'container ' + (maintenance ? 'hide' : '')}>
              <div className="dashboard_values">
                <DashboardValues
                  updateDonateValue={this.updateDonationValue}
                />
                <div className="options-choice">
                  <h4>Escolha uma das opções:</h4>
                  <ul className="list-inline">
                    <li className="list-inline-item">
                      <div className={radio === 'option1'?'custom-control custom-radio active':'custom-control custom-radio'}>
                        <input type="radio" id="option1" name="customRadio" className="custom-control-input" onChange={this.updateValue('radio')} checked={radio === 'option1'?'checked':''}/>
                        <label className="custom-control-label" htmlFor="option1">
                          <i className="fas fa-user-graduate"/> Quero apadrinhar um aluno
                        </label>
                      </div>
                    </li>
                    <li className="list-inline-item">
                      <div className={radio === 'option2'?'custom-control custom-radio active':'custom-control custom-radio'}>
                        <input type="radio" id="option2" name="customRadio" className="custom-control-input" onChange={this.updateValue('radio')} checked={radio === 'option2'?'checked':''}/>
                        <label className="custom-control-label" htmlFor="option2">
                          <i className="fas fa-university"/> Quero ajudar a instituição
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>

              </div>

              <ToggleTab 
                valueSelected={this.state.valueSelected}
                valueCustom={this.state.valueCustom}
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