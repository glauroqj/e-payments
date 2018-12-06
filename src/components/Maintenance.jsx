import React, { Component } from 'react'
import Slider from "react-slick"

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import student from '../assets/images/student.png'
import ong from '../assets/images/ong.png'

class Maintenance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 5,
      optionTab: 'student',
      settings: {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 800,
        autoplaySpeed: 5000,
        arrows: false,
        pauseOnHover: true,
        className: 'mt-2'
      }
    }
  }

  doantion() {
    let pagSeguro = document.querySelectorAll('#donate-pagseguro')
    pagSeguro[0].childNodes[3].click()
  }

  toggleTabOption = (e) => {
    this.setState({
      optionTab: e.target.id
    })
  }

  render() {
    return (
      <div className="container maintenance text-center animated fadeIn">
        <div className="jumbotron">
          <h1 className="display-5">Bem-Vinda(o)!!!</h1>
          <h5 className="mb-2">O Instituto Equale trabalha diariamente para desenvolver a educação pública e popular em Minas Gerais.</h5>
          <h5 className="mb-2">As doações que recebemos são utilizadas para desenvolver nossos <a target="new" href="http://equale.com.br/projetos-equale"><b>projetos</b></a> e para a sustentação da equipe executiva do Instituto.</h5>
          <h5 className="mb-2">Aqui você poderá fazer suas doações diretamente, de forma segura, simples e rápida.</h5>

          <div className="box-toggle-tab mt-3">
            <ul className="nav nav-pills nav-fill">
              <li className="nav-item">
                <a className={this.state.optionTab === 'student'?'nav-link active show':'nav-link'} id="student" onClick={this.toggleTabOption}>
                  Apadrinhar um Estudante
                </a>
              </li>
              <li className="nav-item">
                <a className={this.state.optionTab === 'ong'?'nav-link active show':'nav-link'} id="ong" onClick={this.toggleTabOption}>
                  Amigo do Equale
                </a>
              </li>
            </ul>
          </div>

          <div className="tab-content box-toggle-tab-content">
            <div className={this.state.optionTab === 'student'?'tab-pane animated fadeIn active show':'tab-pane'}>

              <div className="card amount-box">
                <img className="amount-img" src={student} alt="Estudande" title="Estudante" />
                <div className="card-body">
                  <h5>Apadrinhar um estudante, auxiliando no custeamento de seu transporte escolar</h5>
                  <ul className="list-inline">
                    <li className="list-inline-item">
                      Quero doar:
                    </li>
                    <li className="list-inline-item">
                      <a href="http://pag.ae/bkDXSKx" className="btn btn-success btn-lg" >R$162,00</a>
                    </li>
                    <li className="list-inline-item">
                      <a href="http://pag.ae/bhDXSyP" className="btn btn-success btn-lg" >R$81,00</a>
                    </li>
                    <li className="list-inline-item">
                      <a href="http://pag.ae/bkDXSpX" className="btn btn-success btn-lg" >R$32,40</a>
                    </li>
                    <li className="list-inline-item">
                      <a href="http://pag.ae/7Up3C5jhJ" className="btn btn-success btn-lg" >R$16,20</a>
                    </li>
                    <li className="list-inline-item">
                      <button type="button" className="btn btn-success btn-lg" onClick={this.doantion}>Doar outro valor</button>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
            <div className={this.state.optionTab === 'ong'?'tab-pane animated fadeIn active show':'tab-pane'}>

              <div className="card amount-box">
                <img className="amount-img" src={ong} alt="Equale" title="Equale" />
                <div className="card-body">
                  <h5>Ajudar a organização, auxiliando nas taxas, impostos e materiais de escritório</h5>
                  <ul className="list-inline">
                    <li className="list-inline-item">
                      Quero doar:
                    </li>
                    <li className="list-inline-item">
                      <a href="http://pag.ae/bjDXRw4" className="btn btn-success btn-lg" >R$500,00</a>
                    </li>
                    <li className="list-inline-item">
                      <a href="http://pag.ae/7U7ZUKRsG" className="btn btn-success btn-lg" >R$100,00</a>
                    </li>
                    <li className="list-inline-item">
                      <a href="http://pag.ae/7U7-4WuhG" className="btn btn-success btn-lg" >R$40,00</a>
                    </li>
                    <li className="list-inline-item">
                      <a href="http://pag.ae/blDXQzY" className="btn btn-success btn-lg" >R$20,00</a>
                    </li>
                    <li className="list-inline-item">
                      <a href="http://pag.ae/bbFCn8k" className="btn btn-success btn-lg" >R$10,00</a>
                    </li>
                    <li className="list-inline-item">
                      <a href="http://pag.ae/bkD2Plv" className="btn btn-success btn-lg" >R$5,00</a>
                    </li>
                    <li className="list-inline-item">
                      <button type="button" className="btn btn-success btn-lg" onClick={this.doantion}>Doar outro valor</button>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>

          <Slider {...this.state.settings}>
            <div>
              <blockquote className="blockquote text-center">
                <p className="mb-1">Com <b className="text-success">R$120,00</b> por ano, ou <b className="text-success">R$120,00</b> por mês, somos capazes de garantir o material didático de um  estudante de cursinho popular</p>
              </blockquote>
            </div>
            <div>
              <blockquote className="blockquote text-center">
                <p className="mb-1">Com <b className="text-success">R$162,00</b> por mês, arcamos com as passagens de um estudante de cursinho popular residente em Belo Horizonte.</p>
                <p className="mb-1">Dez pessoas contribuindo com <b className="text-success">R$162,00</b> por mês, conseguem sustentar esse mesmo estudante.</p>
              </blockquote>
            </div>
            <div>
              <blockquote className="blockquote text-center">
                <p className="mb-0">A manutenção da nossa Equipe Executiva, considerando taxas, impostos, material de escritório e a manutenção de dois funcionários custa, mensalmente, <b className="text-success">R$8.000,00</b>.</p>
              </blockquote>
            </div>
          </Slider>

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