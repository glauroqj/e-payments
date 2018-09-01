import React, { Component } from 'react';

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render() {
    return (
      <div className="container side-menu">
        <div className="list-group">
          {this.props.menu.map((key, i) => {
            return (
              <React.Fragment key={key}>
                <a className="list-group-item list-group-item-action">{key}</a>
              </React.Fragment>
            )
            })
          }
          {/* <a href="#" class="list-group-item list-group-item-action active">Cras justo odio</a>
          <a href="#" class="list-group-item list-group-item-action">Dapibus ac facilisis in
          </a>
          <a href="#" class="list-group-item list-group-item-action disabled">Morbi leo risus
          </a> */}
        </div>
      </div>
    );
  }
}

export default SideMenu;