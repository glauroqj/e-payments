import React, { Component } from 'react';
import CurrencyFormat from 'react-currency-format';
import * as moment from 'moment';
import {verifyCpf} from './modules/verifyCpf';

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
      errorBag: {}
    }
  }

  // updateValue = (type) => (e) => {
  //   let state = this.state.form;
    // let options = ['telephone', 'dateBirth']
    
    // if(options.indexOf(type) > -1) {
    //   state[type] = e.formattedValue;
    //   this.setState({state});
    //   return false;
    // }

    // state[e.target.name] = e.target.value;
    // this.setState({state});
  // }

  updateValue = (type) => (e) => {
    let cardCredit = this.state.cardCredit;
    let options = ['telephone', 'cpf', 'dateBirth', 'cvv', 'validateDate']
    if(options.indexOf(type) > -1) {
      cardCredit[type] = e.formattedValue;
      this.setState({cardCredit});
      return false;
    }

    if(type === 'cardNumber') {
      cardCredit[type] = e.value;
      this.setState({cardCredit});
      return false;
    }
    
    cardCredit[type] = e.target.value;
    this.setState({cardCredit});
  }

  validate = (e) => {
    let errorBag = this.state.errorBag;
    let inputs = document.querySelectorAll('input');
    for (let i = 0; i < inputs.length; i++ ) {
      /* add error */
      if(this.state.requiredField.indexOf(inputs[i].name) > -1 && inputs[i].value === '') {
        errorBag[inputs[i].name] = inputs[i].name
        this.setState({errorBag});
      }
      /* remove error */
      if(inputs[i].value !== '') {
        delete errorBag[inputs[i].name];
        this.setState({errorBag});
      }
    }
    /* invalid card */
    if(this.state.cardCredit.cardNumber.length < 16 && this.state.cardCredit.cardNumber !== '') {
      errorBag.invalidCardNumber = 'invalidCardNumber';
      this.setState({errorBag});
    }
    if(this.state.cardCredit.cardNumber.length === 16) {
      delete errorBag.invalidCardNumber
      this.setState({errorBag});
    }
    /* date birth */
    if(!moment(this.state.cardCredit.dateBirth, 'DD/MM/YYYY',true).isValid()) {
      errorBag.invalidDateBirth = 'invalidDateBirth';
      this.setState({errorBag});
    }
    if(moment(this.state.cardCredit.dateBirth, 'DD/MM/YYYY',true).isValid()) {
      delete errorBag.invalidDateBirth;
      this.setState({errorBag}); 
    }

    if(!moment(this.state.cardCredit.validateDate, 'MM/YYYY',true).isValid()) {
      errorBag.invalidValidateDate = 'invalidValidateDate';
      this.setState({errorBag});
    }
    if(moment(this.state.cardCredit.validateDate, 'MM/YYYY',true).isValid()) {
      delete errorBag.invalidValidateDate;
      this.setState({errorBag}); 
    }

    if(!verifyCpf(this.state.cardCredit.cpf)) {
      errorBag.invalidCpf = 'invalidCpf';
      this.setState({errorBag});
    }
    if(verifyCpf(this.state.cardCredit.cpf)) {
      delete errorBag.invalidCpf
      this.setState({errorBag});
    }

  }

  submit = (e) => {
    /* emit state */
  }

  render() {
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
                    <div className={'col-sm-6 '+((this.state.errorBag['name'] && this.state.cardCredit.name === '') || (this.state.errorBag['name']) ? 'has-danger' : '')}>
                      <label className="control-label" htmlFor="nome">Seu nome como aparece no cartão</label>
                      <input className={this.state.errorBag['name'] && this.state.cardCredit.name === '' ?'form-control is-invalid':'form-control'} type="text" id="nome" name="name" value={this.state.cardCredit.name} placeholder="Ex: Valdeir Santana" onChange={this.updateValue('name')} />
                      {(this.state.errorBag['name'] && this.state.cardCredit.name === '') &&
                        <div className="invalid-feedback">Campo Obrigatório</div>
                      }
                    </div>
                  </div>
                  
                  <div className="form-group row">
                    
                    <div className={'col-sm-4 '+((this.state.errorBag['cardNumber'] && this.state.cardCredit.cardNumber === '') || (this.state.errorBag.invalidCardNumber && this.state.cardCredit.cardNumber.length < 16) ? 'has-danger' : '')}>
                      <label className="control-label" htmlFor="numero-cartao">Número do cartão</label>
                      <CurrencyFormat
                        className={'form-control '+((this.state.errorBag['cardNumber'] && this.state.cardCredit.cardNumber === '') || (this.state.errorBag.invalidCardNumber && this.state.cardCredit.cardNumber.length < 16) ?'is-invalid':'')}
                        placeholder={'#### #### #### ####'}
                        allowNegative={false}
                        id="numero-cartao" 
                        name="cardNumber"
                        format={'#### #### #### ####'}
                        // mask={''}
                        value={this.state.cardCredit.cardNumber}
                        onValueChange={this.updateValue('cardNumber')}
                      />
                      {(this.state.errorBag['cardNumber'] && this.state.cardCredit.cardNumber === '') &&
                        <div className="invalid-feedback">Campo Obrigatório</div>
                      }
                      {(this.state.errorBag['invalidCardNumber'] && this.state.cardCredit.cardNumber.length < 16) &&
                        <div className="invalid-feedback">Número do cartão inválido</div>
                      }                    
                    </div>
                    
                    <div className={'col-sm-4 '+((this.state.errorBag['validateDate'] && this.state.cardCredit.validateDate === '') || (this.state.errorBag['invalidValidateDate']) ? 'has-danger' : '')}>
                      <label className="control-label" htmlFor="validade">Validade</label>
                      <CurrencyFormat
                        className={'form-control '+((this.state.errorBag['validateDate'] && this.state.cardCredit.validateDate === '') || (this.state.errorBag['invalidValidateDate']) ?'is-invalid':'')}
                        placeholder={'12/2015'}
                        allowNegative={false}
                        id="validateDate" 
                        name="validateDate"
                        format={'##/####'}
                        mask={''}
                        value={this.state.cardCredit.validateDate}
                        onValueChange={this.updateValue('validateDate')}
                      />
                      {(this.state.errorBag['validateDate'] && this.state.cardCredit.validateDate === '') &&
                        <div className="invalid-feedback">Campo Obrigatório</div>
                      }
                      {(this.state.errorBag['invalidValidateDate'] && this.state.cardCredit.validateDate !== '') &&
                        <div className="invalid-feedback">Data inválida</div>
                      }
                    </div>

                    <div className="col-sm-4">
                      <label className="control-label" htmlFor="cvv">Código de Segurança</label>
                      <CurrencyFormat
                        className={'form-control '+(this.state.errorBag['cvv'] && this.state.cardCredit.cvv !== '' ?'is-invalid':'')}
                        placeholder={'123 ou 1234'}
                        allowNegative={false}
                        id="cvv" 
                        name="cvv"
                        format={'####'}
                        mask={''}
                        value={this.state.cardCredit.cvv}
                        onValueChange={this.updateValue('cvv')}
                      />
                    </div>

                  </div>

                  <div className="form-group row titular">

                    <div className={'col-sm-4 '+((this.state.errorBag['dateBirth'] && this.state.cardCredit.dateBirth === '') || (this.state.errorBag['invalidDateBirth'] && this.state.cardCredit.dateBirth !== '') ? 'has-danger' : '')}>
                      <label className="control-label" htmlFor="data-nascimento">Data de Nascimento</label>
                      <CurrencyFormat
                        className={'form-control '+((this.state.errorBag['dateBirth'] && this.state.cardCredit.dateBirth === '') || (this.state.errorBag['invalidDateBirth'] && this.state.cardCredit.dateBirth !== '') ?'is-invalid':'')}
                        placeholder={'07/03/1980'}
                        allowNegative={false}
                        id="dateBirth" 
                        name="dateBirth"
                        format={'##/##/####'}
                        mask={''}
                        value={this.state.cardCredit.dateBirth}
                        onValueChange={this.updateValue('dateBirth')}
                      />
                      {(this.state.errorBag['dateBirth'] && this.state.cardCredit.dateBirth === '') &&
                        <div className="invalid-feedback">Campo Obrigatório</div>
                      }
                      {(this.state.errorBag['invalidDateBirth'] && this.state.cardCredit.dateBirth !== '') &&
                        <div className="invalid-feedback">Data inválida</div>
                      }
                    </div>
                    <div className={'col-sm-4 '+((this.state.errorBag['cpf'] && this.state.cardCredit.cpf === '') || (this.state.errorBag['invalidCpf'] && this.state.cardCredit.cpf !== '') ? 'has-danger' : '')}>
                      <label className="control-label" htmlFor="cpf">CPF</label>
                      <CurrencyFormat
                        className={'form-control '+((this.state.errorBag['cpf'] && this.state.cardCredit.cpf === '') || (this.state.errorBag['invalidCpf'] && this.state.cardCredit.cpf !== '') ?'is-invalid':'')}
                        placeholder={'222.222.222-22'}
                        allowNegative={false}
                        id="cpf" 
                        name="cpf"
                        format={'###.###.###-##'}
                        // mask={''}
                        value={this.state.cardCredit.cpf}
                        onValueChange={this.updateValue('cpf')}
                      />
                      {(this.state.errorBag['cpf'] && this.state.cardCredit.cpf === '') &&
                        <div className="invalid-feedback">Campo Obrigatório</div>
                      }
                      {(this.state.errorBag['invalidCpf'] && this.state.cardCredit.cpf !== '') &&
                        <div className="invalid-feedback">CPF inválido</div>
                      }
                    </div>
                    <div className="col-sm-4">
                      <label className="control-label" htmlFor="telephone">Telefone</label>
                      <CurrencyFormat
                        className={'form-control '+(this.state.errorBag['telephone'] && this.state.cardCredit.telephone !== '' ?'is-invalid':'')}
                        placeholder={'(11) 9 8765-4321'}
                        allowNegative={false}
                        id="telephone" 
                        name="telephone"
                        format={'(##) # ####-####'}
                        mask={''}
                        value={this.state.cardCredit.telephone}
                        onValueChange={this.updateValue('telephone')}
                      />
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
    );
  }
}

export default CreditCard;