import React from 'react'
import { render, shallow, mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

import SideMenu from './SideMenu'

const options =  [
    {name: 'Resumo', link: 'summary'},
    {name: 'Gerenciar Administrador', link: 'add-admin'},
    {name: 'Buscar usuário', link: 'search'}
  ]
const tab = "summary"

describe('SideMenu component', () => {
  it('Render', () => {
    let clickSideMenu = jest.fn()
    let component = shallow(<SideMenu menu={options} tab={tab} clickSideMenu={clickSideMenu}/>)
    expect(component.length).toBe(1)
    expect(component.find('.list-group-item.list-group-item-action').length).toBe(3)
  })

  it('Change tab to summary', () => {
    let clickSideMenu = jest.fn()
    let component = shallow(<SideMenu menu={options} tab={tab} clickSideMenu={clickSideMenu}/>)
    component.instance().handleClick('search', 'tab')
    expect(component.state('active')).toEqual('summary')
  })

  it('Callbacks', () => {
    let clickSideMenu = jest.fn()
    let component = mount(<SideMenu menu={options} tab={tab} clickSideMenu={clickSideMenu}/>)
    expect(component.find('a.list-group-item.list-group-item-action.active').simulate('click'))
  })

})