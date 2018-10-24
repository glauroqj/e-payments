import React, { Component } from 'react'

class ErrorBag extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    const { error } = this.props
    return (
      <React.Fragment>
        {error && error.map((key, i) => (
          <div className="invalid-feedback" key={i}>{key}</div>
        ))}
      </React.Fragment>
    )
  }
}

export default ErrorBag