import React from 'react';
import {shallow} from 'enzyme';

import Form from '../src/Form';

test('Should render Form', () => {
  const form = shallow(
    <Form/>
  );
  expect(form.text()).toEqual("<Paper />");
});
