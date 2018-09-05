import React, { Component } from 'react';
import { SemipolarSpinner } from 'react-epic-spinners'

class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentWillMount() {
    let cpf = Object.keys(this.props.cpf).length
    let cnpj = Object.keys(this.props.cnpj).length
    this.setState({
      cpf: cpf,
      cnpj: cnpj
    })
  }


  render() {
    return (
      <React.Fragment>
        {this.props.loading &&
          <div className="animated fadeIn">
            <SemipolarSpinner size={30} color="#3e5472"/>
            Carregando Informações
          </div>
        }
        {!this.props.loading &&
          <div className="row animated fadeIn">
            <div className="col-sm-4">
              <div className="card bg-light mb-3">
                <div className="card-header">Usuários CPF</div>
                <div className="card-body">
                  <h4 className="card-title">{this.state.cpf}</h4>
                  {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                </div>
              </div>
            </div>

            <div className="col-sm-4">
              <div className="card bg-light mb-3">
                <div className="card-header">Usuários CNPJ</div>
                <div className="card-body">
                <h4 className="card-title">{this.state.cnpj}</h4>
                  {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                </div>
              </div>
            </div>

            <div className="col-sm-4">
                <div className="card bg-light mb-3">
                <div className="card-header">Valor Total Arrecadado</div>
                <div className="card-body">
                  <h4 className="card-title">Em breve...</h4>
                  {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                </div>
              </div>
            </div>
          </div>
        }
      </React.Fragment>
    );
  }
}

export default Summary;
