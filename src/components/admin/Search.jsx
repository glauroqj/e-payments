import React, { Component } from 'react';
import { SemipolarSpinner } from 'react-epic-spinners'

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
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
            Carregando Busca
          </div>
        }
        {!this.props.loading &&
          <React.Fragment>
            <div className="row animated fadeIn search">
              <div className="col-sm-12">
                <div className="form-group">
                    <h3>Procurar usuário</h3>
                    <form action="" className="search_form"
                        onKeyDown={
                          (e) => {
                              if (e.key === 'Enter') {
                                  e.preventDefault();
                                  this.submit(e)
                              }
                          }
                        }
                    >
                    <input className="form-control form-control-lg mb-3" type="text" placeholder="informe o e-mail ou primeiro nome" value={this.props.value} onChange={this.handleChange('search')} />
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
            {/* <div className={"form-group mt-5 animated row"+(this.props.results.length !== 0?' fadeIn':' hide')}> */}
            <div className={"mt-5 animated row"}>
              <div className="col-sm-12">
                <h3>{!this.props.results.length?'Sem resultados :(':'Resultados '+this.props.results.length}</h3>
              </div>

                {this.props.results && this.props.results.map((key, i) => {
                  let userType = key.cpf?key.cpf:key.cnpj
                  let title = key.cpf?'CPF':'CNPJ'

                  let metierTitle = key.metier?'Área de Atuação':'Profissão'
                  let metierType = key.metier?key.metier:key.job
                  return (
                    <React.Fragment key={i}>
                    <div className="col-sm-4 animated fadeIn">
                      <div className="card mb-3">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                              <h5 className="card-title">Nome</h5>
                              <h6 className="card-subtitle text-muted">{key.name}</h6>
                            </li>
                            <li className="list-group-item">
                              <h5 className="card-title">E-mail</h5>
                              <h6 className="card-subtitle text-muted">{key.email}</h6>
                            </li>
                            <li className="list-group-item">
                              <h5 className="card-title">{metierTitle}</h5>
                              <h6 className="card-subtitle text-muted">{metierType}</h6>
                            </li>
                            <li className="list-group-item">
                              <h5 className="card-title">{title}</h5>
                              <h6 className="card-subtitle text-muted">{userType}</h6>
                            </li>
                            <li className="list-group-item">
                              <h5 className="card-title">Telefone</h5>
                              <h6 className="card-subtitle text-muted">{key.telephone}</h6>
                            </li>
                            <li className="list-group-item">
                              <h5 className="card-title">Endereço</h5>
                              <h6 className="card-subtitle text-muted">{key.address}</h6>
                            </li>
                            {title === 'CPF' &&
                              <React.Fragment>
                                <li className="list-group-item">
                                  <h5 className="card-title">Data de Nascimento</h5>
                                  <h6 className="card-subtitle text-muted">{key.dateBirth}</h6>
                                </li>
                                <li className="list-group-item">
                                  <h5 className="card-title">Estado Civil</h5>
                                  <h6 className="card-subtitle text-muted">{key.marital_status}</h6>
                                </li>
                              </React.Fragment>
                            }
                            {title === 'CNPJ' &&
                              <React.Fragment>
                                <li className="list-group-item">
                                  <h5 className="card-title">Nome Doador</h5>
                                  <h6 className="card-subtitle text-muted">{key.name_donator}</h6>
                                </li>
                                <li className="list-group-item">
                                  <h5 className="card-title">Nome Presidente</h5>
                                  <h6 className="card-subtitle text-muted">{key.name_president}</h6>
                                </li>
                              </React.Fragment>
                            }
                          </ul>
                        </div>
                      </div>
                    </React.Fragment>
                  )
                })}

            </div>
          </React.Fragment>
        }
      </React.Fragment>
    );
  }
}

export default Search;