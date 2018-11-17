import React, { Component } from 'react'
import * as firebase from 'firebase'
import { toast } from 'react-toastify'

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      routes: [ 
        {route: '/dashboard', text: 'Quero Doar'}, 
        {route: '/my-account', text: 'Minha Conta'}, 
      ],
      pathname: ''
    }
  }

  componentDidMount() {
    this.setState({
      pathname: window.location.pathname
    })
  }

  exit = () => {
    firebase.auth().signOut()
    .then((success) => {
      window.location.href = '/login'
    })
    .catch((error) => {
      toast.error('Ocorreu um erro, tente novamente.')
    })
  }

  menu = () => {
    this.setState({
      showMenu: !this.state.showMenu
    })
  }

  render() {
    const { showMenu, routes, pathname } = this.state
    const { user, link } = this.props
    let nav_item = 'nav-item'
    let show_menu = 'collapse navbar-collapse'
    if (showMenu) {
      show_menu += ' show animated fadeIn'
    }
    return (
      <nav className="navbar navbar-expand-lg navbar-dark">
        <a className="navbar-brand" href="/dashboard">Equale Doações</a>
        <button className="navbar-toggler" type="button" onClick={this.menu}>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={show_menu}>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item profile">
              {user.photoURL &&
                <a className="nav-link photo">
                    <img src={user.photoURL} alt=""/>
                </a>
              }
              <a className="nav-link name">
                {link === '/admin' &&
                  <span className="mr-1 badge badge-dark">ADM</span>
                }
                {user.displayName}
              </a>
            </li>
            {link === '/admin' && (
              <li className={link === '/admin'?'nav-item active':'nav-item'}>
                <a className="nav-link" href="/admin">Painel de Controle</a>
              </li>
            )}

            {routes.map((item) => (
              <li className={pathname === item.route ? nav_item + ' active' : nav_item} key={item.route}>
                <a className="nav-link" href={item.route}>{item.text}</a>
              </li>
            ))}

            <li className="nav-item">
              <a className="nav-link exit" onClick={this.exit}>Sair</a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Navbar;