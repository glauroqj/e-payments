import React from 'react'
import { shallow, mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

import ErrorBag from './ErrorBag'

const error = ['not-empty', 'invalid_email']

describe('ErrorBag', () => {
  it('Render component', () => {
    const component = shallow(<ErrorBag error={error} />)
    expect(component.length).toBe(1)
  })
})