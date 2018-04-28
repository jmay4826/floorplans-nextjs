/* eslint-env jest */
import { shallow } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import { MockedProvider } from 'react-apollo/test-utils';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton/FlatButton';

import { Login } from '../components/Login';
import LocationList from '../components/LocationList';

describe('Login', () => {
  // const login = shallow(<Login />);
  // it('renders two text boxes', () => {
  //   expect(login.find(TextField).length).toBe(2);
  // });
  // it('renders a submit button', () => {
  //   expect(login.find(FlatButton).length).toBe(1);
  // });
  // it('updates state on text input', () => {
  //   login
  //     .find(TextField)
  //     .forEach(text => text.simulate('change', { target: { value: 'test' } }));
  //   login
  //     .find(TextField)
  //     .forEach(text => expect(text.prop('value')).toBe('test'));
  // });
  // it('logs in a user on submit', () => {
  //   // TODO
  // });
});

describe('With Snapshot Testing', () => {
  it('App shows "Hello world!"', () => {
    const component = renderer.create(<MockedProvider>
      <LocationList />
    </MockedProvider>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
