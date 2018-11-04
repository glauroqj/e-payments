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
    
    return (
      <React.Fragment>
        <div className="box-toggle-tab">
          <ul className="nav nav-pills nav-fill">
            <li className="nav-item">
              <a className={`${tab === 'credit-card' ? 'nav-link active show' : 'nav-link'}`} id="credit-card" onClick={this.toggleTab}>
                Cartão de Crédito
              </a>
            </li>
            <li className="nav-item">
              <a className={`${tab === 'billet' ? 'nav-link active show' : 'nav-link'}`} id="billet" onClick={this.toggleTab}>
                Boleto
              </a>
            </li>
          </ul>
        </div>

        <div className="tab-content box-toggle-tab-content">
          <div className={`${tab === 'credit-card' ? 'tab-pane animated fadeIn active show' : 'tab-pane'}`}>
            {tab === 'credit-card' &&
              <CreditCard totalValue={this.props.valueSelected !== ''?this.props.valueSelected:this.props.valueCustom}/>  
            }
          </div>
          <div className={`${tab === 'billet' ? 'tab-pane animated fadeIn active show' : 'tab-pane'}`}>
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