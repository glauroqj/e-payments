import React, { Component } from 'react'
import Input from './Input'
import CurrencyFormat from 'react-currency-format'

class Billet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      billet: {
        name: '',
        email: '',
        cpf: '',
        cep: ''
      },
      requiredField: ['name', 'email', 'cpf', 'cep'],
      errorBag: {}
    }
  }

  updateValue = (type) => (e) => {
    let billet = this.state.billet
    let options = ['cpf', 'cep']
    if(options.indexOf(type) > -1) {
      billet[type] = e.formattedValue
      this.setState({billet})
      return false
    }

    billet[type] = e.target.value
    this.setState({billet})
  }

  validate = (e) => {
    console.log('validate: ', e)
    const {billet} = this.state
    let verifyEmail = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm
    let errorBag = {
      name: [],
      email: [],
      cpf: [],
      cep: []
    }
    let inputs = document.querySelectorAll('input')
    for (let i = 0; i < inputs.length; i++ ) {
      /* add error */
      if(this.state.requiredField.indexOf(inputs[i].name) > -1 && inputs[i].value === '') {
        let error = errorBag[inputs[i].name]
        // errorBag[inputs[i].name] = inputs[i].name
        error.push(inputs[i].name)
        console.log(error)
        this.setState({errorBag})
      }
      /* remove error */
      if(inputs[i].value !== '') {
        // delete errorBag[inputs[i].name]
        errorBag[inputs[i].name] = []
        this.setState({errorBag})
      }
    }

    /* invalid email */
    if(!verifyEmail.test(billet.email)) {
      let error = errorBag['email']
      error.push('invalidEmail')
      this.setState({errorBag})
      // errorBag.email = errorBag.email + 'invalidEmail'
    }
    if(verifyEmail.test(billet.email)) {
      // delete errorBag.email
      errorBag.email = []
      this.setState({errorBag})
    }

  }

  submit = (e) => {
    /* emit state */
  }

  render() {
    const {billet, errorBag} = this.state
    const name = [
      {
        label: 'Seu nome',
        class: '',
        type: 'text',
        id: 'nome',
        name: 'name',
        placeholder: 'Ex: Valdeir Santana',
        callback: this.updateValue('name'),
        validate: this.validate,
        errorBag: errorBag['name'],
        value: billet.name
      }
    ]
    const email = [
      {
        label: 'Seu e-mail',
        class: '',
        type: 'email',
        id: 'email',
        name: 'email',
        placeholder: 'Ex: exemplo@gmail.com',
        callback: this.updateValue('email'),
        validate: this.validate,
        errorBag: errorBag['email'],
        value: billet.email
      }
    ]
    return (
      <div className="box-payment_creditcard">
        <form action=""
          onKeyDown={
            (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    // this.submit(e)
                }
            }
          }
        >
          <div className="card border-secondary mb-3">
            <div className="card-body">
              <div className="row-fluid">
                <div className="form-horizontal">
                  <div className="form-group row">
                    <div id="bandeiras" className="col-sm-12">
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className={this.state.errorBag['name'] && this.state.billet.name === ''?'col-sm-6 has-danger':'col-sm-6'}>
                      {/* <label className="control-label" htmlFor="nome">Seu nome</label>
                      <input className={this.state.errorBag['name'] && this.state.billet.name === '' ?'form-control is-invalid':'form-control'} type="text" id="nome" name="name" placeholder="Ex: Valdeir Santana" onChange={this.updateValue('name')} />
                      {(this.state.errorBag['name'] && this.state.billet.name === '') &&
                        <div className="invalid-feedback">Campo Obrigatório</div>
                      } */}
                      <Input
                        input={name}
                        handleInput={this.updateValue}
                      />
                    </div>

                    <div className={this.state.errorBag['email']?'col-sm-6 has-danger':'col-sm-6'}>
                      {/* <label className="control-label" htmlFor="email">Seu e-mail</label>
                      <input className={this.state.errorBag['email'] && this.state.billet.email === '' ?'form-control is-invalid':'form-control'} type="email" id="email" name="email" placeholder="Ex: exemplo@gmail.com" onChange={this.updateValue('email')} />
                      {(this.state.errorBag['email'] && this.state.billet.email === '') &&
                        <div className="invalid-feedback">Campo Obrigatório</div>
                      } */}
                      <Input
                        input={email}
                        handleInput={this.updateValue}
                      />
                    </div>

                  </div>
                  
                  {/* <div className="form-group row">

                    <div className="col-sm-6">
                      <label className="control-label" htmlFor="cpf">CPF</label>
                      <CurrencyFormat
                        className={this.state.errorBag['cpf'] && this.state.billet.cpf === '' ?'form-control is-invalid':'form-control'}
                        placeholder={'222.222.222-22'}
                        allowNegative={false}
                        id="cpf" 
                        name="cpf"
                        format={'###.###.###-##'}
                        mask={''}
                        onValueChange={this.updateValue('cpf')}
                      />
                    </div>
                    <div className="col-sm-6">
                      <label className="control-label" htmlFor="cep">CEP</label>
                      <CurrencyFormat
                        className={this.state.errorBag['cep'] && this.state.billet.cep === '' ?'form-control is-invalid':'form-control'}
                        placeholder={'#####-###'}
                        allowNegative={false}
                        id="phone" 
                        name="phone"
                        format={'#####-###'}
                        mask={''}
                        onValueChange={this.updateValue('cep')}
                      />
                    </div>

                  </div> */}
                  
                  <div className="form-group row mt-5">
                    <div className="col-sm-12">
                      <button type="button" id="button-confirm" className="btn btn-block btn-success btn-donation" onClick={this.validate}>
                        Doar 
                        {this.props.totalValue &&
                          <span>{this.props.totalValue}</span>
                        }
                      </button>
                    </div>
                  </div>
                </div>
              </div> {/* row-fluid */}
            </div> {/*  card-body */}
          </div> {/* card */}
        </form>
      </div>
    )
  }
}

export default Billet