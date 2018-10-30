import React, { Component } from 'react'
import ErrorBag from './ErrorBag'
import CurrencyFormat from 'react-currency-format'

class InputFormat extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    const { label, errorBag, id, format, mask, name, placeholder, callback } = this.props
    let classError = 'form-control'
    if (errorBag) {
      classError += ' is-invalid'
    }
    return (
      <React.Fragment>
        <label className="control-label" htmlFor="nome">{label}</label>
        <CurrencyFormat
          className={classError}
          placeholder={placeholder}
          allowNegative={false}
          id={id} 
          name={name}
          format={format}
          mask={mask}
          onValueChange={callback}
        />
        <ErrorBag error={errorBag}/>
      </React.Fragment>
    )
  }
}

export default InputFormat