import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import {verify} from '../components/modules/verifyLogin'
import Loader from '../components/Loader';
import Logo from '../components/Logo';
import Cpf from '../components/Cpf';
import Cnpj from '../components/Cnpj';

import 'react-toastify/dist/ReactToastify.css';
import '../assets/createAcc.css'

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirm: '',
      telephone: '',
      job: '',
      address: '',
      dateBirth: '',
      btnLoading: false,
      btnLoadingInstagram: false,
      btnText: 'Criar Conta',
      optionTab: 'cpf',
      loading: true
    }
  }

  componentWillMount() {
    /* verify if user is logged */
    verify().then((user) => {
      console.log('LOGED: ', user)
      /* redirect to dashboard */
      this.props.history.push('/dashboard');
      return false;
    })
    .catch((error) => {
      console.log('Not Loged: ')
      this.setState({
        loading: false
      });
    })
  }

  // getInfoInstagram = () => {
  //   // https://www.instagram.com/glauroqj/?__a=1

  //   if(this.state.userName === '') {
  //     toast.error('Campo Instagram vazio');
  //     return false;
  //   }

  //   this.setState({
  //     btnTextInstagram: 'Buscando...',
  //     btnLoadingInstagram: true
  //   })

  //   axios({
  //     method:'get',
  //     url:'https://apinsta.herokuapp.com/u/'+ this.state.userName,
  //     responseType:'json'
  //   })
  //   .then((response) => {
  //     console.log(response.data.graphql.user)
  //     this.setState({
  //       instagram: response.data.graphql.user,
  //       btnLoadingInstagram: false
  //     })
  //   })
  //   .catch((error) => {
  //     toast.error('Usuário inexistente');
  //     this.setState({
  //       userName: '',
  //       btnLoadingInstagram: false
  //     })
  //     console.log('ERROR: ',error)
  //   })

  // }

  toggleTabOption = (e) => {
    this.setState({
      optionTab: e.target.id
    });
  }

  render() {
    return (
      <div className="createAcc container">
        {this.state.loading &&
          <Loader text="Carregando Criar Conta" color="#3e5472"/>
        }
        {!this.state.loading &&
          <div className="animated fadeIn">
            <ToastContainer autoClose={5000} hideProgressBar={true} position="top-right"/>
            <Logo />
            <h5 className="createAcc_title">Criar Conta!</h5>

            <div className="box-toggle-tab">
              <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                  <a className={this.state.optionTab === 'cpf'?'nav-link active show':'nav-link'} id="cpf" onClick={this.toggleTabOption}>
                    CPF
                  </a>
                </li>
                <li className="nav-item">
                  <a className={this.state.optionTab === 'cnpj'?'nav-link active show':'nav-link'} id="cnpj" onClick={this.toggleTabOption}>
                    CNPJ
                  </a>
                </li>
              </ul>
            </div>

            <div className="tab-content box-toggle-tab-content">
              <div className={this.state.optionTab === 'cpf'?'tab-pane animated fadeIn active show':'tab-pane'}>
                {this.state.optionTab === 'cpf' &&
                  <Cpf />
                }
              </div>
              <div className={this.state.optionTab === 'cnpj'?'tab-pane animated fadeIn active show':'tab-pane'}>
                {this.state.optionTab === 'cnpj' &&
                  <Cnpj />
                }
              </div>
            </div>
            
          </div>
        } 
        {/* end no loading */}
      </div>
    );
  }
}

export default CreateAccount;