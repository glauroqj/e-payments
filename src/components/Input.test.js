import React from 'react'
import { shallow, mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

import Input from './Input'

const validate = jest.fn()
const updateValue = jest.fn()
const option = {
  label: 'Endereço (nome da rua, número, bairro, cidade e estado)',
  class: '',
  type: 'text',
  id: 'address',
  name: 'address',
  placeholder: 'Ex: Rua Nossa Senhora do Carmo, 1571, São Pedro, Belo Horizonte-MG',
  callback: updateValue(),
  validate: validate(),
  errorBag: [],
  value: ''
}

describe('Input', () => {
  it('Render component', () => {
    const component = shallow(<Input {...option} />)
    expect(component.length).toBe(1)
  })
  it('Should be error visible', () => {
    option.errorBag = ['not-empty']
    const component = shallow(<Input {...option} />)
    expect(component.find('.is-invalid').length).toBe(1)
  })
})