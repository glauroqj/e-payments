import React, { Component } from 'react';

class CreditCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false
    }
  }

  // exit = () => {
  //   return this.props.exit()
  // }

  // menu = () => {
  //   this.setState({
  //     showMenu: !this.state.showMenu
  //   })
  // }

  render() {
    return (
      <div className="box-payment_creditcard">
        <div className="row-fluid">
          <div className="form-horizontal">
            <div className="form-group">
              <div id="bandeiras" className="col-sm-7 col-sm-offset-2">
              </div>
            </div>

            <div className="form-group row">
              <div className="col-sm-6">
                <label className="control-label" htmlFor="nome">Seu nome como aparece no cartão:</label>
                <input className="form-control" type="text" id="nome" name="nome" placeholder="Ex: Valdeir Santana" />
                <input type="hidden" id="bandeira" name="bandeira" />
              </div>
            </div>
            
            <div className="form-group row">

              <div className="col-sm-6">
                <label className="control-label" htmlFor="numero-cartao">Número do cartão:</label>
                <input className="form-control" type="text" id="numero-cartao" name="numero-cartao" />
              </div>

              <div className="col-sm-3">
                <label className="control-label" htmlFor="validade">Validade:</label>
                <input className="form-control" type="text" id="validade" name="validade" placeholder="Ex: 12/2015" />
              </div>

              <div className="col-sm-3">
                <label className="control-label" htmlFor="cvv">Código de Segurança:</label>
                <input className="form-control" type="text" id="cvv" name="cvv" placeholder="Ex: 123 ou 1234" />
              </div>

            </div>
            
            <div className="form-group col-sm-12">
              <div className="col-sm-5 col-sm-offset-4" id="check">
                <div className="checkbox">
                  <input type="checkbox" name="check-titular" id="check-titular" />
                  <label htmlFor="check-titular">
                    Eu sou o títular do cartão
                  </label>
                </div>
              </div>
            </div>

            <div className="form-group col-sm-12 titular">
              <label className="col-sm-4 control-label" htmlFor="data-nascimento">Data de Nascimento:</label>
              <div className="col-sm-8">
                <input className="form-control" type="text" id="data-nascimento" name="data-nascimento" placeholder="Ex: 07/03/1808" value="" />
              </div>
            </div>

            <div className="form-group col-sm-12 titular">
              <label className="col-sm-4 control-label" htmlFor="cpf">CPF:</label>
              <div className="col-sm-8">
                <input className="form-control" type="text" id="cpf" name="cpf" placeholder="Ex: 222.222.222-22" value="" />
              </div>
            </div>

            <div className="form-group col-sm-12 titular">
              <label className="col-sm-4 control-label" htmlFor="telefone">Telefone:</label>
              <div className="col-sm-8">
                <input className="form-control" type="text" id="telefone" name="telefone" placeholder="Ex: (11) 9 8765-4321" value="" />
              </div>
            </div>
            
            <div className="alert alert-info alert-info-installments fade col-sm-12">Carregando...</div>
            
            <div className="form-group col-sm-12 vhide">
              <label className="col-sm-4 control-label" htmlFor="parcelas">Parcelas:</label>
              <div className="col-sm-8">
                <select className="form-control" id="parcelas" name="parcelas"></select>
              </div>
            </div>
            
            <div className="form-group col-sm-12 vhide">
              <div className="col-sm-5 col-sm-offset-4">
                <button type="button" id="button-confirm" className="btn btn-primary" data-loading-text="Aguarde...">
                  <i className="fa fa-credit-card-alt"></i> 
                  Pagar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreditCard;