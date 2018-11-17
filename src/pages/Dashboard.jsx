import React, { Component } from 'react'
// import { SemipolarSpinner } from 'react-epic-spinners'
import * as firebase from 'firebase'
import { ToastContainer, toast } from 'react-toastify'
import {verify} from '../components/modules/verifyLogin'
import Navbar from '../components/Navbar'

import ToggleTab from '../components/dashboard/ToggleTab'

import Loader from '../components/Loader'
import Maintenance from '../components/Maintenance'
import Footer from '../components/Footer'

import InputFormat from '../components/InputFormat'

import '../assets/dashboard.css'

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      link: '/dashboard',
      donate: ['10,00', '15,00', '20,00', '30,00', '40,00', '50,00'],
      valueSelected: '',
      valueCustom: '',
      idSession: '',
      radio: 'option1',
      form: {},
      maintenance: false /* change to true */
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

    this.setState(state)

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
    return (
      <div className="dashboard">
        {this.state.loading &&
          <Loader text="Carregando Dashboard" color="#3e5472"/>
        }
        {!this.state.loading &&
          <div className="animated fadeIn">
            <ToastContainer autoClose={5000} hideProgressBar={true} position="top-right"/>
            <Navbar exit={this.exit} link={this.state.link} user={this.state.user}/>
            
            {this.state.maintenance &&
              <Maintenance />
            }

            <div className={'container ' + (this.state.maintenance === true?'hide':'')}>
              <div className="dashboard_values">
                <h1>R$ {this.state.valueSelected}</h1>
                <ul className="list-inline">
                  {this.state.donate.map((key, i) => {
                    return (
                      <React.Fragment key={i}>
                        <li className="list-inline-item">
                          <button type="button" 
                            className={this.state.valueSelected === key?'btn btn-lg btn-outline-success active':'btn btn-outline-success'} 
                            onClick={this.updateValue('button')} value={key}>R$ {key}
                          </button>
                        </li>
                      </React.Fragment>
                    )
                  })}
                  <li className="list-inline-item dashboard_values_custom">
                    <div className="form-group">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">R$</span>
                        </div>
                        <InputFormat
                          className="form-control"
                          type={'tel'}
                          placeholder={'Doar outro valor'}
                          value={this.state.valueCustom}
                          onChange={this.updateValue('custom')}
                          errorBag={[]}
                        />
                      </div>
                    </div>
                  </li>
                </ul>

                <div className="options-choice">
                  <h4>Escolha uma das opções:</h4>
                  <ul className="list-inline">
                    <li className="list-inline-item">
                      <div className={this.state.radio === 'option1'?'custom-control custom-radio active':'custom-control custom-radio'}>
                        <input type="radio" id="option1" name="customRadio" className="custom-control-input" onChange={this.updateValue('radio')} checked={this.state.radio === 'option1'?'checked':''}/>
                        <label className="custom-control-label" htmlFor="option1">
                          <i className="fas fa-user-graduate"/> Quero apadrinhar um aluno
                        </label>
                      </div>
                    </li>
                    <li className="list-inline-item">
                      <div className={this.state.radio === 'option2'?'custom-control custom-radio active':'custom-control custom-radio'}>
                        <input type="radio" id="option2" name="customRadio" className="custom-control-input" onChange={this.updateValue('radio')} checked={this.state.radio === 'option2'?'checked':''}/>
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