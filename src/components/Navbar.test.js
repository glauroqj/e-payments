import React from 'react'
import { render, shallow, mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

import Navbar from './Navbar.jsx'

const user = {
  photoURL: 'test.png',
  displayName: 'Glauro'
}

const username = {
  photoURL: '',
  displayName: 'Glauro'
}
const link = '/dashboard'
    // expect(component.find('.select-loading').length).toBe(1)
    
describe('Navbar component', () => {
  it('Component render', () => {
    let exitCallback = jest.fn()
    let component = shallow(<Navbar exit={exitCallback} link={link} user={user}/>)
    expect(component.length).toBe(1)
  })

  it('Component without photo', () => {
    let exitCallback = jest.fn()
    let component = shallow(<Navbar exit={exitCallback} link={link} user={username}/>)
    expect(component.find('.photo').length).toBe(0)
  })

  it('Pass props admin', () => {
    let component = shallow(<Navbar link={'/admin'} user={user}/>)
    expect(component.find('span.mr-1.badge.badge-dark').length).toBe(1)
    expect(component.find('li.nav-item.active').length).toBe(1)
    expect(component.instance().props.link).toEqual('/admin')
    expect(component.text()).toEqual('Equale DoaçõesADMGlauroPainel de ControleQuero DoarMinha ContaSair')
  })

  it('Show menu', () => {
    let component = shallow(<Navbar link={link} user={user}/>)
    component.instance().menu()
    expect(component.state('showMenu')).toEqual(true)
  })

  it('Click on menu button', () => {
    let component = mount(<Navbar link={link} user={user}/>)
    expect(component.find('button.navbar-toggler').simulate('click'))
  })

  it('Click on exit button', () => {
    let exitCallback = jest.fn()
    let component = shallow(<Navbar exit={exitCallback} link={link} user={user}/>)
    component.instance().exit()
    expect(exitCallback.mock.calls.length).toBe(1)
  })


})