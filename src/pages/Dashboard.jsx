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
      link: '/dashboard',
      donate: ['10', '15', '20', '30', '40', '50'],
      valueSelected: '0',
      valueCustom: '',
      idSession: ''
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
              </div>

              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a className="nav-link active show" data-toggle="tab" href="#home">
                    <i className="fa fa-credit-card"></i> Cartão de Crédito
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="tab" href="#profile">
                     <i className="fa fa-money-bill"></i> Boleto
                  </a>
                </li>
              </ul>
              <div id="myTabContent" className="tab-content">
                <div className="tab-pane fade active show" id="home">
                  <form action="https://pagseguro.uol.com.br/checkout/v2/donation.html" method="post">
                    <input type="hidden" name="currency" value="BRL" />
                    <input type="hidden" name="receiverEmail" value="glauro.juliani@hotmail.com" />
                    <input type="hidden" name="iot" value="button" />
                    <input type="image" src="https://stc.pagseguro.uol.com.br/public/img/botoes/doacoes/205x30-doar.gif" name="submit" alt="Pague com PagSeguro - é rápido, grátis e seguro!" />
                  </form>
                </div>
                <div className="tab-pane fade" id="profile">
                  <p>Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit.</p>
                </div>
                <div className="tab-pane fade" id="dropdown1">
                  <p>Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade. Messenger bag gentrify pitchfork tattooed craft beer, iphone skateboard locavore carles etsy salvia banksy hoodie helvetica. DIY synth PBR banksy irony. Leggings gentrify squid 8-bit cred pitchfork.</p>
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