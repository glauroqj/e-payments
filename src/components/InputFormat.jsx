import React, { Component } from 'react'
import ErrorBag from './ErrorBag'
// import CurrencyFormat from 'react-currency-format'
import InputMask from 'react-input-mask'

class InputFormat extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    const { label, type, errorBag, id, format, mask, name, placeholder, callback, validate, value } = this.props
    let classError = 'form-control'
    if (errorBag.length > 0) {
      classError += ' is-invalid'
    }
    return (
      <React.Fragment>
        <label className="control-label" htmlFor="nome">{label}</label>
        {/* <CurrencyFormat
          className={classError}
          type={type}
          placeholder={placeholder}
          allowNegative={false}
          id={id} 
          name={name}
          // format={format}
          mask={mask}
          onValueChange={callback}
          onBlur={validate}
          value={value}
        /> */}
        <InputMask
          className={classError}
          type={type}
          placeholder={placeholder}
          id={id} 
          name={name}
          // format={format}
          mask={mask}
          onChange={callback}
          onBlur={validate}
          value={value}
          alwaysShowMask={false}
        />
        <ErrorBag error={errorBag}/>
      </React.Fragment>
    )
  }
}

export default InputFormat