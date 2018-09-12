import React, { Component } from 'react';
import { SemipolarSpinner } from 'react-epic-spinners'

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  handleChange = (name) => (e) => {
    this.props.inputChange(name, e)
  }

  submit = (e) => {
    e.preventDefault();
    return this.props.submit()
  }

  render() {
    return (
      <React.Fragment>
        {this.props.loading &&
          <div className="animated fadeIn">
            <SemipolarSpinner size={30} color="#3e5472"/>
            Carregando Busca
          </div>
        }
        {!this.props.loading &&
          <div className="row animated fadeIn search">
            <div className="col-sm-12">
              <div className="form-group">
                  <h3>Procurar usuário</h3>
                  <form action="" className="search_form"
                      onKeyDown={
                        (e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                this.submit(e)
                            }
                        }
                      }
                  >
                    <input className="form-control form-control-lg mb-3" type="text" placeholder="informe o e-mail" onChange={this.handleChange('search')} />
                    <button type="submit" className="btn btn-md btn-success" disabled={this.props.btnLoading?'disbled':''} onClick={this.submit}>
                      {this.props.btnLoading &&
                        <SemipolarSpinner size={30} color="white"/>
                      }
                      <div>{this.props.btnText}</div>
                    </button>
                  </form>
                </div>
            </div>
          </div>
        }
      </React.Fragment>
    );
  }
}

export default Search;