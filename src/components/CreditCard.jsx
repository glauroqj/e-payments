import React, { Component } from 'react'
import Input from './Input'
import InputFormat from './InputFormat'

import * as moment from 'moment'
import {verifyCpf} from './modules/verifyCpf'

class CreditCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      cardCredit: {
        name: '',
        cardNumber: '',
        validateDate: '',
        cvv: '',
        dateBirth: '',
        cpf: '',
        telephone: ''
      },
      requiredField: ['name', 'cardNumber', 'validateDate', 'cvv', 'dateBirth', 'cpf', 'phone'],
      errorBag: {
        name: [],
        cardNumber: [],
        validateDate: [],
        cvv: [],
        dateBirth: [],
        cpf: [],
        phone: []
      },
      validForm: false
    }
  }

  updateValue = (type) => (e) => {
    const {cardCredit} = this.state
    cardCredit[type] = e.target.value
    this.setState({cardCredit})
  }

  updateValueFormat = (type) => (e) => {
    const {cardCredit} = this.state
    cardCredit[type] = e.formattedValue
    this.setState({cardCredit})
  }

  validate = (e) => {
    const { cardCredit, requiredField } = this.state
    let errorBag = {
      name: [],
      cardNumber: [],
      validateDate: [],
      cvv: [],
      dateBirth: [],
      cpf: [],
      phone: []
    }
    let inputs = document.querySelectorAll('input')
    for (let i = 0; i < inputs.length; i++ ) {
      /* add error */
      if (requiredField.indexOf(inputs[i].name) > -1 && inputs[i].value === '') {
        let error = errorBag[inputs[i].name]
        error.push(inputs[i].name)
        this.setState({errorBag})
      }
      /* remove error */
      if (inputs[i].value !== '') {
        errorBag[inputs[i].name] = []
        this.setState({errorBag})
      }
    }

    /* invalid card */
    if (cardCredit.cardNumber.length < 16 && cardCredit.cardNumber !== '') {
      let error = errorBag.cardNumber
      error.push('invalidCardNumber')
      this.setState({errorBag})
      return false
    }
    if (cardCredit.cardNumber.length === 16) {
      errorBag.cardNumber = []
      this.setState({errorBag})
    }

    /* invalid date */
    if (!moment(cardCredit.validateDate, 'MM/YYYY',true).isValid()) {
      let error = errorBag.validateDate
      error.push('invalidValidateDate')
      this.setState({errorBag})
      return false
    }
    if (moment(cardCredit.validateDate, 'MM/YYYY',true).isValid()) {
      errorBag.validateDate = []
      this.setState({errorBag})
    }

    /* invalid date birth */
    if (!moment(cardCredit.dateBirth, 'DD/MM/YYYY',true).isValid()) {
      let error = errorBag.dateBirth
      error.push('invalidDateBirth')
      this.setState({errorBag})
      return false
    }
    if (moment(cardCredit.dateBirth, 'DD/MM/YYYY',true).isValid()) {
      errorBag.dateBirth = []
      this.setState({errorBag})
    }

    /* verify cpf */
    if(!verifyCpf(cardCredit.cpf)) {
      let error = errorBag.cpf
      error.push('invalidCpf')
      this.setState({errorBag})
      return false
    }
    if(verifyCpf(cardCredit.cpf)) {
      errorBag.cpf = []
      this.setState({errorBag})
    }

    return true
  }

  submit = (e) => {
    /* emit state */
    if (!this.validate()) {
      console.log('ERRORS')
      return false
    }

  }

  render() {
    const {cardCredit, errorBag} = this.state
    const name = {
      label: 'Seu nome como aparece no cartão',
      class: '',
      type: 'text',
      id: 'nome',
      name: 'name',
      placeholder: 'Ex: Valdeir Santana',
      callback: this.updateValue('name'),
      validate: this.validate,
      errorBag: errorBag.name,
      value: cardCredit.name
    }

    const cardNumber = {
      label: 'Número do cartão',
      class: '',
      type: 'tel',
      id: 'cardNumber',
      name: 'cardNumber',
      placeholder: '#### #### #### ####',
      format: '#### #### #### ####',
      mask: '',
      callback: this.updateValueFormat('cardNumber'),
      errorBag: errorBag.cardNumber,
      value: cardCredit.cardNumber
    }

    const validateDate = {
      label: 'Validade',
      class: '',
      type: 'tel',
      id: 'validateDate',
      name: 'validateDate',
      placeholder: '12/2015',
      format: '##/####',
      mask: '',
      callback: this.updateValueFormat('validateDate'),
      errorBag: errorBag.validateDate,
      value: cardCredit.validateDate
    }

    const cvv = {
      label: 'Código de Segurança',
      class: '',
      type: 'tel',
      id: 'cvv',
      name: 'cvv',
      placeholder: '123 ou 1234',
      format: '####',
      mask: '',
      callback: this.updateValueFormat('cvv'),
      errorBag: errorBag.cvv,
      value: cardCredit.cvv
    }

    const dateBirth = {
      label: 'Data de Nascimento',
      class: '',
      type: 'tel',
      id: 'dateBirth',
      name: 'dateBirth',
      placeholder: '07/03/1980',
      format: '##/##/####',
      mask: '',
      callback: this.updateValueFormat('dateBirth'),
      errorBag: errorBag.dateBirth,
      value: cardCredit.dateBirth
    }

    const cpf = {
      label: 'CPF',
      class: '',
      type: 'tel',
      id: 'cpf',
      name: 'cpf',
      placeholder: '222.222.222-22',
      format: '###.###.###-##',
      mask: '',
      callback: this.updateValueFormat('cpf'),
      errorBag: errorBag.cpf,
      value: cardCredit.cpf
    }

    const phone = {
      label: 'Telefone',
      class: '',
      type: 'tel',
      id: 'phone',
      name: 'phone',
      placeholder: '(11) 9 8765-4321',
      format: '(##) # ####-####',
      mask: '',
      callback: this.updateValueFormat('phone'),
      errorBag: errorBag.phone,
      value: cardCredit.phone
    }

    return (
      <div className="box-payment_creditcard">
        <form action=""
          onKeyDown={
            (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.submit(e)
                }
            }
          }
        >
          <div className="card border-secondary mb-3">
            <div className="card-body">
              <div className="row-fluid">
                <div className="form-horizontal">

                  <div className="form-group row">
                    <div className={`${errorBag.name.length > 0 ? 'col-sm-6 has-danger' : 'col-sm-6'}`}>
                      <Input input={name} />
                    </div>
                  </div>
                  
                  <div className="form-group row">
                    
                    <div className={`${errorBag.cardNumber.length > 0 ? 'col-sm-4 has-danger' : 'col-sm-4'}`}>
                      <InputFormat input={cardNumber} />
                    </div>

                    <div className={`${errorBag.validateDate.length > 0 ? 'col-sm-4 has-danger' : 'col-sm-4'}`}>
                      <InputFormat input={validateDate} />
                    </div>

                    <div className={`${errorBag.cvv.length > 0 ? 'col-sm-4 has-danger' : 'col-sm-4'}`}>
                      <InputFormat input={cvv} />
                    </div>

                  </div>

                  <div className="form-group row titular">

                    <div className={`${errorBag.dateBirth.length > 0 ? 'col-sm-4 has-danger' : 'col-sm-4'}`}>
                      <InputFormat input={dateBirth} />
                    </div>

                    <div className={`${errorBag.cpf.length > 0 ? 'col-sm-4 has-danger' : 'col-sm-4'}`}>
                      <InputFormat input={cpf} />
                    </div>

                    <div className={`${errorBag.phone.length > 0 ? 'col-sm-4 has-danger' : 'col-sm-4'}`}>
                      <InputFormat input={phone} />
                    </div>

                  </div>
                  
                  <div className="form-group row mt-5">
                    <div className="col-sm-12">
                      <button type="button" id="button-confirm" className="btn btn-block btn-success btn-donation" onClick={this.submit}>
                        {`Doar ${this.props.totalValue}`}
                      </button>
                    </div>
                  </div>
                </div>
              </div> {/* row-fluid */}
            </div> {/*  card-body */}
          </div> {/* card */}
        </form>
      </div>
    );
  }
}

export default CreditCard;