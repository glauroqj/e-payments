import React, { Component } from 'react';

class Maintenance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link: 'https://pagseguro.uol.com.br/checkout/nc/nl/donation/sender-identification.jhtml'
    }
  }

  doantion() {
    let pagSeguro = document.querySelectorAll('#donate-pagseguro')
    pagSeguro[0].childNodes[3].click()
  }

  render() {
    return (
      <div className="container maintenance text-center animated fadeIn">
        <div className="jumbotron">
          <h1 className="display-3">Olá!</h1>
          <h4 className="">Esta é a nova plataforma para doações do Equale.</h4>
          <h4 className="mb-3">Aqui você poderá fazer suas doações diretamente, de forma segura, simples e rápida.</h4>
          <hr className="my-4" />
          <p>No momento estamos trabalhando muito na plataforma, mas você já pode fazer sua doação agora mesmo no site do nosso parceiro PagSeguro.</p>
          <p>Basta clicar no botão logo abaixo e seguir estes passos</p>

          <div className="card border-success mb-3">
            <div className="card-header">Passo a Passo</div>
            <div className="card-body">
              <p className="card-text">Após clicar no botão, você será redirecionado para o site do PagSeguro</p>
              <p className="card-text">Escolha o valor que deseja doar, pode escolher qualquer valor</p>
              <p className="card-text">Informe seu e-mail e selecione entre: "Comprar com minha conta pagSeguro" ou "Não tenho conta no PagSeguro"</p>
              <p className="card-text">Na próxima tela basta escolher entre cartão de crédito ou boleto</p>
              <p className="card-text">Agora é só confirmar o pagamento</p>
            </div>
          </div>

          <p className="lead">
            <button type="button" className="btn btn-success btn-lg" onClick={this.doantion}>quero doar agora</button>
          </p>

          <form id="donate-pagseguro" className="hide" action="https://pagseguro.uol.com.br/checkout/v2/donation.html" method="post">
            <input name="currency" type="hidden" value="BRL"/>
            <input name="receiverEmail" type="hidden" value="institutoequale@gmail.com"/>
            <input name="iot" type="hidden" value="button"/>
            <input alt="Pague com PagSeguro - é rápido, grátis e seguro!" name="submit" src="https://stc.pagseguro.uol.com.br/public/img/botoes/doacoes/209x48-doar-assina.gif" type="image"/>
          </form>

        </div>
      </div>
    );
  }
}

export default Maintenance;
