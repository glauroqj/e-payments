import React, { Component } from 'react'
import CreditCard from '../CreditCard'
import Billet from '../Billet'

class BoxToggleTabDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tab: 'credit-card'
    }
  }

  toggleTab = (e) => {
    this.setState({
      tab: e.target.id
    });
  }

  render() {
    const { tab } = this.state
    let classNameOptionTabCC = 'nav-link'
    let classNameTabPaneCC = 'tab-pane'
    let classNameOptionTabBillet = 'nav-link'
    let classNameTabPaneBillet = 'tab-pane'
    if (tab === 'credit-card') {
      classNameOptionTabCC += ' nav-link active show'
      classNameTabPaneCC += ' tab-pane animated fadeIn active show'
    }
    if (optionTab === 'billet') {
      classNameOptionTabBillet += ' nav-link active show'
      classNameTabPaneBillet += ' tab-pane animated fadeIn active show'
    }

    return (
      <React.Fragment>
        <div className="box-toggle-tab">
          <ul className="nav nav-pills nav-fill">
            <li className="nav-item">
              <a className={classNameOptionTabCC} id="credit-card" onClick={this.toggleTab}>
                Cartão de Crédito
              </a>
            </li>
            <li className="nav-item">
              <a className={classNameOptionTabBillet} id="billet" onClick={this.toggleTab}>
                Boleto
              </a>
            </li>
          </ul>
        </div>

        <div className="tab-content box-toggle-tab-content">
          <div className={classNameTabPaneCC}>
            {tab === 'credit-card' &&
              <CreditCard totalValue={this.props.valueSelected !== ''?this.props.valueSelected:this.props.valueCustom}/>  
            }
          </div>
          <div className={classNameTabPaneBillet}>
            {tab === 'billet' &&
              <Billet totalValue={this.props.valueSelected !== ''?this.props.valueSelected:this.props.valueCustom}/>
            }
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default BoxToggleTabDashboard