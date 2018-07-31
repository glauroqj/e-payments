import React, { Component } from 'react';
import CurrencyFormat from 'react-currency-format';

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

  updateValue = (e) => {
    let billet = this.state.billet;
    
    if(e.target.name === 'name') {
      billet.name = e.target.value;
      this.setState({billet});
      return false;
    }

  }

  // updateCardNumber = (e) => {
  //   let cardCredit = this.state.cardCredit;
  //   cardCredit.cardNumber = e.value;
  //   this.setState({cardCredit});
  // }
  // updateValidateDate = (e) => {
  //   let cardCredit = this.state.cardCredit;
  //   cardCredit.validateDate = e.value;
  //   this.setState({cardCredit});
  // }
  // updateCvv = (e) => {
  //   let cardCredit = this.state.cardCredit;
  //   cardCredit.cvv = e.value;
  //   this.setState({cardCredit});
  // }
  // updateDateBirth = (e) => {
  //   let cardCredit = this.state.cardCredit;
  //   cardCredit.dateBirth = e.value;
  //   this.setState({cardCredit});
  // }
  // updateCpf = (e) => {
  //   let cardCredit = this.state.cardCredit;
  //   cardCredit.cpf = e.value;
  //   this.setState({cardCredit});
  // }
  // updatePhone = (e) => {
  //   let cardCredit = this.state.cardCredit;
  //   cardCredit.phone = e.value;
  //   this.setState({cardCredit});
  // }

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

                  <div className={this.state.errorBag['name'] && this.state.billet.name === '' ?'form-group row has-danger':'form-group row'}>
                    <div className="col-sm-6">
                      <label className="control-label" htmlFor="nome">Seu nome</label>
                      <input className={this.state.errorBag['name'] && this.state.billet.name === '' ?'form-control is-invalid':'form-control'} type="text" id="nome" name="name" placeholder="Ex: Valdeir Santana" onChange={this.updateValue} />
                      {(this.state.errorBag['name'] && this.state.billet.name === '') &&
                        <div className="invalid-feedback">Campo Obrigatório</div>
                      }
                    </div>

                    <div className="col-sm-6">
                      <label className="control-label" htmlFor="email">Seu e-mail</label>
                      <input className={this.state.errorBag['email'] && this.state.billet.email === '' ?'form-control is-invalid':'form-control'} type="email" id="email" name="email" placeholder="Ex: exemplo@gmail.com" onChange={this.updateValue} />
                      {(this.state.errorBag['email'] && this.state.billet.email === '') &&
                        <div className="invalid-feedback">Campo Obrigatório</div>
                      }
                    </div>

                  </div>
                  
                  <div className="form-group row">

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
                        // onValueChange={this.updateCardNumber}
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

export default Billet;