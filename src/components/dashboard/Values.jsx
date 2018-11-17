import React, { Component } from 'react'
import { toast } from 'react-toastify'
import CurrencyFormat from 'react-currency-format'

class Values extends Component {
  constructor(props) {
    super(props)
    this.state = {
      donate: ['10,00', '15,00', '20,00', '30,00', '40,00', '50,00'],
      valueSelected: '',
      valueCustom: '',
    }
  }

  updateValue = (type) => (e) => {
    const {updateDonateValue} = this.props
    let state = this.state
    const { formattedValue, floatValue } = e
    if (type === 'custom') {
      if (floatValue === 0) {
        toast.error('O valor mínimo para doação é de R$ 1')
        state.valueSelected = ''
        state.valueCustom = ''
      }
      if (floatValue !== 0) {
        state.valueSelected = formattedValue
        state.valueCustom = formattedValue
      }
    }

    if (type === 'button') {
      state.valueSelected = e.target.value
      state.valueCustom = ''
    }

    this.setState(state)
    if (state.valueSelected !== 0) {
      updateDonateValue(state.valueSelected)
      return false
    }
    if (state.valueCustom !== 0) {
      updateDonateValue(state.valueCustom)
    }
  }

  render() {
    const { donate, valueSelected, valueCustom } = this.state
    const custom = {
      className: "form-control",
      thousandSeparator: '.',
      decimalSeparator: ',',
      decimalScale: 2,
      type: 'tel',
      fixedDecimalScale: true,
      placeholder: 'Doar outro valor',
      value: valueCustom,
      allowNegative: false,
      onValueChange: this.updateValue('custom')
    }
    let btnClass = 'btn btn-outline-success'
    return (
      <React.Fragment>
        <h1>R$ {valueSelected}</h1>
        <ul className="list-inline">
          {donate.map((key, i) => (
            <li className="list-inline-item" key={i}>
              <button type="button" 
                className={btnClass + (valueSelected === key ? ' active' : '')} 
                onClick={this.updateValue('button')} value={key}>R$ {key}
              </button>
            </li>
          ))}
          <li className="list-inline-item dashboard_values_custom">
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">R$</span>
                </div>
                <CurrencyFormat {...custom} />
              </div>
            </div>
          </li>
        </ul>
      </React.Fragment>
    )
  }
}

export default Values