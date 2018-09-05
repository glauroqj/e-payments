import React, { Component } from 'react';
import { SemipolarSpinner } from 'react-epic-spinners'

class Configure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  handleClick = (index) => (e) => {
    return this.props.removeAdmin(index, e)
  }

  handleChange = (name) => (e) => {
    this.props.inputChange(name, e)
  }

  submit = (e) => {
    e.preventDefault();
    return this.props.submit()
  }

  render() {
    return (
      <React.Fragment>
        {this.props.loading &&
          <div className="animated fadeIn">
            <SemipolarSpinner size={30} color="#3e5472"/>
            Carregando Administradores
          </div>
        }
        {!this.props.loading &&
          <div className="row animated fadeIn">
            <div className="col-sm-12">
              <h3>Lista de Administradores</h3>
              <ul className="list-group">
                {this.props.admins.map((key, i) => {
                  return (
                    <li className="list-group-item d-flex justify-content-between align-items-center" key={i}>
                      {key}
                      {this.props.admins.length > 1 &&
                        <button className="btn btn-sm btn-danger" onClick={this.handleClick(i)}>remover</button>
                      }
                    </li>
                  )
                  })
                }
              </ul>

              <div className="form-group mt-5">
                <h3>Adicionar Administrador</h3>
                <form action="" className="login_form"
                    onKeyDown={
                      (e) => {
                          if (e.key === 'Enter') {
                              e.preventDefault();
                              this.submit(e)
                          }
                      }
                    }
                >
                  <input className="form-control form-control-lg mb-3" type="text" placeholder="e-mail válido" onChange={this.handleChange('emailAdmin')} />
                  <button type="submit" className="btn btn-md btn-success" disabled={this.props.btnLoading?'disbled':''} onClick={this.submit}>
                    {this.props.btnLoading &&
                      <SemipolarSpinner size={30} color="white"/>
                    }
                    <div>{this.props.btnText}</div>
                  </button>
                </form>
              </div>

            </div>
          </div>
        }
      </React.Fragment>
    );
  }
}

export default Configure;
