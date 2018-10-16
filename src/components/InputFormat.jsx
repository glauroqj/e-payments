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
    return (
      <React.Fragment>
        {this.props.input.map((key, i) => (
          <React.Fragment key={i}>
            <label className="control-label" htmlFor="nome">{key.label}</label>
            {/* <input 
              className={key.errorBag?'form-control is-invalid':'form-control'}
              type={key.type} id={key.id} name={key.name}
              placeholder={key.placeholder} 
              onChange={key.callback}
              onBlur={key.validate}
              value={key.value}
            /> */}
            <CurrencyFormat
              className={key.errorBag?'form-control is-invalid':'form-control'}
              placeholder={key.placeholder}
              allowNegative={false}
              id={key.id} 
              name={key.name}
              format={key.format}
              mask={key.mask}
              onValueChange={key.callback}
            />
            <ErrorBag error={key.errorBag}/>
          </React.Fragment>
        ))}
      </React.Fragment>
    )
  }
}

export default InputFormat