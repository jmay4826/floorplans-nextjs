/* eslint-env jest */
import { shallow } from 'enzyme';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import FlatButton from '@material-ui/core/FlatButton/FlatButton';

import { Login } from '../components/Login';

describe('Login', () => {
  const login = shallow(<Login />);
  it('renders two text boxes', () => {
    expect(login.find(TextField).length).toBe(2);
  });

  it('renders a submit button', () => {
    expect(login.find(FlatButton).length).toBe(1);
  });

  it('updates state on text input', () => {
    login
      .find(TextField)
      .forEach(text => text.simulate('change', { target: { value: 'test' } }));
    login
      .find(TextField)
      .forEach(text => expect(text.prop('value')).toBe('test'));
  });

  it('logs in a user on submit', () => {
    // TODO
  });
});
