import React, { Component } from 'react'
import Cpf from '../Cpf'
import Cnpj from '../Cnpj'

class ToggleTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tab: 'cpf'
    }
  }

  toggleTab = (e) => {
    this.setState({
      tab: e.target.id
    })
  }

  render() {
    const { tab } = this.state
    let classNameOptionTabCPF = 'nav-link'
    let classNameTabPaneCPF = 'tab-pane'
    let classNameOptionTabCNPJ = 'nav-link'
    let classNameTabPaneCNPJ = 'tab-pane'
    if (tab === 'cpf') {
      classNameOptionTabCPF += ' nav-link active show'
      classNameTabPaneCPF += ' tab-pane animated fadeIn active show'
    }
    if (tab === 'cnpj') {
      classNameOptionTabCNPJ += ' nav-link active show'
      classNameTabPaneCNPJ += ' tab-pane animated fadeIn active show'
    }

    return (
      <React.Fragment>
        <div className="box-toggle-tab">
          <ul className="nav nav-pills nav-fill">
            <li className="nav-item">
              <a className={classNameOptionTabCPF} id="cpf" onClick={this.toggleTab}>
                CPF
              </a>
            </li>
            <li className="nav-item">
              <a className={classNameOptionTabCNPJ} id="cnpj" onClick={this.toggleTab}>
                CNPJ
              </a>
            </li>
          </ul>
        </div>

        <div className="tab-content box-toggle-tab-content">
          <div className={classNameTabPaneCPF}>
            {tab === 'cpf' &&
              <Cpf />
            }
          </div>
          <div className={classNameTabPaneCNPJ}>
            {tab === 'cnpj' &&
              <Cnpj />
            }
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default ToggleTab