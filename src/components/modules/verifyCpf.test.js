import React from 'react';
import { expect } from 'chai';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() })

import {verifyCpf} from './verifyCpf';

describe('Verify CPF', () => {
  it('Wrong CPF', () => {
    let cpf = '070.235.487-98'
    expect(verifyCpf(cpf)).to.be.false;
  });
  it('Valid CPF', () => {
    let cpf = '390.304.020-75'
    expect(verifyCpf(cpf)).to.be.true;
  });
  it('Invalid CPF', () => {
    let cpf = '000.000.000-00'
    expect(verifyCpf(cpf)).to.be.false;
  });
  it('Rest === 0', () => {
    let cpf = '123.456.789-00'
    expect(verifyCpf(cpf)).to.be.false;
  });
});