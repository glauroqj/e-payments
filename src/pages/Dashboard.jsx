import React, { Component } from 'react';
import { SemipolarSpinner } from 'react-epic-spinners'
import * as firebase from 'firebase';
import { ToastContainer, toast } from 'react-toastify';
import {verify} from '../components/modules/verifyLogin'
import Navbar from '../components/Navbar';
import CreditCard from '../components/CreditCard';
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
      paymentOptionAba: 'credit-card'
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

  customUpdateValue = (e) => {
    console.log(e)
    console.log('Float: ', e.floatValue)    

    if(e.floatValue === 0) {
      toast.error('O valor mínimo para doação é de R$ 1');
      this.setState({
        valueSelected: '',
        valueCustom: ''
      });
      return false;
    }

    this.setState({
      valueSelected: e.formattedValue,
      valueCustom: e.formattedValue
    });

  }

  updateValue = (e) => {
    if(e.target.type === 'button') {
      this.setState({
        valueSelected: e.target.value,
        valueCustom: ''
      });
    }

    if(e.target.type === 'radio') {
      this.setState({
        radio: e.target.id
      })
    }
  }

  togglePaymentOptionAba = (e) => {
    this.setState({
      paymentOptionAba: e.target.id
    });
  }

  saveOptionRadio = () => {
    /* after donation is done, save on database preferences */
    firebase.database().ref('users/' + this.state.user.uid).set({
      radio: this.state.radio
    })
    .then(() => {
      console.log('Saved')
    })

    /* get informations */
    setTimeout(() => {
      firebase.database().ref('users/' + this.state.user.uid).once('value')
      .then((snapshot) => {
        console.log('Get infos: ', snapshot.val())
      })
    }, 5000);

  }

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
                <h3>R$ {this.state.valueSelected}</h3>
                <ul className="list-inline">
                  {this.state.donate.map((key, i) => {
                    return (
                      <React.Fragment key={i}>
                        <li className="list-inline-item">
                          <button type="button" 
                            className={this.state.valueSelected === key?'btn btn-lg btn-outline-success active':'btn btn-outline-success'} 
                            onClick={this.updateValue} value={key}>R$ {key}
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
                        {/* <input type="number" placeholder="Doar outro valor" className="form-control" value={this.state.valueCustom} onChange={this.updateValue}/> */}
                        <CurrencyFormat
                          className="form-control"
                          thousandSeparator={'.'}
                          decimalSeparator={','}
                          decimalScale={2}
                          fixedDecimalScale={true}
                          placeholder={'Doar outro valor'}
                          value={this.state.valueCustom}
                          allowNegative={false}
                          onValueChange={this.customUpdateValue}
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
                        <input type="radio" id="option1" name="customRadio" className="custom-control-input" onChange={this.updateValue} checked={this.state.radio === 'option1'?'checked':''}/>
                        <label className="custom-control-label" htmlFor="option1">
                          <i className="fas fa-user-graduate"/> Quero apadrinhar um aluno
                        </label>
                      </div>
                    </li>
                    <li className="list-inline-item">
                      <div className={this.state.radio === 'option2'?'custom-control custom-radio active':'custom-control custom-radio'}>
                        <input type="radio" id="option2" name="customRadio" className="custom-control-input" onChange={this.updateValue} checked={this.state.radio === 'option2'?'checked':''}/>
                        <label className="custom-control-label" htmlFor="option2">
                          <i className="fas fa-university"/> Quero ajudar a instituição
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>

              </div>
              
              <div className="box-payment_title">
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

              <div id="myTabContent" className="tab-content box-payment">
                <div className={this.state.paymentOptionAba === 'credit-card'?'tab-pane animated fadeIn active show':'tab-pane'}>
                  <CreditCard />  
                </div>
                <div className={this.state.paymentOptionAba === 'billet'?'tab-pane animated fadeIn active show':'tab-pane'}>
                  <p>Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit.</p>
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