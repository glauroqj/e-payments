import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <div className="container footer">
        <hr/>
        <div className="d-flex">
          <div className="mr-auto">
            <h5 className="text-muted">
              <i className="fas fa-lock text-success"/> Você está em um ambiente seguro.
            </h5>
          </div>
          <div className="ml-auto">
            <h5 className="text-muted">
              Copyright ©2018 - INSTITUTO EQ - CNPJ 30.472.752/0001-16
            </h5>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;