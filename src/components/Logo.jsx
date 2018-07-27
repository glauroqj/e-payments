import React, { Component } from 'react';
import logoIMG from '../assets/images/ico-e.png'

class Logo extends Component {
  render() {
    return (
      <div className="logo">
        <img className="img-responsive" src={logoIMG} alt="Logo Equale" title="Logo Equale"/>
        <h2>Equale Doações</h2>
      </div>
    );
  }
}

export default Logo;