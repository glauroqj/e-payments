import React, { Component } from 'react';
import { SemipolarSpinner } from 'react-epic-spinners'

class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      <div className="loading">
        <div className="row">
          <div className="col-sm spinner">
            <SemipolarSpinner size={60} color={this.props.color}/>
          </div>
        </div>
        <div className="row">
          <div className="col-sm justify-content-sm-center">{this.props.text}</div>
        </div>
      </div>
    );
  }
}

export default Loader;