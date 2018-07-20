import React, { Component } from 'react';
import { SemipolarSpinner } from 'react-epic-spinners'
import * as firebase from 'firebase';
import { ToastContainer, toast } from 'react-toastify';
import {verify} from '../components/modules/verifyLogin'
import Navbar from '../components/Navbar';
import CreditCard from '../components/CreditCard';
import Loader from '../components/Loader';

import '../assets/dashboard.css'

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      link: '/dashboard',
      donate: ['10', '15', '20', '30', '40', '50'],
      valueSelected: '0',
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

  updateValue = (e) => {
    if(e.target.type === 'number' && e.target.value < 150) {
      this.setState({
        valueSelected: e.target.value,
        valueCustom: e.target.value
      });
      return false;
    }

    if(e.target.type === 'number' && e.target.value > 150) {
      toast.error('Valor máximo para doação é de R$ 150');
      this.setState({
        valueSelected: '150',
        valueCustom: '150'
      });
      return false;
    }

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
          <Loader text="Carregando Dashboard" color="#686de0"/>
        }
        {!this.state.loading &&
          <div>
            <ToastContainer autoClose={5000} hideProgressBar={true} position="top-right"/>
            <Navbar exit={this.exit} link={this.state.link} user={this.state.user}/>
            <div className="container">
              <div className="dashboard_title">
                <h2>Doando agora você ajudar muitas pessoas!</h2>
              </div>

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
                  <li className="list-inline-item">
                    <div className="form-group">
                      <label className="control-label">Outro valor</label>
                      <div className="form-group">
                        <div className="input-group mb-3">
                          <div className="input-group-prepend">
                            <span className="input-group-text">R$</span>
                          </div>
                          <input type="number" className="form-control" value={this.state.valueCustom} onChange={this.updateValue}/>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>

                <div className="form-group">
                  <h6>Escolha uma das opções:</h6>
                  <div className="custom-control custom-radio">
                    <input type="radio" id="option1" name="customRadio" className="custom-control-input" onChange={this.updateValue} checked={this.state.radio === 'option1'?'checked':''}/>
                    <label className="custom-control-label" htmlFor="option1">Quero apadrinhar um aluno</label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input type="radio" id="option2" name="customRadio" className="custom-control-input" onChange={this.updateValue} checked={this.state.radio === 'option2'?'checked':''}/>
                    <label className="custom-control-label" htmlFor="option2">Quero ajudar a instituição</label>
                  </div>
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

          </div>
        }
        {/* end loading */}
      </div>
    );
  }
}

export default Dashboard;