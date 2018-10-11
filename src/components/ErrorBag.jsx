import React, { Component } from 'react'

class ErrorBag extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    console.log(this.props.error)
    const {error} = this.props
    return (
      <React.Fragment>
        {/* {error.map((key, i) => {
          <div className="invalid-feedback">Campo Obrigatório</div>
        })} */}
      </React.Fragment>
    )
  }
}

export default ErrorBag