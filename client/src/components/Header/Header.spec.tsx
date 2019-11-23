import React from 'react';
import Header from './Header';
import renderer from 'react-test-renderer';

test('subscribe Header default state', () => {
    const component = renderer.create(<Header />);

    expect(component.toJSON()).toMatchSnapshot();
});
