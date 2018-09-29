import React from 'react'
import { render, shallow, mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

import Summary from './Summary.jsx'

// expect(component.find('.select-loading').length).toBe(1)
const cpf = {
  '0JwHIWivQPWYEcndfhHYYC9Tmp11': {},
  '0JwHIWivQPWYEcndfhHYYC9Tmp12': {},
  '0JwHIWivQPWYEcndfhHYYC9Tmp13': {}
}

describe('Summary component', () => {
  it('Component render', () => {
    let component = shallow(<Summary loading={true} cpf={''} cnpj={''}/>)
    expect(component.length).toBe(1)
  })

  it('Component render', () => {
    let component = shallow(<Summary loading={false} cpf={cpf} cnpj={''}/>)
    expect(component.state().cpf).toBe(3)
  })

})