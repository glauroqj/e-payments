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
const routes = [ 
  {route: '/login', text: 'Login'},
  {route: '/create', text: 'Criar Conta'},
]
    
describe('Navbar component', () => {
  it('Component render', () => {
    let component = shallow(<Navbar link={link} user={user}/>)
    expect(component.length).toBe(1)
  })

  it('Component without photo', () => {
    let component = shallow(<Navbar link={link} user={username}/>)
    expect(component.find('.photo').length).toBe(0)
  })

  it('Pass props admin', () => {
    let component = shallow(<Navbar link={'/admin'} user={user}/>)
    expect(component.instance().props.link).toEqual('/admin')
    expect(component.text()).toEqual('Equale DoaçõesADMGlauroPainel de ControleQuero DoarMinha ContaSair')
  })

  it('Should Show menu', () => {
    let component = mount(<Navbar link={link} user={user}/>)
    component.instance().menu()
    component.setState({ showMenu: true })
    expect(component.find('.navbar-toggler').simulate('click').length).toEqual(1)
  })

  it('Click on exit button', () => {
    let component = shallow(<Navbar link={link} user={user}/>)
    component.instance().exit(true)
    expect(component.instance().exit(true)).toEqual(false)
  })

  it('Should render routes', () => {
    let component = shallow(<Navbar link={link} user={user}/>)
    component.setState({ routes: routes })
    expect(component.state('routes')).toEqual(routes)
  })

  it('Should render component', () => {
    let component = shallow(<Navbar link={link} user={user}/>)
    component.setState({ pathname: '/login' })
    expect(component.state('pathname')).toEqual('/login')
  })
})