import React, { Component } from 'react';
import UpdateInformation from '../../components/modules/updateInformation'
import { toast } from 'react-toastify'

class ListGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      templateEdit: '',
      textEdit: '',
      btnEditLoading: false,
      confirmEmailSended: false
    }
  }

  edit = (type) => (e) => {
    let templateEdit = this.state.templateEdit
    templateEdit = type
    this.setState({templateEdit})
  }

  save = (type) => (e) => {
    const {user} = this.state
    let textEdit = this.state.textEdit
    e.preventDefault()

    if(!this.validate()) {
      this.cancel()
      return false
    }

    this.setState({
      btnEditLoading: true
    })

    if(type === 'name') {
      user.updateProfile({
        displayName: textEdit
      })
      .then(() => {
        toast.success('Nome alterado com sucesso!')
        this.cancel()
        return this.props.reloadState()
      })
      .catch((error) => {
        toast.error('Algo deu errado, não foi possível alterar o nome :(')
      })
      return false;
    }

    if(type === 'email') {
      user.updateEmail(textEdit)
      .then(() => {
        toast.success('E-mail alterado com sucesso!')
        this.cancel()
        return this.props.reloadState()
      })
      .catch((error) => {
        console.log(error)
      });
    }

  }

  cancel = (e) => {
    this.setState({
      templateEdit: '',
      textEdit: '',
      btnEditLoading: false
    })
  }

  updateInput = (type) => (e) => {
    let textEdit = this.state.textEdit
    textEdit = e.target.value
    this.setState({textEdit})
  }

  validate() {
    let textEdit = this.state.textEdit
    const {user, templateEdit} = this.state
    let verifyEmail = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm

    if (textEdit === '') {
      toast.error('O campo não pode ficar vazio!')
      return false
    }
    if (textEdit === user.displayName || textEdit === user.email) {
      toast.error('O campo é identico ao atual!')
      this.cancel()
      return false
    }

    if (templateEdit === 'email' && !verifyEmail.test(textEdit)) {
      toast.error('E-mail inválido!')
      this.cancel()
      return false
    }

    return true
  }

  confirmEmail = () => {
    const {user} = this.state 
    this.setState({
      confirmEmailSended: true
    })
    user.sendEmailVerification()
    .then((success) => {
      toast.success('E-mail enviado com sucesso!')
    }).catch((error) => {
      toast.error('Ocorreu um erro, tente novamente.')
    })
  }

  render() {
    const { items } = this.props
    return (
      <ul className="list-group list-group-flush">
        {items.map((key, i) => {
          return(
            <li className="list-group-item myAccount_box_edit" key={i}>
              <h5 className="card-title">{key.item}</h5>
              <h6 className="card-subtitle text-muted">{key.payload}</h6>
              {key.edit &&
                <button className={"btn btn-warning btn-xs edit "+ (key.isVerified?'hide':'')} id={key.field} onClick={this.edit(key.field)} disabled={key.isVerified}><i className="fa fa-user-edit"/></button>
              }
              {(key.edit && this.state.templateEdit === key.field) &&
                <UpdateInformation 
                    fieldName={key.field}
                    type={key.typeInput}
                    updateInput={this.updateInput(key.field)}
                    save={this.save}
                    cancel={this.cancel}
                    value={this.state.textEdit}
                    loading={this.state.btnEditLoading}
                  />
              }
              {key.field === 'verifyEmail' &&
                <React.Fragment>
                  {(!this.state.confirmEmailSended && !key.isVerified) &&
                    <button type="button" className='btn btn-outline-danger btn-sm mt-2' onClick={this.confirmEmail}>Verificar E-mail Agora!</button>
                  }
                  {key.isVerified &&
                    <button type="button" className="btn btn-success btn-sm disabled mt-2" disabled>Verificado</button>
                  }
                </React.Fragment>
              }
            </li>
          )
        })}
      </ul>
    )
  }
}

export default ListGroup