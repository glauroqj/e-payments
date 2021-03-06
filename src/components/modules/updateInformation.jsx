import React, { Component } from 'react';
import { SemipolarSpinner } from 'react-epic-spinners'

class UpdateInformation extends Component {
  constructor(props) {
    super(props)
    this.state= {

    }
  }

  updateInput = (e) => {
    return this.props.updateInput(e)
  }

  save = (e) => {
    /* send state to MyAccount */
    return this.props.save(e)
  }

  cancel = (e) => {
    /* send state to MyAccount */
    return this.props.cancel
  }

  render() {
    return (
      <form action=""
        onKeyDown={
          (e) => {
                if (e.key === 'Enter') {
                  this.save(this.props.fieldName)
                }
            }
        }
      >
        <div className="input-group myAccount_box_template animated fadeIn">
          {this.props.loading &&
            <div className="input-group">
              <input type={this.props.type} id={this.props.fieldName} value={this.props.value} className="form-control" disabled/>
              <div className="input-group-append animated fadeIn btn-loading ">
                <span className="input-group-text">
                  <SemipolarSpinner size={30} color={'#3e5472'}/> alterando...
                </span>
              </div>
            </div>
          }
          {!this.props.loading &&
            <div className="box-btn">
              <input type={this.props.type} id={this.props.fieldName} value={this.props.value} className="form-control" onChange={this.updateInput}/>
              <button className="btn btn-success btn-xs save" type="submit" id={this.props.fieldName} onClick={this.save(this.props.fieldName)}>
                <i className="fa fa-check"/>
              </button>
              <button className="btn btn-outline-danger btn-xs cancel" type="button" id={this.props.fieldName} onClick={this.cancel(this.props.fieldName)}>
                <i className="fa fa-times"/>
              </button>
            </div>
          }
        </div>
      </form>
    );
  }
}

export default UpdateInformation