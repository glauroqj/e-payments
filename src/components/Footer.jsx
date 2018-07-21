import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <div className="container footer">
        <hr/>
        <div className="col-xs-12">
          <h5 className="text-muted">
            <i className="fas fa-lock text-success"/> Você está em um ambiente seguro.
          </h5>
        </div>
      </div>
    );
  }
}

export default Footer;