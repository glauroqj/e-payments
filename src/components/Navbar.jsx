import React, { Component } from 'react';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false
    }
  }

  exit = () => {
    return this.props.exit()
  }

  menu = () => {
    this.setState({
      showMenu: !this.state.showMenu
    })
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="/dashboard">E-Pagamentos</a>
        <button className="navbar-toggler" type="button" onClick={this.menu}>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={this.state.showMenu?'collapse navbar-collapse show animated fadeIn':'collapse navbar-collapse'}>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item profile">
                <img src={this.props.user.photoURL} alt=""/>
                <div className="name">{this.props.user.displayName}</div>
            </li>
            <li className={this.props.link === '/dashboard'?'nav-item active':'nav-item'}>
              <a className="nav-link" href="/dashboard">Doações</a>
            </li>
            <li className={this.props.link === '/my-account'?'nav-item active':'nav-item'}>
              <a className="nav-link" href="/my-account">Minha Conta</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={this.exit}>Sair</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;