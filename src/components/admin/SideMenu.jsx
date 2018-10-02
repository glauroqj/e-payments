import React, { Component } from 'react';

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: this.props.menu[0].link
    }
  }

  handleClick = (type) => (e) => {
    this.setState({
      active: type
    })
    return this.props.clickSideMenu(type, e)
  }

  render() {
    return (
      <div className="side-menu">
        <div className="list-group">
          {this.props.menu.map((key, i) => {
            return (
              <React.Fragment key={i}>
                <a className={'list-group-item list-group-item-action '+ (key.link === this.state.active?'active':'')} onClick={this.handleClick(key.link, 'tab')}>{key.name}</a>
              </React.Fragment>
            )
            })
          }
        </div>
      </div>
    );
  }
}

export default SideMenu;