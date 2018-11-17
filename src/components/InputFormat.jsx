import React, { Component } from 'react'
import ErrorBag from './ErrorBag'
import InputMask from 'react-input-mask'

class InputFormat extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    const { label, type, errorBag, id, mask, name, placeholder, callback, validate, value } = this.props
    let classError = 'form-control'
    if (errorBag.length > 0) {
      classError += ' is-invalid'
    }
    return (
      <React.Fragment>
        <label className="control-label" htmlFor="nome">{label}</label>
        <InputMask
          className={classError}
          type={type}
          placeholder={placeholder}
          id={id} 
          name={name}
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