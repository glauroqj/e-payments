import React from 'react';
import { expect } from 'chai';
import { render, shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() })

import Navbar from './Navbar.jsx';

const user = {
  photoURL: 'test.png',
  displayName: 'Glauro'
}
const link = '/dashboard'

describe('Navbar component', () => {
  it('Find class navbar', () => {
    let component = shallow(<Navbar link={link} user={user}/>);
    expect(component.find('.navbar')).to.have.length(1);
  });
  it('Pass props user', () => {
    let component = mount(<Navbar user={user}/>);
    expect(component.props().user).to.equal(user);
  });
  it('Pass props link', () => {
    let component = mount(<Navbar link={link} user={user}/>);
    expect(component.props().link).to.equal('/dashboard');
  });
  it('Click on exit button', () => {
    let exitCallback = jest.fn();
    let component = shallow(<Navbar exit={exitCallback} link={link} user={user}/>);
    component.instance().exit();
  });
  it('Click on menu button', () => {
    let component = mount(<Navbar link={link} user={user}/>);
    expect(component.find('button').simulate('click'))
  });
  it('Quantity menu options', () => {
    let component = shallow(<Navbar link={link} user={user}/>);
    expect(component.find('a.nav-link')).to.have.length(5)
  });
  it('Show menu', () => {
    let component = shallow(<Navbar link={link} user={user}/>);
    component.instance().menu();
  });
});