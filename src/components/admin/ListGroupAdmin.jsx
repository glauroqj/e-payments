import React, { Component } from 'react'

class ListGroupAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const { items } = this.props
    return (
      <React.Fragment>
        {items.map((key, i) => {
          let titles = Object.keys(key)
          return(
            <div className="col-sm-4 animated fadeIn" key={i}>
              <div className="card mb-3">
                <ul className="list-group list-group-flush">
                  {titles.map((title, i) => {
                      return (
                        <li className={'list-group-item '+(title === 'key'?'hide':'')} key={i}>
                          <h5 className="card-title">{title.toUpperCase()}</h5>
                          <h6 className="card-subtitle text-muted">{key[title]}</h6>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            )
        })}
      </React.Fragment>
    )
  }
}

export default ListGroupAdmin
