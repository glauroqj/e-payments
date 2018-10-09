import React, { Component } from 'react'

class ListGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const { items } = this.props
    return (
      <React.Fragment>
        {items.map((key, i) => {
          let userType = key.cpf?key.cpf:key.cnpj
          let title = key.cpf?'CPF':'CNPJ'
          let metierTitle = key.metier?'Área de Atuação':'Profissão'
          let metierType = key.metier?key.metier:key.job

          return(
            <div className="col-sm-4 animated fadeIn" key={i}>
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
            )
        })}
      </React.Fragment>
    )
  }
}

export default ListGroup