import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {verify} from '../components/modules/verifyLogin'
import Loader from '../components/Loader';
import Logo from '../components/Logo';
import Cpf from '../components/Cpf';

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
                <Cpf />
                {/* <CreditCard totalValue={this.state.valueSelected !== ''?this.state.valueSelected:this.state.valueCustom}/>   */}
              </div>
              <div className={this.state.optionTab === 'cnpj'?'tab-pane animated fadeIn active show':'tab-pane'}>
                cnpj
                {/* <Billet totalValue={this.state.valueSelected !== ''?this.state.valueSelected:this.state.valueCustom}/> */}
              </div>
            </div>

            {/* <form action="" className="createAcc_form"
                onKeyDown={
                  (e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        this.createAcc(e)
                    }
                  }
                }
            >
              <div className="row">
                <div className="col-sm">
                  <div className="form-group row justify-content-sm-center">
                    <label className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-6">
                      <input type="text" className="form-control" id="email" placeholder="email@example.com" value={this.state.email} onChange={this.handleInput}/>
                    </div>
                  </div>
                  <div className="form-group row justify-content-sm-center">
                    <label className="col-sm-2 col-form-label">Senha</label>
                    <div className="col-sm-6">
                      <input type="password" className="form-control" id="password" placeholder="*****" value={this.state.password} onChange={this.handleInput}/>
                    </div>
                  </div>
                  <div className="form-group row justify-content-sm-center">
                    <label className="col-sm-2 col-form-label">Confirmar Senha</label>
                    <div className="col-sm-6">
                      <input type="password" className="form-control" id="confirm_password" placeholder="*****" value={this.state.confirm_password} onChange={this.handleInput}/>
                    </div>
                  </div>
                </div>
                
                <div className="col-sm">
                  <div className="form-group row justify-content-sm-center">
                    <label className="col-sm-2 col-form-label">Instagram</label>
                    <div className="col-sm-6 input-group">
                      <input type="text" className="form-control" id="instagram" placeholder="examplo.ola" value={this.state.userName} onChange={this.handleInput}/>
                    </div>
                    <div className="col-sm-2">
                      <button className="btn btn-outline-success" type="button" disabled={this.state.btnLoadingInstagram?'disbled':''} onClick={this.getInfoInstagram}>
                        {this.state.btnLoadingInstagram &&
                          <SemipolarSpinner size={20} color={'#4CAF50'}/>
                        }
                        {!this.state.btnLoadingInstagram &&
                          <div>Buscar</div>
                        }
                      </button>
                    </div>
                  </div>

                  {this.state.instagram &&
                    <div className="col-sm-12 createAcc_instagram animated fadeIn">
                      <div>Verifique se o perfil encontrado corresponde ao seu!</div>
                      <ul className="list-group">
                        <li className="list-group-item">
                          <div><b>Imagem de perfil</b></div>
                          <img src={this.state.instagram.profile_pic_url_hd} alt=""/>
                        </li>
                        <li className="list-group-item name"><span><b>Nome: </b></span>{this.state.instagram.full_name}</li>
                        <li className="list-group-item name"><span><b>Biografia: </b></span>{this.state.instagram.biography}</li>
                      </ul>
                    </div>
                  }

                </div> 
              </div>

              <div className="form-group">
                <a href="/login" className="btn btn-link">Voltar</a>
                <button type="button" className="btn btn-success" disabled={this.state.btnLoading?'disbled':''} onClick={this.createAcc}>
                  {this.state.btnLoading &&
                    <SemipolarSpinner size={30} color="white"/>
                  }
                  <div>{this.state.btnText}</div>
                </button>
              </div>
            </form> */}
            
          </div>
        } 
        {/* end no loading */}
      </div>
    );
  }
}

export default CreateAccount;