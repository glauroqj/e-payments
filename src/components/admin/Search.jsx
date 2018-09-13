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
                      <input className="form-control form-control-lg mb-3" type="text" placeholder="informe o e-mail" value={this.props.value} onChange={this.handleChange('search')} />
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
                <h3>Resultados</h3>
              </div>

              <div class="card mb-3">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">
                    <h5 className="card-title">Nome</h5>
                    <h6 className="card-subtitle text-muted">OLAR</h6>
                  </li>
                </ul>
              </div>

              {this.props.results.map((key, i) => {
                return (
                  <React.Fragment key={i}>
                    <div className="col-sm-3">
                      <div className="card">
                        <ul class="list-group list-group-flush">
                          <li className="list-group list-group-flush col-sm-3">
                            <h5 className="card-title">Tipo de Conta</h5>
                            <h6 className="card-subtitle text-muted uppercase">{key.name}</h6>
                          </li>
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