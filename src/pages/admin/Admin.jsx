import React, { Component } from 'react';
import * as firebase from 'firebase';
import { ToastContainer, toast } from 'react-toastify'
import {verify} from '../../components/modules/verifyLogin'
import Navbar from '../../components/Navbar'
import SideMenu from '../../components/admin/SideMenu'
import Summary from '../../components/admin/Summary'
import Configure from '../../components/admin/Configure'
import Search from '../../components/admin/Search'
import Loader from '../../components/Loader'

import '../../assets/admin.css'

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      link: '/admin',
      menuOptions: [
        {name: 'Resumo', link: 'summary'},
        {name: 'Gerenciar Administrador', link: 'add-admin'},
        {name: 'Buscar usuário', link: 'search'}
      ],
      adminUsers: '',
      cpfUsers: 0,
      cnpjUsers: 0,
      tab: '',
      emailAdmin: '',
      btnLoading: false,
      btnText: 'adicionar novo',
      summaryLoading: true,
      configureLoading: true,
      searchLoading: true,
      searchResults: [],
      search: ''
    }
  }

  componentWillMount() {
    /* verify if user is logged */
    verify().then((user) => {
      // console.log('LOGED: ', user)
      /* redirect to dashboard */
      this.setState({
        user: user
      },
        () => {
          this.validateUser()
        }
      )
      return false;
    })
    .catch((error) => {
      // console.log('Not Loged: ')
      this.props.history.push('/login')
    });

  }

  validateUser() {
    let state = this.state;
    firebase.database().ref('admin/value').once('value')
    .then((snapshot) => {
      if(snapshot.val()) {
        let data = snapshot.val();
        // console.log('VALIDAR EMAIL: ',data ,' EMAIL USER: ', state.user.email)
        if(data.indexOf(state.user.email) !== -1) {
          /* valid */
          this.setState({
            loading: false
          },
            () => {
              this.getInfo()
            }
          )
          return false
        }
        this.props.history.push('/create');
      }
    })
    .catch((error) => {
      console.log(error)
    });
  }

  getInfo() {
    /* cpf */
    firebase.database().ref('/').once('value')
    .then((snapshot) => {
      let data = snapshot.val()
      if(data) {
        this.setState({
          cpfUsers: data.users.cpf?data.users.cpf:0,
          cnpjUsers: data.users.cnpj?data.users.cnpj:0,
          adminUsers: data.admin.value,
          summaryLoading: false,
          configureLoading: false,
          searchLoading: false,
          // tab: 'summary'
          // /* TODO HERE */
          tab: 'search'
        },
          () => {
            /* search */
            let arrayUsers = []
            let keysAll = []
            let {cpfUsers, cnpjUsers} = this.state
            let keysCPF = Object.keys(cpfUsers)
            let keysCNPJ = Object.keys(cnpjUsers)

            keysAll = keysAll.concat(keysCPF, keysCNPJ)

            keysAll.forEach((key, i) => {
              let item = ''
              let cpf = cpfUsers[key]?cpfUsers[key].information:false
              let cnpj = cnpjUsers[key]?cnpjUsers[key].information:false
              if (cpf) {
                console.log('CPF: ',cpf)
                let nameSplit = cpf.name.toLowerCase().split(' ')
                item = cpf
                item.key = key
                item.name_search = nameSplit
                arrayUsers.push(item)
              }
              if (cnpj) {
                console.log('CNPJ:', cnpj)
                let nameSplit = cnpj.name.toLowerCase().split(' ')
                item = cnpj
                item.key = key
                item.name_search = nameSplit
                arrayUsers.push(item)
              }
              this.setState({arrayUsers})
            })
          }
        )
      }
    })
    .catch((error) => {})

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

  clickSideMenu = (value, e) => {
    let tab = this.state.tab
    tab = value
    this.setState({tab})
  }

  removeAdmin = (index, e) => {
    let newArray = this.state.adminUsers
    let name = newArray[index]
    newArray.splice(index, 1)
    this.setState({
      adminUsers: newArray
    },
      () => {
        firebase.database().ref('admin/value').set(newArray)
        .then((success) => {
          toast.success(`Administrador removido: ${name}`)
        })
      }
    )
  }

  addAdmin = (e) => {
    let email = this.state.emailAdmin
    let newArray = this.state.adminUsers
    newArray.push(email)
    this.setState({
      adminUsers: newArray,
      btnLoading: true,
      btnText: 'salvando...'
    },
      () => {
        firebase.database().ref('admin/value').set(newArray)
        .then((success) => {
          this.setState({
            btnLoading: false,
            btnText: 'Adicionar novo',
            emailAdmin: ''
          })
          toast.success(`Administrador adicionado: ${email}`)
        })
      }
    )
  }

  updateValue = (name, e) => {
    let state = this.state;
    state[name] = e.target.value
    this.setState(state)
  }

  search = (e) => {
    let state = this.state
    let {search, arrayUsers} = this.state
    let name = []
    search = search.toLowerCase()

    const email = arrayUsers.filter(user => user.email === search)
    
    arrayUsers.map((key, i) => {
      return key.name_search.map((item, i) => {
        if (item === search) {
          name.push(key)
          return key
        }
        return false
      })
    })

    /* USING FILTER */
    if (email.length > 0) {
      state.searchResults = email
      state.search = ''
      this.setState(state)
      return false
    }
    if (name.length > 0) {
      state.searchResults = name
      state.search = ''
      this.setState(state)
      return false
    }
    state.searchResults = []
    state.search = ''
    this.setState(state)

  }

  render() {
    return (
      <div className="admin">
        {this.state.loading &&
          <Loader text="Carregando Painel de Controle" color="#3e5472"/>
        }
        {!this.state.loading &&
          <div className="animated fadeIn">
            <ToastContainer autoClose={5000} hideProgressBar={true} position="top-right"/>
            <Navbar exit={this.exit} link={this.state.link} user={this.state.user}/>
            <div className="container">
              <div className="row">
                <div className="col-sm-4">
                  <SideMenu menu={this.state.menuOptions} tab={this.state.tab} clickSideMenu={this.clickSideMenu}/>
                </div>
                <div className="col-sm-8">
                  {this.state.tab === 'summary' &&
                    <Summary loading={this.state.summaryLoading} cpf={this.state.cpfUsers} cnpj={this.state.cnpjUsers}/>
                  }
                  {this.state.tab === 'add-admin' &&
                    <Configure 
                      loading={this.state.configureLoading} 
                      admins={this.state.adminUsers} 
                      removeAdmin={this.removeAdmin} 
                      inputChange={this.updateValue}
                      email={this.state.emailAdmin}
                      submit={this.addAdmin}
                      btnLoading={this.state.btnLoading}
                      btnText={this.state.btnText}
                    />
                  }
                  {this.state.tab === 'search' &&
                    <Search 
                      loading={this.state.searchLoading}
                      inputChange={this.updateValue}
                      btnLoading={this.state.btnLoading}
                      btnText={'Procurar'}
                      submit={this.search}
                      value={this.state.search}
                      results={this.state.searchResults}
                    />
                  }
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

export default Admin;