import React, { Component } from 'react'
import Input from './Input'
import InputFormat from './InputFormat'
import {verifyCpf} from './modules/verifyCpf'

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
      errorBag: {
        name: [],
        email: [],
        cpf: [],
        cep: []
      }
    }
  }

  updateValue = (type) => (e) => {
    let billet = this.state.billet
    billet[type] = e.target.value
    this.setState({billet})
  }

  updateValueFormat = (type) => (e) => {
    let billet = this.state.billet
    billet[type] = e.formattedValue
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

    /* invalid cpf */
    if(!verifyCpf(billet.cpf)) {
      let error = errorBag['cpf']
      error.push('invalidCpf')
      this.setState({errorBag})
    }    
    if(verifyCpf(billet.cpf)) {
      errorBag.cpf = []
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
    const cpf = [
      {
        label: 'CPF',
        class: '',
        type: 'cpf',
        id: 'cpf',
        name: 'cpf',
        placeholder: '222.222.222-22',
        format: '###.###.###-##',
        mask: '',
        callback: this.updateValueFormat('cpf'),
        errorBag: errorBag['cpf'],
        value: billet.cpf
      }
    ]
    const cep = [
      {
        label: 'CEP',
        class: '',
        type: 'cep',
        id: 'cep',
        name: 'cep',
        placeholder: '#####-###',
        format: '###.###.###-##',
        mask: '',
        callback: this.updateValueFormat('cep'),
        errorBag: errorBag['cep'],
        value: billet.cep
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
                    <div className={this.state.errorBag['name'].length>0?'col-sm-6 has-danger':'col-sm-6'}>
                      <Input
                        input={name}
                      />
                    </div>

                    <div className={this.state.errorBag['email'].length>0?'col-sm-6 has-danger':'col-sm-6'}>
                      <Input
                        input={email}
                      />
                    </div>

                  </div>
                  
                  <div className="form-group row">

                    <div className={this.state.errorBag['cpf'].length>0?'col-sm-6 has-danger':'col-sm-6'}>
                      <InputFormat
                        input={cpf}
                      />

                      {/* <label className="control-label" htmlFor="cpf">CPF</label>
                      <CurrencyFormat
                        className={this.state.errorBag['cpf'] && this.state.billet.cpf === '' ?'form-control is-invalid':'form-control'}
                        placeholder={'222.222.222-22'}
                        allowNegative={false}
                        id="cpf" 
                        name="cpf"
                        format={'###.###.###-##'}
                        mask={''}
                        onValueChange={this.updateValue('cpf')}
                      /> */}
                    </div>

                    <div className={this.state.errorBag['cep'].length>0?'col-sm-6 has-danger':'col-sm-6'}>
                      <InputFormat
                        input={cep}
                      />
                      {/* <label className="control-label" htmlFor="cep">CEP</label>
                      <CurrencyFormat
                        className={this.state.errorBag['cep'] && this.state.billet.cep === '' ?'form-control is-invalid':'form-control'}
                        placeholder={'#####-###'}
                        allowNegative={false}
                        id="phone" 
                        name="phone"
                        format={'#####-###'}
                        mask={''}
                        onValueChange={this.updateValue('cep')}
                      /> */}
                    </div>

                  </div>
                  
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