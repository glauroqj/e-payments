import React, { Component } from 'react'
import { SemipolarSpinner } from 'react-epic-spinners'

class LoadingCard extends Component {
  render() {
    const { text, size, color } = this.props
    return (
      <div className="card-body animated fadeIn mt-3">
        <h3>{text}</h3>
        <SemipolarSpinner size={size} color={color}/>
      </div>
    )
  }
}

export default LoadingCard