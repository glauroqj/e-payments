import React, { Component } from 'react'
import ErrorBag from './ErrorBag'

class Input extends Component {
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
        <input 
          className={`${input.errorBag ? 'form-control is-invalid' : 'form-control'}`}
          type={input.type} id={input.id} name={input.name}
          placeholder={input.placeholder} 
          onChange={input.callback}
          onBlur={input.validate}
          value={input.value}
        />
        <ErrorBag error={input.errorBag}/>
      </React.Fragment>
    )
  }
}

export default Input