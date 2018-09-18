import React from 'react'
import { render, shallow, mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

import Navbar from './Navbar.jsx'

const user = {
  photoURL: 'test.png',
  displayName: 'Glauro'
}
const link = '/dashboard'

describe('Navbar component', () => {
  it('Pass props admin', () => {
    let component = shallow(<Navbar link={'/admin'} user={user}/>)
    expect(component.find('span.mr-1.badge.badge-dark').length).toBe(1)
    expect(component.find('li.nav-item.active').length).toBe(1)
    expect(component.instance().props.link).toEqual('/admin')
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
    let component = mount(<Navbar exit={exitCallback} link={link} user={user}/>)
    expect(component.find('a.nav-link').last().simulate('click'))
  })

})