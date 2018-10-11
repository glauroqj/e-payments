import React, { Component } from 'react'
import ErrorBag from './ErrorBag'

class Input extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    // console.log(this.props)
    return (
      <React.Fragment>
        {this.props.input.map((key, i) => {
          return (
            <React.Fragment key={i}>
              <label className="control-label" htmlFor="nome">{key.label}</label>
              <input 
                className={key.errorBag && key.value === '' ?'form-control is-invalid':'form-control'}
                type={key.type} id={key.id} name={key.name}
                placeholder={key.placeholder} 
                onChange={key.callback}
                value={key.value}
              />
              <ErrorBag error={key.errorBag}/>
            </React.Fragment>
          )
        })}
      </React.Fragment>
    )
  }
}

export default Input