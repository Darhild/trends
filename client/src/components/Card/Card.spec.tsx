import React from 'react';
import Card from './Card';
import renderer from 'react-test-renderer';

test('Card without props', () => {
    const component = renderer.create(<Card id="0" />);

    expect(component.toJSON()).toMatchSnapshot();
});

test('Card with small size', () => {
    const component = renderer.create(<Card id="0" size="small"/>);

    expect(component.toJSON()).toMatchSnapshot();
});

test('Card with large size', () => {
    const component = renderer.create(<Card id="0" size="large"/>);

    expect(component.toJSON()).toMatchSnapshot();
});
