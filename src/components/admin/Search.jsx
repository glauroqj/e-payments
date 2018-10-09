import React, { Component } from 'react';
import { SemipolarSpinner } from 'react-epic-spinners'
import { toast } from 'react-toastify'
import ListGroup from './ListGroup'

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: this.props.arrayUsers,
      search: '',
      searchResults: [],
      btnText: 'Procurar',
      btnLoading: false
    }
  }

  handleChange = (e) => {
    this.setState({
      search: e.target.value
    })
  }

  search = (e) => {
    e.preventDefault()
    let state = this.state
    let {search, users} = this.state
    let name = []
    search = search.toLowerCase()
    this.setState({
      btnLoading: true
    })
    const email = users.filter(user => user.email === search)
    
    users.map((key, i) => {
      return key.name_search.map((item, i) => {
        if (item === search) {
          name.push(key)
          return key
        }
        return false
      })
    })

    /* USING FILTER */
    if (email.length > 0) {
      state.searchResults = email
      state.search = ''
      state.btnLoading = false
      this.setState(state)
      return false
    }
    if (name.length > 0) {
      state.searchResults = name
      state.search = ''
      state.btnLoading = false
      this.setState(state)
      return false
    }
    state.searchResults = []
    state.search = ''
    state.btnLoading = false
    toast.warning('Não encontrado :(')
    this.setState(state)

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
          <React.Fragment>
            <div className="row animated fadeIn search">
              <div className="col-sm-12">
                <div className="form-group">
                    <h3>Procurar usuário</h3>
                    <form action="" className="search_form"
                        onKeyDown={
                          (e) => {
                              if (e.key === 'Enter') {
                                  e.preventDefault();
                                  this.search(e)
                              }
                          }
                        }
                    >
                    <input className="form-control form-control-lg mb-3" type="text" placeholder="informe o e-mail ou primeiro nome" value={this.state.search} onChange={this.handleChange} />
                    <button type="submit" className="btn btn-md btn-success" disabled={this.state.btnLoading?'disbled':''} onClick={this.search}>
                      {this.state.btnLoading &&
                        <SemipolarSpinner size={30} color="white"/>
                      }
                      <div>{this.state.btnText}</div>
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className={"mt-5 animated row"}>
              <div className="col-sm-12">
                <h3>{!this.state.searchResults.length?'Sem resultados :(':'Resultados '+this.state.searchResults.length}</h3>
              </div>

              <ListGroup items={this.state.searchResults} />

            </div>
          </React.Fragment>
        }
      </React.Fragment>
    );
  }
}

export default Search;