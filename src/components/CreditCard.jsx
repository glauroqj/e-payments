import React, { Component } from 'react';

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
        telefone: ''
      },
      requiredField: ['name', 'cardNumber', 'validateDate', 'cvv', 'dateBirth', 'cpf'],
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

    if(e.target.name === 'cardNumber') {
      cardCredit.cardNumber = e.target.value;
      this.setState({cardCredit});
      return false;
    }

  }

  validate = (e) => {
    console.log(e)
    let inputs = document.querySelectorAll('input');
    let obj = {};
    for (let i = 0; i < inputs.length; i++ ) {
      if(this.state.requiredField.indexOf(inputs[i].name) > -1 && inputs[i].value === '') {
        obj[inputs[i].name] = inputs[i].name
        this.setState({
          errorBag: obj
        })
      }
    }
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
                      <label className="control-label" htmlFor="nome">Seu nome como aparece no cartão:</label>
                      <input className={this.state.errorBag['name'] && this.state.cardCredit.name === '' ?'form-control is-invalid':'form-control'} type="text" id="nome" name="name" placeholder="Ex: Valdeir Santana" onChange={this.updateValue} />
                      {(this.state.errorBag['name'] && this.state.cardCredit.name === '') &&
                        <div className="invalid-feedback">Campo Obrigatório</div>
                      }
                    </div>
                  </div>
                  
                  <div className="form-group row">

                    <div className={this.state.errorBag['cardNumber'] && this.state.cardCredit.cardNumber === '' ?'col-sm-6 has-danger':'col-sm-6'}>
                      <label className="control-label" htmlFor="numero-cartao">Número do cartão:</label>
                      <input className={this.state.errorBag['cardNumber'] && this.state.cardCredit.cardNumber === '' ?'form-control is-invalid':'form-control'} type="text" id="numero-cartao" name="cardNumber" onChange={this.updateValue} />
                      {(this.state.errorBag['cardNumber'] && this.state.cardCredit.cardNumber === '') &&
                        <div className="invalid-feedback">Campo Obrigatório</div>
                      }
                    </div>

                    <div className="col-sm-3">
                      <label className="control-label" htmlFor="validade">Validade:</label>
                      <input className="form-control" type="text" id="validade" name="validateDate" placeholder="Ex: 12/2015" />
                    </div>

                    <div className="col-sm-3">
                      <label className="control-label" htmlFor="cvv">Código de Segurança:</label>
                      <input className="form-control" type="text" id="cvv" name="cvv" placeholder="Ex: 123 ou 1234" />
                    </div>

                  </div>
                  
                  <div className="form-group row">
                    <div className="col-sm-5">
                      <div className="custom-control custom-checkbox">
                        <input type="checkbox" id="check-titular" name="customRadio" className="custom-control-input"/>
                        <label className="custom-control-label" htmlFor="check-titular">Eu sou o títular do cartão</label>
                      </div>
                    </div>
                  </div>

                  <div className="form-group row titular">

                    <div className="col-sm-4">
                      <label className="control-label" htmlFor="data-nascimento">Data de Nascimento:</label>
                      <input className="form-control" type="text" id="data-nascimento" name="dateBirth" placeholder="Ex: 07/03/1808" value="" />
                    </div>
                    <div className="col-sm-4">
                      <label className="control-label" htmlFor="cpf">CPF:</label>
                      <input className="form-control" type="text" id="cpf" name="cpf" placeholder="Ex: 222.222.222-22" value="" />
                    </div>
                    <div className="col-sm-4">
                      <label className="control-label" htmlFor="telefone">Telefone:</label>
                      <input className="form-control" type="text" id="telefone" name="telefone" placeholder="Ex: (11) 9 8765-4321" value="" />
                    </div>

                  </div>
                  
                  {/* <div className="form-group row">
                    <div className="col-sm-8">
                      <label className="control-label" htmlFor="parcelas">Parcelas:</label>
                      <select className="form-control" id="parcelas" name="parcelas"></select>
                    </div>
                  </div> */}
                  
                  <div className="form-group row">
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