import React, { Component } from 'react';
// import { SemipolarSpinner } from 'react-epic-spinners'
import * as firebase from 'firebase';
import { ToastContainer, toast } from 'react-toastify';
import {verify} from '../components/modules/verifyLogin'
import Navbar from '../components/Navbar';
import CreditCard from '../components/CreditCard';
import Billet from '../components/Billet';
import Loader from '../components/Loader';
import Footer from '../components/Footer';
import CurrencyFormat from 'react-currency-format';

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
      paymentOptionAba: 'credit-card',
      form: {

      }
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

  togglePaymentOptionAba = (e) => {
    this.setState({
      paymentOptionAba: e.target.id
    });
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
            <div className="container">
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
                        <CurrencyFormat
                          className="form-control"
                          thousandSeparator={'.'}
                          decimalSeparator={','}
                          decimalScale={2}
                          type={'tel'}
                          fixedDecimalScale={true}
                          placeholder={'Doar outro valor'}
                          value={this.state.valueCustom}
                          allowNegative={false}
                          onValueChange={this.updateValue('custom')}
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
              
              <div className="box-toggle-tab">
                <ul className="nav nav-pills nav-fill">
                  <li className="nav-item">
                    <a className={this.state.paymentOptionAba === 'credit-card'?'nav-link active show':'nav-link'} id="credit-card" onClick={this.togglePaymentOptionAba}>
                      Cartão de Crédito
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className={this.state.paymentOptionAba === 'billet'?'nav-link active show':'nav-link'} id="billet" onClick={this.togglePaymentOptionAba}>
                      Boleto
                    </a>
                  </li>
                </ul>
              </div>

              <div className="tab-content box-toggle-tab-content">
                <div className={this.state.paymentOptionAba === 'credit-card'?'tab-pane animated fadeIn active show':'tab-pane'}>
                  {this.state.paymentOptionAba === 'credit-card' &&
                    <CreditCard totalValue={this.state.valueSelected !== ''?this.state.valueSelected:this.state.valueCustom}/>  
                  }
                </div>
                <div className={this.state.paymentOptionAba === 'billet'?'tab-pane animated fadeIn active show':'tab-pane'}>
                  {this.state.paymentOptionAba === 'billet' &&
                    <Billet totalValue={this.state.valueSelected !== ''?this.state.valueSelected:this.state.valueCustom}/>
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

export default Dashboard;