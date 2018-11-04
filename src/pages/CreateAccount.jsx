import React, { Component } from 'react'
import { ToastContainer } from 'react-toastify'
import {verify} from '../components/modules/verifyLogin'
import Loader from '../components/Loader'
import Logo from '../components/Logo'

import ToggleTab from '../components/createAccount/ToggleTab'

import 'react-toastify/dist/ReactToastify.css'
import '../assets/createAcc.css'

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnLoading: false,
      btnLoadingInstagram: false,
      loading: true
    }
  }

  componentDidMount() {
    /* verify if user is logged */
    verify().then((user) => {
      console.log('LOGED: ', user)
      /* redirect to dashboard */
      this.props.history.push('/dashboard')
      return false;
    })
    .catch((error) => {
      console.log('Not Loged: ')
      this.setState({
        loading: false
      })
    })
  }

  toggleTabOption = (value) => {
    this.setState({
      optionTab: value
    })
  }

  render() {
    const { loading, optionTab } = this.state

    return (
      <div className="createAcc container">
        {loading &&
          <Loader text="Carregando Criar Conta" color="#3e5472"/>
        }
        {!loading &&
          <div className="animated fadeIn">
            <ToastContainer autoClose={5000} hideProgressBar={true} position="top-right"/>
            <Logo />
            <h5 className="createAcc_title">Criar Conta!</h5>

            <ToggleTab tab={optionTab} toggleTabOption={this.toggleTabOption} />
            
          </div>
        } 
        {/* end no loading */}
      </div>
    )
  }
}

export default CreateAccount