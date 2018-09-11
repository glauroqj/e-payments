import React, { Component } from 'react'
import InputRange from 'react-input-range'
import 'react-input-range/lib/css/index.css'

import student from '../assets/images/student.png'
import ong from '../assets/images/ong.png'

class Maintenance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link: 'https://pagseguro.uol.com.br/checkout/nc/nl/donation/sender-identification.jhtml',
      value: 5
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
          <h1 className="display-5">Bem-Vinda(o)!!!</h1>
          <h5 className="mb-2">O Instituto Equale trabalha diariamente para desenvolver a educação pública e popular em Minas Gerais.</h5>
          <h5 className="mb-2">As doações que recebemos são utilizadas para desenvolver nossos projetos <a target="new" href="http://equale.com.br/projetos-equale">Projeto Equale</a> e para a sustentação da equipe executiva do Instituto.</h5>
          <h5 className="mb-2">Aqui você poderá fazer suas doações diretamente, de forma segura, simples e rápida.</h5>
         
          <hr className="my-4" />

          <blockquote className="blockquote text-center">
            <p className="mb-1">Com <b className="text-success">R$120,00</b> por ano, ou <b className="text-success">R$120,00</b> por mês, somos capazes de garantir o material didático de um  estudante de cursinho popular</p>
          </blockquote>

          <blockquote className="blockquote text-center">
            <p className="mb-1">Com <b className="text-success">R$162,00</b> por mês, arcamos com as passagens de um estudante de cursinho popular residente em Belo Horizonte.</p>
            <p className="mb-1">Dez pessoas contribuindo com <b className="text-success">R$162,00</b> por mês, conseguem sustentar esse mesmo estudante.</p>
          </blockquote>

          <blockquote className="blockquote text-center">
            <p className="mb-0">A manutenção da nossa Equipe Executiva, considerando taxas, impostos, material de escritório e a manutenção de dois funcionários custa, mensalmente, <b className="text-success">R$8.000,00</b>.</p>
          </blockquote>

          <div className="card border-secondary mb-3">
            <div className="card-body">
              <h4>Deslize a barra abaixo para conhecer nossos planos de doação recorrente!</h4>
              <InputRange
                maxValue={5}
                minValue={1}
                value={this.state.value}
                formatLabel={value => `${value}`}
                onChange={value => this.setState({ value })} 
              />
              <div className="row mt-5">
                <div className="col-sm-6">
                  {/* aluno */}
                  <div className="card amount-box mb-3">
                    <h3 className="card-header">
                      Adote um aluno
                      {this.state.value === 5 &&
                        <div className="animated pulse text-success amount-donation"> 100%</div>
                      }
                      {this.state.value === 4 &&
                        <div className="animated pulse text-success amount-donation"> 50%</div>
                      }
                      {this.state.value === 3 &&
                        <div className="animated pulse text-success amount-donation"> 20%</div>
                      }
                      {this.state.value === 2 &&
                        <div className="animated pulse text-success amount-donation"> 10%</div>
                      }
                    </h3>
                    <img className="amount-img" src={student} alt="Estudande" title="Estudante" />
                    <div className="card-body">
                      {this.state.value === 5 &&
                        <a href="http://pag.ae/bkDXSKx" className="btn btn-success btn-lg" >quero doar R$162,00</a>
                      }
                      {this.state.value === 4 &&
                        <a href="http://pag.ae/bhDXSyP" className="btn btn-success btn-lg" >quero doar R$81,00</a>
                      }
                      {this.state.value === 3 &&
                        <a href="http://pag.ae/bkDXSpX" className="btn btn-success btn-lg" >quero doar R$32,40</a>
                      }
                      {this.state.value === 2 &&
                        <a href="http://pag.ae/blDXSdQ" className="btn btn-success btn-lg" >quero doar R$16,20</a>
                      }
                    </div>
                  </div>
                </div> {/* col-xs-6 */}

                <div className="col-sm-6">
                  {/* ong */}
                  <div className="card amount-box mb-3">
                    <h3 className="card-header">
                      Amigo do Equale
                      {this.state.value === 5 &&
                        <div className="animated pulse text-success amount-donation"> Jaqueline Moll</div>
                      }
                      {this.state.value === 4 &&
                        <div className="animated pulse text-success amount-donation"> Paulo Freire</div>
                      }
                      {this.state.value === 3 &&
                        <div className="animated pulse text-success amount-donation"> Darcy Ribeiro</div>
                      }
                      {this.state.value === 2 &&
                        <div className="animated pulse text-success amount-donation"> Anísio Teixeira</div>
                      }
                    </h3>
                    <img className="amount-img" src={ong} alt="Equale" title="Equale"/>
                    <div className="card-body">
                      {this.state.value === 5 &&
                        <a href="http://pag.ae/bjDXRw4" className="btn btn-success btn-lg" >quero doar R$500,00</a>
                      }
                      {this.state.value === 4 &&
                        <a href="http://pag.ae/7U7ZUKRsG" className="btn btn-success btn-lg" >quero doar R$100,00</a>
                      }
                      {this.state.value === 3 &&
                        <a href="http://pag.ae/7U7-4WuhG" className="btn btn-success btn-lg" >quero doar R$40,00</a>
                      }
                      {this.state.value === 2 &&
                        <a href="http://pag.ae/blDXQzY" className="btn btn-success btn-lg" >quero doar R$20,00</a>
                      }
                    </div>
                  </div>

                </div> {/* col-xs-6 */}
              </div>
              
              {this.state.value === 1 &&              
                <p className="lead animated fadeIn">
                  <button type="button" className="btn btn-success btn-lg btn-block" onClick={this.doantion}>quero doar qualquer valor</button>
                </p>
              }

            </div> {/* card-body */}

          </div>

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