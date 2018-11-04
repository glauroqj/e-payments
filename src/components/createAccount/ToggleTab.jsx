import React, { Component } from 'react'
import Cpf from '../Cpf'
import Cnpj from '../Cnpj'

class ToggleTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      optionTab: 'cpf'
    }
  }

  toggleTabOption = (e) => {
    this.setState({
      optionTab: e.target.id
    })
  }

  render() {
    const { optionTab } = this.state
    let classNameOptionTabCPF = 'nav-link'
    let classNameTabPaneCPF = 'tab-pane'
    let classNameOptionTabCNPJ = 'nav-link'
    let classNameTabPaneCNPJ = 'tab-pane'
    if (optionTab === 'cpf') {
      classNameOptionTabCPF += ' nav-link active show'
      classNameTabPaneCPF += ' tab-pane animated fadeIn active show'
    }
    if (optionTab === 'cnpj') {
      classNameOptionTabCNPJ += ' nav-link active show'
      classNameTabPaneCNPJ += ' tab-pane animated fadeIn active show'
    }

    return (
      <React.Fragment>
        <div className="box-toggle-tab">
          <ul className="nav nav-pills nav-fill">
            <li className="nav-item">
              <a className={classNameOptionTabCPF} id="cpf" onClick={this.toggleTabOption}>
                CPF
              </a>
            </li>
            <li className="nav-item">
              <a className={classNameOptionTabCNPJ} id="cnpj" onClick={this.toggleTabOption}>
                CNPJ
              </a>
            </li>
          </ul>
        </div>

        <div className="tab-content box-toggle-tab-content">
          <div className={classNameTabPaneCPF}>
            {optionTab === 'cpf' &&
              <Cpf />
            }
          </div>
          <div className={classNameTabPaneCNPJ}>
            {optionTab === 'cnpj' &&
              <Cnpj />
            }
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default ToggleTab