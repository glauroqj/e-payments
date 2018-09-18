import React from 'react'
import { shallow, mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

import Loader from './Loader.jsx';
import { SemipolarSpinner } from 'react-epic-spinners'

describe('Loader component', () => {
  it('Find class loading', () => {
    let component = shallow(<Loader />);
    expect(component.find('.loading').length).toBe(1);
  });
  it('Find spinner', () => {
    let component = shallow(<Loader />);
    expect(component.find(SemipolarSpinner).length).toBe(1);
  });
  it('Pass props text', () => {
    let component = mount(<Loader text="Carregando Dashboard" color="#686de0"/>);
    expect(component.props().text).toEqual('Carregando Dashboard');
  });
  it('Pass props color', () => {
    let component = mount(<Loader color="#323232"/>);
    expect(component.props().color).toEqual('#323232');
  });
});