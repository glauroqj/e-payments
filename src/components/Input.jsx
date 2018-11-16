import React, { Component } from 'react'
import ErrorBag from './ErrorBag'

class Input extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    const { label, errorBag, type, id, name, placeholder, callback, validate, value } = this.props
    let classError = 'form-control'
    if (errorBag.length > 0) {
      classError += ' is-invalid'
    }
    return (
      <React.Fragment>
        <label className="control-label" htmlFor="nome">{label}</label>
        <input 
          className={classError}
          type={type} id={id} name={name}
          placeholder={placeholder} 
          onChange={callback}
          onBlur={validate}
          value={value}
        />
        <ErrorBag error={errorBag}/>
      </React.Fragment>
    )
  }
}

export default Input