import React, { Component } from 'react'

class Options extends Component {
  constructor(props) {
    super(props)
    this.state = {
      radio: 'option1'
    }
  }

  updateValue = (type) => (e) => {
    const {updateOptionValue} = this.props
    const { id } = e.target
    let state = this.state
    state.radio = id
    this.setState(state)
    updateOptionValue(state.radio)
  }

  render() {
    const { radio } = this.state
    let radioClass1 = 'custom-control custom-radio'
    let racioCheck1 = ''
    let radioClass2 = 'custom-control custom-radio'
    let racioCheck2 = ''
    if (radio === 'option1') {
      radioClass1 += ' active'
      racioCheck1 += 'checked'
    }
    if (radio === 'option2') {
      radioClass2 += ' active'
      racioCheck2 += 'checked'
    }
    return (
      <div className="options-choice">
        <h4>Escolha uma das opções:</h4>
        <ul className="list-inline">
          <li className="list-inline-item">
            <div className={radioClass1}>
              <input type="radio" id="option1" name="customRadio" className="custom-control-input" onChange={this.updateValue('radio')} checked={racioCheck1}/>
              <label className="custom-control-label" htmlFor="option1">
                <i className="fas fa-user-graduate"/> Quero apadrinhar um aluno
              </label>
            </div>
          </li>
          <li className="list-inline-item">
            <div className={radioClass2}>
              <input type="radio" id="option2" name="customRadio" className="custom-control-input" onChange={this.updateValue('radio')} checked={racioCheck2}/>
              <label className="custom-control-label" htmlFor="option2">
                <i className="fas fa-university"/> Quero ajudar a instituição
              </label>
            </div>
          </li>
        </ul>
      </div>
    )
  }
}

export default Options