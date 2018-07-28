import React, { Component } from 'react';
import CurrencyFormat from 'react-currency-format';

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
        phone: ''
      },
      requiredField: ['name', 'cardNumber', 'validateDate', 'cvv', 'dateBirth', 'cpf', 'phone'],
      errorBag: {}
    }
  }

  updateValue = (e) => {
    let cardCredit = this.state.cardCredit;
    
    if(e.target.name === 'name') {
      cardCredit.name = e.target.value;
      this.setState({cardCredit});
      return false;
    }

  }

  updateCardNumber = (e) => {
    let cardCredit = this.state.cardCredit;
    cardCredit.cardNumber = e.value;
    this.setState({cardCredit});
  }
  updateValidateDate = (e) => {
    let cardCredit = this.state.cardCredit;
    cardCredit.validateDate = e.value;
    this.setState({cardCredit});
  }
  updateCvv = (e) => {
    let cardCredit = this.state.cardCredit;
    cardCredit.cvv = e.value;
    this.setState({cardCredit});
  }
  updateDateBirth = (e) => {
    let cardCredit = this.state.cardCredit;
    cardCredit.dateBirth = e.value;
    this.setState({cardCredit});
  }
  updateCpf = (e) => {
    let cardCredit = this.state.cardCredit;
    cardCredit.cpf = e.value;
    this.setState({cardCredit});
  }
  updatePhone = (e) => {
    let cardCredit = this.state.cardCredit;
    cardCredit.phone = e.value;
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
      errorBag.invalidCardNumber = true;
      this.setState({errorBag});
    }
    if(this.state.cardCredit.cardNumber.length === 16) {
      errorBag.invalidCardNumber = false;
      console.log('SHOW ERROR invalid number')
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

                  <div className={this.state.errorBag['name'] && this.state.cardCredit.name === '' ?'form-group row has-danger':'form-group row'}>
                    <div className="col-sm-6">
                      <label className="control-label" htmlFor="nome">Seu nome como aparece no cartão</label>
                      <input className={this.state.errorBag['name'] && this.state.cardCredit.name === '' ?'form-control is-invalid':'form-control'} type="text" id="nome" name="name" placeholder="Ex: Valdeir Santana" onChange={this.updateValue} />
                      {(this.state.errorBag['name'] && this.state.cardCredit.name === '') &&
                        <div className="invalid-feedback">Campo Obrigatório</div>
                      }
                    </div>
                  </div>
                  
                  <div className="form-group row">

                    <div className={(this.state.errorBag['cardNumber'] && this.state.cardCredit.cardNumber === '') || (this.state.errorBag.invalidCardNumber && this.state.cardCredit.cardNumber.length < 16) ?'col-sm-6 has-danger':'col-sm-6'}>
                      <label className="control-label" htmlFor="numero-cartao">Número do cartão</label>
                      <CurrencyFormat
                        className={(this.state.errorBag['cardNumber'] && this.state.cardCredit.cardNumber === '') || (this.state.errorBag.invalidCardNumber && this.state.cardCredit.cardNumber.length < 16) ?'form-control is-invalid':'form-control'}
                        placeholder={'#### #### #### ####'}
                        allowNegative={false}
                        id="numero-cartao" 
                        name="cardNumber"
                        format={'#### #### #### ####'}
                        mask={'_'}
                        onValueChange={this.updateCardNumber}
                      />
                      {(this.state.errorBag['cardNumber'] && this.state.cardCredit.cardNumber === '') &&
                        <div className="invalid-feedback">Campo Obrigatório</div>
                      }
                      {(this.state.errorBag.invalidCardNumber && this.state.cardCredit.cardNumber.length < 16) &&
                        <div className="invalid-feedback">Número do cartão inválido</div>
                      }                    
                    </div>

                    <div className={this.state.errorBag['validateDate'] && this.state.cardCredit.validateDate === '' ?'col-sm-3 has-danger':'col-sm-3'}>
                      <label className="control-label" htmlFor="validade">Validade</label>
                      <CurrencyFormat
                        className={this.state.errorBag['validateDate'] && this.state.cardCredit.validateDate === '' ?'form-control is-invalid':'form-control'}
                        placeholder={'12/2015'}
                        allowNegative={false}
                        id="validateDate" 
                        name="validateDate"
                        format={'##/####'}
                        mask={''}
                        onValueChange={this.updateValidateDate}
                      />
                      {(this.state.errorBag['validateDate'] && this.state.cardCredit.validateDate === '') &&
                        <div className="invalid-feedback">Campo Obrigatório</div>
                      }
                    </div>

                    <div className="col-sm-3">
                      <label className="control-label" htmlFor="cvv">Código de Segurança</label>
                      <CurrencyFormat
                        className={this.state.errorBag['cvv'] && this.state.cardCredit.cvv === '' ?'form-control is-invalid':'form-control'}
                        placeholder={'123 ou 1234'}
                        allowNegative={false}
                        id="cvv" 
                        name="cvv"
                        format={'####'}
                        mask={''}
                        // onValueChange={this.updateCardNumber}
                      />
                    </div>

                  </div>

                  <div className="form-group row titular">

                    <div className="col-sm-4">
                      <label className="control-label" htmlFor="data-nascimento">Data de Nascimento</label>
                      <CurrencyFormat
                        className={this.state.errorBag['dateBirth'] && this.state.cardCredit.dateBirth === '' ?'form-control is-invalid':'form-control'}
                        placeholder={'07/03/1980'}
                        allowNegative={false}
                        id="dateBirth" 
                        name="dateBirth"
                        format={'##/##/####'}
                        mask={''}
                        // onValueChange={this.updateCardNumber}
                      />
                    </div>
                    <div className="col-sm-4">
                      <label className="control-label" htmlFor="cpf">CPF</label>
                      <CurrencyFormat
                        className={this.state.errorBag['cpf'] && this.state.cardCredit.cpf === '' ?'form-control is-invalid':'form-control'}
                        placeholder={'222.222.222-22'}
                        allowNegative={false}
                        id="cpf" 
                        name="cpf"
                        format={'###.###.###-##'}
                        mask={''}
                        // onValueChange={this.updateCardNumber}
                      />
                    </div>
                    <div className="col-sm-4">
                      <label className="control-label" htmlFor="phone">Telefone</label>
                      <CurrencyFormat
                        className={this.state.errorBag['phone'] && this.state.cardCredit.phone === '' ?'form-control is-invalid':'form-control'}
                        placeholder={'(11) 9 8765-4321'}
                        allowNegative={false}
                        id="phone" 
                        name="phone"
                        format={'(##) # ####-####'}
                        mask={''}
                        // onValueChange={this.updateCardNumber}
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