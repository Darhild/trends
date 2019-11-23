import React from 'react';
import Button from './Button';
import renderer from 'react-test-renderer';

test('subscribe Button default state', () => {
    const component = renderer.create(<Button type="subscribe" />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
});
