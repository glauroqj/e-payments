import React, { Component } from 'react'
import * as firebase from 'firebase'
import axios from 'axios'
import { toast } from 'react-toastify'
import { SemipolarSpinner } from 'react-epic-spinners'

import Dock from 'react-dock'
import 'react-toastify/dist/ReactToastify.css'

class GetPhotoInstagram extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      error: false,
      btnLoading: false,
      userName: '',
      instagram: '',
      isVisible: false,
    }
  }

  componentDidMount() {
    axios({
      method:'get',
      url:'https://apinsta.herokuapp.com/u/test',
      responseType:'json'
    })
    .then((response) => {
      let data = response.data.graphql.user.id?response.data.graphql.user.id:false
      if (data === '8579566509') {
        this.setState({
          loading: false
        })
        return false
      }
      this.setState({
        error: true
      })
    })
  }

  updateInput = (e) => {
    let state = this.state
    state.userName = e.target.value
    this.setState(state)
  }

  getInfoInstagram = (e) => {
    // https://www.instagram.com/glauroqj/?__a=1
    e.preventDefault()
    if(this.state.userName === '') {
      toast.error('Campo Instagram vazio')
      return false
    }

    this.setState({
      btnLoading: true
    })

    axios({
      method:'get',
      url:'https://apinsta.herokuapp.com/u/'+ this.state.userName,
      responseType:'json'
    })
    .then((response) => {
      // console.log(response.data.graphql.user)
      this.setState({
        isVisible: true,
        instagram: response.data.graphql.user,
        btnLoading: false
      })
    })
    .catch((error) => {
      toast.error('Usuário não encontrado')
      this.setState({
        isVisible: false,
        userName: '',
        btnLoading: false
      })
      console.log('ERROR: ',error)
    })

  }

  closeModal = (e) => {
    this.setState({
      isVisible: !this.state.isVisible,
      userName: '',
      btnLoading: false
    })
  }

  confirmModal = (e) => {
    let user = firebase.auth().currentUser
    if (user) {
      user.updateProfile({
        photoURL: this.state.instagram.profile_pic_url
      })
      .then(() => {
        this.closeModal()
        return this.props.confirm(user)
      })
    }
  }

  render() {
    const { loading, error, btnLoading, instagram } = this.state
    return (
      <form action=""
        onKeyDown={
          (e) => {
                if (e.key === 'Enter') {
                  this.getInfoInstagram(e)
                }
            }
        }
      >
        <Dock position='top' fluid={true} defaultSize={1} isVisible={this.state.isVisible}>
          <div className="card">
            <h3 className="card-header">São os seus dados abaixo?
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModal}>
                <span aria-hidden="true">&times;</span>
              </button>
            </h3>
            <img className="img-fluid" src={instagram.profile_pic_url} alt={instagram.full_name}/>
            <ul className="list-group list-group-flush mb-0">
              <li className="list-group-item">Nome: <b>{instagram.full_name}</b></li>
              <li className="list-group-item">Usuário: <b>{instagram.username}</b></li>
              <li className="list-group-item">Biografia: <b>{instagram.biography}</b></li>
            </ul>
            <div className="card-footer">
              <ul className="list-inline mb-0">
                <li className="list-inline-item">
                  <button type="button" className="btn btn-success btn-sm" onClick={this.confirmModal}>SIM, são meus dados!</button>
                </li>
                <li className="list-inline-item">
                  <button type="button" className="btn btn-danger btn-sm" onClick={this.closeModal}>Não! :(</button>
                </li>
              </ul>
            </div>
          </div>
        </Dock>

        <div className="card mb-3">
          <h3 className="card-header">Tem instagram?</h3>
            {(loading && !error) &&
              <div className="card-body animated fadeIn">
                <SemipolarSpinner size={30} color={'#3e5472'}/> carregando...
              </div>
            }
            {(!loading && !error) &&
              <div className="card-body animated fadeIn">
                <p className="card-text">Informe seu usuário para atualizarmos sua foto de perfil</p>

                <div className="input-group">
                  <input type="text" id="user-name" value={this.state.userName} onChange={this.updateInput} className="form-control" disabled={btnLoading?'disabled':''}/>
                  <div className="input-group-append animated fadeIn btn-loading ">

                    <button className="btn btn-success btn-xs save" type="submit" id={this.props.fieldName} onClick={this.getInfoInstagram}>
                      {btnLoading &&
                        <SemipolarSpinner size={20} color={'#fff'}/>
                      }
                      {!btnLoading &&
                        <span>Buscar</span>
                      }
                    </button>

                  </div>
                </div>
                
              </div>
            }
            {(!loading && error) &&
              <div className="card-body animated fadeIn">
                <p className="card-text text-danger">Indisponível no momento :(</p>
              </div>
            }
        </div>
        {/* <div className="input-group animated fadeIn">
          {this.props.loading &&
            <div className="input-group">
              <input type={this.props.type} id={this.props.fieldName} value={this.props.value} className="form-control" disabled/>
              <div className="input-group-append animated fadeIn btn-loading ">
                <span className="input-group-text">
                  <SemipolarSpinner size={30} color={'#3e5472'}/> alterando...
                </span>
              </div>
            </div>
          }
          {!this.props.loading &&
            <div className="box-btn">
              <input type={this.props.type} id={this.props.fieldName} value={this.props.value} className="form-control" onChange={this.updateInput}/>
              <button className="btn btn-success btn-xs save" type="submit" id={this.props.fieldName} onClick={this.save(this.props.fieldName)}>
                <i className="fa fa-check"/>
              </button>
              <button className="btn btn-outline-danger btn-xs cancel" type="button" id={this.props.fieldName} onClick={this.cancel(this.props.fieldName)}>
                <i className="fa fa-times"/>
              </button>
            </div>
          }
        </div> */}
      </form>
    )
  }
}

export default GetPhotoInstagram