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
    const { input } = this.props
    return (
      <React.Fragment>
        <label className="control-label" htmlFor="nome">{input.label}</label>
        <CurrencyFormat
          className={`${input.errorBag ? 'form-control is-invalid' : 'form-control'}`}
          placeholder={input.placeholder}
          allowNegative={false}
          id={input.id} 
          name={input.name}
          format={input.format}
          mask={input.mask}
          onValueChange={input.callback}
        />
        <ErrorBag error={input.errorBag}/>
      </React.Fragment>
    )
  }
}

export default InputFormat